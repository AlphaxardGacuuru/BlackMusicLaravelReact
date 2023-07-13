<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\VideoAlbum;

$factory->define(VideoAlbum::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'cover' => 'video-album-covers/musical-note.png',
        'released' => $faker->dateTime(),
    ];
});
