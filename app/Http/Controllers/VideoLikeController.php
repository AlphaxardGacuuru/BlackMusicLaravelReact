<?php

namespace App\Http\Controllers;

use App\Events\VideoLikedEvent;
use App\Models\Video;
use App\Models\VideoLike;
use App\Http\Services\VideoLikeService;
use Illuminate\Http\Request;

class VideoLikeController extends Controller
{
    public function __construct(protected VideoLikeService $service)
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
        [$saved, $message, $video] = $this->service->store($request);

        $video = Video::find($request->input("video"));

        VideoLikedEvent::dispatchIf($saved, $video);

        return response([
            "message" => $message,
            "data" => $video,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VideoLike  $videoLike
     * @return \Illuminate\Http\Response
     */
    public function show(VideoLike $videoLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VideoLike  $videoLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VideoLike $videoLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VideoLike  $videoLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(VideoLike $videoLike)
    {
        //
    }
}
