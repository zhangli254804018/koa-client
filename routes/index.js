const router = require('koa-router')()
router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async(ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async(ctx, next) => {
    ctx.body = {
        title: 'koa2 json',
        msg: "發送成功"
    }
})

router.get('/upload', async(ctx, next) => {
    const url = ctx.query.url
    const uploadNext = (result, ctx) => {
        if (result && result.hasOwnProperty('public_id')) {
            ctx.body = {
                msg: "上傳成功",
                code: 0,
                result: result
            }
        } else {
            ctx.body = {
                msg: "上傳失敗",
                code: -1
            }
        }
    }
    let result
    try {
        result = await global.cloudinary.uploader.upload(url ? url : "http://img1.tuicool.com/nUzURrB.jpg!web", function(ret) {
            console.log(ret)
            return ret
        });
    } catch (error) {}
    uploadNext(result, ctx);
})

module.exports = router