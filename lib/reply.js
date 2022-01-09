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
  
  createReply: function (db, request, response) {
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
          insert into reply(stock_id, reply_content, member_id, reply_level, reply_parent)
          values(?, ?, ?, ?, ?)`,
          [
            body.stockId,
            body.replyContent,
            body.memberId,
            body.replyLevel,
            body.replyParent,
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
  readAllReply: function (db, request, response) {
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
          select *
          from reply
          where stock_id=?
          order by id DESC
          limit 10`,
          [
            body.stockId,
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
  updateReply: function (db, request, response) { // swagger없어서 테스트 불가
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
          update reply 
          set reply_content=?
          where id=? and member_id=?`,
          [
            body.replyContent,
            body.id, 
            body.memberId,
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
  deleteReply: function (db, request, response) { // swagger없어서 테스트 불가
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
          delete from reply
          where id=? and member_id=?`,
          [
            body.id, 
            body.memberId,
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

};
