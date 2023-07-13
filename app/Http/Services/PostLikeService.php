<?php

namespace App\Http\Services;

use App\Models\PostLike;

class PostLikeService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$postLike = "data";
		
        $hasLiked = PostLike::where('post_id', $request->input('post'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        if ($hasLiked) {
            PostLike::where('post_id', $request->input('post'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = "Like removed";
            $added = false;
        } else {
            $postLike = new PostLike;
            $postLike->post_id = $request->input('post');
            $postLike->username = auth('sanctum')->user()->username;
            $postLike->save();

            $message = "Post liked";
            $added = true;
        }

        return [$added, $message, $postLike];
    }
}
