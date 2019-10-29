//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const user = require("../model/user");

// 查询所有英雄信息路由
router.get("/user", (req, res) => {
  user.find({})
    .sort({
      update_at: -1
    })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json(err);
    });
});

// 通过ObjectId查询单个英雄信息路由
router.get("/user/:id", (req, res) => {
  user.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

// 添加一个英雄信息路由
router.post("/user", (req, res) => {
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

//更新一条英雄信息数据路由
router.put("/user/:id", (req, res) => {
  user.findOneAndUpdate({
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
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// 更新头像接口
router.put("/uavatar/:id", (req, res) => {
  user.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        uavatar: req.query.uavatar
      }
    }, {
      new: true
    })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

//删除一条英雄信息路由
router.delete("/user/:id", (req, res) => {
  user.findOneAndRemove({
      _id: req.params.id
    })
    .then(user => res.send(`${user.title}删除成功`))
    .catch(err => res.json(err));
});

module.exports = router;