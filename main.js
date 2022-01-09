let http = require("http");
let url = require("url");
let mysql = require("mysql");
let aajs = require("./lib/aa.js");
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "122333",
  database: "stocksafe_db",
});

// cors error
// 왜 요청 데이터를 못받냐


let app = http.createServer(function (request, response) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
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
        db.query(`select * from member`, function(error, data){
          console.log(request);
          console.log(data);
        })
      } else if (request.method === "POST") {
      } else if (request.method === "PUT") {
      } else if (request.method === "DELETE") {
      }
    } else {
      if (pathname_split[2] === "signup") {
      } else if (pathname_split[2] === "allmember") {
      } else if (pathname_split[2] === "edit") {
      } else if (pathname_split[2] === "login") {
        if(request.method === "POST"){
          let body = [];
          request.on('data', (chunk) => {
            body.push(chunk);
          }).on('end', () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
            // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
            console.log(body);
            console.log(body.id);
            console.log(body.memberPw);
            console.log("!!!!");
            db.query(`
        select member_name
        from member
        where id=? and member_pw=?`, [body.id, body.memberPw], function(error, data){
          console.log(data);
          console.log("!!");
          if(data.length === 1){
            console.log(data);
          response.writeHead(200, headers);
          response.write(data[0].member_name);
          response.end();
          }
          else{
            console.log('fail!');
            response.writeHead(204, headers);
            response.write("fail");
            response.end();
          }
             });
          });
        }
        else if(request.method === "OPTIONS"){
          console.log('options!');
          response.writeHead(200, headers);
          response.end();
        }
        else{
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
        response.writeHead(302, {Location : `/`});
        response.end();
      }
    }
  } else {
    response.writeHead(404, headers);
    response.end("Not found");
  }
});
app.listen(9999);
