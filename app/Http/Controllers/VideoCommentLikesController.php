<?php

namespace App\Http\Controllers;

use App\VideoCommentLikes;
use Illuminate\Http\Request;

class VideoCommentLikesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return VideoCommentLikes::all();
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\VideoCommentLikes  $videoCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function show(VideoCommentLikes $videoCommentLikes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\VideoCommentLikes  $videoCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function edit(VideoCommentLikes $videoCommentLikes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\VideoCommentLikes  $videoCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VideoCommentLikes $videoCommentLikes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\VideoCommentLikes  $videoCommentLikes
     * @return \Illuminate\Http\Response
     */
    public function destroy(VideoCommentLikes $videoCommentLikes)
    {
        //
    }
}
