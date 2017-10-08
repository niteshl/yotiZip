const fs = require('fs');

const YotiClient = require('yoti-node-sdk')
const CLIENT_SDK_ID = '18b0edd2-fb6f-46b0-bd7a-3461f43ddc13'
const PEM = fs.readFileSync("./src/keys/assignment-access-security.pem");
var yotiClient = new YotiClient(CLIENT_SDK_ID, PEM);

//closely based on example on Yoti site
module.exports = {
    getFields: function(token) {

        if(!token) {
            throw error("No Token Specified");
            return
        }
        let promise = yotiClient.getActivityDetails(token)
        return promise.then((activityDetails) => {
            if (activityDetails.getOutcome() !== 'SUCCESS') {
                throw error("Unsuccessful fetching Yoti Data")
            }

            let userProfile = activityDetails.getUserProfile();
            let userId = activityDetails.getUserId();

            let pdfData = {
                firstName: userProfile.givenNames,
                lastName: userProfile.familyName,
                photo: userProfile.selfie,
                yotiId: userId
            }

            return pdfData; 
        }).catch((err) => {
            console.error(err);
            return;
        })
        
    }
}
