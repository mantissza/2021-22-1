<x-guest-layout>
    <x-slot name="title2">
        Welcome
    </x-slot>

    @php
        $posts = [
            /*(object)[
                'title' => 'Első bejegyzés',
                'author' => 'Szerző1',
                'text' => 'Ez a bejegyzésnek valamilyen szövege.... akármi...'
            ],
            (object)[
                'title' => '2. bejegyzés',
                'author' => 'Szerző2',
                'text' => 'Ez a bejegyzésnek valamilyen szövege.... akármi...'
            ],
            (object)[
                'title' => '3. bejegyzés',
                'author' => 'Szerző3',
                'text' => 'Ez a bejegyzésnek valamilyen szövege.... akármi...'
            ],
            (object)[
                'title' => '4. bejegyzés',
                'author' => 'Szerző4',
                'text' => 'Ez a bejegyzésnek valamilyen szövege.... akármi...'
            ],*/
        ];
    @endphp

    <div class="container mx-auto p-3 dark:bg-gray-800">
        <div class="grid grid-cols-1 lg:grid-cols-2 mb-4">
            <div>
                <h1 class="font-bold my-4 text-3xl lg:text-5xl">Laravel blog</h1>
            </div>
            <div class="flex items-center justify-start lg:justify-end gap-3">
                <button class="bg-green-500 hover:bg-green-700 p-2 text-white">Új kategória</button>
                <button class="bg-green-500 hover:bg-green-700 p-2 text-white">Új bejegyzés</button>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-6">
            <!-- Cardok -->
            <div class="col-span-4 lg:col-span-3">
                <h2 class="font-semibold text-2xl my-2">Minden bejegyzés</h2>
                <div class="grid grid-cols-3 gap-3">
                    @forelse ($posts as $post)
                        <div class="col-span-3 lg:col-span-1 border p-4 border-gray-300 rounded">
                            <h3 class="text-xl mb-0.5 font-semibold">
                                {{ $post->title }}
                            </h3>
                            <p class="text-gray-400">
                                {{ $post->author }}
                            </p>
                            <p class="text-gray-600 text-xs">
                                {{ $post->text }}
                            </p>
                            <button class="bg-blue-500 hover:bg-blue-700 p-1.5 text-white mt-3 text-xs ">Megtekint</button>
                        </div>
                    @empty
                        <div class="col-span-3 bg-yellow-200 text-yellow-900 py-4 px-2 rounded font-semibold">Nem található bejegyzés!</div>
                    @endforelse
                </div>
            </div>

            <!-- Sidebar -->
            <div class="col-span-4 lg:col-span-1"   >
                <h2 class="font-semibold text-2xl my-2">Oldalmenü</h2>
                <div class="grid grid-cols-1 gap-3">
                    <div class="border p-4 border-gray-300 rounded">
                        <h3 class="text-xl mb-0.5 font-semibold">
                            Keresés
                        </h3>
                        <p class="text-gray-600 text-xs mb-2">Bejegyzés keresése cím alapján.</p>
                        <form>
                            <input class="w-full rounded border-gray-400" type="text" name="search" id="search" placeholder="Keresett cím...">
                        </form>
                        <button class="bg-blue-500 hover:bg-blue-700 p-1.5 text-white mt-3">Keresés</button>
                    </div>
                    <div class="border p-4 border-gray-300 rounded">
                        <span class="badge badge-primary">badge</span>
                    </div>

                </div>
            </div>
        </div>

        <div class="border-t my-4 p-3 text-center text-xs">
            <div>
                <span class="small">Alapszintű Blog</span>
                <span class="mx-1">·</span>
                <span class="small">Laravel 8.2</span>
                <span class="mx-1">·</span>
                <span class="small">PHP 8.0.2</span>
            </div>

            <div>
                <span class="small">Szerveroldali webprogramozás 2021-22-1</span>
            </div>
        </div>
    </div>

    <div x-data="{ open: false }">
        <button x-on:click="open = ! open">Toggle Dropdown</button>

        <div x-show="open">
            Dropdown Contents...
        </div>
    </div>

    <h1>Laravel</h1>

    <?php
        $num = 5;
        echo "<h2>Valami</h2>";
    ?>

    <?= "<h2>Valami</h2>" ?>

    @php
        echo "<h2>Valami</h2>";
    @endphp

    <?php
        if ($num === 3) echo "<h3>Három</h3>";
    ?>

    @if ($num === 3)
        <h3>Három</h3>
    @elseif ($num === 4)
        <h3>Négy</h3>
    @else
        <h3>Nem 3 nem 4</h3>
    @endif

    @switch($num)
        @case(3)
            <h3>Három</h3>
            @break
        @case(4)
            <h3>Négy</h3>
            @break
        @default
            <h3>Nem 3 nem 4</h3>
    @endswitch

    @for ($i = 0; $i < 10; $i++)
        The current value is {{ $i }}
    @endfor

    @php
        $fruits = ['alma', 'barack', 'szilva'];
    @endphp

    @foreach ($fruits as $fruit)
        <p>{{ $loop->iteration }}. {{ $fruit }}</p>
    @endforeach
</x-guest-layout>
