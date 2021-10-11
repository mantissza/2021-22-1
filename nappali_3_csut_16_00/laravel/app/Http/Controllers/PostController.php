<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Category;
use App\Models\Post;
use Storage;

/*
    A resource controller így épül fel, a postokkal (bejegyzésekkel) elmagyarázva:

        index:      az összes post megjelenítése (főoldal)
        create:     a create oldal behozása, ahol a post-ot létrehozó form van
        store:      a create oldalon lévő formot ide küldjük el, ez validálja az adatokat, majd tárolja el a postot
        edit:       ugyanaz, mint a create, csak egy már létező post-ot módosító form-ot ad be
        update:     ugyanaz, mint a store, csak az edit form-ját fogadja, és a módosításokat validálja, tárolja le
        destroy:    post törlése
*/

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users_count = User::count();
        $categories_count = Category::count();
        $posts_count = Post::count();
        $posts = Post::all();
        return view('posts.index', compact('users_count','categories_count','posts_count','posts'));
        /*
            A compact-ot valahogy így kell elképzelni:

                $a = 1;
                $b = 2;
                compact('a','b') az lesz, hogy ['a' => 1, 'b' => 2], Tinkerben is ki lehet próbálni

            A view-nak 2. paraméterben lehet adatot átadni egy tömbben:

                view('posts.index', [
                    'users_count' => $users_count,
                    'categories_count' => $categories_count,
                    'posts_count' => $posts_count
                ]);

            Gondolj bele, a compact is ezzel ekvivalens dolgot csinál, csak "kompaktabb" :)
        */
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('posts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|min:2|max:255',
            'text' => 'required|min:5',
            'categories.*' => 'integer|distinct', // TODO! Ha lesz adatb
            //'disable_comments' => 'nullable|boolean',
            //'hide_post' => 'nullable|boolean',
            'attachment' => 'nullable|file|mimes:txt,doc,docx,pdf,xls|max:4096',
            'thumbnail' => 'nullable|file|mimes:jpg,png|max:4096',
        ], [
            'title.required' => 'A cím megadása kötelező',
            'text.min' => 'A bejegyzés szövege legalább :min karakter legyen'
        ]);
        // Ezek az adatok csak akkor érkeznek meg a request-ben, ha a user a böngészőben
        // kijelölte a checkbox-ot. A request->has() azt mondja meg, hogy az adott névvel
        // szerepel-e a request-ben az input mező, vagyis, hogy el lett-e küldve.
        $data['disable_comments'] = false;
        $data['hide_post'] = false;
        if ($request->has('disable_comments')) {
            $data['disable_comments'] = true;
        }
        if ($request->has('hide_post')) {
            $data['hide_post'] = true;
        }
        // Ha a requestben az attachment nevű inputon érkezett fájl, akkor lekérjük a fájlt
        // (a request->file() egy UploadedFile-t ad vissza, lásd api reference), aminek aztán
        // le tudjuk kérni a hash-elt nevét és az eredeti nevét (vagyis ha a kliens pl egy
        // valami.txt-t töltött fel, akkor az az eredeti név).
        // Ezután a public nevű disk-re (disk-eket lásd config/filesystems.php) rakjuk a put-tal
        // a fájlt, megadva az útvonalát és a tartalmát (file->get az UploadedFile tartalmát
        // adja meg)
        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $data['attachment_hash_name'] = $file->hashName();
            $data['attachment_file_name'] = $file->getClientOriginalName();
            Storage::disk('public')->put('attachments/' . $data['attachment_hash_name'], $file->get());
        }
        // Ugyanaz kb, mint a fenti, csak itt nem tároljuk el az erdeti nevet, mivel nincs jelentősége
        // Az attachment-nél az oldalon megjelenik majd a fájlnév, ott azért van, de itt csak egy képet
        // töltünk be, és kész
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $data['thumbnail_hash_name'] = $file->hashName();
            Storage::disk('public')->put('thumbnails/' . $data['thumbnail_hash_name'], $file->get());
        }
        // Debug
        //error_log(json_encode($data));
        // A postot létrehozzuk a data-val (ez egy tömb, amiben megvannak a kulcsok)
        $post = Post::create($data);
        // Be flash-eljük a session-be a post_created logikai értéket, ez arra kell, hogy
        // eszerint feltételesen meg tudjunk jeleníteni egy alert-et, hogy a post létrehozása
        // sikerült
        $request->session()->flash('post_created', true);
        // Átirányítunk a létrehozott post oldalára, ennek két szerepe is van:
        //  1. a form nem küldhető el újra reloaddal
        //  2. innentől nem "fehér oldalt" látunk, hanem a létrejött bejegyzés oldalára navigálunk
        // A route-nak átadjuk a post-ot, a resource routing ebből ki fogja szedni az
        // "id" nevű mezőt, és az alapján fogja azonosítani a post-ot
        return redirect()->route('posts.show', $post);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return view('posts.show', compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
