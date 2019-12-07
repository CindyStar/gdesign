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
const calltype = require("../model/calltype");

// 查询所有英雄信息路由
router.get("/calltype", (req, res) => {
    calltype.find({})
        .sort({
            update_at: -1
        })
        .then(calltypes => {
            res.json(calltypes);
        })
        .catch(err => {
            res.json(err);
        });
});

// 添加一个英雄信息路由
router.post("/calltype", urlencodedParser, (req, res) => {
    //使用calltype model上的create方法储存数据
    calltype.create(req.body, (err, calltype) => {
        if (err) {
            res.json(err);
        } else {
            res.json(calltype);
        }
    });
});

//更新一条英雄信息数据路由
router.put("/calltype/:id", urlencodedParser, (req, res) => {
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
    calltype.findById(query._id)
        .then(result => {
            setData = result;
            for (let i = 0; i < fields.length; i++) {
                if (setData[fields[i]] || setData[fields[i]] === '' || setData[fields[i]] === 0) {
                    setData[fields[i]] = req.body[fields[i]]
                }
            }
            calltype.findOneAndUpdate(query, setData, options)
                .then(calltypes => res.json(calltypes))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

//删除一条英雄信息路由
router.delete("/calltype/:id", (req, res) => {
    calltype.findOneAndRemove({
            _id: mongoose.Types.ObjectId(req.params.id)
        })
        .then(calltype => res.send(`删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;