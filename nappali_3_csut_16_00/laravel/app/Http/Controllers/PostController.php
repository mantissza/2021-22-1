<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Category;
use App\Models\Post;
use Storage;

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
        $request->session()->flash('post_created', true);
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
