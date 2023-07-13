<?php

namespace App\Http\Services;

use App\Http\Resources\PostResource;
use App\Models\Follow;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class PostService extends Service
{
    public function index()
    {
        // Get posts based on whether current user is guest
        if ($this->username != "@guest") {
            // Get Posts if user has followed musician and is not muted
            $getPosts = Post::select("posts.*", "follows.muted->posts as muted", "follows.blocked")
                ->join("follows", fn($join) =>
                    $join->on("follows.followed", "=", "posts.username")
                        ->where("follows.username", "=", "@blackmusic"))
                ->where("follows.muted->posts", false);
        } else {
            $getPosts = Post::where("username", "@blackmusic");
        }

        $posts = $getPosts
            ->orderBy("posts.id", "DESC")
            ->cursorPaginate(2);

        return PostResource::collection($posts);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AudioAlbum  $audioAlbum
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);

        return new PostResource($post);
    }

    /* Create new post */
    public function store($request)
    {
        $post = new Post;
        $post->username = auth('sanctum')->user()->username;
        $post->text = $request->input('text');
        $post->media = $request->input('media');
        $post->parameter_1 = $request->input('para1') ? $request->input('para1') : "";
        $post->parameter_2 = $request->input('para2') ? $request->input('para2') : "";
        $post->parameter_3 = $request->input('para3') ? $request->input('para3') : "";
        $post->parameter_4 = $request->input('para4') ? $request->input('para4') : "";
        $post->parameter_5 = $request->input('para5') ? $request->input('para5') : "";

        $saved = $post->save();

        return [$saved, "Post posted", $post];
    }

    // Update Post
    public function update($request, $id)
    {
        $post = Post::find($id);
        $post->text = $request->input('text');
        $saved = $post->save();

        return [$saved, "Post edited", $post];
    }

    // Delete Post
    public function destory($id)
    {
        $post = Post::where('id', $id)->first();

        $media = substr($post->media, 9);

        Storage::delete("public/" . $media);

        $deleted = Post::find($id)->delete();

        return [$deleted, "Post deleted"];
    }

    /*
     * Mute */
    public function mute($username)
    {
        // Get follow
        $follow = Follow::where("followed", $username)
            ->where("username", $this->username)
            ->first();

        // Check if Posts are muted
        if ($follow->muted["posts"]) {
            $muted = $follow->muted;
            $muted["posts"] = false;
            $follow->muted = $muted;

            $message = "You unmuted posts from " . $username;
        } else {
            $muted = $follow->muted;
            $muted["posts"] = true;
            $follow->muted = $muted;

            $message = "You muted posts from " . $username;
        }

        $saved = $follow->save();

        return [$saved, $message];
    }

    /*
     * Artist's Posts */
    public function artistPosts($username)
    {
        // Get Artist's Posts with muted info
        $getArtistPosts = Post::select("posts.*", "follows.muted->posts as muted", "follows.blocked")
            ->join("follows", fn($join) =>
                $join->on("follows.followed", "=", "posts.username")
                    ->where("follows.username", "=", $this->username))
            ->where("posts.username", $username)
            ->orderBy("posts.id", "DESC")
            ->get();

        return PostResource::collection($getArtistPosts);
    }
}
