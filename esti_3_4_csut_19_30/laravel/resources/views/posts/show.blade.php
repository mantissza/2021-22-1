<x-guest-layout>
    <div class="container mx-auto p-3 lg:px-36 overflow-hidden min-h-screen">
        <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="mb-5">
                <h1 class="text-3xl mb-2.5 font-semibold">
                    {{ $post->title }}
                </h1>
                <h2 class="text-gray-400">
                    <span class="mr-2"><i class="fas fa-user"></i> Szerző</span>
                    <span><i class="far fa-calendar-alt"></i> Date</span>
                </h2>
                <div class="flex flex-row flex-wrap gap-1 my-2.5">
                    <span class="py-0.5 px-1.5 font-semibold bg-blue-800 text-white">kategória1</span>
                    <span class="py-0.5 px-1.5 font-semibold bg-red-800 text-white">kat2</span>
                    <span class="py-0.5 px-1.5 font-semibold bg-yellow-800 text-white">kategória3</span>
                    <span class="py-0.5 px-1.5 font-semibold bg-green-800 text-white">kategória4</span>
                </div>
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Tristique sollicitudin nibh sit amet. Vivamus at augue eget arcu dictum varius duis at consectetur. Et odio pellentesque diam volutpat commodo. Et netus et malesuada fames ac. Elementum eu facilisis sed odio. Varius quam quisque id diam vel quam elementum. A diam sollicitudin tempor id eu. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Turpis massa tincidunt dui ut ornare lectus sit amet. Varius vel pharetra vel turpis nunc eget. Diam maecenas ultricies mi eget mauris pharetra et ultrices neque. Augue eget arcu dictum varius duis at consectetur. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Ornare arcu odio ut sem nulla pharetra. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. At quis risus sed vulputate odio ut enim. Nisl vel pretium lectus quam id. Ut porttitor leo a diam sollicitudin tempor. Aliquam purus sit amet luctus venenatis lectus. Amet nulla facilisi morbi tempus. Egestas dui id ornare arcu odio ut. Lobortis scelerisque fermentum dui faucibus in. Erat velit scelerisque in dictum non consectetur a erat nam. Aliquet bibendum enim facilisis gravida neque convallis. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Lectus magna fringilla urna porttitor rhoncus dolor purus non. Aliquet nec ullamcorper sit amet risus nullam eget felis.
            </p>
        </div>

        <div class="my-3">
            <h3 class="font-semibold text-xl">Csatolmány</h3>
            <a href="#" class="text-blue-400 hover:text-blue-600 hover:underline"><i class="fas fa-download"></i> csatolmany.pdf</a>
        </div>

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
