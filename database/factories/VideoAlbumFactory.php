<?php

namespace Database\Factories;

use App\Models\User;
use Faker\Generator as Faker;
use App\Models\VideoAlbum;

$factory->define(VideoAlbum::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'cover' => 'video-album-covers/' . rand(1, 5) . '.jpg',
        'released' => $faker->dateTime(),
        'username' => User::all()->random()->username,
    ];
});
