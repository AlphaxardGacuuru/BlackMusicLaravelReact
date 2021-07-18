<?php

namespace App\Http\Controllers;

use App\AudioCommentLikes;
use Illuminate\Http\Request;

class AudioCommentLikesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AudioCommentLikes::all();
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
        $audioCommentLikeCount = AudioCommentLikes::where('comment_id', $request->input('comment'))
            ->where('username', auth()->user()->username)->count();

        if ($audioCommentLikeCount > 0) {
            AudioCommentLikes::where('comment_id', $request->input('comment'))
                ->where('username', auth()->user()->username)->delete();

            $message = "Like removed";
        } else {
            $audioCommentLike = new AudioCommentLikes;
            $audioCommentLike->comment_id = $request->input('comment');
            $audioCommentLike->username = auth()->user()->username;
            $audioCommentLike->save();
            $message = "Comment liked";
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AudioCommentLikes  $audioCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function show(AudioCommentLikes $audioCommentLikes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AudioCommentLikes  $audioCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function edit(AudioCommentLikes $audioCommentLikes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AudioCommentLikes  $audioCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AudioCommentLikes $audioCommentLikes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AudioCommentLikes  $audioCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function destroy(AudioCommentLikes $audioCommentLikes)
    {
        //
    }
}
