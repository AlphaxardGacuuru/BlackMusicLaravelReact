<?php

namespace App\Http\Controllers;

use App\VideoComments;
use App\VideoCommentLikes;
use Illuminate\Http\Request;

class VideoCommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return VideoComments::all();
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
            'text' => 'required'
        ]);

        /* Create new post */
        $videoComment = new VideoComments;
        $videoComment->video_id = $request->input('video');
        $videoComment->username = auth()->user()->username;
        $videoComment->text = $request->input('text');
        $videoComment->save();

        return response('Comment Posted', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\VideoComments  $videoComments
     * @return \Illuminate\Http\Response
     */
    public function show(VideoComments $videoComments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\VideoComments  $videoComments
     * @return \Illuminate\Http\Response
     */
    public function edit(VideoComments $videoComments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\VideoComments  $videoComments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VideoComments $videoComments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\VideoComments  $videoComments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $videoComment = VideoComments::where('id', $id)->first();
        VideoCommentLikes::where('comment_id', $id)->delete();
        VideoComments::find($id)->delete();

        return response('Comment deleted', 200);
    }
}
