<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\Follow;
use App\Models\Story;

$factory->define(Story::class, function (Faker $faker) {
    return [
        "username" => $faker->name(),
        "text" => $faker->realText($maxNbChars = 20, $indexSize = 2),
        "media" => [["image" => "stories/1.jpg"]],
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
