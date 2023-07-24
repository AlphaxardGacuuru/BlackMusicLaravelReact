<?php

namespace App\Http\Controllers;

use App\Events\AudioCommentLikedEvent;
use App\Http\Services\AudioCommentLikeService;
use App\Models\AudioComment;
use Illuminate\Http\Request;

class AudioCommentLikeController extends Controller
{
    public function __construct(protected AudioCommentLikeService $service)
    {
        //
    }

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
        [$saved, $message, $audioCommentLike] = $this->service->store($request);

		$audioComment = AudioComment::find($request->input("comment"));

        AudioCommentLikedEvent::dispatchIf($saved, $audioComment);

        return response([
            "message" => $message,
            "data" => $audioCommentLike,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AudioCommentLike  $audioCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(AudioCommentLike $audioCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AudioCommentLike  $audioCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AudioCommentLike $audioCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AudioCommentLike  $audioCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(AudioCommentLike $audioCommentLike)
    {
        //
    }
}
