<?php

namespace App\Http\Services;

use App\Models\PostCommentLike;

class PostCommentLikeService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$postCommentLike = "data";
		
        $hasLiked = PostCommentLike::where('post_comment_id', $request->input('comment'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        if ($hasLiked) {
            PostCommentLike::where('post_comment_id', $request->input('comment'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = 'Like removed';
            $added = false;
        } else {
            $postCommentLike = new PostCommentLike;
            $postCommentLike->post_comment_id = $request->input('comment');
            $postCommentLike->username = auth('sanctum')->user()->username;
            $postCommentLike->save();

            $message = 'Comment liked';
            $added = true;
        }

        return [$added, $message, $postCommentLike];
    }
}
