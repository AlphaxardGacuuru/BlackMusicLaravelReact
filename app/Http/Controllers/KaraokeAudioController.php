<?php

namespace App\Http\Controllers;

use App\Models\KaraokeAudio;
use App\Http\Services\KaraokeAudioService;
use Illuminate\Http\Request;

class KaraokeAudioController extends Controller
{
    public function __construct(protected KaraokeAudioService $service)
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KaraokeAudio  $karaokeAudio
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
     * @param  \App\Models\KaraokeAudio  $karaokeAudio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KaraokeAudio $karaokeAudio)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KaraokeAudio  $karaokeAudio
     * @return \Illuminate\Http\Response
     */
    public function destroy(KaraokeAudio $karaokeAudio)
    {
        //
    }
}
