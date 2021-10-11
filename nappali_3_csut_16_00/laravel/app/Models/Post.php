<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'text', 'disable_comments', 'hide_post', 'attachment_hash_name', 'attachment_file_name', 'thumbnail_hash_name'];
}
