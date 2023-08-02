<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta charset="utf-8">
	<meta name="viewport"
		  content="width=device-width, initial-scale=1">
	{{-- Change address bar color Chrome, Firefox OS and Opera --}}
	<meta name="theme-color"
		  content="#232323" />
	{{-- iOS Safari --}}
	<meta name="apple-mobile-web-app-status-bar-style"
		  content="#232323">
	<meta name="description"
		  content="The best Kenyan Online Music Store" />

	<!-- CSRF Token -->
	<meta name="csrf-token"
		  content="{{ csrf_token() }}">

	<title>{{ config('app.name', 'Black Music') }}</title>

	<!-- Favicon  -->
	<link rel="icon"
		  href="storage/img/musical-note.png">

	<!-- Fonts -->
	<link rel="dns-prefetch"
		  href="//fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css?family=Nunito"
		  rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700"
		  rel="stylesheet">

	{{-- Manifest --}}
	<link rel="manifest"
		  type="application/manifest+json"
		  href="manifest.webmanifest">

	<!-- Styles -->
	<link href="{{ asset('css/app.css') }}" rel="stylesheet">
	<link href="{{ asset('css/dark.css') }}" rel="stylesheet">

	{{-- Script for conditionally showing css based on user prefered theme --}}
	{{-- <script>
		const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (!darkThemeMq.matches) {
            document.write("<link href='{{ asset('css/dark.css') }}' rel='stylesheet'>")
        } else {
            document.write("<link href='{{ asset('css/custom.css') }}' rel='stylesheet'>")
        }

	</script> --}}

	{{-- IOS support --}}
	<link rel="apple-touch-icon"
		  href="storage/img/musical-note.png">
	<meta name="apple-mobile-web-app-status-bar"
		  content="#aa7700">

	{{--
	<!-- Global site tag (gtag.js) - Google Analytics --> --}}
	<script async
			src="https://www.googletagmanager.com/gtag/js?id=G-5K64MQR0RL"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-5K64MQR0RL');

	</script>
</head>

<body>
	<noscript>
		<center>
			<h2 class="m-5">
				We're sorry but {{ config('app.name', 'Black Music') }}
				doesn't work properly without JavaScript enabled.
				Please enable it to continue.
			</h2>
		</center>
	</noscript>

	<div id="app"></div>

	<!-- Scripts -->
	<script src="{{ asset('js/app.js') }}" defer></script>

	{{-- Chart.js --}}
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

	@auth
	<script src="{{ asset('/enable-push.js') }}"
			defer></script>
	@endauth
</body>

</html>