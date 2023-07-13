<?php

namespace App\Http\Services;

use App\Models\VideoCommentLike;

class VideoCommentLikeService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$videoCommentLike = "data";
        
		$hasLiked = VideoCommentLike::where('video_comment_id', $request->input('comment'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        if ($hasLiked) {
            VideoCommentLike::where('video_comment_id', $request->input('comment'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = "Like removed";
            $added = false;
        } else {
            $videoCommentLike = new VideoCommentLike;
            $videoCommentLike->video_comment_id = $request->input('comment');
            $videoCommentLike->username = auth('sanctum')->user()->username;
            $videoCommentLike->save();

            $message = "Comment liked";
            $added = true;
        }

        return [$added, $message, $videoCommentLike];
    }
}
