<?php

namespace Database\Factories;

use App\Models\Audio;
use App\Models\Karaoke;
use App\Models\KaraokeComment;
use App\Models\KaraokeLike;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Karaoke::class, function (Faker $faker) {
    return [
        'karaoke' => 'karaokes/' . rand(1, 5) . '.mp4',
        'username' => User::all()->random()->username,
        'audio_id' => Audio::all()->random()->id,
        'description' => $faker->realText($maxNbChars = 20, $indexSize = 2),
    ];
});

// User Follows themselves and Black Music after creation
$factory->afterCreating(Karaoke::class, function (Karaoke $karaoke) {
    // Create Karaoke Likes
    factory(KaraokeLike::class)
        ->create([
            'karaoke_id' => $karaoke->id,
            'username' => $karaoke->username,
        ]);

    // Create Karaoke Comments
    factory(KaraokeComment::class, rand(1, 5))
        ->create([
            'karaoke_id' => $karaoke->id,
            'username' => User::all()->random()->username,
        ]);
});
