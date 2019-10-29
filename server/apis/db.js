var mongoose = require("mongoose"); //引入mongoose
var dbadress = require("./config/db");
var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
    
});
mongoose.connect("mongodb://admin:Xk19941026@39.105.69.187:27899/simplemind"); //连接到mongoDB的todo数据库

module.exports = mongoose;