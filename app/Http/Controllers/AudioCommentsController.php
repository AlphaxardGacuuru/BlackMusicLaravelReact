<?php

namespace App\Http\Controllers;

use App\AudioComments;
use App\AudioCommentLikes;
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
        return AudioComments::all();
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
