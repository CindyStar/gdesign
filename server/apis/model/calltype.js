//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，
const calltypeSchema = mongoose.Schema({
    btypename: {
        type: String,
        require: true
    }, // 类型名称
}, {
    collection: 'calltype'
})

//导出model模块
const calltype = module.exports = mongoose.model('calltype', calltypeSchema);