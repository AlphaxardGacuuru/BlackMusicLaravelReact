<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\VideoComment;
use App\Models\VideoCommentLike;
use Faker\Generator as Faker;

$factory->define(VideoComment::class, function (Faker $faker) {
    return [
        'text' => $faker->realText($maxNbChars = 20, $indexSize = 2),
    ];
});

// User Follows themselves and Black Music after creation
$factory->afterCreating(VideoComment::class, function (VideoComment $comment) {
    factory(VideoCommentLike::class)
        ->count(1)
        ->create([
            'username' => User::all()->random()->username,
            'video_comment_id' => $comment->id,
        ]);
});
