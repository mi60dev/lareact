<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
      <div id="app"></div>

      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      
      @if(config('app.env') === 'local')
        <script src="http://localhost:3000/js/app.js"></script>
      @else
        <script src="/js/app.js"></script>
      @endif
</body>
</html>
