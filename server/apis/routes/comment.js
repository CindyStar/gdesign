//引入express模块
const express = require("express");
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const comment = require("../model/comment");

// 查询所有英雄信息路由
router.get("/comment", (req, res) => {
    comment.find({})
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
});

// 通过ObjectId查询单个英雄信息路由
router.get("/comment/:id", (req, res) => {
    let obj = {
        code: 200,
        data: null,
        error: false
    }
    comment.find({
        aid: req.params.id
    }).populate({
        path: 'uid',
        select: 'uname -_id uavatar'
    }).sort({
        ctime: -1
    }).then(comments => {
        obj.data = comments;
        res.json(obj);
    }).catch(err => {
        obj.code = 500;
        obj.data = err;
        obj.error = true;
        res.json(obj);
    });
});

// 添加一个英雄信息路由
router.post("/comment", urlencodedParser, (req, res) => {
    let obj = {
        code: 200,
        data: null,
        error: false
    }
    //使用comment model上的create方法储存数据
    comment.create(req.body, (err, datas) => {
        if (err) {
            obj.code = 500;
            obj.data = err;
            obj.error = true;
            res.json(obj);
        } else {
            res.json(obj);
        }
    });
});

//更新一条英雄信息数据路由
router.put("/comment/:id", (req, res) => {
    comment.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                uname: req.query.uname,
                upassword: req.query.upassword,
                uaccount: req.query.uaccount,
                uphone: req.query.uphone,
                uavatar: req.query.uavatar,
                utime: req.query.utime,
                ustatus: req.query.ustatus
            }
        }, {
            new: true
        })
        .then(comment => res.json(comment))
        .catch(err => res.json(err));
});

//删除一条英雄信息路由
router.delete("/comment/:id", (req, res) => {
    comment.findOneAndRemove({
            _id: req.params.id
        })
        .then(comment => res.send(`${comment.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;