<div id="user_name"></div>
<button id="wall">戰牆</button>
<button id="coll1">蛋收藏</button>
<button id="coll2">一番收藏</button>
<button id="bag">儲藏</button>
<button id="cart">購物車</button>
<button id="wallet">錢包</button>
<button id="go">訂單</button>
<button id="elem">基本</button>
<div> 
下次再出貨：url = basePath + '/Post/ChangeToBag.php'<br>
加入出貨：url = basePath + '/Post/ChangeToCart.php'<br>
兌換G幣：url = basePath + '/Post/ChangeToG.php'<br>
以上都post record_id 給後端</div>
<div id="info"></div>
<div id="result"></div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
    $(document).ready(function() {
        let basePath = '../../app/Models'
        let user_id = 1

        const url = basePath + '/Post/MainUser.php'
        $.post(url, {
            user_id: user_id
        }, (response) => {
            console.log(response)
            $('#info').text(`${response.name}您好, 有${response.gash}G幣`)
            response.gift.map((v, i) => {
                return $('#info').append(`<br>${v.amount}G幣將在${v.expire_at}過期`)
            })
        })

        const urlWall = basePath + '/Post/UserWall.php'
        $.post(urlWall, {
            user_id: user_id
        }, ({
            egg,
            ichiban
        }) => {
            console.log('扭蛋戰力牆：', egg)
            $('#result').text('')
            egg.map((v) => {
                return $('#result').append(`<img style="width: 200px; margin: 20px;" src="${v.img}"/>`)
            })
            $('#result').append('<br>')
            console.log('一番賞戰力牆：', ichiban)
            if(ichiban != undefined){
                ichiban.map((v) => {
                    return $('#result').append(`<img style="width: 200px; margin: 20px;" src="${v.img}"/>`)
                })
            }
        })

        $('#wall').click(() => {
            const urlWall = basePath + '/Post/UserWall.php'
            $.post(urlWall, {
                user_id: user_id
            }, ({
                egg,
                ichiban
            }) => {
                // console.log('扭蛋戰力牆：', egg)
                $('#result').text('')
                egg.map((v) => {
                    return $('#result').append(`<img style="width: 200px; margin: 20px;" src="${v.img}"/>`)
                })
                $('#result').append('<br>')
                // console.log('一番賞戰力牆：', ichiban)
                if(ichiban != undefined){
                    ichiban.map((v) => {
                        return $('#result').append(`<img style="width: 200px; margin: 20px;" src="${v.img}"/>`)
                    })
                }
            })

        })
        $('#coll1').click(() => {
            const url = basePath + '/Post/UserCollectionEgg.php'
            $.post(url, {
                user_id: user_id
            }, (response) => {
                console.log('蛋收藏：', response)
                console.log('蛋收藏有庫存：', response.has && [...response.has])
                console.log('蛋收藏沒庫存：', response.no != undefined && [...response.no])
                return $('#result').text('')
            })
        })
        $('#coll2').click(() => {
            const url = basePath + '/Post/UserCollectionIchiban.php'
            $.post(url, {
                user_id: user_id
            }, (response) => {
                console.log('一番賞收藏：', response)
                return $('#result').text('')
            })
        })
        $('#wallet').click(() => {
            const url = basePath + '/Post/UserWallet.php'
            $.post(url, {
                user_id: user_id
            }, (response) => {
                console.log('交易紀錄：', response)
                return $('#result').text('')
            })
        })
        $('#bag').click(() => {
            const url = basePath + '/Post/UserBag.php'
            $.post(url, {
                user_id: user_id
            }, (response) => {
                console.log('儲藏庫：', response)
                return $('#result').text('')
            })
        })
        $('#cart').click(() => {
            const url = basePath + '/Post/UserCart.php'
            $.post(url, {
                user_id: user_id
            }, (response) => {
                console.log('購物車：', response)
                return $('#result').text('')
            })
        })
        $('#go').click(() => {
            const url = basePath + '/Post/UserLogistics.php'
            $.post(url, {
                user_id: user_id
            }, (response) => {
                console.log('訂單：', response)
                $('#result').text('訂單id:')
                response.map((v) => {
                    console.log(v)
                    $('#result').append(`<button class="list" value="${v.id}">${v.id}</button>`)
                })
            })
        })
        // 查看訂單明細
        $(document).on('click', '.list', function() {
            const url = basePath + '/Post/LogisticsDetail.php'
            const list_id = $(this).val()
            $.post(url, {
                list_id: list_id
            }, (response) => {
                console.log(response)
            })
        })

        $('#elem').click(() => {
            const url = basePath + '/Post/Userinfo.php'
            $.post(url, {
                user_id: user_id
            }, (response) => {
                console.log('會員資料：', response)
                return $('#result').text('')
            })
        })
        // url = basePath + '/Post/ChangeToBag.php'
        // url = basePath + '/Post/ChangeToCart.php'
        // url = basePath + '/Post/ChangeToG.php'
        // post record_id 給後端
    })
</script>