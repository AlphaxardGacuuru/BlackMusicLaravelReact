<?php

namespace App\Http\Controllers;

use App\AudioCommentLikes;
use App\AudioComments;
use App\Audios;
use App\Notifications\AudioCommentNotifications;
use Illuminate\Http\Request;

class AudioCommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getAudioComments = AudioComments::all();

        $audioComments = [];

        foreach ($getAudioComments as $key => $audioComment) {

            // Check if user has liked comment
            $hasLiked = AudioCommentLikes::where('username', auth()->user()->username)
                ->where('comment_id', $audioComment->id)
                ->exists();

            array_push($audioComments, [
                "id" => $audioComment->id,
                "audio_id" => $audioComment->audio_id,
                "text" => $audioComment->text,
                "username" => $audioComment->username,
                "name" => $audioComment->users->name,
                "pp" => preg_match("/http/", $audioComment->users->pp) ?
                $audioComment->users->pp : "/storage/" . $audioComment->users->pp,
                "hasLiked" => $hasLiked,
                "likes" => $audioComment->audioCommentLikes->count(),
                "created_at" => $audioComment->created_at->format("d M Y"),
            ]);
        }

        return $audioComments;
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

        /* Create new post */
        $audioComment = new AudioComments;
        $audioComment->audio_id = $request->input('audio');
        $audioComment->username = auth()->user()->username;
        $audioComment->text = $request->input('text');
        $audioComment->save();

        // Show notification
        $audio = Audios::where('id', $request->input('audio'))->first();
        $audio->users->username != auth()->user()->username &&
        $audio->users->notify(new AudioCommentNotifications($audio->name));

        return response('Comment Posted', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AudioComments  $audioComments
     * @return \Illuminate\Http\Response
     */
    public function show(AudioComments $audioComments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AudioComments  $audioComments
     * @return \Illuminate\Http\Response
     */
    public function edit(AudioComments $audioComments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AudioComments  $audioComments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AudioComments $audioComments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AudioComments  $audioComments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $audioComment = AudioComments::where('id', $id)->first();
        AudioCommentLikes::where('comment_id', $id)->delete();
        AudioComments::find($id)->delete();

        return response('Comment deleted', 200);
    }
}
