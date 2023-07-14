<?php

namespace Database\Factories;

use App\Models\Follow;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\PostLike;
use App\Models\User;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'username' => User::all()->random()->username,
        'text' => $faker->realText($maxNbChars = 20, $indexSize = 2),
		'media' => 'post-media/' . rand(1, 5) . '.jpg',
    ];
});

$factory->afterCreating(Post::class, function (Post $post) {
    // Create Post Likes
    factory(PostLike::class)
        ->create([
            'post_id' => $post->id,
            'username' => $post->username,
        ]);

    // Create Post Comments
    factory(PostComment::class, rand(1, 5))
        ->create([
            'post_id' => $post->id,
            'username' => User::all()->random()->username,
        ]);

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
