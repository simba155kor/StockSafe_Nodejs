let http = require("http");
let url = require("url");
let mysql = require("mysql");
let aajs = require("./lib/aa.js");
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ssafy",
  database: "safestock",
});

// cors error
// 왜 요청 데이터를 못받냐

let app = http.createServer(function (request, response) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
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
      } else if (request.method === "POST") {
      } else if (request.method === "PUT") {
      } else if (request.method === "DELETE") {
      }
    } else {
      if (pathname_split[2] === "signup") {
      } else if (pathname_split[2] === "allmember") {
      } else if (pathname_split[2] === "edit") {
      } else if (pathname_split[2] === "login") {
        let body = "";
        request.on("data", function (data) {
          body += data;
          console.log(data);
        });
        console.log("-----------------");
        console.log(body);

        response.writeHead(200, headers);
        response.end();
        // db.query(`
        // select member_name
        // from member
        // where id=? and member_pw=?`,[body.id, body.memberPw])
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
      }
    }
  } else {
    response.writeHead(404, headers);
    response.end("Not found");
  }
});
app.listen(3000);
