let http = require("http");
let url = require("url");
let mysql = require("mysql");
let aajs = require("./lib/aa.js");
let member = require("./lib/member.js");
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "122333",
  database: "stocksafe_db",
});

// cors error
// 왜 요청 데이터를 못받냐

let app = http.createServer(function (request, response) {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;

  // "/"
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
        db.query(`select * from member`, function (error, data) {
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
          member.login(db, request, response);
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
  } else if (pathname_split[1] === "stock") {
    if (pathname_split.length === 2) {
      if (request.method === "GET") {
      } else if (request.method === "POST") {
      } else if (request.method === "PUT") {
      } else if (request.method === "DELETE") {
      }
    } else {
      if (pathname_split[2] === "searchAll") {
        console.log("!");
        response.writeHead(302, { Location: `/` });
        response.end();
      }
    }
  } else {
    console.log("!>");
    response.writeHead(404, " ");
    response.end("Not found");
  }
});
app.listen(9999);
