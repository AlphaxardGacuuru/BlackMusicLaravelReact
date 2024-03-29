<?php

namespace App\Http\Controllers;

use App\Follows;
use App\Polls;
use App\PostCommentLikes;
use App\PostComments;
use App\PostLikes;
use App\Posts;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        // Check if user is logged in
        if (Auth::check()) {
            $authUsername = auth()->user()->username;
        } else {
            $authUsername = '@guest';
        }

        // Get Posts
        $getPosts = Posts::orderBy('id', 'DESC')->get();

        $posts = [];

        foreach ($getPosts as $post) {

            // Profile Pic
            $pp = preg_match("/http/", $post->users->pp) ?
            $post->users->pp :
            "/storage/" . $post->users->pp;

            // Check if user has followed Musician
            $hasFollowed = Follows::where('followed', $post->username)
                ->where('username', $authUsername)
                ->exists();

            // Check if user has liked post
            $hasLiked = PostLikes::where('post_id', $post->id)
                ->where('username', $authUsername)
                ->exists();

            // Check if user has voted for parameter 1
            $hasVoted1 = Polls::where('username', $authUsername)
                ->where('post_id', $post->id)
                ->where('parameter', $post->parameter_1)
                ->exists();

            // Check if user has voted for parameter 2
            $hasVoted2 = Polls::where('username', $authUsername)
                ->where('post_id', $post->id)
                ->where('parameter', $post->parameter_2)
                ->exists();

            // Check if user has voted for parameter 3
            $hasVoted3 = Polls::where('username', $authUsername)
                ->where('post_id', $post->id)
                ->where('parameter', $post->parameter_3)
                ->exists();

            // Check if user has voted for parameter 4
            $hasVoted4 = Polls::where('username', $authUsername)
                ->where('post_id', $post->id)
                ->where('parameter', $post->parameter_4)
                ->exists();

            // Check if user has voted for parameter 5
            $hasVoted5 = Polls::where('username', $authUsername)
                ->where('post_id', $post->id)
                ->where('parameter', $post->parameter_5)
                ->exists();

            // Get total votes
            $totalVotes = $post->polls->count();

            $countParameter1 = $post->polls
                ->where('parameter', $post->parameter_1)
                ->count();

            $percentage1 = $countParameter1 > 0 ? $countParameter1 / $totalVotes * 100 : 0;

            $countParameter2 = $post->polls
                ->where('parameter', $post->parameter_2)
                ->count();

            $percentage2 = $countParameter2 > 0 ? $countParameter2 / $totalVotes * 100 : 0;

            $countParameter3 = $post->polls
                ->where('parameter', $post->parameter_3)
                ->count();

            $percentage3 = $countParameter3 > 0 ? $countParameter3 / $totalVotes * 100 : 0;

            $countParameter4 = $post->polls
                ->where('parameter', $post->parameter_4)
                ->count();

            $percentage4 = $countParameter4 > 0 ? $countParameter4 / $totalVotes * 100 : 0;

            $countParameter5 = $post->polls
                ->where('parameter', $post->parameter_5)
                ->count();

            $percentage5 = $countParameter5 > 0 ? $countParameter5 / $totalVotes * 100 : 0;

            $pollsPercentages = [
                $post->parameter_1 => $percentage1,
                $post->parameter_2 => $percentage2,
                $post->parameter_3 => $percentage3,
                $post->parameter_4 => $percentage4,
                $post->parameter_5 => $percentage5,
            ];

            // Get parameter with the most votes
            $winner = array_keys($pollsPercentages, max($pollsPercentages));

			$winner = count($winner) > 1 ? "" : $winner[0];

            // Check if poll is within 24Hrs
            $isWithin24Hrs = Posts::where('id', $post->id)
                ->where('created_at', '>', Carbon::now()->subDays(1)->toDateTimeString())
                ->exists();

            // Check whether the post is edited
            $hasEdited = $post->created_at != $post->updated_at ? true : false;

            array_push($posts, [
                "id" => $post->id,
                "name" => $post->users->name,
                "username" => $post->users->username,
                "pp" => $pp,
                "decos" => $post->users->decos->count(),
                "text" => $post->text,
                "media" => $post->media,
                "parameter_1" => $post->parameter_1,
                "parameter_2" => $post->parameter_2,
                "parameter_3" => $post->parameter_3,
                "parameter_4" => $post->parameter_4,
                "parameter_5" => $post->parameter_5,
                "hasVoted1" => $hasVoted1,
                "hasVoted2" => $hasVoted2,
                "hasVoted3" => $hasVoted3,
                "hasVoted4" => $hasVoted4,
                "hasVoted5" => $hasVoted5,
                "percentage1" => $percentage1,
                "percentage2" => $percentage2,
                "percentage3" => $percentage3,
                "percentage4" => $percentage4,
                "percentage5" => $percentage5,
                "winner" => $winner,
                "totalVotes" => $totalVotes,
                "isWithin24Hrs" => $isWithin24Hrs,
                "hasFollowed" => $hasFollowed,
                "hasLiked" => $hasLiked,
                "hasEdited" => $hasEdited,
                "likes" => $post->postLikes->count(),
                "comments" => $post->postComments->count(),
                "created_at" => $post->created_at->format("d F Y"),
            ]);
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
        if ($request->hasFile('filepond-media')) {
            /* Handle media upload */
            $media = $request->file('filepond-media')->store('public/post-media');
            $media = substr($media, 7);
            return $media;
        } else {

            $this->validate($request, [
                'text' => 'required',
                // 'media' => 'image|nullable|max:9999',
            ]);

            // /* Handle file upload */
            // if ($request->hasFile('media')) {
            //     $path = $request->file('media')->store('public/post-media');
            // } else {
            //     $path = "";
            // }

            /* Create new post */
            $post = new Posts;
            $post->username = auth()->user()->username;
            $post->text = $request->input('text');
            // $post->media = substr($path, 7);
            $post->media = $request->input('media');
            $post->parameter_1 = $request->input('para1') ? $request->input('para1') : "";
            $post->parameter_2 = $request->input('para2') ? $request->input('para2') : "";
            $post->parameter_3 = $request->input('para3') ? $request->input('para3') : "";
            $post->parameter_4 = $request->input('para4') ? $request->input('para4') : "";
            $post->parameter_5 = $request->input('para5') ? $request->input('para5') : "";
            $post->save();

            return response('Post Created', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
    public function update(Request $request, $id)
    {
        $post = Posts::find($id);
        $post->text = $request->input('text');
        $post->save();

        return response("Post Edited", 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Posts  $posts
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Check file extension and handle filepond delete accordingly
        $ext = substr($id, -3);

        if ($ext == 'jpg' || $ext == 'png' || $ext == 'gif') {
            Storage::delete('public/post-media/' . $id);
            return response("Post media deleted", 200);
        } else {
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
}
