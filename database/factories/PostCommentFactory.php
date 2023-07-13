<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\PostComment;
use App\Models\PostCommentLike;
use App\Models\User;

$factory->define(PostComment::class, function (Faker $faker) {
    return [
        'text' => $faker->realText($maxNbChars = 20, $indexSize = 2),
    ];
});

// User Follows themselves and Black Music after creation
$factory->afterCreating(PostComment::class, function (PostComment $comment) {
    factory(PostCommentLike::class, 1)
        ->create([
            'username' => User::all()->random()->username,
            'post_comment_id' => $comment->id,
        ]);
});
