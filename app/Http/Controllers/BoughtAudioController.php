<?php

namespace App\Http\Controllers;

use App\Events\AudioBoughtEvent;
use App\Models\BoughtAudio;
use App\Http\Services\BoughtAudioService;
use Illuminate\Http\Request;

class BoughtAudioController extends Controller
{
    public function __construct(protected BoughtAudioService $service)
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
        [$boughtAudios, $decoArtists] = $this->service->store($request);

        $hasBought = count($boughtAudios) > 0;

        AudioBoughtEvent::dispatchIf($hasBought, $boughtAudios, $decoArtists);

        return response(["data" => $boughtAudios], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BoughtAudio  $boughtAudio
     * @return \Illuminate\Http\Response
     */
    public function show(BoughtAudio $boughtAudio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BoughtAudio  $boughtAudio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BoughtAudio $boughtAudio)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BoughtAudio  $boughtAudio
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoughtAudio $boughtAudio)
    {
        //
    }

	/*
	* Artist's Bought Audios */
	public function artistBoughtAudios($username)
	{
		return $this->service->artistBoughtAudios($username);
	} 
}
