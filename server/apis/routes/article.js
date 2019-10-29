//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
//引入数据模型模块
const article = require("../model/article");

// 查询所有英雄信息路由
router.get("/article", (req, res) => {
    article.find({}).populate({
            path: 'uid',
        }).populate({
            path: 'aclass',
            select: 'tname'
        })
        .sort({
            aupdatetime: -1
        }).exec((err, doc) => {
            let obj = {
                code: 200,
                data: doc,
                error: false
            }
            if (err) {
                obj.code = 500;
                obj.err = true;
                obj.data = err
            }
            res.json(obj);
        })
});
// 通过ObjectId查询单个英雄信息路由
router.get("/article/:id", (req, res) => {
    article.findById(req.params.id)
        .then(article => {
            res.json(article);
        })
        .catch(err => {
            res.json(err);
        });
});
// 通过ObjectId查询单个英雄信息路由
router.get("/article/:id", (req, res) => {
    article.findById(req.params.id)
        .then(article => {
            res.json(article);
        })
        .catch(err => {
            res.json(err);
        });
});

// 添加一个英雄信息路由
router.post("/article", urlencodedParser, (req, res) => {
    let obj = {
        code: 200,
        data: []
    }
    let data = new article(req.body);
    //使用type model上的create方法储存数据
    article.create(req.body, (err, type) => {
        if (err) {
            obj.code = 500;
            obj.error = err;
        } else {
            obj.data = type;
        }
        res.json(obj);
    });
});

//更新一条英雄信息数据路由
router.put("/article/:id", (req, res) => {
    article.findOneAndUpdate({
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
        .then(article => res.json(article))
        .catch(err => res.json(err));
});

//删除一条英雄信息路由
router.delete("/article/:id", (req, res) => {
    article.findOneAndRemove({
            _id: req.params.id
        })
        .then(article => res.send(`${article.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;