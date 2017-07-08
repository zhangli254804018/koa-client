const router = require('koa-router')()
const _ = require('lodash');
const UserController = require('../controller/UserController');

router.prefix('/users')

router.get('/', async(ctx, next) => {
    ctx.body = 'this is a users response!'
})

router.get('/register', async(ctx, next) => {
    ctx.body = await UserController.register(ctx)
})

router.get('/del', async(ctx, next) => {
    ctx.body = await UserController.deluser(ctx)
})

router.get('/login', async(ctx, next) => {

    const obj = {}
    ctx.cookies.set(
        'user',
        obj, {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date(new Date().getTime() + 1000 * 60 * 60), // cookie失效时间登錄之後的一小時
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        }
    )
})

module.exports = router