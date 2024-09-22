const http = require("http");
const fs = require("fs");


let server = http.createServer(async (req, res)=>{
    let url = req.url;

    if(url == "/"){
        url = "/App/hello.html";
    }


    try {
        let data = await kinggod(url);
        res.end(data);
    } catch (error) {
        res.write("error: " + error);
        res.end();
    }


});


let kinggod = async (url)=>{
    let result = new Promise((resolve, reject)=>{
        fs.stat("."+url, (err, status)=>{
            fs.readFile("."+url, (err, data)=>{
    
                if(err){
                    reject("파일 읽기 에러 " + err);
                }


                resolve(data);
    
                
    
            });
    
            if(err){
                reject("파일 상태 에러 " + err);
            }
        });
    });

    return result;
}



server.listen(80);