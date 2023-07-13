<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\AudioComment;
use App\Models\AudioCommentLike;
use App\Models\User;

$factory->define(AudioComment::class, function (Faker $faker) {
    return [
        'text' => $faker->realText($maxNbChars = 20, $indexSize = 2),
    ];
});

$factory->afterCreating(AudioCommentLike::class, function (AudioComment $comment) {
    factory(AudioCommentLike::class, 1)
        ->create([
            'username' => User::all()->random()->username,
            'audio_comment_id' => $comment->id,
        ]);
});
