const mongoose = require('mongoose')
const userSchema = require('../model/UserModel')
const userModel = mongoose.model('user', userSchema)
const Util = require('./api/util')
const _ = require('lodash')
const md5 = require('md5')

class UserController {

    constructor(ctx) {
        this.ctx = ctx;
    }

    static cookie(ctx, uid) {
        ctx.cookies.set(
            'uid', uid, {
                domain: '', // 写cookie所在的域名
                path: '', // 写cookie所在的路径
                maxAge: 10 * 60 * 1000, // cookie有效时长
                expires: _.now() + 1000 * 60 * 60, // cookie失效时间
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false // 是否允许重写
            }
        )
    }

    static init(doc) {
        const response = {}
        if (doc) {
            response.uid = doc.id
            response.name = doc.name
            response.email = doc.email
            response.mobile = doc.mobile
            response.token = doc.token
            response.password = Util.pwdhide(doc.password)
            response.serverTime = new Date(doc.serverTime).getTime()
        }
        return response
    }

    // 用户注册
    static async register(ctx) {
        // await ……
        const vm = this
        const query = Util.query(ctx);
        const obj = {};
        const login = await this.login(ctx);
        obj.email = query.email;
        obj.password = query.password;
        let i = 0,
            errmsg
        const keys = _.keys(query)
        while (i >= 0 && i < keys.length) {
            errmsg = Util.vaildUser(query[keys[i]], keys[i])
            if (errmsg) {
                i = -1
                break
            }
            i++
        }
        if (query.email && query.password && !login.result && !errmsg) {
            await userModel.create(obj, function(err) {
                if (err) return Util.reponse(ctx, -1, '', err)
            }).then(function(doc) {
                doc.password = Util.pwdhide(doc.password)
                query.uid = doc.id
                query.token = md5(doc.id)
            })
            return await userModel.findByIdAndUpdate(query.uid, { $set: query }, { new: true }).exec().then(function(doc) {
                vm.cookie(ctx, query.uid)
                return doc ? Util.reponse(ctx, 0, vm.init(doc)) : Util.reponse(ctx, -1)
            }).catch(function(err) {
                if (err) return Util.reponse(ctx, -1)
            })
        } else {
            return Util.reponse(ctx, -1, '', errmsg ? errmsg : '註冊失敗')
        }
    }

    static async login2(ctx) {
        // await ……
        const query = Util.query(ctx);
        const obj = {};
        const vm = this
        obj.email = query.email
        obj.password = query.password
        if (query.email) {
            return await userModel.findOne(obj, function(err) {
                if (err) return Util.reponse(ctx, -1)
            }).exec().then(function(doc) {
                if (doc) {
                    vm.cookie(ctx, doc.id)
                }
                return doc ? Util.reponse(ctx, 0, vm.init(doc)) : Util.reponse(ctx, -1, '', '登陸失敗(賬號或密碼錯誤)')
            })
        } else {
            return Util.reponse(ctx, -1, '', '登陸失敗(賬號或密碼錯誤)')
        }
    }

    // 用户登录
    static async login(ctx) {
        // await ……
        const query = Util.query(ctx);
        const obj = {};
        const vm = this
        if (query.email) obj.email = query.email
        if (query.uid) obj.uid = query.uid
        if (query.email || query.uid) {
            return await userModel.findOne(obj, function(err) {
                if (err) return Util.reponse(ctx, -1)
            }).exec().then(function(doc) {
                return doc ? Util.reponse(ctx, 0, vm.init(doc)) : Util.reponse(ctx, -1)
            })
        } else {
            return Util.reponse(ctx, -1)
        }
    }

    // 用户退出
    static async logout(ctx) {
        // await ……
    }

    // 更新用户资料
    static async update(ctx) {
        // await ……
        let i = 0,
            errmsg,
            updated
        const vm = this
        const obj = {}
        const query = Util.query(ctx);
        const keys = _.keys(query)
        while (i >= 0 && i < keys.length) {
            errmsg = Util.vaildUser(query[keys[i]], keys[i])
            if (errmsg) {
                i = -1
                break
            }
            i++
        }
        const login = await this.login(ctx)
        if (login.result && !errmsg) {
            return await userModel.findByIdAndUpdate(login.result.uid, { $set: query }, { new: true }).exec().then(function(doc) {
                return doc ? Util.reponse(ctx, 0, vm.init(doc)) : Util.reponse(ctx, -1)
            }).catch(function(err) {
                if (err) return Util.reponse(ctx, -1)
            })
        } else {
            return Util.reponse(ctx, -1, '', errmsg)
        }
    }

    // 删除用户
    static async deluser(ctx) {
        // await ……
        const query = Util.query(ctx);
        const obj = {};
        const login = await this.login(ctx);
        obj.email = query.email;
        if (!_.isEmpty(query) && login) {
            try {
                userModel.remove(obj, 'users', function(err, doc) {
                    if (err) return Util.reponse(ctx, -1, doc, '刪除失敗')
                    return Util.reponse(ctx, 0, doc, '刪除成功')
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            return Util.reponse(ctx, -1)
        }
    }

    // 重置密码
    static async resetpwd(ctx) {
        // await ……

    }

}

module.exports = UserController