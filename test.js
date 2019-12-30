const express = require('express');
const router = express.Router();

var fs = require('fs');

var pdf = require('dynamic-html-pdf');
var html = fs.readFileSync('./Controllers/template.html', 'utf8');

router.post('/test', (request, response) => {
    console.log(request.body);
    var user = {
        UName: request.body.UName,
        PWD: request.body.PWD
    }

    console.log(user);
    
    var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm"
    };

    var document = {
        template: html,
        context: {
            user: user
        },
        path: "./output.pdf"
    };

    pdf.create(document, options)
        .then(doc => {
            console.log("res : " + doc.filename);
            response.download('./output.pdf');
        })
        .catch(error => {
            console.error(error)
        });
    // response.json({user:user});

});

module.exports = router;