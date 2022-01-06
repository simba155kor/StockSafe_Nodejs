let http = require('http');
let url = require('url');
let mysql = require('mysql');
let aajs = require('./lib/aa.js');



let app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;

    let pathname_split = pathname.split('/');

    if(pathname_split.length===0){
      if(queryData.id === undefined){

      } else {
          
      }
    } else if(pathname_split[0] === 'member'){
        if(pathname_split.length===1){
            if(request.method === "GET") { console.log("1");}
            else if(request.method === "POST") {}
            else if(request.method === "PUT") {}
            else if(request.method === "DELETE") {} 
        } else{
            if(pathname_split[1] === 'signup') { }
            else if(pathname_split[1] === 'allmember') {}
            else if(pathname_split[1] === 'edit') {}
            else if(pathname_split[1] === 'login') {}
            else if(pathname_split[1] === 'findPW') {}
        }
    } else if(pathname_split[0] === 'memberstock'){
        if(request.method === "GET") {}
        else if(request.method === "POST") {}
        else if(request.method === "DELETE") {}

    } else if(pathname_split[0] === 'news'){
        if(request.method === "GET") {}
        else if(request.method === "POST") {}
        else if(request.method === "DELETE") {} 
        
    } else if(pathname_split[0] === 'reply'){
        if(request.method === "GET") {}
        else if(request.method === "POST") {}
        else if(request.method === "PUT") {}
        else if(request.method === "DELETE") {} 
        
    } else if(pathname_split[0] === 'stock'){
        if(pathname_split.length===1){
            if(request.method === "GET") {}
            else if(request.method === "POST") {}
            else if(request.method === "PUT") {}
            else if(request.method === "DELETE") {} 
        } else{
            if(pathname_split[1] === 'searchAll') { }
        }
        
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000); 