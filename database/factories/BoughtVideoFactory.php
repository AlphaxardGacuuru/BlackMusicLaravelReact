<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Models\BoughtVideo;
use App\Models\User;
use App\Models\Video;
use Faker\Generator as Faker;

$factory->define(BoughtVideo::class, function (Faker $faker) {
	$video = Video::all()->random();

    return [
        "video_id" => $video->id,
        "price" => "10",
		"username" => User::all()->random()->username,
		"name" => $video->name,
		"artist" => $video->user->username
    ];
});
