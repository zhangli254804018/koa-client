const mongoose = require('mongoose')
const ArticleSchema = require('../model/ArticleModel')
const articleModel = mongoose.model('article', ArticleSchema)
const Util = require('./api/util')
const _ = require('lodash')
const md5 = require('md5')

class ArticleController {

    constructor(ctx) {
        this.ctx = ctx;
    }

    //初始化返回參數格式
    static init(doc) {
        const response = {}
        if (doc) {
            response.aid = doc.aid
            response.title = doc.title
            response.subtitle = doc.subtitle
            response.token = doc.token
            response.photo = doc.photo
            response.content = doc.content
            response.comments = doc.comments
            response.author = doc.author
            response.postTime = new Date(doc.postTime).getTime()
        }
        return response
    }

    // 發佈文章
    static async post(ctx) {
        // await ……
        const vm = this
        const query = Util.query(ctx);
        const keys = _.keys(query)
        const posted = await vm.posted(ctx)
        let i = 0,
            errmsg
        while (i >= 0 && i < keys.length) {
            errmsg = Util.vaildArticle(query[keys[i]], keys[i])
            if (errmsg) {
                i = -1
                break
            }
            i++
        }
        if (query.uid && !errmsg && !posted.result) {
            await articleModel.create(query, function(err) {
                if (err) return Util.reponse(ctx, -1, '', err)
            }).then(function(doc) {
                query.aid = doc.id
                query.token = md5(doc.id)
            })
            return await articleModel.findByIdAndUpdate(query.aid, { $set: query }, { new: true }).exec().then(function(doc) {
                return doc ? Util.reponse(ctx, 0, vm.init(doc)) : Util.reponse(ctx, -1)
            }).catch(function(err) {
                if (err) return Util.reponse(ctx, -1)
            })
        } else {
            return Util.reponse(ctx, -1, '', errmsg ? errmsg : '發布失敗')
        }
    }

    // 已發佈
    static async posted(ctx) {
        // await ……
        const vm = this
        const query = Util.query(ctx);
        const obj = {}
        if (query.aid) { obj.aid = query.aid } else {
            if (query.uid) obj.uid = query.uid
            if (query.title) obj.title = query.title
        }
        if (!_.isEmpty(obj)) {
            return await articleModel.findOne(obj, function(err) {
                if (err) return Util.reponse(ctx, -1)
            }).exec().then(function(doc) {
                return doc ? Util.reponse(ctx, 0, vm.init(doc)) : Util.reponse(ctx, -1)
            })
        } else {
            return Util.reponse(ctx, -1)
        }
    }

    // 修改編輯
    static async update(ctx) {
        // await ……
        const vm = this
        const query = Util.query(ctx);
        const posted = await vm.posted(ctx)
        const obj = {}
        const keys = _.keys(query)
        let i = 0,
            errmsg
        obj.aid = query.aid
        while (i >= 0 &&
            i < keys.length) {
            errmsg = Util.vaildArticle(query[keys[i]], keys[i])
            if (errmsg) {
                i = -1
                break
            }
            i++
        }
        if (posted.result && !errmsg && obj.aid) {
            return await articleModel.findByIdAndUpdate(obj.aid, { $set: query }, { new: true }).exec().then(function(doc) {
                return doc ? Util.reponse(ctx, 0, vm.init(doc)) : Util.reponse(ctx, -1)
            }).catch(function(err) {
                if (err) return Util.reponse(ctx, -1)
            })
        } else {
            return Util.reponse(ctx, -1)
        }
    }

    static async remove(ctx) {
        // await ……
        const vm = this
        const query = Util.query(ctx);
        const posted = await vm.posted(ctx)
        const obj = {}
        obj.aid = query.aid
        if (obj.aid) {
            return await articleModel.findOneAndRemove(obj, function(err, article) {
                if (err) return Util.reponse(ctx, -1, article, '刪除失敗')
            }).exec().then(function(doc) {
                return doc == null ? Util.reponse(ctx, 0, '', '刪除成功') : Util.reponse(ctx, -1)
            }).catch(function(err) {
                if (err) return Util.reponse(ctx, -1, '', '刪除失敗')
            })
        } else {
            return Util.reponse(ctx, -1)
        }
    }


}

module.exports = ArticleController