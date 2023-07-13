<?php

namespace App\Http\Services;

use App\Models\KaraokeCommentLike;

class KaraokeCommentLikeService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$karaokeCommentLike = "data";
		
        $hasLiked = KaraokeCommentLike::where('karaoke_comment_id', $request->input('comment'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        if ($hasLiked) {
            KaraokeCommentLike::where('karaoke_comment_id', $request->input('comment'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = "Like removed";
			$added = false;
        } else {
			$karaokeCommentLike = new KaraokeCommentLike;
            $karaokeCommentLike->karaoke_comment_id = $request->input('comment');
            $karaokeCommentLike->username = auth('sanctum')->user()->username;
            $karaokeCommentLike->save();

            $message = "Comment liked";
			$added = true;

            // Show notification
            // $karaokeComment = KaraokeComments::where('id', $request->input('comment'))->first();
            // $karaoke = $karaokeComment->karaokes;
            // $karaoke->users->username != auth()->user()->username &&
            // $karaoke->users->notify(new KaraokeCommentLikeNotifications($karaoke->name));
        }

		return [$added, $message, $karaokeCommentLike];
    }
}
