let http = require("http");
let url = require("url");
let mysql = require("./lib/mysql.js");
let member = require("./lib/member.js");
let likestock = require("./lib/likestock.js");


// cors error
// 왜 요청 데이터를 못받냐

let app = http.createServer(function (request, response) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, DELETE, UPDATE, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Access-Control-Allow-Headers": "*"
    /** add other headers as per requirement */
  };

  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;

  let pathname_split = pathname.split("/");
  console.log(pathname_split);
  if (pathname_split.length === 1) {
    if (queryData.id === undefined) {
    } else {
    }
  } else if (pathname_split[1] === "member") {
    console.log("2");
    if (pathname_split.length === 2) {
      if (request.method === "GET") {
        console.log("1");
        mysql.db.query(`select * from member`, function (error, data) {
          console.log(request);
          console.log(data);
        });
      } else if (request.method === "POST") {
      } else if (request.method === "PUT") {
      } else if (request.method === "DELETE") {
      }
    } else {
      if (pathname_split[2] === "signup") {
      } else if (pathname_split[2] === "allmember") {
      } else if (pathname_split[2] === "edit") {
      } else if (pathname_split[2] === "login") {
        if (request.method === "POST") {
          console.log("11");
          member.login(mysql.db, request, response);
        } else if (request.method === "OPTIONS") {
          console.log("options!");
          response.writeHead(200, headers);
          response.end();
        } else {
          //console.log(request);
          let body = "";
          request.on("data", function (data) {
            body += data;
            console.log(data);
          });
          console.log("-----------------");
          console.log(body);
        }
      } else if (pathname_split[2] === "findPW") {
      }
    }
  } else if (pathname_split[1] === "memberstock") {
    if (request.method === "GET") {
    } else if (request.method === "POST") {
    } else if (request.method === "DELETE") {
    } else if (request.method === "OPTIONS"){
      response.writeHead(204, headers);
      response.end();
    }
  } else if (pathname_split[1] === "news") {
    if (request.method === "GET") {
    } else if (request.method === "POST") {
    } else if (request.method === "DELETE") {
    }
  } else if (pathname_split[1] === "reply") {
    if (request.method === "GET") {
    } else if (request.method === "POST") {
    } else if (request.method === "PUT") {
    } else if (request.method === "DELETE") {
    }
  } else if (pathname_split[1] === "likestock") {
    console.log("?");
    //console.log(request);
    if (request.method === "GET") {
      console.log("!");
      likestock.readLikeStock(mysql.db, request, response);
    } else if (request.method === "POST") {
      likestock.createLikeStock(mysql.db, request, response);
    } else if (request.method === "DELETE") {
    } else if (request.method === "OPTIONS"){
      response.writeHead(204, headers);
      response.end();
    }
    
  } else if (pathname_split[1] === "stock") { 
  } else {
    console.log(path);
    response.writeHead(404, " ");
    response.end("Not found");
  }
});
app.listen(9999);
