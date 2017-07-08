const _ = require('lodash');

class util {

    static query(ctx) {
        if (ctx.query) {
            return ctx.query
        } else {
            return {
                code: -1,
                msg: '錯誤'
            }
        }
    }

    static reponse(ctx, code, result, msg) {
        let reponse
        switch (code) {
            case 0:
                reponse = {
                    code: 0,
                    msg: msg ? msg : '操作成功',
                    result: result
                }
                break;
            default:
                reponse = {
                    code: -1,
                    msg: msg ? msg : '操作失敗'
                }
                break;
        }
        return reponse
    }

    static pwdhide(password) {
        return !password ? password : '******'
    }

    static uidrandom(uid) {
        return uid ? uid++ : 20017
    }

}


module.exports = util