const router = require('koa-router')()
const _ = require('lodash');
const UserController = require('../controller/UserController');

//制定統一的users規範
router.prefix('/users')

//測試接口
router.get('/', async(ctx, next) => {
    ctx.body = 'this is a users response!'
})

//註冊
router.get('/register', async(ctx, next) => {
    ctx.body = await UserController.register(ctx)
})

//刪除
router.get('/del', async(ctx, next) => {
    ctx.body = await UserController.deluser(ctx)
})

//登錄
router.get('/login', async(ctx, next) => {
    const obj = await UserController.login(ctx)
    const cid = ctx.cookies.get('uid');
    ctx.cookies.set(
        'uid',
        '333', {
            domain: '', // 写cookie所在的域名
            path: '', // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: Date.now() + 1000 * 60 * 60, // cookie失效时间
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        }
    )
    ctx.body = obj
})


//更新
router.get('/update', async(ctx, next) => {
    const response = await UserController.update(ctx)
    ctx.body = response
})





module.exports = router