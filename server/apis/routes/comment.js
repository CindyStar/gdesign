//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const comment = require("../model/comment");

// 查询所有英雄信息路由
router.get("/comment", (req, res) => {
    comment.find({})
        .sort({
            update_at: -1
        })
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
    comment.findById(req.params.id)
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            res.json(err);
        });
});

// 添加一个英雄信息路由
router.post("/comment", (req, res) => {
    //使用comment model上的create方法储存数据
    comment.create(req.query, (err, comment) => {
        if (err) {
            res.json(err);
        } else {
            res.json(comment);
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