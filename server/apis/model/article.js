//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，
const articleSchema = mongoose.Schema({
    atitle: {
        type: String,
        require: true
    }, // 文章标题
    abstract: {
        type: String,
        require: true
    }, // 内容简介
    acontent: {
        type: String,
        require: true
    }, // 文章内容
    markdown: {
        type: String,
        require: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }, // 作者id
    aavatar: {
        type: String,
        default: ''
    }, // 文章头图
    acollect: {
        type: Number,
        default: 0
    }, // 点赞数量
    abrower: {
        type: Number,
        default: 0
    }, // 浏览量
    aclass: {
        type: mongoose.Schema.Types.ObjectId,
        default: '5da7269531a7644dd49bfe8a',
        ref: 'type',
        require: true
    }, // 所属类型
    astartime: {
        type: Date,
        default: Date.now
    }, // 文章发布时间
    aupdatetime: {
        type: Date,
        default: Date.now
    }, // 文章修改时间
    apublic: Boolean // 文章是否公开
}, {
    collection: 'article'
})

//导出model模块
const article = module.exports = mongoose.model('article', articleSchema);