<?php

namespace Database\Factories;

use App\Models\AudioLike;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(AudioLike::class, function (Faker $faker) {
    return [
        'username' => User::all()->random()->username,
    ];
});
