<div>
    <!-- The only way to do great work is to love what you do. - Steve Jobs -->
    Gachora首頁<br>
    <button id="egg">扭蛋首頁</button>
    <button id="ichiban">一番賞首頁</button>
    <button id="user">會員首頁</button>
    <button id="gin">儲值</button>
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
                default:
                    const url = `/api/${pageId}`
                    window.location.href = baseUrl + url
            }
        })
        $(document).on('click', '#gin', function() {
            const url = 'http://localhost/gachoraProject/app/Models/Fetch/AllGash.php'
            $.post(url, {}, function(response) {
                console.log(response)
                response.map((v) => {
                    $('#deposit').append(`<button id="deposititem" gash_id="${v.id}">G: ${v.gash}<br>NT: ${v.dollar}</button>`)
                })
            })
        })
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
    })
</script>