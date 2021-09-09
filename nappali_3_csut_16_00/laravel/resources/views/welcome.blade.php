<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php
        echo "Hello World";
    ?>

    <?= "Hello World" ?>

    @php
        echo "Hello World";

        $name = "David";
    @endphp

    {{--
    <?php
        echo $name;
    ?>
    --}}

    {{ $name }}

    @php
        if (isset($name)) {
            echo $name;
        }
    @endphp

    <div>
        @isset($name)
            <h2>Hello {{ $name }}<h2>
        @endisset
    </div>

    @for ($i = 0; $i < 10; $i++)
        <p>The current value is {{ $i }}</p>
    @endfor

    @php
        $fruits = ['alma', 'barack', 'szilva'];
    @endphp

    @forelse ($fruits as $fruit)
        <p>{{ $loop->iteration }}. {{ $fruit }}</p>
    @empty
        <p>Nincsenek gyümölcsök</p>
    @endforelse
</body>
</html>
