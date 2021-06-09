<?php

namespace App\Http\Controllers;

use App\Polls;
use App\Post;
use App\PostCommentLikes;
use App\PostComments;
use App\PostLikes;
use App\Posts;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Posts::all();

        foreach ($posts as $key => $value) {
            $posts[$key] = array(
                "id" => $value->id,
                "username" => $value->username,
                "text" => $value->text,
                "media" => $value->media,
                "parameter_1" => $value->parameter_1,
                "parameter_2" => $value->parameter_2,
                "parameter_3" => $value->parameter_3,
                "parameter_4" => $value->parameter_4,
                "parameter_5" => $value->parameter_5,
                "updated_at" => $value->created_at->format('j M Y'),
                "created_at" => $value->created_at->format('j M Y'),
            );
        }

        return $posts;
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
            'media' => 'image|nullable|max:9999',
        ]);

        /* Handle file upload */
        if ($request->hasFile('media')) {
            $path = $request->file('media')->store('public/post-media');
        } else {
            $path = "";
        }

        /* Create new post */
        $post = new Posts;
        $post->username = auth()->user()->username;
        $post->text = $request->input('text');
        $post->media = substr($path, 7);
        $post->parameter_1 = $request->input('para1') ? $request->input('para1') : "";
        $post->parameter_2 = $request->input('para2') ? $request->input('para2') : "";
        $post->parameter_3 = $request->input('para3') ? $request->input('para3') : "";
        $post->parameter_4 = $request->input('para4') ? $request->input('para4') : "";
        $post->parameter_5 = $request->input('para5') ? $request->input('para5') : "";
        $post->save();

        return redirect('posts')->with('success', 'Post Sent');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function show(Posts $posts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function edit(Posts $posts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Posts $posts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Posts::where('id', $id)->first();
        Storage::delete('public/' . $post->media);
        Polls::where('post_id', $post->id)->delete();
        $comments = PostComments::where('post_id', $id)->get();
        foreach ($comments as $comment) {
            PostCommentLikes::where('comment_id', $comment->id)->delete();
        }
        PostComments::where('post_id', $id)->delete();
        PostLikes::where('post_id', $id)->delete();
        Posts::find($id)->delete();

		return response("Post deleted", 200);
    }
}
