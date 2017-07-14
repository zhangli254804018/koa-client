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
            response.uid = doc.id
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
        let i = 0,
            errmsg
        const keys = _.keys(query)
        while (i >= 0 && i < keys.length) {
            errmsg = Util.vaildArticle(query[keys[i]], keys[i])
            if (errmsg) {
                i = -1
                break
            }
            i++
        }
        if (query.uid && !errmsg) {
            await articleModel.create(obj, function(err) {
                if (err) return Util.reponse(ctx, -1, '', err)
            }).then(function(doc) {
                doc.password = Util.pwdhide(doc.password)
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
    }

}

module.exports = ArticleController