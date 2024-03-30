const https = require('https');

function sendProcessedMessageToTopic(message) {
    const base64Credentials = Buffer.from(`${process.env.SOLACE_REST_USERNAME}:${process.env.SOLACE_REST_PASSWORD}`).toString('base64');
  
    const topic = process.env.TOPIC
  
    console.log(`Sending processed message to topic ${topic}`);
  
    var headers = message.headers;
  
    // Add Authorization to headers
    headers['Authorization'] = `Basic ${base64Credentials}`;
  
    console.log("Headers:");
    console.log(JSON.stringify(headers, null, 2) + "\n");
  
    console.log("Body:");
    console.log(message.body + "\n");
  
    const options = {
      hostname: process.env.SOLACE_REST_HOST,
      port: process.env.SOLACE_REST_PORT,
      path: `/${topic}`,
      method: 'POST',
      headers: message.headers
    };
  
    try {
      const req = https.request(options, (res) => {
        let response = '';
    
        res.on('data', (chunk) => {
          response += chunk;
        });
    
        res.on('end', () => {
          
          console.log(`Submitted processed message to topic ${topic}`);
          console.log(response);
    
        });
    
      });
  
      req.on('error', (error) => {
        console.error(error);
      });
        
      req.write(message.body);
      req.end();
      
    } catch (error) {
      console.error(error);
    }
  }

module.exports = sendProcessedMessageToTopic;