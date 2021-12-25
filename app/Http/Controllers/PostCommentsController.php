<?php

namespace App\Http\Controllers;

use App\Notifications\PostCommentNotifications;
use App\PostCommentLikes;
use App\PostComments;
use App\Posts;
use Illuminate\Http\Request;

class PostCommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getComments = PostComments::orderby('id', 'DESC')->get();

        $comments = [];

        foreach ($getComments as $key => $comment) {
            // Check if user has liked
            $hasLiked = PostCommentLikes::where('username', auth()->user()->username)
                ->where('comment_id', $comment->id)
                ->exists();

            array_push($comments, [
                "id" => $comment->id,
				"post_id" => $comment->post_id,
                "name" => $comment->users->name,
                "username" => $comment->users->username,
                "decos" => $comment->users->decos->count(),
                "pp" => preg_match("/http/", $comment->users->pp) ? $comment->users->pp : "/storage/" . $comment->users->pp,
                "text" => $comment->text,
                "hasLiked" => $hasLiked,
                "likes" => $comment->postCommentLikes->count(),
                "created_at" => $comment->created_at->format("d M Y"),
            ]);
        }

        return $comments;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        $this->validate($request, [
            'text' => 'required',
        ]);

        /* Create new comment */
        $postComment = new PostComments;
        $postComment->post_id = $request->input('post');
        $postComment->username = auth()->user()->username;
        $postComment->text = $request->input('text');
        $postComment->media = "";
        $postComment->save();

		// Get user details
        $musician = Posts::find($request->input('post'))->users;
        $musician->username != auth()->user()->username &&
        $musician->notify(new PostCommentNotifications);

        return response("Comment sent", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PostComments  $postComments
     * @return \Illuminate\Http\Response
     */
    public function show(PostComments $postComments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PostComments  $postComments
     * @return \Illuminate\Http\Response
     */
    public function edit(PostComments $postComments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PostComments  $postComments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PostComments $postComments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PostComments  $postComments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        PostCommentLikes::where('comment_id', $id)->delete();
        PostComments::find($id)->delete();

        return response("Comment deleted", 200);
    }
}
