const util = require("./util.js");
let url_module = require("url");
var mybatisMapper = require("mybatis-mapper");

mybatisMapper.createMapper(["./mapper/stock.xml"]);

module.exports = {
  SUCCESS: "success",
  FAIL: "fail",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Access-Control-Allow-Headers": "*",
    /** add other headers as per requirement */
  },
  createStock: function (db, request, response) {
    // swagger가 없어서 현제 테스트 불가
    let body = [];
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        db.query(
          `
          insert into stock(id, stock_name, stock_market, stock_sector, stock_wics, stock_marketcap, stock_count,
            stock_foreigner, stock_per, stock_pbr, stock_bps,stock_divyield)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            body.id,
            body.stockName,
            body.stockMarket,
            body.stockSector,
            body.stockWics,
            body.stockMarketcap,
            body.stockCount,
            body.stockForeigner,
            body.stockPer,
            body.stockPbr,
            body.stockBps,
            body.stockDivyield,
          ],
          function (error, data) {
            if (data === 1) {
              // success
              response.writeHead(200, this.headers);
              response.write(this.SUCCESS);
              response.end();
            } else {
              // fail
              response.writeHead(204, this.headers);
              response.write(this.FAIL);
              response.end();
            }
          }
        );
      });
  },

  readStockAll: function (db, request, response) {
    let body = [];
    let url = request.url;
    let url_info = url_module.parse(url, true);
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        //조회할 파라미터
        let param = {
          keyword: url_info.query.keyword,
        };

        console.log(param.keyword);

        //질의문 형식
        let format = { language: "sql", indent: ' ' };
        let query = mybatisMapper.getStatement(
          'StockMapper',
          "readStockAll",
          param,
          format
        );

        db.query(query, function (error, data) {
          console.log("+++");
          console.log(data);
          if (data.length >= 1) {
            // success
            response.writeHead(200, this.headers);
            data = JSON.stringify(data);
            response.write(util.snakeToCamel(data));
            response.end();
          } else {
            // fail
            response.writeHead(204, this.headers);
            response.write(this.FAIL);
            response.end();
          }
        });
      });
  },

  readStockDetail: function (db, request, response) {
    let body = [];
    let url = request.url;
    let url_info = url_module.parse(url, true);
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        //조회할 파라미터
        let param = {
          id: url_info.query.id,
        };

        //질의문 형식
        let format = { language: "sql", indent: "  " };
        let query = mybatisMapper.getStatement(
          "StockMapper",
          "readStockDetail",
          param,
          format
        );
        //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

        //해당쿼리가 조합된 것을 볼 수 있다.
        //console.log(query);

        db.query(query, function (error, results, fields) {
          //조회
          if (error) {
            console.log(error);
          }
          console.log(results[0]);

          response.writeHead(200, this.headers);
          let string = JSON.stringify(results[0]);
          console.log(string);
          let string2 = util.snakeToCamel(string);
          response.write(string2);

          response.end();
        });
      });
  },

  updateStock: function (db, request, response) {
    // swagger가 없어서 현제 테스트 불가
    let body = [];
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        db.query(
          `
          update stock
          set stock_name=?, stock_market=?, stock_sector=?,
          stock_wics=?, stock_marketcap=?, stock_count=?,
          stock_foreigner=?, stock_per=?, stock_pbr=?, stock_bps=?,
          stock_divyield =?
          where id=?`,
          [
            body.stockName,
            body.stockMarket,
            body.stockSector,
            body.stockWics,
            body.stockMarketcap,
            body.stockCount,
            body.stockForeigner,
            body.stockPer,
            body.stockPbr,
            body.stockBps,
            body.stockDivyield,
            body.id,
          ],
          function (error, data) {
            if (data === 1) {
              // success
              response.writeHead(200, this.headers);
              response.write(this.SUCCESS);
              response.end();
            } else {
              // fail
              response.writeHead(204, this.headers);
              response.write(this.FAIL);
              response.end();
            }
          }
        );
      });
  },
  deleteStock: function (db, request, response) {
    // swagger가 없어서 현제 테스트 불가
    let body = [];
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        db.query(
          `
          delete from stock
          where id=?`,
          [body.id],
          function (error, data) {
            if (data.length === 1) {
              // success
              response.writeHead(200, this.headers);
              response.write(data[0]);
              response.end();
            } else {
              // fail
              response.writeHead(204, this.headers);
              response.write(this.FAIL);
              response.end();
            }
          }
        );
      });
  },
};
