<div id="user_name"></div>
<button id="userbutton">post user id</button><br>
<button id="wall">戰牆</button>
<button id="coll">收藏</button>
<button id="stock">儲藏</button>
<button id="wallet">錢包</button>
<button id="go">訂單</button>
<button id="elem">基本</button>
<div id="info"></div>
<div id="result"></div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
  $(document).ready(function() {
    let user_id = 1
    $(document).on('click', '#userbutton', function() {
      const url = '../Post/MainUser.php'
      $.post(url, {
        user_id: user_id
      }, ({
        name,
        gash,
        gift
      }) => {
        $('#info').text(`${name}, 有${gash}G幣`)
        gift.map((v, i) => {
          return $('#info').append(`<br>${v.amount}G幣將在${v.expire_at}過期`)
        })
      })
      const urlWall = '../Post/UserWall.php'
      $.post(urlWall, {
        user_id: user_id
      }, ({
        egg,
        ichiban
      }) => {
        console.log(egg)
        egg.map((v) => {
          return $('#result').append(`<img style="width: 200px; margin: 20px;" src="${v.img}"/>`)
        })
        $('#result').append('<br>')
        ichiban.map((v) => {
          return $('#result').append(`<img style="width: 200px; margin: 20px;" src="${v.img}"/>`)
        })
      })

    })
    $('#coll').click(() => {
      const url = '../Post/UserCollectionEgg.php'
      $.post(url, {
        user_id: user_id
      }, (response) => {
        console.log(response)
      })
    })
  })
</script>