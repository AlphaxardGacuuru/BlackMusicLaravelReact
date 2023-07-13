<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\Follow;
use App\Models\Post;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'text' => $faker->realText($maxNbChars = 20, $indexSize = 2),
    ];
});

$factory->afterCreating(Post::class, function (Post $post) {
    // Check if @blackmusic already follows
    $hasntFollowed = Follow::where("followed", $post->username)
        ->where("username", "@blackmusic")
        ->doesntExist();

    if ($hasntFollowed) {
        factory(Follow::class)
            ->create([
                "followed" => $post->username,
                "username" => "@blackmusic",
                "muted" => ["posts" => false, "stories" => false],
            ]);
    }
});
