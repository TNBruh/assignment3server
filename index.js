const Hapi = require('@hapi/hapi');
const { default: axios } = require('axios');
 
const init = async () => {
  
  const server = Hapi.server({
    port: 1337,
    host: '0.0.0.0',
    routes: {
      cors: true
    }
  });


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
      //'http://10.0.2.2:5001/fractal-unj-9f50c/us-central1/amongus/'
      axios.post(
        'http://localhost:5001/fractal-unj-9f50c/us-central1/amongus',
        body
      ).then(() => {console.log('then')}).catch(() => {console.log('catch')});
      console.log('sent');

      return {status: 200, message: "success"};
    }
  })
 
  await server.start();
  console.log(`among us ${server.info.uri}`);
};
 
console.log('######################');
init();