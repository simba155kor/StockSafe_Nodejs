let url_module = require('url');
var mybatisMapper = require('mybatis-mapper');
let mysql = require('mysql');
let util = require(`./util.js`);


mybatisMapper.createMapper(['./mapper/likestock.xml']);

module.exports = {

    headers : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 days
        "Access-Control-Allow-Headers": "*",
        'Content-Type': 'application/json'
        /** add other headers as per requirement */
    },

    createLikeStock : function(db,  request, response){
        let body = [];
        request.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          body = Buffer.concat(body).toString();
          body = JSON.parse(body);
          // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
          console.log(body);
    //       db.query(`
    //   select member_name
    //   from member
    //   where id=? and member_pw=?`, [body.id, body.memberPw], function(error, data){
    //     console.log(data);
    //     console.log("!!");
    //     if(data.length === 1){
    //       console.log(data);
    //     response.writeHead(200, this.headers);
    //     response.write(data[0].member_name);
    //     response.end();
    //     }
    //     else{
    //       console.log('fail!');
    //       response.writeHead(204, this.headers);
    //       response.write("fail");
    //       response.end();
    //     }
    //        });
        });
    },

   
    readLikeStock : function(db,  request, response){
            let body = [];
            let url = request.url;
            let url_info = url_module.parse(url, true);
            request.on('data', (chunk) => {
                console.log("!!b");
                body.push(chunk);
            }).on('end', () => {
                console.log("B");


            //조회할 파라미터
            var param = {
                memberId : url_info.query.memberId
            }
            
            //질의문 형식
            var format = {language: 'sql', indent: '  '};
            var query = mybatisMapper.getStatement('LikeStockMapper', 'readLikeStock', param, format);
            //첫번째는 xml의 name값, 두번째는 해당 xml의 id값, 세번째는 파라미터, 마지막은 포맷이다.

            console.log(query);  //해당쿼리가 조합된 것을 볼 수 있다.

            console.log("!");
            db.query(query, function (error, results, fields) {  //조회
            if (error) {
                console.log(error);
            }
            console.log(results);

            response.writeHead(200, this.headers);
            var string=JSON.stringify(results);
            console.log(string);
            var string2 =util.snakeToCamel(string);
            response.write(string2);
            
            response.end();
            });
        });
    },

    deleteLikeStock : function(db,  request, response){

    },

    // login : function(db, request, response){
    
    // },

} 