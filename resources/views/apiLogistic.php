

user_id:<input type="text" id="user_id" value="1"><br> 
county_id:<input type="text" id="county_id" value="20"><br> 
road:<input type="text" id="road" value="欣欣路"><br> 
title:<input type="text" id="title" value="你家" ><br> 
status_id:<input type="text" value="12" id="status_id"><br> 
phone:<input type="text" id="phone" value="0912341234"><br> 
email:<input type="text" id="email" value="qpq@qq.com"><br> 
method_id:<input type="text" value="1" id="method_id"><br>
record_ids:<input type="text" id="record_ids" value="5,4,3,2,1"><br>
name:<input type="text" id="name" value="新人"><br>
<button id="subsub">go</button>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
    $(document).ready(function() {
        $('#subsub').click(()=>{
            const url = 'http://localhost/gachoraProject/app/Models/Post/Checkout.php'
            $.post(url, {
                user_id: $('#user_id').val(),
                county_id: $('#county_id').val(),
                road: $('#road').val(),
                title: $('#title').val(),
                status_id: $('#status_id').val(),
                phone: $('#phone').val(),
                email: $('#email').val(),
                method_id: $('#method_id').val(),
                record_ids: $('#record_ids').val(),
                name: $('#name').val()
            }, (response) => {
            })
            console.log(response)
        })
    })

</script>