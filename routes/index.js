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

router.get('/celebration/top10', async(ctx, next) => {
    ctx.body = {
        expires: 1513302165765,
        list: [{
                _id: "谢伟顺",
                count: 284444
            },
            {
                _id: "李志杰",
                count: 217224
            },
            {
                _id: "邹军",
                count: 48291
            },
            {
                _id: "袁伟南",
                count: 1490
            },
            {
                _id: "黄谦益",
                count: 728
            },
            {
                _id: "曹志威",
                count: 512
            },
            {
                _id: "曹鹏",
                count: 470
            },
            {
                _id: "陈宇中",
                count: 244
            }
        ]
    }
})

router.get('/city',async(ctx,next) =>{
    ctx.body = {
        "ip": ctx.header,
        "list": [
            {
                "city": "Britain", //城市
                "telephone": {
                    "listen_mainland": "1.99元/分钟"+new Date(),//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟" + Math.random(),//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算" + Math.random()
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            },
            {
                "city": "France",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            },
            {
                "city": "Italy",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            },
            {
                "city": "Maldives",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            },
            {
                "city": "Macao",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "HongKong",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Thailand",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Malaysia",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Australia",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Korea",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Japan",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Vietnam",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Taiwan",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Hawaii",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Singapore",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "NewZealand",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "U.S.A",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }, {
                "city": "Cambodia",
                "telephone": {
                    "listen_mainland": "1.99元/分钟",//接听中国内地
                    "listen_outside": "2.99元/分钟",//漫游地接听
                    "call_local": "1.99元/分钟",//拨打当地
                    "call_other": "1.99元/分钟",//拨打其他
                    "call_china": "+96",//拨打回中国
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "message": {
                    "send_home": "0.99元/分钟",//发送短信回国
                    "send_other": "2.99元/分钟",//发送短信到其他国家/地区
                    "receive_txt": "免费",//收短信
                    "area_code": "+84",//当地字冠
                    "url": "baidu.com",//拨号助手链接跳转
                },
                "flux": {
                    "list": [ //流量
                        {
                            "title": "数据流量",
                            "desc": "3元包3M，当天达到30元封顶（不限量），按北京时间计算"
                        },
                        {
                            "title": "欧洲多国流量包",
                            "desc": "3元包78元不限量，包5天128元不限量、包7天168元不限量"
                        }
                    ]
                }
            }
        ]
    }
})

module.exports = router