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
<div class="card"></div>
<div class="labels"></div>
<script>
    let series_id
    let user_id
    let user_number
    let intervalMyWaitTime
    let intervalMyPlayTime
    let intervalGeneralTime
    // map系列
    $(document).ready(function() {
        fetch('http://localhost/gachoraProject/app/Models/Fetch/AllIchiban.php')
            .then(response => response.json())
            .then(response => {
                $('.card').append(`<input id="user_id" type="text" placeholder="user_id"><br>`)
                response.map((v) => {
                    $('.card').append(`<button class="ichibanid">賞商品卡id${v.series_id}</button>`)
                })
            })
    })
    // to詳細頁function
    function mapLabel(series_id, func){
        $.post('http://localhost/gachoraProject/app/Models/Post/IchibanDetail.php', {
            series_id: series_id
        }, (response) => {
            mapCard(series_id, user_id)
            mapLabels(response.series.total, response.label)
            func()
        })
    }
    function mapCard(series_id, user_id){
        $('.card').text('')
        $('.card').append(`
            <div>
            <span>商品${series_id}, 玩家${user_id}, </span><span class="number"></span><br>
            <button class="line">排隊</button><button class="bye"">中離</button><button class="done">抽</button><br>
            <span class="timer"></span>
            </div>`)
    }
    // 哪些籤抽走了
    function mapLabels(totalLabels, labelOccupied){
        $('.labels').text('')
        for (let i = 1; i <= totalLabels; i++) {$('.labels').append(`<button id="label${i}">${i}</button>`)}
        // 重整籤
        if (labelOccupied) {labelOccupied.map(v => $(`#label${v}`).prop('disabled', true))}
    }
    // 未輪到
    function labelDisabled(){
        $('[id^="label"]').addClass('disabled')
    }
    // 輪到
    function labelEnabled(){
        $('[id^="label"]').removeClass('disabled')
    }
    // to詳細頁click
    $(document).on('click', '.ichibanid', function() {
        series_id = $(this).text().substr(6)
        user_id = $('#user_id').val()
        console.log('series_id:',series_id)
        console.log('user_id:',user_id)
        mapLabel(series_id, labelDisabled)
        // 檢查是否有參加
        inLineOrNot((isInLine) => {
            if(isInLine){
                // 查看是否開抽
                isMyTurnOrNot()
            }else{
                // console.log('render沒排隊預估等候時間')
                GeneralTimer()
            }
        })
    })
    function MyTimer(callback){
        $.post('http://localhost/gachoraProject/app/Models/Post/MyTimer.php',{
            user_id: user_id
        },(response)=>{
            callback(response)
        })
    }
    // 判斷是否排隊
    function inLineOrNot(callback){
        MyTimer((response) => {
            if (Array.isArray(response)){
                let isInLine = response.some(item => item.series_id == series_id)
                callback(isInLine)
            } else {
                callback(false)
            }
        })
    }
    // 輪到我了嗎
    function isMyTurnOrNot(){
        MyTimer((response) => {
            const item = response.find(item => item.series_id == series_id)
            if (item) {
                wait = item.waiting
                user_number = item.number
                console.log('user_number:', user_number)
                if (wait <= 0) {
                    // 輪到
                    // console.log('看剩幾秒能抽')
                    PingMyPlayTime()
                    mapLabel(series_id, labelEnabled)
                } else {
                    // 還沒輪到看要等多久
                    PingMyWaitTime(wait)
                }
            }
        })
    }
    function PingMyWaitTime(wait){
        intervalMyWaitTime = setInterval(() => {
            wait--
            console.log('render預估等待', wait, '秒')

            if (wait <= 0) {
                clearInterval(intervalMyWaitTime)
                // console.log('看剩幾秒能抽')
                PingMyPlayTime()
                mapLabel(series_id, labelEnabled)

            } else if (wait % 10 == 0) {
                clearInterval(intervalMyWaitTime)
                MyTimer((response)=>{
                    const item = response.find(item => item.series_id == series_id)
                    wait = item.waiting
                    console.log('render還要排', wait, '秒')
                    PingMyWaitTime(wait)
                })
            }
        }, 1000)
    }
    function MyPlayTime(callback){
        $.post('http://localhost/gachoraProject/app/Models/Post/SeeWaitTime.php', {
            series_id: series_id,
            number: user_number
        }, (response) => {
            callback(response)
        })
    }
    // 抽的時間
    function PingMyPlayTime(){
        let playTime
        MyPlayTime((response)=>{
            playTime = response.waiting
        })
        intervalMyPlayTime = setInterval(() => {
            playTime--
            console.log('還有', 190 + playTime, '秒可以抽')
            if (190 + playTime <= 0) {
                clearInterval(intervalMyPlayTime)
                // 刪除排隊
                labelDisabled()
                DeleteWait(series_id, user_number)
                // 刷新
                console.log('結束抽取')

            } else if ((190 + playTime) % 10 == 0) {
                clearInterval(intervalMyPlayTime)
                PingMyPlayTime(playTime)
            } else {

            }
        }, 1000)
    }
    function FetchGeneralTime(callback){
        $.post('http://localhost/gachoraProject/app/Models/Post/MaybeTime.php', {
            series_id: series_id
        }, (response) => {
            callback(response)
        })
    }
    // 沒排隊時間maybetime(out時間)
    function GeneralTimer(){
        let generalTime
        FetchGeneralTime((response)=>{
            generalTime = response[0].wait
        })
        intervalGeneralTime = setInterval(() => {
            generalTime--
            console.log('現在排隊最久只需等', generalTime, '秒')
            if (generalTime <= 0) {
                clearInterval(intervalGeneralTime)
                console.log('不用排隊馬上抽')
            } else if (generalTime % 10 == 0) {
                clearInterval(intervalGeneralTime)
                GeneralTimer()
            } else {

            }
        }, 1000)
    }
    // 排隊
    $(document).on('click', '.line', function() {
        clearInterval(intervalGeneralTime)
        const url = 'http://localhost/gachoraProject/app/Models/Post/LineIn.php'
        $.post(url, {
            user_id: user_id,
            series_id: series_id
        }, (response) => {
            console.log('排隊', response)
            user_number = response[0].yournumber
            wait = response[0].waiting
            console.log('user_number:', user_number)
            $('.number').text(`編號${user_number}`)
            PingMyWaitTime(wait)
        })
    })
    // 自主中離
    $(document).on('click', '.bye', function() {
        labelDisabled()
        DeleteWait(series_id, user_number)
        setTimeout(() => {
            console.log('自主中離')
        }, 1000)
    })

    // 中離function
    function DeleteWait(series_id, user_number) {
        clearInterval(intervalMyPlayTime)
        clearInterval(intervalMyWaitTime)
        labelDisabled()
        $.post('http://localhost/gachoraProject/app/Models/Post/DeleteWait.php', {
            series_id: series_id,
            number: user_number,
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
                }
            })

        })
    })

    // })
</script>