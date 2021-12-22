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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

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

        foreach ($getPosts as $key => $post) {

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

            // Get percentage for parameter 1
            // Get total polls for parameter 1
            $totalParameter = Polls::where('post_id', $post->id)
                ->count();

            // Check if total polls for parameter 1 is not 0
            if ($totalParameter > 0) {
                $countParameter1 = Polls::where('post_id', $post->id)
                    ->where('parameter', $post->parameter_1)
                    ->count();
                $percentage1 = $countParameter1 / $totalParameter * 100;
            } else {
                $percentage1 = 0;
            }

            // Check if total polls for parameter 2 is not 0
            if ($totalParameter > 0) {
                $countParameter2 = Polls::where('post_id', $post->id)
                    ->where('parameter', $post->parameter_2)
                    ->count();
                $percentage2 = $countParameter2 / $totalParameter * 100;
            } else {
                $percentage2 = 0;
            }

            // Check if total polls for parameter 1 is not 0
            if ($totalParameter > 0) {
                $countParameter3 = Polls::where('post_id', $post->id)
                    ->where('parameter', $post->parameter_3)
                    ->count();
                $percentage3 = $countParameter3 / $totalParameter * 100;
            } else {
                $percentage3 = 0;
            }

            // Check if total polls for parameter 1 is not 0
            if ($totalParameter > 0) {
                $countParameter4 = Polls::where('post_id', $post->id)
                    ->where('parameter', $post->parameter_4)
                    ->count();
                $percentage4 = $countParameter4 / $totalParameter * 100;
            } else {
                $percentage4 = 0;
            }

            // Check if total polls for parameter 5 is not 0
            if ($totalParameter > 0) {
                $countParameter5 = Polls::where('post_id', $post->id)
                    ->where('parameter', $post->parameter_5)
                    ->count();
                $percentage5 = $countParameter5 / $totalParameter * 100;
            } else {
                $percentage5 = 0;
            }

            // Get total votes
            $totalVotes = Polls::where("post_id", $post->id)
                ->count();

            // Check if poll is within 24Hrs
            $isWithin24Hrs = Posts::where('id', $post->id)
                ->where('created_at', '>', Carbon::now()->subDays(1)->toDateTimeString())
                ->exists();

            array_push($posts, [
                "id" => $post->id,
                "name" => $post->users->name,
                "username" => $post->users->username,
                "pp" => preg_match("/http/", $post->users->pp) ? $post->users->pp : "/storage/" . $post->users->pp,
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
                "totalVotes" => $totalVotes,
                "isWithin24Hrs" => $isWithin24Hrs,
                "hasFollowed" => $hasFollowed,
                "hasLiked" => $hasLiked,
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

            return redirect('posts')->with('success', 'Post Sent');
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
