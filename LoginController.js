const express = require('express');
const router = express.Router();
const https = require('https');
const axios = require('axios');
const querystring = require('querystring');

var Token;

router.post('/login', async (request, response) => {

    var user = {
        UName: request.body.UName,
        PWD: request.body.PWD,
        name: request.body.name,
        mrn: request.body.mrn,
        age: request.body.age,
        gender: request.body.gender,
        gene: request.body.gene,
        cancers: request.body.cancers,
        surgeries: request.body.surgeries,
        isBilateral: request.body.isBilateral,
        ageDiagnosis: request.body.ageDiagnosis
    }

    var det = {
        UName: request.body.UName,
        PWD: request.body.PWD
    }
    console.log(det);
    var report = {
        name: request.body.name,
        mrn: user.mrn,
        age: user.age,
        gender: user.gender,
        gene: user.gene,
        cancers: user.cancers,
        surgeries: user.surgeries,
        isBilateral: user.isBilateral,
        ageDiagnosis: user.ageDiagnosis
    }


    const login = await axios
        .post("https://staging.medneon.com/MedNeonServices/api/Login/", det)
    // .then(doc => {
    //     console.log(doc.data);
    //     // response.write({ userdata: doc.data });
    //     Token = doc.data.Token;
    // })
    // .catch(err => console.log("err login"));

    console.log(login.data);
    Token = login.data.Token;
    if (login) {
        console.log(Token);
        axios
            .post(`https://staging.medneon.com/MedNeonServices/api/FetchPGIData/?token=${Token}`, report)
            .then(doc => {
                console.log(doc.data);
                response.json({ reportdata: doc.data });
            })
            .catch(err => {
                console.log(err);

            })
    }

});

// router.post('/fetchReport', (request, response) => {


//     var reportData = {
//         name: request.body.name,
//         mrn: request.body.mrn,
//         age: request.body.age,
//         gender: request.body.gender,
//         gene: request.body.gene,
//         cancers: request.body.cancers,
//         surgeries: request.body.surgeries,
//         isBilateral: request.body.isBilateral,
//         ageDiagnosis: request.body.ageDiagnosis
//     }

//     console.log(request.query);
//     console.log(request.body);

//     axios
//     .post(`https://staging.medneon.com/MedNeonServices/api/FetchPGIData/?token=${request.query.token}`,reportData)
//     .then(doc=>{
//         console.log(doc.data);
//         response.json({reportdata:doc.data});
//     })
//     .catch(err=>{
//         // console.log(err);
//         console.log("err.error)");
//     })


// });

module.exports = router;  