<?php

namespace App\Http\Controllers;

use App\Events\AudioCommentLikedEvent;
use App\Http\Services\AudioCommentLikeService;
use App\Models\AudioComment;
use App\Models\AudioCommentLike;
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
        return phpinfo();
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

        AudioCommentLikedEvent::dispatchIf($saved, $audioCommentLike->comment);

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
