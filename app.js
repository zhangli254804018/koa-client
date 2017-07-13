const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const index = require('./routes/index')
const users = require('./routes/users')
const article = require('./routes/article')
const jsonp = require('koa-jsonp')
const cloudinary = global.cloudinary = require('cloudinary')
const mongoose = require('mongoose')
const options = {
    db: { koa2: true },
    server: { poolSize: 4 },
    replset: { rs_name: 'myReplicaSetName' },
    user: 'zhangli',
    pass: '12345678'
}
options.server.socketOptions = options.replset.socketOptions = { keepAlive: 120 }
options.server.reconnectTries = options.replset.socketOptions = { reconnectTries: 30000 }

// error handler
onerror(app)

const connection = mongoose.connect('mongodb://104.160.38.174:27017/koa2', options)

const db = mongoose.connection
db.on('error', console.error.bind(console, '鏈接失敗'))
db.once('open', function() {
    console.log('鏈接成功')
})

cloudinary.config({
    cloud_name: 'rcactive',
    api_key: '681317749132828',
    api_secret: '9xE44TwADWm2saVgWjVnfKVQLHo'
})

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(jsonp())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(article.routes(), article.allowedMethods())

module.exports = app