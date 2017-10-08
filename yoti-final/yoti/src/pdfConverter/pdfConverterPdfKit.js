const pdf = require('pdfkit');
const fs = require('fs');

module.exports = {
    createPdfDoc: function (firstName, lastName, id, photoData) {
        let pdfOutput = "./pdf/output.pdf"; 

        //Create a document
        doc = new pdf;

        let nameString = 'Name ' + firstName + ' ' + lastName + ' [Verified by YOTI]';

        let imageLocation = writeImageToDisk(photoData, id);

        //Embed a font, set the font size, and render some text
        doc.font('Times-Roman')
            .fontSize(25)
            .text('Yoti Assignment', 100, 100);

        doc.font('Times-Roman')
            .fontSize(20)
            .text('Yoti Verified credentials', 100, 200);

        doc.font('Times-Roman')
            .fontSize(16)
            .text(nameString, 100, 300);

        doc.image(imageLocation, 100, 400, { fit: [100, 100] })

        //Finalize PDF file
        doc.end();

        //pipe object to http response
        return doc;
    }
}

function writeImageToDisk(imageData, userId) {
    let base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    
    let outputImage = "./images/id-" + userId +".jpeg";
    
    fs.writeFileSync(outputImage, base64Data, { encoding: 'base64' });

    return outputImage;
}