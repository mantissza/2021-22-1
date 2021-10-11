<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\PostController;
use App\Models\Category;
use App\Models\Post;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    //return view('welcome');
    return redirect()->route('posts.index');
});

// Resource route létrehozása a posts név köré (/posts /posts/id, stb lesz)
// A route-ok megtekinthetők a php artisan route:list paranccsal
Route::resource('posts', PostController::class);

Route::get('/categories/create', function () {
    return view('categories.create');
})->name('categories.create');

Route::post('/categories/store', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|min:2',
        'bg-color' => 'required|regex:/#([a-fA-F0-9]{8})/',
        'text-color' => 'required|regex:/#([a-fA-F0-9]{8})/',
    ], [
        'name.required' => 'A név megadása kötelező',
    ]);
    Category::create([
        'name' => $validated['name'],
        'bg_color' => $validated['bg-color'],
        'text_color' => $validated['text-color']
    ]);
})->name('categories.store');

/*
Route::get('/posts/create', function () {
    return view('posts.create');
})->name('posts.create');

Route::post('/posts/store', function (Request $request) {
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
    $data['disable_comments'] = false;
    $data['hide_post'] = false;
    if ($request->has('disable_comments')) {
        $data['disable_comments'] = true;
    }
    if ($request->has('hide_post')) {
        $data['hide_post'] = true;
    }
    if ($request->hasFile('attachment')) {
        $file = $request->file('attachment');
        $data['attachment_hash_name'] = $file->hashName();
        $data['attachment_file_name'] = $file->getClientOriginalName();
        Storage::disk('public')->put('attachments/' . $data['attachment_hash_name'], $file->get());
    }
    if ($request->hasFile('thumbnail')) {
        $file = $request->file('thumbnail');
        $data['thumbnail_hash_name'] = $file->hashName();
        Storage::disk('public')->put('thumbnails/' . $data['thumbnail_hash_name'], $file->get());
    }
    //error_log(json_encode($data));
    $post = Post::create($data);
    // TODO: redirect
})->name('posts.store');
*/

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
