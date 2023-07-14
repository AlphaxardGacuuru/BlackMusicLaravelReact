<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\KaraokeComment;
use App\Models\KaraokeCommentLike;
use App\Models\User;

$factory->define(KaraokeComment::class, function (Faker $faker) {
    return [
        'text' => $faker->realText($maxNbChars = 20, $indexSize = 2),
    ];
});

// User Follows themselves and Black Music after creation
$factory->afterCreating(KaraokeComment::class, function (KaraokeComment $comment) {
    factory(KaraokeCommentLike::class, 1)
        ->create([
            'username' => User::all()->random()->username,
            'karaoke_comment_id' => $comment->id,
        ]);
});
