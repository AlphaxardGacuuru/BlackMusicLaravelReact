<?php

namespace App\Http\Controllers;

use App\HelpPostLikes;
use Illuminate\Http\Request;

class HelpPostLikesController extends Controller
{
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
        $helpPostLikeCount = HelpPostLikes::where('help_post_id', $request->input('help-post'))
            ->where('username', auth()->user()->username)
            ->count();

        if ($helpPostLikeCount > 0) {
            HelpPostLikes::where('help_post_id', $request->input('help-post'))
                ->where('username', auth()->user()->username)
                ->delete();

            $message = "Like removed";
        } else {
            $helpPostLike = new HelpPostLikes;
            $helpPostLike->help_post_id = $request->input('help-post');
            $helpPostLike->username = auth()->user()->username;
            $helpPostLike->save();
            $message = "Post liked";

            // Show notification
            $user = HelpPosts::find($request->input('help-post'))->users;
            $user->username != auth()->user()->username &&
            $user->notify(new HelpPostLikeNotifications);
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\HelpPostLikes  $helpPostLikes
     * @return \Illuminate\Http\Response
     */
    public function show(HelpPostLikes $helpPostLikes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\HelpPostLikes  $helpPostLikes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HelpPostLikes $helpPostLikes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\HelpPostLikes  $helpPostLikes
     * @return \Illuminate\Http\Response
     */
    public function destroy(HelpPostLikes $helpPostLikes)
    {
        //
    }
}
