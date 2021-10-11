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

        {{-- Az enctype-ot be kell állítani multipart form data-ra, hogy a form képes legyen fájlokat is elküldeni --}}
        <form action="{{ route('posts.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="mb-5">
                <label for="title" class="block text-lg font-medium text-gray-700">Bejegyzés címe</label>
                <input type="text" name="title" id="title" value="{{ old('title') }}" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm @error('title') border-red-400 @else border-gray-400 @enderror">
                @error('title')
                    <p class="text-red-500">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-5">
                <label for="text" class="block text-lg font-medium text-gray-700">Bejegyzés szövege</label>
                <textarea rows="5" name="text" id="text" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm @error('text') border-red-400 @else border-gray-400 @enderror">{{ old('text') }}</textarea>
                @error('text')
                    <p class="text-red-500">{{ $message }}</p>
                @enderror
            </div>

            @php
                $categories = [
                    (object)['id' => 1, 'name' => 'kategória1', 'bgColor' => '#fff', 'textColor' => '#000'],
                    (object)['id' => 2, 'name' => 'kategória2', 'bgColor' => 'green', 'textColor' => '#fff'],
                    (object)['id' => 3, 'name' => 'kategória3', 'bgColor' => 'red', 'textColor' => '#fff'],
                    (object)['id' => 4, 'name' => 'kategória4', 'bgColor' => 'purple', 'textColor' => '#fff'],
                ];
            @endphp

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
                            <label
                                for="category{{ $loop->iteration }}"
                                style="background-color: {{ $category->bgColor }}; color: {{ $category->textColor }}"
                                class="py-0.5 px-1.5 font-semibol"
                            >
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
                        <input type="checkbox" id="disable_comments" name="disable_comments" {{ old('disable_comments') ? 'checked' : '' }}>
                        <label for="disable_comments">
                            Hozzászólások kikapcsolása
                        </label>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <input type="checkbox" id="hide_post" name="hide_post" {{ old('hide_post') ? 'checked' : '' }}>
                        <label for="hide_post">
                            Bejegyzés elrejtése
                        </label>
                    </div>
                </div>
            </div>

            @error('disable_comments')
                    <p class="text-red-500">{{ $message }}</p>
                @enderror

            <div class="mb-5">
                <label for="name" class="block  text-lg font-medium text-gray-700">Kép</label>
                <input type="file" class="form-control-file" id="thumbnail" name="thumbnail">
                @error('thumbnail')
                    <p class="text-red-500">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-5">
                <label for="name" class="block  text-lg font-medium text-gray-700">Csatolmány</label>
                <input type="file" class="form-control-file" id="attachment" name="attachment">
                @error('attachment')
                    <p class="text-red-500">{{ $message }}</p>
                @enderror
            </div>

            <button type="submit" class="mt-6 bg-blue-500 hover:bg-blue-600 text-gray-100 font-semibold px-2 py-1 text-xl">Létrehozás</button>
        </form>
    </div>

</x-guest-layout>
