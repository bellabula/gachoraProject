<button id="ichiban">一番賞</button>
<button id="egg">蛋</button>
<button id="user">會員</button>
<script>
  document.getElementById('egg').onclick = () => {
    window.location.href = "Egg_main.php"
  }
  document.getElementById('ichiban').onclick = () => {
    window.location.href = "Ichiban_main.php"
  }
  document.getElementById('user').onclick = () => {
    window.location.href = "User_main.php"
  }
</script>