<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Post;
use Faker;

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
        $this->call(PostSeeder::class);
        error_log('Database Seeder');*/
        // \App\Models\User::factory(10)->create();

        $faker = Faker\Factory::create();

        DB::table('users')->truncate();
        DB::table('categories')->truncate();
        DB::table('posts')->truncate();

        $users = collect();

        $users_count = $faker->numberBetween(5, 10);

        for ($i = 1; $i <= $users_count; $i++) {
            $users->add(
                User::factory()->create([
                    'name' => 'user'.$i,
                    'email' => 'user'.$i.'@szerveroldali.hu',
                ])
            );
        }

        $categories = Category::factory($faker->numberBetween(7, 14))->create();
        $posts = Post::factory($faker->numberBetween(20, 40))->create();

        // Adatbázis kapcsolatok
        $posts->each(function ($post) use (&$users, &$categories, &$faker) {
            // Szerző hozzácsatolása
            if ($users->isNotEmpty()) {
                $post->author()->associate($users->random());
                $post->save();
            }

            // Kategóriák hozzácsatolása
            if ($categories->isNotEmpty()) {
                $category_ids = Category::all()
                    ->random(
                        $faker->numberBetween(1, $categories->count())
                    )
                    ->pluck('id')
                    ->toArray();
                $post->categories()->sync($category_ids);
            }
        });
    }
}
