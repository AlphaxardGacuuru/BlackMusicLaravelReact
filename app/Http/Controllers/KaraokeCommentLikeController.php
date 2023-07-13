<?php

namespace App\Http\Controllers;

use App\Http\Services\KaraokeCommentLikeService;
use App\Models\KaraokeCommentLike;
use Illuminate\Http\Request;

class KaraokeCommentLikeController extends Controller
{
    public function __construct(protected KaraokeCommentLikeService $service)
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
        [$saved, $message] = $this->service->store($request);

        return response([
            "message" => $message,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KaraokeCommentLike  $karaokeCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(KaraokeCommentLike $karaokeCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\KaraokeCommentLike  $karaokeCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KaraokeCommentLike $karaokeCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KaraokeCommentLike  $karaokeCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(KaraokeCommentLike $karaokeCommentLike)
    {
        //
    }
}
