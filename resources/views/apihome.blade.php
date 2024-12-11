<div>
    <!-- The only way to do great work is to love what you do. - Steve Jobs -->
    Gachora首頁<br>
    <button id="egg">扭蛋首頁</button>
    <button id="ichiban">一番賞首頁</button>
    <button id="user">會員首頁</button>
</div>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
    $(document).ready(function() {
        const baseUrl = '/gachoraProject/public'
        $(document).on('click', 'button', function() {
            const pageId = $(this)[0].id
            const url = `/api/${pageId}`
            console.log(pageId)
            window.location.href = baseUrl + url
        })
    })
</script>