<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Truncate futtatása, ez gyakorlatilag reseteli a táblát: mindent alapértékekre állít és törli az adatokat
        // Ugyanez működik delete-el is, de akkor az id-k nem 1-ről fognak indulni, hiszen az csak az adatokat törli,
        // és az id tovább fog inkrementálódni
        DB::table('posts')->truncate();
        // 25 db post létrehozása
        \App\Models\Post::factory(25)->create();
    }
}
