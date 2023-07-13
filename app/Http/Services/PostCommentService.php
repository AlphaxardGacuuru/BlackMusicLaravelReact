<?php

namespace App\Http\Services;

use App\Http\Resources\PostCommentResource;
use App\Models\PostComment;

class PostCommentService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getComments = PostComment::orderby('id', 'DESC')->get();

        return PostCommentResource::collection($getComments);
    }

    /**
     * Display a specific resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getComments = PostComment::where("post_id", $id)->orderby('id', 'DESC')->get();

        return PostComment::collection($getComments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        /* Create new comment */
        $postComment = new PostComment;
        $postComment->post_id = $request->input('id');
        $postComment->username = auth('sanctum')->user()->username;
        $postComment->text = $request->input('text');
        $postComment->media = null;

        $saved = $postComment->save();

        return [$saved, "Comment posted", $postComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PostComments  $postComments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = PostComment::find($id)->delete();
		
		return [$deleted, "Comment deleted"];
    }
}
