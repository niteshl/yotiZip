DEPLOYMENT INSTRUCTIONS

This will require a Redis server to be running on the same machine as this node process
Can be downloaded from https://redis.io/
The yotiConnector.js uses the default Redis settings, if there are connectivity issues these should be adjusted

The node packages were not included in this zip as it would make the file too large

Make sure the Yoti SDK is installed for node and your operating system has all the dependencies installed as shown here - https://github.com/getyoti/yoti-node-sdk
After that run `npm install` in the root folder (folder name is yoti)
Once all packages are installed the server will be ready to run

This needs to be run in a directory where write access is available as some storage is needed to output Image files
The image files are needed as the PdfKit library needs a filepath to an image to attach it to a pdf

The main process that needs to be run is sever.js in the src/server folder
To run navigate to the root folder (folder name is yoti) and run `node .\src\server\server.js`

This will start a node server accessible on https://localhost:3001
Navigate to https://localhost:3001/ which will be the index.html homepage
Login with Yoti, you will be taken to a confirmation screen if login was successful instructing you to go to the generate PDF tab
Once on this tab click the generate PDF document to be either taken to a download prompt or have the PDF opened in your browser
If your data has expired you will be taken to a page that will notify you that you need to login again

This project was tested on a Windows 10 machine Running Node 6.2.0, npm 5.5.1 and Redis 3.2.1, please use these versions to reduce compatiability issues

For any other questions please email me on nitesh.phone@gmail.com
