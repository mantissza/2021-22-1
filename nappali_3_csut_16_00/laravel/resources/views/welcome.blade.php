<x-guest-layout>
    <x-slot name="title2">
        Welcome
    </x-slot>

    @php
        $posts = [
            [
                'title' => 'Bejegyzés 1',
                'author' => 'Szerző',
                'text' => 'Ez lesz a bejegyzés szövege',
                'categories' => ['Kategória1', 'Kategória2']
            ],
            [
                'title' => 'Bejegyzés 2',
                'author' => 'Szerző',
                'text' => 'Ez lesz a bejegyzés szövege',
                'categories' => ['Kategória1', 'Kategória2']
            ],
            [
                'title' => 'Bejegyzés 3',
                'author' => 'Szerző',
                'text' => 'Ez lesz a bejegyzés szövege',
                'categories' => ['Kategória1', 'Kategória2']
            ],
            [
                'title' => 'Bejegyzés 4',
                'author' => 'Szerző',
                'text' => 'Ez lesz a bejegyzés szövege',
                'categories' => ['Kategória1', 'Kategória2']
            ],
            [
                'title' => 'Bejegyzés 5',
                'author' => 'Szerző',
                'text' => 'Ez lesz a bejegyzés szövege',
                'categories' => ['Kategória1', 'Kategória2']
            ],
        ]
    @endphp

    <div class="container mx-auto p-3">
        <div class="grid grid-cols-1 lg:grid-cols-2 mb-4">
            <div>
                <h1 class="font-bold my-4 text-3xl">Üdvözlünk a blogon!</h1>
            </div>
            <div class="text-left lg:text-right">
                <p>Elérhető műveletek:</p>
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
                        <div class="col-span-3 lg:col-span-1 border p-4 border-gray-400 rounded">
                            <h3 class="text-xl mb-0.5 font-semibold">
                                {{ $post['title'] }}
                            </h3>
                            <p class="text-gray-400">
                                {{ $post['author'] }}
                            </p>
                            <p class="text-gray-600 text-xs">
                                {{ $post['text'] }}
                            </p>
                            <button class="bg-blue-500 hover:bg-blue-700 p-1.5 text-white mt-3 text-xs">Megtekint</button>
                        </div>
                    @empty
                        <div class="col-span-3 px-2 py-4 bg-blue-100 rounded">
                            Jelenleg még nincsenek bejegyzések!
                        </div>
                    @endforelse

                </div>
            </div>

            <!-- Sidebar -->
            <div class="col-span-4 lg:col-span-1">
                <h2 class="font-semibold text-2xl my-2">Oldalmenü</h2>
                <div class="grid grid-cols-1 gap-3">
                    <div class="border p-4 border-gray-600 rounded">card</div>
                    <div class="border p-4 border-gray-600 rounded">card</div>

                </div>
            </div>
        </div>

        <div x-data="{ open: false }">
            <button class="bg-gray-400 hover:bg-gray-700 p-2 text-white" x-on:click="open = ! open">Toggle Dropdown</button>

            <div x-show="open">
                Dropdown Contents...
            </div>
        </div>



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
    </div>



</x-guest-layout>
