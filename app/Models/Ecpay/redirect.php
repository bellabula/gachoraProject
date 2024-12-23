<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
    $(document).ready(function() {
        function submit(){
            let tmpurl = localStorage.getItem("tmpurl");
            let form = document.createElement('form')
            form.action = './redirect2.php'
            form.method = 'POST'
            
            let urlInput = document.createElement('input')
            urlInput.type = 'text'
            urlInput.value = tmpurl
            urlInput.name = 'tmpurl'
            urlInput.required = true
            
            let submitButton = document.createElement('button')
            submitButton.type = 'submit'
            
            form.appendChild(urlInput)
            document.body.appendChild(form)
            form.submit()
        }
        submit()
    })
</script>