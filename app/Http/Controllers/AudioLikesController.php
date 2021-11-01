<?php

namespace App\Http\Controllers;

use App\AudioLikes;
use App\Audios;
use App\Notifications\AudioLikeNotifications;
use Illuminate\Http\Request;

class AudioLikesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AudioLikes::all();
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
        $audioLikeCount = AudioLikes::where('audio_id', $request->input('audio'))
            ->where('username', auth()->user()->username)->count();

        if ($audioLikeCount > 0) {
            AudioLikes::where('audio_id', $request->input('audio'))->where('username', auth()->user()->username)->delete();

            $message = "Like removed";
        } else {
            $audioLike = new AudioLikes;
            $audioLike->audio_id = $request->input('audio');
            $audioLike->username = auth()->user()->username;
            $audioLike->save();

            $message = "Audio liked";

            // Show notification
            $audio = Audios::where('id', $request->input('audio'))->first();
            $audio->users->username != auth()->user()->username &&
            $audio->users->notify(new AudioLikeNotifications($audio->name));
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AudioLikes  $audioLikes
     * @return \Illuminate\Http\Response
     */
    public function show(AudioLikes $audioLikes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AudioLikes  $audioLikes
     * @return \Illuminate\Http\Response
     */
    public function edit(AudioLikes $audioLikes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AudioLikes  $audioLikes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AudioLikes $audioLikes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AudioLikes  $audioLikes
     * @return \Illuminate\Http\Response
     */
    public function destroy(AudioLikes $audioLikes)
    {
        //
    }
}
