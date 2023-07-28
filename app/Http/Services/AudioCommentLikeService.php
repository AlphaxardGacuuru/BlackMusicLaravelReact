<?php

namespace App\Http\Services;

use App\Models\AudioCommentLike;

class AudioCommentLikeService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$audioCommentLike = "data";
		
        $hasLiked = AudioCommentLike::where('audio_comment_id', $request->input('comment'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        if ($hasLiked) {
            AudioCommentLike::where('audio_comment_id', $request->input('comment'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = "Like removed";
            $added = false;
        } else {
            $audioCommentLike = new AudioCommentLike;
            $audioCommentLike->audio_comment_id = $request->input('comment');
            $audioCommentLike->username = auth('sanctum')->user()->username;
            $audioCommentLike->save();

            $message = "Comment liked";
            $added = true;
        }

		// Check if user is owner of audio comment
		$notCurrentUser = $audioCommentLike->comment->username != $this->username;
		// Dispatch if comment is saved successfully and user is not owner of audio comment
		$canDispatch = $notCurrentUser && $added;

        return [$canDispatch, $message, $audioCommentLike];
    }
}
