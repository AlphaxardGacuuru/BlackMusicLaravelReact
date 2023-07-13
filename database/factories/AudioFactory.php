<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use App\Models\Audio;
use App\Models\CartAudio;
use App\Models\User;

$factory->define(Audio::class, function (Faker $faker) {
    return [
        'audio' => 'audios/1.mp3',
        'name' => $faker->catchPhrase(),
        'genre' => $faker->catchPhrase(),
        'thumbnail' => $faker->catchPhrase(),
        'description' => $faker->realText($maxNbChars = 20, $indexSize = 2),
        'released' => $faker->dateTime(),
    ];
});

// User Follows themselves and Black Music after creation
$factory->afterCreating(Audio::class, function (Audio $audio) {
    $users = User::all();

    foreach ($users as $user) {
        factory(CartAudio::class)->create([
            'audio_id' => $audio->id,
            'username' => $user->username,
        ]);
    }
});
