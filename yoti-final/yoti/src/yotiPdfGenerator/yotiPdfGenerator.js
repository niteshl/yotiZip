const pdfConverter = require('../pdfConverter/pdfConverterPdfKit.js');
const yotiConnector = require('../yotiUtils/yotiConnector.js');
const sessionManager = require('../sessionManagement/sessionManager.js');

//Main module to interact with the server
module.exports = {
    generatePdf: function (session) {
        return sessionManager.getUserYotiDetails(session)
            .then((userDetails) => {

                if (userDetails === null) {
                    throw Error("No User Data found, please login to Yoti - Data is valid for 5 minutes");
                }

                return pdfConverter.createPdfDoc(userDetails.firstName, userDetails.lastName, userDetails.yotiId, userDetails.photo);
            })
    },

    associateSessionWithYoti: function (session, token) {
        return yotiConnector.getFields(token)
            .then((renderFields) => {
                return sessionManager.addUserToSession(renderFields, session)
            });
    }

}
