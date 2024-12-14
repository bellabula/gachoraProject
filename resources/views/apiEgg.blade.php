<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- 後端吃value -->
<button class="type" value="all">所有蛋</button>
<button class="type" value="hot">熱銷蛋</button>
<button class="type" value="new">新蛋</button>
<button class="type" value="rare">稀有蛋</button>
<!-- 生成主題分類 -->
<div class="themes"></div>
<!-- 商品總共有幾頁：pages -->
<div class="pages"></div>
<!-- 商品卡，如果要到詳細頁要給後端吃id -->
<div class="card"></div>
<script>
  $(document).ready(function() {
    // 蛋全域
    let category = 1
    let basePath = '../../app/Models'
    // 首頁最下面精選商品
    fetch(basePath + '/Fetch/AllEgg.php')
      .then(response => response.json())
      .then(data => {
        console.log('最終版：', data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
    // fetch(basePath + '/Fetch/MainEgg.php')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('精選：', data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //   })

    // 有收藏與否
    $.post(basePath + '/Fetch/AllEgg.php', {
      user_id: '1'
    }, (response) => {
      console.log('有給我user_id就有collected是1否0收藏', response)
    })
    // 首頁上面top10
    // fetch(basePath + '/Fetch/MainEgg10.php')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Top 10：', data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching data:', error);
    //   })
    // 選擇不同大分類出現相應扭蛋
    let type = ''
    let page = ''
    let tmpurl = ''
    $(document).on('click', '.type', function() {
      const url = basePath + '/Post/EggType.php'
      tmpurl = url
      type = $(this).val()
      $.post(url, {
        type: type,
        page: page
      }, (response) => {
        console.log('不同大分類', response);
        for (i = 1; i <= response.pages; i++) {
          $('.pages').text('')
          $('.pages').append(`<button class="page">${i}</button>`)
        }
        $('.card').text('')
        response.series.map((v) => {
          $('.card').append(`<button class="eggid">扭蛋商品卡id${v.series_id}</button><button class="ToCollection" value="${v.series_id}">加入收藏</button><button class="Remind" value="${v.series_id}">到貨通知我</button><br>`)
        })
      })
      // 分類頁所有主題
      fetch(basePath + '/Fetch/EggTheme.php')
        .then(response => response.json())
        .then(data => {
          $('.themes').text('')
          data.map((v, i) => {
            $('.themes').append(`<button class="theme" value="${v}">分類頁主題標籤：${v}</button>`)
          })
        })
    })
    let theme = ''
    // 分類頁主題選擇
    $(document).on('click', '.theme', function() {
      $('#type').text($(this).val())
      const url = basePath + '/Post/EggThemeType.php'
      tmpurl = url
      page = $('#page').text()
      theme = $(this).val()
      $.post(url, {
        theme: theme,
        page: page
      }, (response) => {
        $('.card').text('')
        response.series.map((v) => {
          $('.card').append(`<button class="eggid">扭蛋商品卡id${v.series_id}</button><button class="ToCollection" value="${v.series_id}">加入收藏</button><button class="Remind" value="${v.series_id}">到貨通知我</button><br>`)
        })
        console.log('主題分類', response)
      })
    })
    // 分類頁選擇頁數
    $(document).on('click', '.page', function() {
      const url = tmpurl
      $.post(url, {
        theme: theme,
        type: type,
        page: $(this).text()
      }, (response) => {
        console.log('不同頁數', response)
      })
    })
    // 選蛋跳到詳細頁
    $(document).on('click', '.eggid', function() {
      const url = basePath + '/Post/EggDetail.php'
      let series = $(this).text().substr(-1)
      $.post(url, {
        series_id: series
      }, (response) => {
        console.log('扭蛋詳細頁', response);
      })
    })
    // 分類頁選擇頁數
    $(document).on('click', '.ToCollection', function() {
      const url = basePath + '/Post/ToCollection.php'
      const user_id = 1
      const series_id = $(this).val()
      $.post(url, {
        user_id: user_id,
        series_id: series_id
      }, (response) => {
        console.log(response)
      })
    })
    $(document).on('click', '.Remind', function() {
      const url = basePath + '/Post/RemindMeIfStock.php'
      const user_id = 1
      const series_id = $(this).val()
      $.post(url, {
        user_id: user_id,
        series_id: series_id
      }, (response) => {
        console.log(response)
      })
    })
  })
</script>