<?php

namespace App\Http\Controllers;

use App\Events\VideoCommentLikedEvent;
use App\Http\Services\VideoCommentLikeService;
use App\Models\VideoComment;
use App\Models\VideoCommentLike;
use Illuminate\Http\Request;

class VideoCommentLikeController extends Controller
{
    public function __construct(protected VideoCommentLikeService $service)
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
        [$canDispatch, $message, $videoCommentLike] = $this->service->store($request);

        VideoCommentLikedEvent::dispatchIf(
            $canDispatch,
            $videoCommentLike->comment,
            $videoCommentLike->username
        );

        return response([
            "message" => $message,
            "data" => $videoCommentLike,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VideoCommentLike  $videoCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(VideoCommentLike $videoCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VideoCommentLike  $videoCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VideoCommentLike $videoCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VideoCommentLike  $videoCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(VideoCommentLike $videoCommentLike)
    {
        //
    }
}
