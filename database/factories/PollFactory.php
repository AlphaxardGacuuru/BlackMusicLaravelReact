<?php

namespace Database\Factories;

use App\Models\Poll;
use App\Models\Post;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Poll::class, function (Faker $faker) {
    $parameters = ["A", "B", "C", "D", "E"];

    return [
		'post_id' => Post::all()->random()->id,
        'username' => User::all()->random()->username,
        'parameter' => $parameters[rand(0, 4)],
    ];
});
