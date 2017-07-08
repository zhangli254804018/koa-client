const mongoose = require('mongoose')
const userSchema = require('../model/UserModel')
const userModel = mongoose.model('user', userSchema);
const Util = require('./api/util');
const _ = require('lodash')

class UserController {

    constructor(ctx) {
        this.ctx = ctx;
    }

    // 用户注册
    static async register(ctx) {
        // await ……
        const query = Util.query(ctx);
        const obj = {};
        obj.email = query.email;
        obj.password = query.password;
        const login = await this.login(ctx);
        if (query.email && query.password && !login) {
            return await userModel.create(obj, function(err) {
                if (err) return Util.reponse(ctx, -1);
            }).then(function(doc) {
                doc.password = Util.pwdhide(doc.password)
                doc.uid = Util.uidrandom(doc.uid)
                return Util.reponse(ctx, 0, doc)
            })
        } else {
            return Util.reponse(ctx, -1, '', '註冊失敗')
        }
    }

    // 用户登录
    static async login(ctx) {
        // await ……
        const query = Util.query(ctx);
        const obj = {};
        obj.email = query.email;
        if (query.email) {
            return await userModel.findOne(obj, 'users', function(err) {
                if (err) return false;
            }).exec().then(function(doc) {
                return doc
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
    static async put(ctx) {
        // await ……
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