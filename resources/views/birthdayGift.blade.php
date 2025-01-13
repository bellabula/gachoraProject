{{-- resources/views/birthday_gift.blade.php --}}

<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>生日快樂！</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .header {
            text-align: center;
            background-color: #365B60;
            color: white;
            padding: 15px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            margin: 0 0 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
        }
        img{
            height: 35px;
            width: 200px;
            padding-left:400px
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>生日快樂！</h2>
        </div>
        <div class="content">
            <p>親愛的 {{ $name }}，</p>
            <p>Gachora祝福你生日快樂！我們為您提供了 200 的G幣作為生日禮金。</p>
            <p>希望您度過愉快的生日！</p>
        </div>
        <div class="footer">
            <p>此郵件由我們的系統自動發送。</p>
            <p>*生日禮會有有效期限，請登入您的帳號查詢有效期限。</p>
        </div>
        <!-- <img src="{{ asset('storage/logo2.png') }}" alt="Logo"> -->
    </div>
</body>
</html>
