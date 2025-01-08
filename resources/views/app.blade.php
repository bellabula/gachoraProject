<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <link rel="icon" href="http://localhost/gachoraProject/public/images/gachaball-01.svg" type="image/x-icon" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    <!-- 引入 jQuery -->
    <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->

    @routes
    @viteReactRefresh
    @vite(['resources/sass/app.scss',
    'resources/js/app.jsx',
    "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
    <!-- <script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"></script> -->
    <script src="http://localhost/gachoraProject/public/assets/jquery.js"></script>
    <!-- 引入 turn.js -->
    <!-- <script src="http://localhost/gachoraProject/public/assets/turn.js"></script> -->
    <script src="http://www.turnjs.com/lib/turn.min.js"></script>
    <script src="http://localhost/gachoraProject/public/assets/lottie.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.4/lottie.min.js"></script>
</body>

</html>