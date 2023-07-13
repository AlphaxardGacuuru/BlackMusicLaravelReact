<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\Chat;
use App\Models\User;

$factory->define(Chat::class, function (Faker $faker) {
    return [
        "username" => User::all()->random()->username,
        "to" => User::all()->random()->username,
        "text" => $faker->realText($maxNbChars = 20, $indexSize = 2),
        "media" => "chat-media/1jpg",
    ];
});
