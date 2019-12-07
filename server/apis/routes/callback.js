//引入express模块
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const callback = require("../model/callback");

// 查询所有英雄信息路由
router.get("/callback", (req, res) => {
    let obj = {};
    if (req.query.id) {
        obj['uid'] = mongoose.Types.ObjectId(req.query.id);
    }
    callback.find(obj)
        .populate({
            path: 'btype'
        })
        .populate('uid', {
            uname: 1,
            _id: 1,
            uavatar: 1
        })
        .sort({
            update_at: -1
        })
        .then(callbacks => {
            res.json(callbacks);
        })
        .catch(err => {
            res.json(err);
        });
});

// 添加一个英雄信息路由
router.post("/callback", urlencodedParser, (req, res) => {
    //使用callback model上的create方法储存数据
    callback.create(req.body, (err, callback) => {
        console.log(err);
        if (err) {
            res.json(err);
        } else {
            res.json(callback);
        }
    });
});

//更新一条英雄信息数据路由
router.put("/callback/:id", urlencodedParser, (req, res) => {
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
    callback.findById(query._id)
        .then(result => {
            setData = result;
            for (let i = 0; i < fields.length; i++) {
                if (fields[i] === 'uid') {} else if (setData[fields[i]] || setData[fields[i]] === '' || setData[fields[i]] === 0) {
                    setData[fields[i]] = req.body[fields[i]]
                }
            }
            setData.bprocess = 1;
            setData.bretime = Date.now;
            console.log(setData);
            callback.findOneAndUpdate(query, setData, options)
                .then(callbacks => res.json(callbacks))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

//删除一条英雄信息路由
router.delete("/callback/:id", (req, res) => {
    callback.findOneAndRemove({
            _id: mongoose.Types.ObjectId(req.params.id)
        })
        .then(callback => res.send(`删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;

module.exports = router;