const router = require('koa-router')()
const _ = require('lodash');
const ArticleController = require('../controller/ArticleController');

//制定統一的users規範
router.prefix('/article')

//測試接口
router.get('/', async(ctx, next) => {
    ctx.body = 'this is a article response!'
})

//發佈
router.post('/post', async(ctx, next) => {
    const sussess = await ArticleController.post(ctx)
    ctx.body = sussess
})

//刪除
router.post('/del', async(ctx, next) => {
    ctx.body = await ArticleController.remove(ctx)
})

//更新數據
router.post('/update', async(ctx, next) => {
    ctx.body = await ArticleController.update(ctx)
})


module.exports = router