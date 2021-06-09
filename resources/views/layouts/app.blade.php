<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- Change address bar color Chrome, Firefox OS and Opera --}}
    <meta name="theme-color" content="#232323" />
    {{-- iOS Safari --}}
    <meta name="apple-mobile-web-app-status-bar-style" content="#232323">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Black Music') }}</title>

    <!-- Favicon  -->
    <link rel="icon" href="storage/img/musical-note-black-gold-512.png">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700" rel="stylesheet">

    {{-- Manifest --}}
    {{-- <link rel="manifest" type="application/manifest+json" href="manifest.webmanifest"> --}}

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">

    {{-- IOS support --}}
    <link rel="apple-touch-icon" href="storage/img/musical-note-black-gold-512.png">
    <meta name="apple-mobile-web-app-status-bar" content="#aa7700">
</head>

<body>
    <div id="app"></div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>

</html>
