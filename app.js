var express = require('express');
//express module을 express라는 이름의 변수로 저장
var path = require('path');
var app = express();
// express()는 express module은 함수, 생성자
// express를 사용하여 app을 생성
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

mongoose.connect("mongodb://admin:1234@cluster0-shard-00-00-tvgvc.mongodb.net:27017,cluster0-shard-00-01-tvgvc.mongodb.net:27017,cluster0-shard-00-02-tvgvc.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");
var db = mongoose.connection;
db.once("open", function (){
console.log("DB connected!");
});

db.on("error", function(err){
  console.log("DB ERROR :", err);
});

var dataSchema = mongoose.Schema({
  name:String,
  count:Number
}); //mongoose.Schema()함수는 object를 인자로 받아 object를 스키마로 만든다. (이름:타입,이름:타입)

app.set("view engine", 'ejs');
// express에게 ejs를 view engine으로 사용할 것을 알림
app.use(express.static(path.join(__dirname, '/views')));
//__dirname은 node에서 제공하는 node 파일의 경로를 담고 있는 변수

var Data = mongoose.model('data',dataSchema);

app.get('/',function(req,res){
Data.findOne({name:"myData"}, function(err,data){ // 모델을 담는 변수는 대문자
  if(err) return console.log("Data ERROR:",err);
  data.count++;
  data.save(function (err){
    if(err) return console.log("Data ERROR:",err);
    res.render('my_first_ejs',data);
    });
  });
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

function setCounter(res,num) {
  console.log("setCounter");
  Data.findOne({name:"myData"}, function(err,data){ // 모델을 담는 변수는 대문자
    if(err) return console.log("Data ERROR:",err);
    data.count=num;
    data.save(function (err){
      if(err) return console.log("Data ERROR:",err);
      res.render('my_first_ejs',data);
      });
    });
}

function getCounter(res) {
  console.log("getCounter");
  Data.findOne({name:"myData"}, function(err,data){ // 모델을 담는 변수는 대문자
    if(err) return console.log("Data ERROR:",err);
    res.render('my_first_ejs',data);
    });
}


app.listen(8080, function() {
  console.log('Server On!');
});

// app.listen 두개의 argument를 받는데
// 첫번째는 port번호, 두번째는 함수
// 8080 port를 통해 들어오는 신호를 감지하여 반응하라는 명령
