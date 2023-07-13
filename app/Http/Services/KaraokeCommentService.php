<?php

namespace App\Http\Services;

use App\Http\Resources\KaraokeCommentResource;
use App\Models\KaraokeComment;

class KaraokeCommentService extends Service
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getKaraokeComments = KaraokeComment::orderBy('id', 'DESC')->get();
		
		return KaraokeCommentResource::collection($getKaraokeComments);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KaraokeComment  $karaokeComment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getKaraokeComments = KaraokeComment::where("karaoke_id", $id)->orderBy("id", "DESC")->get();
		
		return KaraokeCommentResource::collection($getKaraokeComments);
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
        $karaokeComment = new KaraokeComment;
        $karaokeComment->karaoke_id = $request->input('id');
        $karaokeComment->username = auth('sanctum')->user()->username;
        $karaokeComment->text = $request->input('text');
        $saved = $karaokeComment->save();

        // Show notification
        // $karaoke = Karaokes::where('id', $request->input('id'))->first();
        // $karaoke->users->username != auth()->user()->username &&
        // $karaoke->users->notify(new KaraokeCommentNotifications($karaoke->name));

		return [$saved, "Comment posted", $karaokeComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\KaraokeComments  $karaokeComments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = KaraokeComment::find($id)->delete();
		
		return [$deleted, "Comment deleted"];
    }
}
