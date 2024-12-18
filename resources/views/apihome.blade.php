<style>
    #timeBox {
        display: block;
        /* 初始隐藏 */
        position: absolute;
        left: 280px;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
        padding: 10px;
        z-index: 1000;
    }
</style>
<div>
    <!-- The only way to do great work is to love what you do. - Steve Jobs -->
    Gachora首頁<br>
    <button id="egg">扭蛋首頁</button>
    <button id="ichiban">一番賞首頁</button>
    <button id="user">會員首頁</button>
    <button id="gin">儲值</button>
    <button id="wait">我的等待</button>
    <div id="timeBox"><span id="remainingTime"></span></div>
    <div id="deposit"></div>
</div>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
    $(document).ready(function() {
        let basePath = 'http://localhost/gachoraProject/app/Models'
        const baseUrl = '/gachoraProject/public'
        $(document).on('click', 'button', function() {
            const pageId = $(this)[0].id
            switch (pageId) {
                case 'gin':
                    break;
                case '':
                    break;
                case 'deposititem':
                    break;
                case 'wait':
                    break;
                default:
                    const url = `/api/${pageId}`
                    window.location.href = baseUrl + url
            }
        })
        // 按儲值按鈕到儲值頁
        $(document).on('click', '#gin', function() {
            const url = 'http://localhost/gachoraProject/app/Models/Fetch/AllGash.php'
            $.post(url, {}, function(response) {
                console.log(response)
                response.map((v) => {
                    $('#deposit').append(`<button id="deposititem" gash_id="${v.id}">G: ${v.gash}<br>NT: ${v.dollar}</button>`)
                })
            })
        })
        // 選擇要儲值多少
        $(document).on('click', '#deposititem', function() {
            gash_id = $(this).attr('gash_id')
            user_id = 1
            const url = 'http://localhost/gachoraProject/app/Models/Post/TopUpGash.php'
            $.post(url, {
                user_id: user_id,
                gash_id: gash_id
            }, function(response) {
                console.log(response)
            })
        })
        // 計時器
        $(document).on('click', '#wait', function() {
            MyTimer(3)
        })
        // 查看時間
        function MyTimer(user_id) {
            const url = 'http://localhost/gachoraProject/app/Models/Post/MyTimer.php'
            $.post(url, {
                user_id: user_id
            }, function(response) {
                // console.log(response)
                if (response.map) {
                    AutoTime(response)
                }
            })
        }
        // 每秒刷新
        function AutoTime(response) {
            if (response[response.length - 1].waiting > 0) {
                setTimeout(() => {
                    $('#remainingTime').text('')
                    response.map((v) => {
                        v.waiting > 0 && $('#remainingTime').append(`<span>${v.name}你${v.number}號最晚${Math.floor(v.waiting / 60)}分${v.waiting % 60}秒輪到你</span><br>`)
                    })
                    MyTimer(3)
                }, 1000)
            } else {
                $('#remainingTime').text('')
            }
        }

    })
</script>