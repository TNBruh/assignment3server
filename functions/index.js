const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const cors = require('cors');
const { initializeApp } = require("firebase-admin");
admin.initializeApp();

console.log('###########################################################################################')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.broadcast = functions.https.onRequest((req, res) => {
//     //expect POST
//     const body = req.body;
// });

app.use(cors({origin: true}));

app.get('/', (req, res) => {
    console.log('broadcast');
    res.end("Received GET request!");  
});

app.post('/', (req, res) => {
    //expect { topic: String, user: String, content: String }
    console.log('request received');
    const body = req.body;

    console.log(`forming payload ${JSON.stringify(body)}`);
    const payload = {
        notification: {
            title: `New Message on ${body.topic}`,
            body: `Sus`,
            image: 'https://cdn.discordapp.com/attachments/643333359413624833/910239872432877629/cirno.jpg'
        },
        data: body,
        topic: "sussus",
    }

    console.log('sending');
    admin.messaging().send(payload);
    console.log('sent');
});

exports.amongus = functions.https.onRequest(app);