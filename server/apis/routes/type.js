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
const type = require("../model/type");

// 查询所有英雄信息路由
router.get("/types", (req, res) => {
    let obj = {
        code: 200,
        data: []
    }
    type.find({})
        .sort({
            update_at: -1
        })
        .then(types => {
            obj.data = types;
            res.json(obj);
        })
        .catch(err => {
            obj.code = 500;
            obj.error = err;
            res.json(obj);
        });
});

// 通过ObjectId查询单个英雄信息路由
router.get("/types/:id", (req, res) => {
    let obj = {
        code: 200,
        data: []
    }
    type.findById(mongoose.Types.ObjectId(req.params.id))
        .then(type => {
            obj.data = type;
            res.json(obj);
        })
        .catch(err => {
            obj.code = 500;
            obj.error = err;
            res.json(obj);
        });
});

// 添加一个英雄信息路由
router.post("/types", urlencodedParser, (req, res) => {
    let obj = {
        code: 200,
        data: []
    }
    //使用type model上的create方法储存数据
    type.create(req.body, (err, type) => {
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
router.put("/types/:id", urlencodedParser, (req, res) => {
    const query = {
        _id: mongoose.Types.ObjectId(req.params.id)
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
    const fields = Object.keys(req.body);
    let setData = {}
    type.findById(mongoose.Types.ObjectId(req.params.id))
        .then(result => {
            console.log(result)
            setData = result;
            for (let i = 0; i < fields.length; i++) {
                if (setData[fields[i]] || setData[fields[i]] === '') {
                    setData[fields[i]] = req.body[fields[i]]
                }
            }
            type.findOneAndUpdate(query, setData, options)
                .then(type => {
                    obj.data = type;
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
        .catch(err => {
            console.log(err)
            obj.code = 500;
            obj.data = err;
            obj.error = true;
            res.json(obj);
        });
});

//删除一条英雄信息路由
router.delete("/types/:id", (req, res) => {
    type.findOneAndRemove({
            _id: mongoose.Types.ObjectId(req.params.id)
        })
        .then(type => res.send(`删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;