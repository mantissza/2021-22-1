<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        /*$this->call(CategorySeeder::class);
        $this->call(PostSeeder::class);*/
        // \App\Models\User::factory(10)->create();

        DB::table('users')->truncate();
        DB::table('categories')->truncate();
        DB::table('posts')->truncate();

        $users = collect();
        $users_count = rand(5, 10);
        for ($i = 1; $i <= $users_count; $i++) {
            $users->add(
                User::factory()->create([
                    'name' => 'user'.$i,
                    'email' => 'user'.$i.'@szerveroldali.hu',
                ])
            );
        }

        $categories = Category::factory(rand(7, 14))->create();
        $posts = Post::factory(rand(20, 40))->create();

        // Kapcsolatok létrehozása a fent létrehozott modellek között
        $posts->each(function ($post) use ($users, $categories) {
            // 1. Szerzőt kell rendelni a bejegyzéshez
            if ($users->isNotEmpty()) {
                $post->author()->associate($users->random());
                $post->save();
            }

            // 2. Kategóriákat kell rendelni a bejegyzéshez
            if ($categories->isNotEmpty()) {
                $post->categories()->sync(
                    $categories
                        ->random(
                            rand(1, $categories->count())
                        )
                        ->pluck('id')
                        ->toArray()
                );
            }
        });
    }
}
