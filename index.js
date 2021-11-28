const Hapi = require('@hapi/hapi');
const functions = require("firebase-functions");
const admin = require('firebase-admin');
 
const init = async () => {
  
  const server = Hapi.server({
    port: 1337,
    host: '0.0.0.0',
    routes: {
      cors: true
    }
  });

  admin.initializeApp();

  server.route({
    method: 'POST',
    path: '/amogus',
    handler: (request, h) => {
      const body = request.payload;
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
    }
  })
 
  await server.start();
  console.log(`among us ${server.info.uri}`);
};
 
 
init();