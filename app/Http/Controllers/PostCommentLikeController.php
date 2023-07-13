<?php

namespace App\Http\Controllers;

use App\Events\PostCommentLikedEvent;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\PostCommentLike;
use App\Http\Services\PostCommentLikeService;
use Illuminate\Http\Request;

class PostCommentLikeController extends Controller
{
    public function __construct(protected PostCommentLikeService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        [$saved, $message] = $this->service->store($request);

        // Dispatch
        $comment = PostComment::findOrFail($request->input("comment"));

        $post = Post::find($comment->post_id);

        PostCommentLikedEvent::dispatchif($saved, $comment, $post);

        return response([
            "message" => $message,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PostCommentLike  $postCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(PostCommentLike $postCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PostCommentLike  $postCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PostCommentLike $postCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PostCommentLike  $postCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(PostCommentLike $postCommentLike)
    {
        //
    }
}
