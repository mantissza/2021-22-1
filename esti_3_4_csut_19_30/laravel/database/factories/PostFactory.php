<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            /*
                Str::ucfirst() - Str Upper Case First - első betű nagybetűsítése, ez egy Laravel Helper function (https://laravel.com/docs/8.x/helpers)
                $this->faker->numberBetween(2,6)  - Random szám 2 és 6 között, a 2-t és a 6-ot is beleértve
                $this->faker->words() - 3 szót ad, tömbként
                $this->faker->words(N) - N szót ad, tömbként
                $this->faker->words(N, true) - N szót ad, stringgé joinolva (szóközökkel elválasztva)

                Ezeket kell kombinálni, hogy 2-6 szót adjon, majd azt nagybetűsíteni

                A paragraphs nagyon hasonló, Tinkerben ki lehet próbálni
            */
            'title' =>  Str::ucfirst($this->faker->words($this->faker->numberBetween(2,6), true)),
            'text' => $this->faker->paragraphs($this->faker->numberBetween(2,5), true),
        ];
    }
}
