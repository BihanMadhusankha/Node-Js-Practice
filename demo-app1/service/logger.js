const os = require('os');
const path = require('path');
const fs = require('fs');


function log(massage){

    var time = new Date(Date.now()).toLocaleTimeString();
var message = `\n${time}:${massage}`;

    fs.appendFile("sample.log",message, (error) =>{
       if(error) console.log(error);
    });
}
 
module.exports={
    info:log
}