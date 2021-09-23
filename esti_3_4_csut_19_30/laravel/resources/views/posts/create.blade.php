<x-guest-layout>
    <x-slot name="title">
        Új bejegyzés
    </x-slot>

    <div class="container mx-auto p-3 lg:px-36 overflow-hidden min-h-screen">
        <div class="mb-5">
            <h1 class="font-semibold text-3xl mb-4">Új bejegyzés</h1>
            <p class="mb-2">Ezen az oldalon tudsz új bejegyzést létrehozni.</p>
            <a href="/" class="text-blue-400 hover:text-blue-600 hover:underline"><i class="fas fa-long-arrow-alt-left"></i> Vissza a bejegyzésekhez</a>
        </div>

        @php
            $categories = [
                (object)[
                    'id' => 1,
                    'name' => 'kategória1',
                    'bgColor' => 'green',
                    'textColor' => '#fff',
                ],
                (object)[
                    'id' => 2,
                    'name' => 'kategória2',
                    'bgColor' => 'green',
                    'textColor' => '#fff',
                ],
                (object)[
                    'id' => 3,
                    'name' => 'kategória3',
                    'bgColor' => 'green',
                    'textColor' => '#fff',
                ],
                (object)[
                    'id' => 4,
                    'name' => 'kategória4',
                    'bgColor' => 'green',
                    'textColor' => '#fff',
                ],
                (object)[
                    'id' => 5,
                    'name' => 'kategória5',
                    'bgColor' => 'green',
                    'textColor' => '#fff',
                ],
                (object)[
                    'id' => 6,
                    'name' => 'kategória6',
                    'bgColor' => 'green',
                    'textColor' => '#fff',
                ],
            ];
        @endphp

        <form action="{{ route('posts.store') }}" method="POST">
            @csrf
            <div class="mb-5">
                <label for="title" class="block text-lg font-medium text-gray-700">Bejegyzés címe</label>
                <input type="text" name="title" id="title" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm @error('title') border-red-500 @else border-gray-300 @enderror" value="{{ old('title') }}">
                @error('title')
                    <p class="text-red-700 pt-0.5 text-sm">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-5">
                <label for="text" class="block text-lg font-medium text-gray-700">Bejegyzés szövege</label>
                <textarea rows="5" name="text" id="text" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm  @error('text') border-red-500 @else border-gray-300 @enderror">{{ old('text') }}</textarea>
                @error('text')
                    <p class="text-red-700 pt-0.5 text-sm">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-5">
                <label for="name" class="block text-lg font-medium text-gray-700">Kategóriák</label>
                <div class="flex flex-col gap-1.5 mt-2">
                    @forelse ($categories as $category)
                        <div class="flex items-center gap-1.5">
                            <input
                                type="checkbox"
                                value="{{ $category->id }}"
                                id="category{{ $loop->iteration }}"
                                name="categories[]"
                                @if (is_array(old('categories')) && in_array($category->id, old('categories')))
                                    checked
                                @endif
                            >
                            <label for="category{{ $loop->iteration }}" class="py-0.5 px-1.5 font-semibold" style="background-color: {{ $category->bgColor }}; color: {{ $category->textColor }};">
                                {{ $category->name }}
                            </label>
                        </div>
                    @empty
                        <p>Nincsenek kategóriák</p>
                    @endforelse
                </div>
            </div>

            <div class="mb-5">
                <label for="name" class="block  text-lg font-medium text-gray-700">Beállítások</label>
                <div class="flex flex-col gap-1.5 mt-2">
                    <div class="flex items-center gap-1.5">
                        <input type="checkbox" id="disable-comments" name="disable-comments">
                        <label for="disable-comments">
                            Hozzászólások kikapcsolása
                        </label>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <input type="checkbox" id="disable-comments" name="disable-comments">
                        <label for="disable-comments">
                            Bejegyzés elrejtése
                        </label>
                    </div>
                </div>
            </div>

            <div class="mb-5">
                <label for="name" class="block  text-lg font-medium text-gray-700">Csatolmány</label>
                <input type="file" class="form-control-file" id="attachment" name="attachment">
            </div>

            <button type="submit" class="mt-6 bg-blue-500 hover:bg-blue-600 text-gray-100 font-semibold px-2 py-1 text-xl">Létrehozás</button>
        </form>
    </div>

</x-guest-layout>
