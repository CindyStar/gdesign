//引入express模块
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const formidable = require("formidable");
const fs = require("fs");
//定义路由级中间件
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});
const router = express.Router();
//引入数据模型模块
const user = require("../model/user");
// 通过ObjectId查询单个英雄信息路由
router.get("/password/:id", (req, res) => {
  const resmsg = {
    code: 200,
    data: null
  }
  user.findById(req.params.id, {
      upassword: 1
    })
    .then(user => {
      resmsg.data = user;
      res.json(resmsg);
    })
    .catch(err => {
      resmsg.error = true;
      resmsg.code = 500;
      resmsg.data = err;
      res.json(resmsg);
    });
});
// 通过account来对比密码
router.post("/login", urlencodedParser, (req, res) => {
  const obj = req.body;
  const resmsg = {
    code: 200,
    data: null
  }
  user.find({
      uaccount: obj.uaccount
    })
    .then(user => {
      if (user[0] && obj.upassword === user[0].upassword) {
        resmsg.data = user[0];
        resmsg.data.upassword = '**********';
      } else {
        resmsg.code = 500;
        resmsg.data = '密码错误';
      }
      res.json(resmsg);
    })
    .catch(err => {
      res.json({
        code: 500,
        data: err
      });
    });
});
router.get("/register/uphone/:id", urlencodedParser, (req, res) => {
  let obj = {
    uphone: req.params.id
  };
  const resmsg = {
    code: 200,
    data: null,
    error: false
  }
  user.find(obj).then(result => {
    if (result.length === 0) {
      resmsg.data = true;
    } else {
      resmsg.code = 500;
      resmsg.data = false;
      resmsg.error = "手机号已注册!请更换手机号!";
    }
    res.json(resmsg);
  }).catch(err => {
    console.log(err);
    resmsg.code = 500;
    resmsg.data = false;
    resmsg.error = err;
    res.json(resmsg);
  })
});
router.get("/register/uaccount/:id", urlencodedParser, (req, res) => {
  let obj = {
    uaccount: req.params.id
  };
  const resmsg = {
    code: 200,
    data: null,
    error: false
  }
  user.find(obj).then(result => {
    console.log(result.length)
    if (result.length === 0) {
      resmsg.data = true;
    } else {
      resmsg.code = 500;
      resmsg.data = false;
      resmsg.error = "此账号已存在,请勿重复注册!";
    }
    res.json(resmsg);
  }).catch(err => {
    console.log(err);
    resmsg.code = 500;
    resmsg.data = false;
    resmsg.error = err;
    res.json(resmsg);
  })
});
router.get("/register/uname/:id", urlencodedParser, (req, res) => {
  let obj = {
    uname: req.params.id
  };
  const resmsg = {
    code: 200,
    data: null,
    error: false
  }
  user.find(obj).then(result => {
    console.log(result.length)
    if (result.length === 0) {
      resmsg.data = true;
    } else {
      resmsg.code = 500;
      resmsg.data = false;
      resmsg.error = "此昵称已存在,请勿重复注册!";
    }
    res.json(resmsg);
  }).catch(err => {
    console.log(err);
    resmsg.code = 500;
    resmsg.data = false;
    resmsg.error = err;
    res.json(resmsg);
  })
});
// 添加一个注册信息路由
router.post("/register", urlencodedParser, (req, res) => {
  let obj = req.body;
  const resmsg = {
    code: 200,
    data: null,
    error: false
  }
  //使用user model上的create方法储存数据
  user.create(obj, (err, user) => {
    if (err) {
      resmsg.data = err;
      resmsg.code = 500;
      resmsg.error = err;
      res.json(resmsg);
    } else {
      res.json(resmsg);
    }
  });
});

router.get("/getUserId/:account", (req, res) => {
  const resmsg = {
    code: 200,
    data: null
  }
  user.find({
      uaccount: req.params.account
    })
    .then(result => {
      if (result.length > 0) {
        resmsg.data = result[0]._id;
      }
      res.json(resmsg);
    })
    .catch(err => {
      resmsg.error = true;
      resmsg.code = 500;
      resmsg.data = err;
      res.json(resmsg);
    });
})
router.get("/getPassword/:password", (req, res) => {
  const resmsg = {
    code: 200,
    data: null
  }
  user.findById(mongoose.Types.ObjectId(req.query._id), {
      upassword: 1
    })
    .then(result => {
      resmsg.data = result.upassword === req.params.password;
      res.json(resmsg);
    })
    .catch(err => {
      resmsg.error = true;
      resmsg.code = 500;
      resmsg.data = err;
      res.json(resmsg);
    });
})
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
  const resmsg = {
    code: 200,
    data: null
  }
  user.findById(req.params.id, {
      upassword: 0
    })
    .then(user => {
      resmsg.data = user;
      res.json(resmsg);
    })
    .catch(err => {
      resmsg.error = true;
      resmsg.code = 500;
      resmsg.data = err;
      res.json(resmsg);
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
router.put("/user/:id", urlencodedParser, (req, res) => {
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
  user.findById(mongoose.Types.ObjectId(req.params.id))
    .then(result => {
      setData = result;
      for (let i = 0; i < fields.length; i++) {
        if (setData[fields[i]] || setData[fields[i]] === '' || setData[fields[i]] === 0) {
          setData[fields[i]] = req.body[fields[i]]
        }
      }
      user.findOneAndUpdate(query, setData, options)
        .then(user => {
          obj.data = user;
          obj.data.upassword = '**********';
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
      obj.code = 500;
      obj.data = err;
      obj.error = true;
      res.json(obj);
    });
});

// 更新头像接口
router.post("/uavatar/:id", (req, res) => {
  const uploadpath = 'public/upload/';
  const form = new formidable.IncomingForm();
  const obj = {
    code: 200,
    data: null,
    error: false
  }
  form.parse(req, function (error, fields, files) {
    const name = uploadpath + new Date().getTime() + '.jpg';
    const result = fs.writeFileSync(name, fs.readFileSync(files.uavatar.path));
    if (!result) {
      obj.data = name;
    } else {
      obj.code = 500;
      obj.data = result;
      obj.error = true;
    }
    res.json(obj);
  });
})
//删除一条英雄信息路由
router.delete("/user/:id", (req, res) => {
  user.findOneAndRemove({
      _id: req.params.id
    })
    .then(user => res.send(`${user.title}删除成功`))
    .catch(err => res.json(err));
});

module.exports = router;