const router = require('koa-router')()
const _ = require('lodash');
const UploadController = require('../controller/UploadController');

//制定統一的users規範
router.prefix('/upload')

//測試接口
router.get('/', async(ctx, next) => {
    ctx.body = 'this is a article response!'
})

//發佈
router.post('/post', async(ctx, next) => {
    const sussess = await UploadController.post(ctx)
    ctx.body = sussess
})

//刪除
router.post('/del', async(ctx, next) => {
    ctx.body = await UploadController.remove(ctx)
})

//更新數據
router.post('/update', async(ctx, next) => {
    ctx.body = await UploadController.update(ctx)
})


module.exports = router