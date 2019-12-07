//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，
const typeSchema = mongoose.Schema({
    tname: {
        type: String,
        require: true
    },
    tcolor: {
        type: String,
        default: '#666'
    } // 类型名称
}, {
    collection: 'type'
})

//导出model模块
const type = module.exports = mongoose.model('type', typeSchema);