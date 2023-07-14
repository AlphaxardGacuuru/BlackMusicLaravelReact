<?php

namespace Database\Factories;

use App\Models\AudioAlbum;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(AudioAlbum::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'cover' => 'audio-album-covers/' . rand(1, 5) . '.jpg',
        'released' => $faker->dateTime(),
        'username' => User::all()->random()->username,
    ];
});
