<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('text');
            // A title és a text mindenképp kell, de a többinél megadunk default értéket, vagy nullable
            // opciót, vagyis, ha nem adunk meg értéket a create során, akkor NULL értéket vegyen fel a
            // mező.
            // Éppen ezért elég a factory-hoz is csak a title-el és a text-el foglalkozni, hiszen a többél
            // van default meghatározott viselkedésünk
            $table->boolean('disable_comments')->default(false);
            $table->boolean('hide_post')->default(false);
            $table->string('attachment_hash_name')->nullable();
            $table->string('attachment_file_name')->nullable();
            $table->string('thumbnail_hash_name')->nullable();
            $table->unsignedBigInteger('author_id')->nullable();
            $table->timestamps();

            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
