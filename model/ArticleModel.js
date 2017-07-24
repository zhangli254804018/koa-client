const mongoose = require('mongoose')
const _ = require('lodash')
const Schema = new mongoose.Schema({
    uid: { type: String, require: true },
    aid: { type: String, default: 0 },
    title: { type: String, default: 'your post' + _.now() },
    subtitle: { type: String, default: 'your post subname' },
    photo: [{ type: String, default: '' }],
    content: { type: String, default: '' },
    comments: { type: String, default: '' },
    author: { type: String, default: '' },
    token: { type: String, default: '' },
    postTime: { type: Date, default: _.now() }
})

module.exports = Schema