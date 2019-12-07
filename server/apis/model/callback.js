//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，
const callbackSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }, // 反馈用户
    bcontent: {
        type: String,
        require: true
    }, // 反馈内容
    btype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'calltype',
        require: true
    }, // 所属类别
    bprocess: {
        type: Number,
        default: 0
    }, // 处理进度
    breplay: {
        type: String,
        default: '待回复'
    }, // 回复内容
    bretime: {
        type: Date,
        default: Date.now
    }, // 回复时间
    btime: {
        type: Date,
        default: Date.now
    } // 提交时间
}, {
    collection: 'callback'
})

//导出model模块
const callback = module.exports = mongoose.model('callback', callbackSchema);