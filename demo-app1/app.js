const logger =require('./service/logger');
const http = require('http');


var server = http.createServer((req,res) =>{

    logger.info(req.url);

    console.log(req);
    if(req.url=="/name"){
        res.write(JSON.stringify({logger}))
        res.end();
    }

    if(req.url=="/ping"){
        res.write(JSON.stringify({"name":"Pong"}))
        res.end();
    }

    res.end();
})

server.listen(3001);