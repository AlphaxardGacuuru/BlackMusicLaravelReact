<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Http\Services\VideoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VideoController extends Controller
{
    public function __construct(protected VideoService $service)
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
        return $this->service->index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Handle form for video
        $this->validate($request, [
            'video' => 'required|string',
            'name' => 'required|string',
            'thumbnail' => 'required',
            'ft' => 'nullable|exists:users,username',
        ]);

        [$saved, $message, $video] = $this->service->store($request);

        // VideoUploadedEvent::dispatchIf($response["saved"], $response["video"]);

        return response([
            "message" => $message,
            "data" => $video,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'nullable|string',
            'ft' => 'nullable|exists:users,username',
        ]);

        [$saved, $message, $video] = $this->service->update($request, $id);

        return response([
            "message" => $message,
            "data" => $video,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video, $id)
    {
        //
    }

    /*
     * Display a listing of the charts.
     *
     */
    public function newlyReleased(VideoService $service)
    {
        return $service->newlyReleased();
    }

    public function trending(VideoService $service)
    {
        return $service->trending();
    }

    public function topDownloaded(VideoService $service)
    {
		return $service->topDownloaded();
    }

    public function topLiked(VideoService $service)
    {
		return $service->topLiked();
    }

	/*
	* Artist's Videos */
	public function artistVideos($username, VideoService $service)
	{
		return $service->artistVideos($username);
	} 
}
