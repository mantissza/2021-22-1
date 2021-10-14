<x-guest-layout>
    <div class="container mx-auto p-3 lg:px-36 overflow-hidden min-h-screen">
        <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="mb-5">
                <h1 class="text-3xl mb-2.5 font-semibold">
                    {{ $post->title }}
                </h1>
                <h2 class="text-gray-400">
                    <span class="mr-2"><i class="fas fa-user"></i> {{
                        $post->author_id
                            ? $post->author->name
                            : 'Nincs szerző'
                    }}</span>
                    <span><i class="far fa-calendar-alt"></i> {{ $post->created_at->format('Y. m. d.') }}</span>
                </h2>

                @if ($categories_count > 0)
                    <div class="flex flex-row flex-wrap gap-1 my-2.5">
                        @foreach ($categories as $category)
                            <span class="py-0.5 px-1.5 font-semibold" style="background-color: {{ $category->bg_color }} !important; color: {{ $category->text_color }} !important;">
                                {{ $category->name }}
                            </span>
                        @endforeach
                    </div>
                @endif

                <a href="/" class="text-blue-400 hover:text-blue-600 hover:underline"><i class="fas fa-long-arrow-alt-left"></i> Vissza a bejegyzésekhez</a>
            </div>
            <div class="flex items-center gap-2 lg:justify-end">
                <button class="bg-blue-500 hover:bg-blue-700 px-2 py-1 text-white"><i class="far fa-edit"></i> Módosítás</button>
                <button class="bg-red-500 hover:bg-red-700 px-2 py-1 text-white"><i class="far fa-trash-alt"></i> Törlés</button>
            </div>
        </div>

        @if (Session::has('post_created'))
            <div class="px-3 py-5 mb-5 bg-green-500 text-white font-semibold">
                A bejegyzés sikeresen létre lett hozva!
            </div>
        @endif

        <div class="my-3">
            {!! nl2br(e($post->text)) !!}
        </div>

        @if ($post->attachment_hash_name !== null && $post->attachment_file_name !== null)
            <div class="my-3">
                <h3 class="font-semibold text-xl">Csatolmány</h3>
                <a href="{{ route('posts.attachment', ['id' => $post->id]) }}" class="text-blue-400 hover:text-blue-600 hover:underline"><i class="fas fa-download"></i> {{ $post->attachment_file_name }}</a>
            </div>
        @endif

        <div>
            <h3 class="font-semibold text-xl">Hozzászólások</h3>
            <p>Jelenleg nincsenek hozzászólások</p>
        </div>

        <div class="my-3">
            <label for="text" class="block text-lg font-medium text-gray-700">Hozzászólás írása</label>
            <textarea rows="5" name="text" id="text" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300" placeholder="Ide írhatsz hozzászólást"></textarea>
            <button type="submit" class="mt-3 bg-blue-500 hover:bg-blue-600 text-gray-100 px-2 py-1"><i class="far fa-comment"></i> Hozzászólás elküldése</button>
        </div>
    </div>

</x-guest-layout>
