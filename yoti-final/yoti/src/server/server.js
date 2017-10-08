const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const fs = require('fs');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
 
app.use(session({
    store: new RedisStore(),
    secret: 'yotiApp'
}));

app.use(bodyParser.json());

//Yoti PDF Generator can be swapped out for different implementations such as fakes for testing, test database or production database
//All should maintain same API
//As it can be swapped out the implementation detail is irrelevant, it could be running on same machine or over network
//I will use this same approach for remainder of the assignment as it mimics microservice architecture
const yotiPdfGenerator = require("../yotiPdfGenerator/yotiPdfGenerator.js");

//I am doing this in a node.js server as it is required for this assignment
//In production I would use a serverless setup such as AWS Endpoints as it would be cheaper than running a server
//And more modular as the endpoint code would be independent from each other

//returns the PDF file
app.get('/generatePdf', (req, res) => {
  try {
    yotiPdfGenerator.generatePdf(req.session)
    .then((doc) => {
      doc.pipe(res);
    })
    .catch((e) => res.status(500).sendfile('./res/noData.html'));
  }
  catch (e) {
    handleGeneratorError(e, res);
  } 
})

//callback for Yoti SDK
app.get('/profile', function(req, res) {
  let token = req.query.token;
  try {
    yotiPdfGenerator.associateSessionWithYoti(req.session, token)
      .then((associatedUser) => {
        req.session.associatedUser = associatedUser;
        res.sendfile('./res/successfulAdd.html');
      })
      .catch((e) => handleGeneratorError(e, res));  
  }
  catch (e) {
    handleGeneratorError(e, res);
  }
})

app.get('/', function(req, res) {
  try {
    res.sendfile('./res/index.html');
  }
  catch (e) {
    handleGeneratorError(e, res);
  }
})

app.get('/pdf', function(req, res) {
  try {
    res.sendfile('./res/generatePdf.html')
  }
  catch (e) {
    handleGeneratorError(e, res);
  }
})

app.use('/res', express.static(path.join(__dirname, '../../res')))
    
function handleGeneratorError(errorMessage, response) {
  response.status(500).json({ error: errorMessage.toString() });
}

https.createServer({
  key: fs.readFileSync('./src/keys/server-key.pem'),
  cert: fs.readFileSync('./src/keys/server-cert.pem')
}, app).listen(port);

console.log("listening on port " + port);