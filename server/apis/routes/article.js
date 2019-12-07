//引入express模块
const express = require("express");
const mongoose = require('mongoose');
//定义路由级中间件
const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
//引入数据模型模块
const article = require("../model/article");
router.get('/article/search', (req, res) => {
    let keyword = req.query.keyword;
    article.find({
        atitle: {
            $regex: keyword
        }
    }).then(result => {
        res.json(result)
    }).catch(error => {
        console.log(error);
        res.json(error);
    })
})
// 查询所有英雄信息路由
router.get("/article", (req, res) => {
    let query = req.query;
    let size = req.query.pageSize || null;
    let index = req.query.pageIndex || 0;
    let sum = size * (index - 1);
    delete query['uid'];
    delete query['pageSize'];
    delete query['pageIndex'];
    if (query['_id']) {
        query['uid'] = mongoose.Types.ObjectId(query['_id']);
        delete query['_id'];
    }
    console.log(query);
    article.find(query).populate({
            path: 'uid',
            select: 'uname _id uavatar'
        }).populate({
            path: 'aclass'
        })
        .sort({
            aupdatetime: -1
        })
        .limit(size)
        .skip(sum)
        .exec((err, doc) => {
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
    let obj = {
        code: 200,
        data: null,
        error: false
    }
    article.findById(req.params.id).populate({
            path: 'uid',
        }).populate({
            path: 'aclass'
        })
        .then(resinfo => {
            obj.data = resinfo;
            article.find({
                    uid: resinfo['uid']['_id']
                }).sort({
                    aupdatetime: -1
                }).limit(5)
                .then(articles => {
                    obj.articles = articles;
                    res.json(obj);
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        code: 500,
                        data: err
                    });
                });
        })
        .catch(err => {
            console.log(err);
            obj.data = err;
            obj.code = 500;
            obj.error = true;
            res.json(obj);
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
    const query = {
        _id: mongoose.Types.ObjectId(req.body.uid)
    };
    const options = {
        upsert: true,
        new: true
    };
    const obj = {
        code: 200,
        data: null,
        error: false
    }
    let setData = {};
    let fields = Object.keys(req.body);
    article.findById(mongoose.Types.ObjectId(req.params.id))
        .then(res => {
            setData = res;
            for (let i = 0; i < fields.length; i++) {
                if (setData[fields[i]]) {
                    setData[fields[i]] = req.body[fields[i]]
                }
            }
            article.findOneAndUpdate(query, setData, options)
                .then(article => {
                    obj.data = article;
                    res.json(obj);
                })
                .catch(err => {
                    console.log(err)
                    obj.code = 500;
                    obj.data = err;
                    obj.error = true;
                    res.json(obj);
                });
        })
        .catch(res => {
            obj.code = 500;
            obj.data = err;
            obj.error = true;
            res.json(obj);
        })
});

//删除一条英雄信息路由
router.delete("/article/:id", (req, res) => {
    article.findOneAndRemove({
            _id: mongoose.Types.ObjectId(req.params.id)
        })
        .then(article => res.json({
            code: 200,
            msg: `${article.title}删除成功`
        }))
        .catch(err => res.json(err));
});

module.exports = router;