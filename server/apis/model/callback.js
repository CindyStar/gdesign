//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，
const callbackSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }, // 反馈用户
    bcontent: String, // 反馈内容
    btype: Number, // 所属类别
    bprocess: Number, // 处理进度
    breplay: String, // 回复内容
    bretime: Date, // 回复时间
    btime: Date // 提交时间
}, {
    collection: 'callback'
})

//导出model模块
const callback = module.exports = mongoose.model('callback', callbackSchema);