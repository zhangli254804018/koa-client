const mongoose = require('mongoose')
const _ = require('lodash')
const userSchema = new mongoose.Schema({
    uid: { type: Number, default: 0 },
    name: { type: String, default: 'your name' },
    mobile: { type: String, default: '' },
    email: { type: String, default: '' },
    account: { type: String, default: '' },
    password: { type: String, default: '' },
    logining: Boolean,
    token: { type: String, default: '' },
    serverTime: { type: Date, default: _.now() }
})

module.exports = userSchema