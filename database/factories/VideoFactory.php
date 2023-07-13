<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\CartVideo;
use App\Models\User;
use App\Models\Video;

$factory->define(Video::class, function (Faker $faker) {
    return [
        'video' => 'videos/1.mp3',
        'name' => $faker->catchPhrase(),
        'genre' => $faker->catchPhrase(),
        'thumbnail' => 'video-thumbnails/1.jpg',
        'description' => $faker->realText($maxNbChars = 20, $indexSize = 2),
        'released' => $faker->dateTime(),
    ];
});

// User Follows themselves and Black Music after creation
$factory->afterCreating(Video::class, function (Video $video) {
    $users = User::all();

    foreach ($users as $user) {
        factory(CartVideo::class)
            ->create([
                'video_id' => $video->id,
                'username' => $user->username,
            ]);
    }
});
