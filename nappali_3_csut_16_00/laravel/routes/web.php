<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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
    return view('welcome');
});

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
})->name('categories.store');

Route::get('/posts/create', function () {
    return view('posts.create');
})->name('posts.create');

Route::post('/posts/store', function (Request $request) {
    $validated = $request->validate([
        'title' => 'required|min:2',
        'text' => 'required|min:5',
        'categories.*' => 'integer|distinct', // TODO! Ha lesz adatb
        'disable_comments' => 'nullable|boolean',
        'hide_post' => 'nullable|boolean',
    ], [
        'title.required' => 'A cím megadása kötelező',
    ]);
})->name('posts.store');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
