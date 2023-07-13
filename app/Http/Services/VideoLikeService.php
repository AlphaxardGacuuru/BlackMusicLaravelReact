<?php

namespace App\Http\Services;

use App\Models\VideoLike;

class VideoLikeService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$videoLike = "data";
		
        $hasLiked = VideoLike::where('video_id', $request->input('video'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        if ($hasLiked) {
            VideoLike::where('video_id', $request->input('video'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = "Like removed";
            $added = false;
        } else {
            $videoLike = new VideoLike;
            $videoLike->video_id = $request->input('video');
            $videoLike->username = auth('sanctum')->user()->username;
            $videoLike->save();

            $message = "Video liked";
            $added = true;
        }

        return [$added, $message, $videoLike];
    }
}
