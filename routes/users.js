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
    const sussess = await UserController.register(ctx)
    ctx.body = sussess
})

//刪除
router.get('/del', async(ctx, next) => {
    ctx.body = await UserController.deluser(ctx)
})

//登錄
router.get('/login', async(ctx, next) => {
    const uid = ctx.cookies.get('uid')
    if (uid) ctx.query.uid = uid
    const obj = uid ? await UserController.login(ctx) : await UserController.login2(ctx)
    ctx.body = obj
})


//更新
router.get('/update', async(ctx, next) => {
    const response = await UserController.update(ctx)
    ctx.body = response
})

module.exports = router