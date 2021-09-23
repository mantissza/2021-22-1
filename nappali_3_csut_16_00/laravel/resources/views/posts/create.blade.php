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

        <form action="{{ route('posts.store') }}" method="POST">
            @csrf
            <div class="mb-5">
                <label for="title" class="block text-lg font-medium text-gray-700">Bejegyzés címe</label>
                <input type="text" name="title" id="title" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300">
            </div>

            <div class="mb-5">
                <label for="text" class="block text-lg font-medium text-gray-700">Bejegyzés szövege</label>
                <textarea rows="5" name="text" id="text" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300"></textarea>
            </div>

            <div class="mb-5">
                <label for="name" class="block text-lg font-medium text-gray-700">Kategóriák</label>
                <div class="flex flex-col gap-1.5 mt-2">
                    <div class="flex items-center gap-1.5">
                        <input type="checkbox" value="1" id="category1" name="categories[]">
                        <label for="category1" class="py-0.5 px-1.5 font-semibold bg-green-800 text-white">
                            kategória1
                        </label>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <input type="checkbox" value="2" id="category2" name="categories[]">
                        <label for="category1" class="py-0.5 px-1.5 font-semibold bg-blue-800 text-white">
                            kategória2
                        </label>
                    </div>
                </div>
            </div>

            <div class="mb-5">
                <label for="name" class="block  text-lg font-medium text-gray-700">Beállítások</label>
                <div class="flex flex-col gap-1.5 mt-2">
                    <div class="flex items-center gap-1.5">
                        <input type="checkbox" id="disable_comments" name="disable_comments">
                        <label for="disable_comments">
                            Hozzászólások kikapcsolása
                        </label>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <input type="checkbox" id="hide_post" name="hide_post">
                        <label for="hide_post">
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
