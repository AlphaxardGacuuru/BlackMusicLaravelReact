<?php

namespace Database\Factories;

use App\Models\CartVideo;
use App\Models\User;
use App\Models\Video;
use App\Models\VideoAlbum;
use App\Models\VideoComment;
use App\Models\VideoLike;
use Faker\Generator as Faker;

$factory->define(Video::class, function (Faker $faker) {
    $album = VideoAlbum::all()->random();

    $genres = ["Afro", "Benga", "Blues", "Boomba", "Country"];

    return [
        'video' => 'videos/' . rand(1, 5) . '.mp4',
        'name' => $faker->catchPhrase(),
        'video_album_id' => $album->id,
        'genre' => $genres[rand(0, 4)],
        "thumbnail" => 'video-thumbnails/' . rand(1, 5) . '.jpg',
        'description' => $faker->realText($maxNbChars = 20, $indexSize = 2),
        'released' => $faker->dateTime(),
        'username' => $album->username,
    ];
});

$factory->afterCreating(Video::class, function (Video $video) {
    // Create Video Likes
    factory(VideoLike::class)
        ->create([
            'video_id' => $video->id,
            'username' => $video->username,
        ]);

    // Create Video Comments
    factory(VideoComment::class, rand(1, 5))
        ->create([
            'video_id' => $video->id,
            'username' => User::all()->random()->username,
        ]);

    // Add Video to every user's cart
    $users = User::all();

    foreach ($users as $user) {
        factory(CartVideo::class)
            ->create([
                'video_id' => $video->id,
                'username' => $user->username,
            ]);
    }
});
