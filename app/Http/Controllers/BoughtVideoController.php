<?php

namespace App\Http\Controllers;

use App\Events\VideoBoughtEvent;
use App\Models\BoughtVideo;
use App\Http\Services\BoughtVideoService;
use Illuminate\Http\Request;

class BoughtVideoController extends Controller
{
    public function __construct(protected BoughtVideoService $service)
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
        [$StructuredBoughtVideos, $boughtVideos, $decoArtists] = $this->service->store($request);

        $hasBought = count($boughtVideos) > 0;

        VideoBoughtEvent::dispatchIf($hasBought, $boughtVideos, $decoArtists);

        return response(["data" => $StructuredBoughtVideos], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BoughtVideo  $boughtVideo
     * @return \Illuminate\Http\Response
     */
    public function show(BoughtVideo $boughtVideo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BoughtVideo  $boughtVideo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BoughtVideo $boughtVideo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BoughtVideo  $boughtVideo
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoughtVideo $boughtVideo)
    {
        //
    }

	/*
	* Artist's Bought Videos */
	public function artistBoughtVideos($username)
	{
		return $this->service->artistBoughtVideos($username);
	} 
}
