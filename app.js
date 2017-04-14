var express = require('express');
//express module을 express라는 이름의 변수로 저장

var path = require('path');
var app = express();
// express()는 express module은 함수, 생성자
// express를 사용하여 app을 생성

app.set("view engine", 'ejs');
// express에게 ejs를 view engine으로 사용할 것을 알림

app.use(express.static(path.join(__dirname, '/pzublic')));
//__dirname은 node에서 제공하는 node 파일의 경로를 담고 있는 변수

var data ={count:0};
app.get('/',function(req,res){
  data.count++;
  res.render('my_first_ejs',data);
});

app.get('/reset',function(req,res){
  data.count=0;
  res.render('my_first_ejs',data);
});

app.get('/set/count',function(req,res){
  if(req.query.count) data.count=req.query.count;
  res.render('my_first_ejs',data);
});

app.get('/set/:num',function(req,res){
  data.count = req.params.num;
  res.render('my_first_ejs',data);
});
// '/' route를 생성하고 '/'에 route에 get 신호가 오면 my_first_ejs파일을 render

/*
app.get('/',function(req,res){
  res.send('Hello World!');
});
// 서버의 root에 get요청이 왔을때 Hello World라는 신호를 클라이언트에 보내라는 명령
*/

app.listen(8080, function() {
  console.log('Server On!');
});

// app.listen 두개의 argument를 받는데
// 첫번째는 port번호, 두번째는 함수
// 8080 port를 통해 들어오는 신호를 감지하여 반응하라는 명령
