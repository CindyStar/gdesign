//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，
const userSchema = mongoose.Schema({
    uname: String, // 用户名称
    upassword: {
        type: String,
        require: true
    }, // 用户密码
    uaccount: {
        type: String,
        Unique: true,
        require: true
    }, // 用户账号
    uphone: {
        type: Number,
        Unique: true,
        require: true
    }, // 用户手机号
    uavatar: {
        type: String,
        default: ''
    }, // 用户头像
    utime: {
        type: Date,
        default: Date.now
    }, // 用户创建时间
    Jurisdiction: {
        type: Number,
        default: 0
    }, // 用户权限,0位普通用户,1为管理员
    ustatus: {
        type: Number,
        default: 0
    } // 用户当前状态
}, {
    collection: 'user'
})

//导出model模块
const user = module.exports = mongoose.model('user', userSchema);