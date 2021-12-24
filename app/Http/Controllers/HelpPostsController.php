<?php

namespace App\Http\Controllers;

use App\HelpPosts;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class HelpPostsController extends Controller
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

		$getHelpPosts = HelpPosts::orderBy('id', 'ASC')->get();

		$helpPosts = [];

		// Populate array
        foreach ($getHelpPosts as $key => $helpPost) {

            // Check if user has liked post
            // $hasLiked = HelpPostLikes::where('help_post_id', $helpPost->id)
            //     ->where('username', $authUsername)
            //     ->exists();

            array_push($helpPosts, [
                "id" => $helpPost->id,
                "name" => $helpPost->users->name,
                "username" => $helpPost->users->username,
                "pp" => preg_match("/http/", $helpPost->users->pp) ? $helpPost->users->pp : "/storage/" . $helpPost->users->pp,
                "decos" => $helpPost->users->decos->count(),
                "text" => $helpPost->text,
                "media" => $helpPost->media,
                // "hasLiked" => $hasLiked,
                // "likes" => $helpPost->helpPostLikes->count(),
                "created_at" => $helpPost->created_at->format("d/m/Y h:ia"),
            ]);
        }

		return $helpPosts;
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
            $media = $request->file('filepond-media')->store('public/help-post-media');
            $media = substr($media, 7);
            return $media;
        } else {

            $this->validate($request, [
                'text' => 'required',
            ]);

            /* Create new post */
            $helpPost = new HelpPosts;
            $helpPost->username = auth()->user()->username;
            $helpPost->to = '@blackmusic';
            $helpPost->text = $request->input('text');
            $helpPost->media = $request->input('media');
            $helpPost->save();

            return response('Sent', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\HelpPosts  $helpPosts
     * @return \Illuminate\Http\Response
     */
    public function show(HelpPosts $helpPosts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\HelpPosts  $helpPosts
     * @return \Illuminate\Http\Response
     */
    public function edit(HelpPosts $helpPosts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\HelpPosts  $helpPosts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HelpPosts $helpPosts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\HelpPosts  $helpPosts
     * @return \Illuminate\Http\Response
     */
    public function destroy(HelpPosts $helpPosts)
    {
        //
    }
}
