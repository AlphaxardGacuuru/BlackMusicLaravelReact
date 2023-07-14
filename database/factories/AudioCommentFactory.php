<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\AudioComment;
use App\Models\AudioCommentLike;
use App\Models\User;

$factory->define(AudioComment::class, function (Faker $faker) {
    return [
        'text' => $faker->realText($maxNbChars = 20, $indexSize = 2),
        'username' => User::all()->random()->username,
    ];
});

$factory->afterCreating(AudioCommentLike::class, function (AudioComment $comment) {
    factory(AudioCommentLike::class)
        ->create([
            'username' => User::all()->random()->username,
            'audio_comment_id' => $comment->id,
        ]);
});
