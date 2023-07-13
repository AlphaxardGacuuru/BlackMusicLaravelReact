<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\Karaoke;

$factory->define(Karaoke::class, function (Faker $faker) {
    return [
        'karaoke' => 'karaokes/1.mp4',
        'description' => $faker->realText($maxNbChars = 20, $indexSize = 2),
    ];
});
