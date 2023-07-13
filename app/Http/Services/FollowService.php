<?php

namespace App\Http\Services;

use App\Models\BoughtAudio;
use App\Models\BoughtVideo;
use App\Models\Follow;

class FollowService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$follow = "data";

        // Check if user has bought video or audio
        $hasBoughtVideo = BoughtVideo::where("username", auth("sanctum")->user()->username)
            ->where("artist", $request->input("musician"))
            ->exists();

        $hasBoughtAudio = BoughtAudio::where("username", auth("sanctum")->user()->username)
            ->where("artist", $request->input("musician"))
            ->exists();

        if ($hasBoughtVideo || $hasBoughtAudio || $this->username == "@blackmusic") {
            // Check if user has followed
            $hasFollowed = Follow::where('followed', $request->musician)
                ->where('username', auth('sanctum')->user()->username)
                ->exists();

            if ($hasFollowed) {
                Follow::where('followed', $request->musician)
                    ->where('username', auth('sanctum')->user()->username)
                    ->delete();

                $message = 'You Unfollowed ' . $request->musician;
                $added = false;
            } else {
                $follow = new Follow;
                $follow->followed = $request->input('musician');
                $follow->username = auth('sanctum')->user()->username;
                $follow->muted = ["posts" => false, "stories" => false];
                $follow->save();

                $message = 'You Followed ' . $request->musician;
                $added = true;
            }

            return [$added, $message, $follow];
        }

        $message = "You must have bought atleast one song by " . $request->musician;

        return [false, $message, $follow];
    }
}
