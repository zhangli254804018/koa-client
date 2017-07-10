const mongoose = require('mongoose')
const _ = require('lodash')
const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
    cid: ObjectId,
    uid: { type: String, default: 0 },
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