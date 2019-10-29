//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，
const userSchema = mongoose.Schema({
    uname: String, // 用户名称
    upassword: {
        type: String,
        require: true
    }, // 用户密码
    uaccount: String, // 用户账号
    uphone: {
        type: Number,
        require: true
    }, // 用户手机号
    uavatar: String, // 用户头像
    utime: Date, // 用户创建时间
    ustatus: Number // 用户当前状态
}, {
    collection: 'user'
})

//导出model模块
const user = module.exports = mongoose.model('user', userSchema);