<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\Poll;
use App\Models\User;

$factory->define(Poll::class, function (Faker $faker) {
    return [
        'username' => User::all()->random()->username,
    ];
});
