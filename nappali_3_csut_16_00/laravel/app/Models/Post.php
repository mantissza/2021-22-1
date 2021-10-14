<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // A Mass Assignment-hez (https://laravel.com/docs/8.x/eloquent#mass-assignment) szükséges a fillable megléte:
    protected $fillable = ['title', 'text', 'disable_comments', 'hide_post', 'attachment_hash_name', 'attachment_file_name', 'thumbnail_hash_name'];

    public function author() {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function categories() {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }
}
