const _ = require('lodash');

class util {

    static query(ctx) {
        if (!_.isEmpty(ctx.request)) {
            return (ctx.request.method == 'POST') ? ctx.request.body : ctx.query;
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
        return uid ? uid : 20017
    }

    static vaildUser(value, type) {
        const vaild = {
            mobile: /[1]\d{10}/,
            email: /(.)(\.)(com|net|cn|online)/,
            password: /\w{6,20}/,
            name: /(\w)|(\W)/
        }
        const tips = {
            mobile: '手機格式錯誤（請輸入11位合法的手機號）',
            email: '郵箱格式錯誤',
            password: '密碼格式錯誤請（輸入字母或者數字6-20位）',
            name: '用戶名格式錯誤'
        }
        if (value && value.match(vaild[type]) || !vaild[type]) {
            return false
        } else {
            return tips[type] ? tips[type] : '請求錯誤'
        }
    }

    static vaildArticle(value, type) {
        const vaild = {
            title: /.{1,30}/,
            subtitle: /.{1,60}/,
            author: /.{1,30}/
        }
        const tips = {
            title: '標題不合法',
            email: '副標題不合法'
        }
        if (value && value.match(vaild[type]) || !vaild[type]) {
            return false
        } else {
            return tips[type] ? tips[type] : '請求錯誤'
        }
    }

    // 解析上下文里node原生请求的POST参数
    static parsePostData(ctx) {
        const vm = this
        return new Promise((resolve, reject) => {
            try {
                let postdata = "";
                ctx.req.addListener('data', (data) => {
                    postdata += data
                })
                ctx.req.addListener("end", function() {
                    let parseData = vm.parseQueryStr(postdata)
                    resolve(parseData)
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    // 将POST请求参数字符串解析成JSON
    static parseQueryStr(queryStr) {
        let queryData = {}
        let queryStrList = queryStr.split('&')
        console.log(queryStrList)
        for (let [index, queryStr] of queryStrList.entries()) {
            let itemList = queryStr.split('=')
            queryData[itemList[0]] = decodeURIComponent(itemList[1])
        }
        return queryData
    }

}


module.exports = util