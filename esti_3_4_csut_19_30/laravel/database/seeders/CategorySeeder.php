<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Szúrjon be 8 db kategóriát az adatbázisba, amit a factoryval generált ki
        Category::factory(8)->create();
    }
}
