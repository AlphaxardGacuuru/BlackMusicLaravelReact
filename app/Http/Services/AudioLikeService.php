<?php

namespace App\Http\Services;

use App\Models\AudioLike;

class AudioLikeService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$audioLike = "data";
		
        $hasLiked = AudioLike::where('audio_id', $request->input('audio'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        if ($hasLiked) {
            AudioLike::where('audio_id', $request->input('audio'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = "Like removed";
            $added = false;
        } else {
            $audioLike = new AudioLike;
            $audioLike->audio_id = $request->input('audio');
            $audioLike->username = auth('sanctum')->user()->username;
            $audioLike->save();

            $message = "Audio liked";
            $added = true;
        }

        return [$added, $message, $audioLike];
    }
}
