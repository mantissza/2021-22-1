<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Laravel</h1>

    <?php
        $num = 4;
        echo "<h2>Valami</h2>";
    ?>

    <?= "<h2>Valami</h2>" ?>

    @php
        echo "<h2>Valami</h2>";
    @endphp

    @if ($num === 3)
        <h3>Három</h3>
    @endif

    </body>
</html>
