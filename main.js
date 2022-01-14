let http = require("http");
let url = require("url");
let mysql = require("./lib/mysql.js");
let member = require("./lib/member.js");
let likestock = require("./lib/likestock.js");
let memberstock = require("./lib/memberstock.js");
let stock = require("./lib/stock.js");
let reply = require("./lib/reply.js");
let news = require("./lib/news.js");

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
    if (pathname_split.length === 2) {
      if (request.method === "GET") {
        member.readMember(mysql.db, request, response);
      } else if (request.method === "POST") {
      } else if (request.method === "PUT") {
      } else if (request.method === "DELETE") {
      } else if (request.method === "OPTIONS") {
        response.writeHead(204, headers);
        response.end();
      } 
    } else {
      if (pathname_split[2] === "signup") {
        if (request.method === "POST") {
          member.createMember(mysql.db, request, response);
        } else if (request.method === "OPTIONS") {
          response.writeHead(204, headers);
          response.end();
        } 
      } else if (pathname_split[2] === "allmember") {
        member.readMemberAll(mysql.db, request, response);
      } else if (pathname_split[2] === "edit") {
        if (request.method === "PUT") {
          member.updateMember(mysql.db, request, response);
        } else if (request.method === "OPTIONS") {
          response.writeHead(204, headers);
          response.end();
        }
      } else if (pathname_split[2] === "login") {
        if (request.method === "POST") {
          member.loginMember(mysql.db, request, response);
        } else if (request.method === "OPTIONS") {
          response.writeHead(204, headers);
          response.end();
        } else {
          let body = "";
          request.on("data", function (data) {
            body += data;
          });
        }
      } else if (pathname_split[2] === "findPW") {
      }
    }
  } else if (pathname_split[1] === "memberstock") {
    if (request.method === "GET") {
      memberstock.readMemberStock(mysql.db, request, response);
    } else if (request.method === "POST") {
      memberstock.createMemberStock(mysql.db, request, response);
    } else if (request.method === "DELETE") {
      memberstock.deleteMemberStock(mysql.db, request, response);
    } else if (request.method === "OPTIONS"){
      response.writeHead(204, headers);
      response.end();
    }
  } else if (pathname_split[1] === "news") {
    if (request.method === "GET") {
      news.readStockNews(mysql.db, request, response);
    } else if (request.method === "POST") {
      news.createNews(mysql.db, request, response);
    } else if (request.method === "DELETE") {
    } else if (request.method === "OPTIONS"){
      response.writeHead(204, headers);
      response.end();
    }
  } else if (pathname_split[1] === "reply") {
    if (request.method === "GET") {
      reply.readAllReply(mysql.db, request, response);
    } else if (request.method === "POST") {
      reply.createReply(mysql.db, request, response);
    } else if (request.method === "PUT") {
    } else if (request.method === "DELETE") {
    } else if (request.method === "OPTIONS"){
      response.writeHead(204, headers);
      response.end();
    }
  } else if (pathname_split[1] === "likestock") {
    if (request.method === "GET") {
      likestock.readLikeStock(mysql.db, request, response);
    } else if (request.method === "POST") {
      likestock.createLikeStock(mysql.db, request, response);
    } else if (request.method === "DELETE") {
      likestock.deleteLikeStock(mysql.db, request, response);
    } else if (request.method === "OPTIONS"){
      response.writeHead(204, headers);
      response.end();
    }
  } else if (pathname_split[1] === "stock") { 
    if (request.method === "GET") {
      if(pathname_split[2] === "searchAll"){
        stock.readStockAll(mysql.db, request, response);
      }else{
        stock.readStockDetail(mysql.db, request, response);
      }
    } else if (request.method === "POST") {
      stock.createStock(mysql.db, request, response);
    } else if (request.method === "UPDATE") {
      stock.updateStock(mysql.db, request, response);
    } else if (request.method === "DELETE") {
      stock.deleteStock(mysql.db, request, response);
    } else if (request.method === "OPTIONS"){
      response.writeHead(204, headers);
      response.end();
    }
  } else {
    response.writeHead(404, " ");
    response.end("Not found");
  }
});
app.listen(9999);
