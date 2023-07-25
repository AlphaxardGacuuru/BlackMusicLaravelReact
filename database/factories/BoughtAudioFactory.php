<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\Audio;
use App\Models\BoughtAudio;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(BoughtAudio::class, function (Faker $faker) {
	$audio = Audio::all()->random();

    return [
        "audio_id" => $audio->id,
        "price" => "10",
		"username" => User::all()->random()->username,
		"name" => $audio->name,
		"artist" => $audio->user->username
    ];
});
