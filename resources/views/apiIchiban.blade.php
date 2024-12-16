<style>
    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    .selected {
        background-color: greenyellow;
    }
</style>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- <script
    src="https://code.jquery.com/jquery-3.7.1.js"
    integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
    crossorigin="anonymous"></script> -->
<!-- <div id="type" style="display: none;"></div> -->
<!-- <button class="type" value="all">所有賞</button>
<button class="type" value="hot">熱銷賞</button>
<button class="type" value="new">新賞</button>
<button class="type" value="rare">稀有賞</button> -->
<!-- <div class="themes"></div> -->
<!-- <div class="pages"></div> -->
<div class="card"></div>
<div class="labels"></div>
<script>
    const basePath = 'http://localhost/gachoraProject/app/Models'
    $(document).ready(function() {
        // let category = 2
        // 一番賞全域
        fetch(basePath + '/Fetch/AllIchiban.php')
            .then(response => response.json())
            .then(data => {
                console.log('最終版：', data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
        $.post(basePath + '/Fetch/AllIchiban.php', {
            user_id: 1
        }, (response) => {
            console.log('有收藏資料的最終版', response);
            $('.card').text('')
            response.map((v) => {
                $('.card').append(`<button class="ichibanid">賞商品卡id${v.series_id}</button>`)
            })
        })
        // 首頁最下面精選商品
        // fetch(basePath + '/Fetch/MainIchiban.php')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('精選：', data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     })
        // 首頁上面top10
        // fetch(basePath + '/Fetch/MainEgg10.php')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Top 10：', data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     })
        // 選擇不同大分類出現相應賞
        // let type = ''
        // let page = ''
        // let tmpurl = ''
        // let theme = ''
        // $(document).on('click', '.type', function() {
        //     const url = basePath + '/Post/IchibanType.php'
        //     tmpurl = url
        //     type = $(this).val()
        //     $.post(url, {
        //         type: type,
        //         page: page
        //     }, (response) => {
        //         console.log('不同大分類', response);
        //         for (i = 1; i <= response.pages; i++) {
        //             $('.pages').text('')
        //             $('.pages').append(`<button class="page">${i}</button>`)
        //         }
        //         $('.card').text('')
        //         response.series.map((v) => {
        //             $('.card').append(
        //                 `<button class="ichibanid">賞id${v.series_id}</button>
        //             <button class="line" value="${v.series_id}">排隊</button>`
        //             )
        //         })
        //     })
        // 分類頁所有主題
        // fetch(basePath + '/Fetch/IchibanTheme.php')
        //     .then(response => response.json())
        //     .then(data => {
        //         $('.themes').text('')
        //         data.map((v, i) => {
        //             $('.themes').append(`<button class="theme" value="${v}">${v}</button>`)
        //         })
        //     })
    })
    // 分類頁主題選擇
    // $(document).on('click', '.theme', function() {
    //     $('#type').text($(this).val())
    //     const url = basePath + '/Post/IchibanThemeType.php'
    //     tmpurl = url
    //     page = $('#page').text()
    //     theme = $(this).val()
    //     $.post(url, {
    //         theme: theme,
    //         page: page
    //     }, (response) => {
    //         $('.card').text('')
    //         response.series.map((v) => {
    //             $('.card').append(`<button class="ichibanid">賞id${v.series_id}</button>`)
    //         })
    //         console.log('主題分類', response)
    //     })
    // })
    // 分類頁選擇頁數
    // $(document).on('click', '.page', function() {
    //     const url = tmpurl
    //     $.post(url, {
    //         theme: theme,
    //         type: type,
    //         page: $(this).text()
    //     }, (response) => {
    //         console.log('不同頁數', response)
    //     })
    // })
    // 給後端賞id跳到詳細頁
    $(document).on('click', '.ichibanid', function() {
        const series_id = $(this).text().substr(-1)
        const url = basePath + '/Post/IchibanDetail.php'
        $.post(url, {
            series_id: series_id
        }, (response) => {
            console.log('賞詳細頁', response);
            $('.card').text('')
            $('.card').append(`
                <div>
                <span>賞詳細頁id</span><span>${response.series.series_id}</span><br>
                <input placeholder="post給我user_id(登入後)才能排隊抽" />
                <button class="line" value="${response.series.series_id}">排隊</button>
                <span class="timer"></span>
                <span class="">你的號碼牌：</span><span class="yournumber"></span>
                <button class="bye" value="${response.series.series_id}">中離</button>
                <button class="done" series_id="${response.series.series_id}">抽</button>
                </div>`)
            $('.labels').text('')
            // 出籤response.series.total是總共籤數
            for (let i = 1; i <= response.series.total; i++) {
                $('.labels').append(`<button id="label${i}">${i}</button>`)
            }
            // 被抽的號碼碼掉response.label是已經被抽的
            if (response.label) {
                response.label.map((v) => {
                    $(`#label${v}`).prop('disabled', true)
                })
            }
            $('[id^="label"]').addClass('disabled')
        })
    })
    // 排隊
    $(document).on('click', '.line', function() {
        const user_id = $(this).prev().val()
        const series_id = $(this).val()
        const url = 'http://localhost/gachoraProject/app/Models/Post/LineIn.php'
        $.post(url, {
            user_id: user_id,
            series_id: series_id
        }, (response) => {
            FrontTime(series_id, response[0].yournumber, response[0].waiting)
            $('.yournumber').text(response[0].yournumber)
        })
    })
    // 前端timer
    let executed = false

    function FrontTime(series_id, yournumber, wait) {
        if (wait > 0) {
            if (!executed) {
                $('[id^="label"]').addClass('disabled')
                executed = true
            }
            if (wait % 10 > 0) {
                $('.timer').text(`最晚等${Math.floor(wait / 60)}分${(wait % 60)}秒`)
                wait -= 1
                setTimeout(() => {
                    FrontTime(series_id, yournumber, wait)
                }, 1000)
            } else {
                SeeWaitTime(series_id, yournumber)
                executed = false
            }
        } else if (wait > -180) {
            // 重新抓剩的
            if (!executed) {
                $.post('http://localhost/gachoraProject/app/Models/Post/IchibanDetail.php', {
                    series_id: series_id
                }, (response) => {
                    console.log('賞詳細頁', response);
                    $('.labels').text('')
                    // 出籤response.series.total是總共籤數
                    for (let i = 1; i <= response.series.total; i++) {
                        $('.labels').append(`<button id="label${i}">${i}</button>`)
                    }
                    // 被抽的號碼碼掉response.label是已經被抽的
                    if (response.label) {
                        response.label.map((v) => {
                            $(`#label${v}`).prop('disabled', true)
                        })
                        // $('[id^="label"]').addClass('disabled')
                    }
                    $('[id^="label"]').removeClass('disabled')
                })
                executed = true
            }

            if ((wait * -1) % 10 > 1) {
                $('.timer').text(`剩${Math.floor((170 + wait) / 60)}分${((170 + wait) % 60)}秒可以抽`)
                wait -= 1
                setTimeout(() => {
                    FrontTime(series_id, yournumber, wait)
                }, 1000)
            } else {
                SeeWaitTime(series_id, yournumber)
            }
        } else {
            $('[id^="label"]').addClass('disabled')
            DeleteWait(series_id, yournumber)
            $('.timer').text('已結束...')
        }
    }
    // 中離
    $(document).on('click', '.bye', function() {
        const series_id = $(this).val()
        const yournumber = $(this).prev().text()
        DeleteWait(series_id, yournumber)
        $('.timer').text('bye')
    })

    // post series_id, 號碼牌，到後端確認時間
    function SeeWaitTime(p_series_id, p_yournumber) {
        const url = 'http://localhost/gachoraProject/app/Models/Post/SeeWaitTime.php'
        $.post(url, {
            series_id: p_series_id,
            number: p_yournumber
        }, ({
            series_id,
            waiting,
            yournumber
        }) => {
            setTimeout(() => {
                FrontTime(series_id, yournumber, waiting);
            }, 0);
        })
    }
    // post series_id, 號碼牌，告訴後端中離與要離開
    function DeleteWait(series_id, yournumber) {
        $.post('http://localhost/gachoraProject/app/Models/Post/DeleteWait.php', {
            series_id: series_id,
            number: yournumber,
        }, (response) => {})
    }
    // 取得籤號
    $(document).on('click', '[id^=label]', function() {
        $(this).hasClass('selected') ?
            $(this).removeClass('selected') :
            $(this).addClass('selected')
    })
    // 買一番賞
    $(document).on('click', '.done', function() {
        // 籤號格式：'1,2,3,4'
        let result = ''
        $('button[id^=label].selected').map((x, v) => {
            result += v.innerText + ','
            return result
        })
        $('button[id^=label].selected').removeClass('selected')
        result = result.slice(0, -1)

        let series_id = $(this).attr('series_id')
        let yournumber = $(this).prev().prev().text()
        const url = 'http://localhost/gachoraProject/app/Models/Post/PlayIchiban.php'
        $.post(url, {
            series_id: series_id,
            number: yournumber,
            label: result
        }, (response) => {
            console.log(response)
            $.post('http://localhost/gachoraProject/app/Models/Post/IchibanDetail.php', {
                series_id: series_id
            }, (response) => {
                $('.labels').text('')
                // 刷新抽過的籤
                for (let i = 1; i <= response.series.total; i++) {
                    $('.labels').append(`<button id="label${i}">${i}</button>`)
                }
                if (response.label) {
                    response.label.map((v) => {
                        $(`#label${v}`).prop('disabled', true)
                    })
                    // $('[id^="label"]').addClass('disabled')
                }
            })

        })
    })

    // })
</script>