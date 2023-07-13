<?php

namespace Database\Factories;

use App\Models\AudioAlbum;
use Faker\Generator as Faker;

$factory->define(AudioAlbum::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'cover' => 'audio-album-covers/musical-note.png',
        'released' => $faker->dateTime(),
    ];
});
