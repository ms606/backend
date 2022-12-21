const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');
const morgan = require('morgan');
var cors = require('cors');

let httpServer;


function initialize(){
    return new Promise((resolve, reject) => {
     const app = express();

     app.use(cors());
     
     httpServer = http.createServer(app);
     
     app.use(morgan('Combined'));
     //Parse incoming JSON requests and revive JSON.
     app.use(express.json({
        revive: reviveJson
       }));
       
     app.use('/api', router );

     httpServer.listen(webServerConfig.port)
      .on('listening', () => {
          console.log(`Web server listening on localhost: ${webServerConfig.port}`);

          resolve();
      })
      .on('error', err => {
          reject(err);
      });    

     });    
 }



function close(){
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err){
                reject(err);
                return;
            }
            resolve();
        });
    });
}

module.exports.initialize = initialize;
module.exports.close = close;

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
    // revive ISO 8601 date strings to instances of Date
    if (typeof value === 'string' && iso8601RegExp.test(value)) {
        return new Date(value);
    } else {
        return value;
    }
}