<?php

namespace Database\Factories;

use App\Models\Follow;
use App\Models\Story;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Story::class, function (Faker $faker) {
    return [
        "username" => User::all()->random()->username,
        "text" => $faker->realText($maxNbChars = 20, $indexSize = 2),
        "media" => [["image" => "stories/" . rand(1, 5) . ".jpg"]],
    ];
});

$factory->afterCreating(Story::class, function (Story $story) {
    // Check if @blackmusic already follows
    $hasntFollowed = Follow::where("followed", $story->username)
        ->where("username", "@blackmusic")
        ->doesntExist();

    if ($hasntFollowed) {
        factory(Follow::class)
            ->create([
                "followed" => $story->username,
                "username" => "@blackmusic",
                "muted" => ["posts" => false, "stories" => false],
            ]);
    }
});
