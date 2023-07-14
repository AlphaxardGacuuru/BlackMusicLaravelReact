<?php

namespace Database\Factories;

use App\Models\Audio;
use App\Models\AudioAlbum;
use App\Models\AudioComment;
use App\Models\AudioLike;
use App\Models\CartAudio;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(Audio::class, function (Faker $faker) {
    $album = AudioAlbum::all()->random();

    $genres = ["Afro", "Benga", "Blues", "Boomba", "Country"];

    return [
        'audio' => 'audios/' . rand(1, 5) . '.mp3',
        'name' => $faker->catchPhrase(),
        'audio_album_id' => $album->id,
        'genre' => $genres[rand(0, 4)],
        "thumbnail" => 'audio-thumbnails/' . rand(1, 5) . '.jpg',
        'description' => $faker->realText($maxNbChars = 20, $indexSize = 2),
        'released' => $faker->dateTime(),
        'username' => $album->username,
    ];
});

$factory->afterCreating(Audio::class, function (Audio $audio) {
    // Create Audio Likes
    factory(AudioLike::class)
        ->create([
            'audio_id' => $audio->id,
            'username' => $audio->username,
        ]);

    // Create Audio Comments
    factory(AudioComment::class, rand(1, 5))
        ->create([
            'audio_id' => $audio->id,
            'username' => User::all()->random()->username,
        ]);

    // Add Audio to every user's cart
    $users = User::all();

    foreach ($users as $user) {
        factory(CartAudio::class)
            ->create([
                'audio_id' => $audio->id,
                'username' => $user->username,
            ]);
    }
});
