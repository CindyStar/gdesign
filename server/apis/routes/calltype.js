//引入express模块
const express = require("express");
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
            console.log(2);
            res.json(err);
        });
});

// 通过ObjectId查询单个英雄信息路由
router.get("/calltype/:id", (req, res) => {
    calltype.findById(req.params.id)
        .then(calltype => {
            res.json(calltype);
        })
        .catch(err => {
            res.json(err);
        });
});

// 添加一个英雄信息路由
router.post("/calltype", (req, res) => {
    //使用calltype model上的create方法储存数据
    calltype.create(req.query, (err, calltype) => {
        if (err) {
            res.json(err);
        } else {
            res.json(calltype);
        }
    });
});

//更新一条英雄信息数据路由
router.put("/calltype/:id", (req, res) => {
    calltype.findOneAndUpdate({
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
        .then(calltype => res.json(calltype))
        .catch(err => res.json(err));
});

//删除一条英雄信息路由
router.delete("/calltype/:id", (req, res) => {
    calltype.findOneAndRemove({
            _id: req.params.id
        })
        .then(calltype => res.send(`${calltype.title}删除成功`))
        .catch(err => res.json(err));
});

module.exports = router;