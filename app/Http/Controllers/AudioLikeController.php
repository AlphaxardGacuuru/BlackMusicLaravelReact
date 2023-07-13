<?php

namespace App\Http\Controllers;

use App\Events\AudioLikedEvent;
use App\Http\Services\AudioLikeService;
use App\Models\Audio;
use App\Models\AudioLike;
use Illuminate\Http\Request;

class AudioLikeController extends Controller
{
    public function __construct(protected AudioLikeService $service)
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
        [$added, $message] = $this->service->store($request);

        $audio = Audio::find($request->input("audio"));

        AudioLikedEvent::dispatchIf($added, $audio);

        return response([
            "message" => $message,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AudioLike  $audioLike
     * @return \Illuminate\Http\Response
     */
    public function show(AudioLike $audioLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AudioLike  $audioLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AudioLike $audioLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AudioLike  $audioLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(AudioLike $audioLike)
    {
        //
    }
}
