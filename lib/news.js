let url_module = require("url");
var mybatisMapper = require("mybatis-mapper");
// let mysql = require('mysql');
let util = require(`./util.js`);

mybatisMapper.createMapper(["./mapper/news.xml"]);

module.exports = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
    /** add other headers as per requirement */
  },

  createNews: function (db, request, response) {
    let body = [];
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = JSON.parse(body);
        //조회할 파라미터
        var param = body;

        //질의문 형식
        var format = { language: "sql", indent: "  " };
        var query = mybatisMapper.getStatement(
          "NewsMapper",
          "createNews",
          param,
          format
        );
        //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

        db.query(query, function (error, results, fields) {
          //조회
          if (error) {
            console.log(error);
          }

          response.writeHead(200, this.headers);
          var string = JSON.stringify(results);
          var string2 = util.snakeToCamel(string);
          response.write(string2);

          response.end();
        });
      });
  },

  readStockNews: function (db, request, response) {
    let body = [];
    let url = request.url;
    let url_info = url_module.parse(url, true);
    request
      .on("data", (chunk) => {
        console.log("!!b");
        body.push(chunk);
      })
      .on("end", () => {
        console.log("B");

        //조회할 파라미터
        //where stock_id=#{id}
        var param = {
          id: url_info.query.stockId,
        };

        //질의문 형식
        var format = { language: "sql", indent: "  " };
        var query = mybatisMapper.getStatement(
          "NewsMapper",
          "readStockNews",
          param,
          format
        );
        //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

        db.query(query, function (error, results, fields) {
          //조회
          if (error) {
            console.log(error);
          }

          response.writeHead(200, this.headers);
          var string = JSON.stringify(results);
          var string2 = util.snakeToCamel(string);
          response.write(string2);

          response.end();
        });
      });
  },

  deleteNews: function (db, request, response) {},
};
