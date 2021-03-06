let url_module = require("url");
var mybatisMapper = require("mybatis-mapper");
// let mysql = require('mysql');
let util = require(`./util.js`);

mybatisMapper.createMapper(["./mapper/member.xml"]);

module.exports = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Access-Control-Allow-Headers": "*",
  },

  createMember: function (db, request, response) {
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
          "MemberMapper",
          "createMember",
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

  readMemberAll: function (db, request, response) {},
  // <select id="readMemberAll">
  // 	select *
  // 	from member
  // 	<if test="key == 'id'">
  // 			where id like concat('%', #{word}, '%')
  // 	</if>
  // 	<if test="key == 'member_name'">
  // 			where member_name like concat('%', #{word}, '%')
  // 	</if>
  // 	<if test="key == 'member_email_domain'">
  // 			where member_email_domain like concat('%', #{word}, '%')
  // 	</if>
  // </select>

  readMember: function (db, request, response) {
    let body = [];
    let url = request.url;
    let url_info = url_module.parse(url, true);
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        //조회할 파라미터
        var param = {
          id: url_info.query.id,
        };

        //질의문 형식
        var format = { language: "sql", indent: "  " };
        var query = mybatisMapper.getStatement(
          "MemberMapper",
          "readMember",
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
          var string = JSON.stringify(results[0]);
          var string2 = util.snakeToCamel(string);
          response.write(string2);

          response.end();
        });
      });
  },

  loginMember: function (db, request, response) {
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
          "MemberMapper",
          "loginMember",
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
          response.write(results[0].member_name);

          response.end();
        });
      });
  },

  updateMember: function (db, request, response) {
    let body = [];
    request
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = JSON.parse(body);

        var param = body;

        //질의문 형식
        var format = { language: "sql", indent: "  " };
        var query = mybatisMapper.getStatement(
          "MemberMapper",
          "updateMember",
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

  deleteMember: function (db, request, response) {},
};
