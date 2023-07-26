<?php

namespace App\Http\Services;

use App\Http\Resources\AudioCommentResource;
use App\Models\AudioComment;

class AudioCommentService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getAudioComments = AudioComment::orderBy('id', 'DESC')->get();

        return AudioCommentResource::collection($getAudioComments);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AudioComment  $audioComment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getAudioComments = AudioComment::where("audio_id", $id)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return AudioCommentResource::collection($getAudioComments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        /* Create new post */
        $audioComment = new AudioComment;
        $audioComment->audio_id = $request->input('id');
        $audioComment->username = auth('sanctum')->user()->username;
        $audioComment->text = $request->input('text');

        $saved = $audioComment->save();

        return [$saved, "Comment posted", $audioComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AudioComments  $audioComments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = AudioComment::find($id)->delete();

		return [$deleted, "Comment deleted"];
    }
}
