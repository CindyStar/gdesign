//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，
const commentSchema = mongoose.Schema({
    ccontent: String, // 评论内容
    ctime: Date, // 评论时间
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article',
        require: true
    }, // 所属文章
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }, // 评论发表人
}, {
    collection: 'comment'
})

//导出model模块
const comment = module.exports = mongoose.model('comment', commentSchema);