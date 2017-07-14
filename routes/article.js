const router = require('koa-router')()
const _ = require('lodash');
const ArticleController = require('../controller/ArticleController');

//制定統一的users規範
router.prefix('/article')

//測試接口
router.get('/', async(ctx, next) => {
    ctx.body = 'this is a article response!'
})

//註冊
router.get('/post', async(ctx, next) => {
    const sussess = await ArticleController.post(ctx)
    ctx.body = sussess
})

module.exports = router