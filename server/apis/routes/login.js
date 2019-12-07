//引入express模块
const express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
//定义路由级中间件
const router = express.Router();

// 通过account来对比密码
router.post("/login", urlencodedParser,(req, res) => {
    console.log(req.body);
    const obj = req.body;
    
});

// 添加一个注册信息路由
router.post("/register", (req, res) => {
    let obj = req.query;
    if (!obj.upassword || !obj.uphone) {
        res.json({
            "code": 100, // 0 表示成功
            "errors": "手机号或密码不能为空"
        });
        return
    }
    if (!obj.uaccount) {
        obj.uaccount = obj.uphone;
    }
    if (!obj.uavatar) {
        obj.uavatar = '';
    }
    obj.utime = new Date();
    obj.ustatus = 0;
    //使用user model上的create方法储存数据
    user.create(obj, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
});

module.exports = router;