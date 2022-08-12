<?php

namespace App\Http\Controllers;

use App\KaraokeCommentLikes;
use Illuminate\Http\Request;

class KaraokeCommentLikesController extends Controller
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
        $karaokeCommentLikeCount = KaraokeCommentLikes::where('comment_id', $request->input('comment'))
            ->where('username', auth()->user()->username)
            ->count();

        if ($karaokeCommentLikeCount > 0) {
            KaraokeCommentLikes::where('comment_id', $request->input('comment'))
                ->where('username', auth()->user()->username)
                ->delete();

            $message = "Like removed";
        } else {
            $karaokeCommentLike = new KaraokeCommentLikes;
            $karaokeCommentLike->comment_id = $request->input('comment');
            $karaokeCommentLike->username = auth()->user()->username;
            $karaokeCommentLike->save();

            $message = "Comment liked";

            // Show notification
            // $karaokeComment = KaraokeComments::where('id', $request->input('comment'))->first();
            // $karaoke = $karaokeComment->karaokes;
            // $karaoke->users->username != auth()->user()->username &&
            // $karaoke->users->notify(new KaraokeCommentLikeNotifications($karaoke->name));
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\KaraokeCommentLikes  $karaokeCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function show(KaraokeCommentLikes $karaokeCommentLikes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\KaraokeCommentLikes  $karaokeCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KaraokeCommentLikes $karaokeCommentLikes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\KaraokeCommentLikes  $karaokeCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function destroy(KaraokeCommentLikes $karaokeCommentLikes)
    {
        //
    }
}
