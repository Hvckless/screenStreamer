import http from "node:http";
import https from "node:https";
import {stat} from "node:fs";
import fs from "node:fs";
import mime from "mime";

const options = {
    key : fs.readFileSync("./cert/rootca.key"),
    cert : fs.readFileSync("./cert/rootca.crt"),
};


//var server = http.createServer((req, res)=>{
var httpsServer = https.createServer(options, (req, res)=>{
    stat("."+req.url, (err, stats)=>{

        if(stats == undefined){
            res.write("file not exist");
            res.end();
        }else{
            if(stats.isDirectory() == true){

                res.write("path locating directory");
                res.end();

            }else{

                let localMIMEType = mime.getType('.'+req.url);

                res.writeHead(200, {
                    'Content-Type' : localMIMEType,
                });

                let file = fs.readFileSync('.'+req.url, {encoding:"utf-8"});

                res.write(file);
                res.end();

            }
        }

    });
});



httpsServer.listen(443);