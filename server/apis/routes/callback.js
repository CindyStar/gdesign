//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const callback = require("../model/callback");

// 查询所有英雄信息路由
router.get("/callback", (req, res) => {
    callback.find({})
        .sort({
            update_at: -1
        })
        .then(callbacks => {
            res.json(callbacks);
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
});

// 通过ObjectId查询单个英雄信息路由
router.get("/callback/:id", (req, res) => {
    callback.findById(req.params.id)
        .then(callback => {
            res.json(callback);
        })
        .catch(err => {
            res.json(err);
        });
});

// 添加一个英雄信息路由
router.post("/callback", (req, res) => {
    //使用callback model上的create方法储存数据
    callback.create(req.query, (err, callback) => {
        if (err) {
            res.json(err);
        } else {
            res.json(callback);
        }
    });
});

//更新一条英雄信息数据路由
router.put("/callback/:id", (req, res) => {
    callback.findOneAndUpdate({
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
        .then(callback => res.json(callback))
        .catch(err => res.json(err));
});

//删除一条英雄信息路由
router.delete("/callback/:id", (req, res) => {
    callback.findOneAndRemove({
            _id: req.params.id
        })
        .then(callback => res.send(`${callback.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;