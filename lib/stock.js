const util = require('./util.js');

module.exports = {
  SUCCESS:"success",
  FAIL:"fail",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Access-Control-Allow-Headers": "*",
    /** add other headers as per requirement */
  },
  createStock: function (db, request, response) { // swagger가 없어서 현제 테스트 불가
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
            if (data === 1) {    // success
              response.writeHead(200, this.headers);
              response.write(this.SUCCESS);
              response.end();
            } else {                     // fail
              response.writeHead(204, this.headers);
              response.write(this.FAIL);
              response.end();
            }
          }
        );
      });
  },
  readStockAll: function (db, keyword, response) {
    db.query(
      `
      select id, stock_name, stock_sector
      from stock
      where id like concat('%', '${keyword}', '%') or stock_name like concat('%', '${keyword}', '%') 
      or stock_sector like concat('%', '${keyword}', '%')`,
      function (error, data) {
      console.log(JSON.stringify(data));
        if (data.length >=1) {    // success
          response.writeHead(200, this.headers);
          data = JSON.stringify(data);
          response.write(util.snakeToCamel(data));
          response.end();
        } else {                     // fail
          response.writeHead(204, this.headers);
          response.write(this.FAIL);
          response.end();
        }
      }
    );
  },
  readStockDetail: function (db, id, response) {
    let body = [];
    
    db.query(
      `
      select *
      from stock s
      where s.id='${id}'`,
      function (error, data) {
        if (data.length === 1) {    // success
          response.writeHead(200, this.headers);
          response.write(JSON.stringify(data));
          response.end();
        } else {                     // fail
          response.writeHead(204, this.headers);
          response.write(this.FAIL);
          response.end();
        }
      }
    );
  },
  updateStock: function (db, request, response) { // swagger가 없어서 현제 테스트 불가
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
            if (data === 1) {    // success
              response.writeHead(200, this.headers);
              response.write(this.SUCCESS);
              response.end();
            } else {                     // fail
              response.writeHead(204, this.headers);
              response.write(this.FAIL);
              response.end();
            }
          }
        );
      });
  },
  deleteStock: function (db, request, response) { // swagger가 없어서 현제 테스트 불가
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
          [
            body.id
          ],
          function (error, data) {
            if (data.length === 1) {    // success
              response.writeHead(200, this.headers);
              response.write(data[0]);
              response.end();
            } else {                     // fail
              response.writeHead(204, this.headers);
              response.write(this.FAIL);
              response.end();
            }
          }
        );
      });
  },
};
