module.exports = {

    headers : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 days
        "Access-Control-Allow-Headers": "*"
        /** add other headers as per requirement */
    },

    login : function(db, request, response){
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
        response.writeHead(200, this.headers);
        response.write(data[0].member_name);
        response.end();
        }
        else{
          console.log('fail!');
          response.writeHead(204, this.headers);
          response.write("fail");
          response.end();
        }
           });
        });
    },

} 