let http = require('http');
let url = require('url');
let mysql = require('mysql');

let app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){

      } else {
          
      }
    } else if(pathname === '/create'){
      topic.create(request, response);
    } else if(pathname === '/create_process'){
      topic.create_process(request, response);
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000); 