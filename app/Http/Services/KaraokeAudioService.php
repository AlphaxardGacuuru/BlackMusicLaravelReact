<?php

namespace App\Http\Services;

use App\Http\Resources\KaraokeAudioResource;
use App\Models\KaraokeAudio;

class KaraokeAudioService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\AudioAlbum  $audioAlbum
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return KaraokeAudio::all();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AudioAlbum  $audioAlbum
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getKaraokeAudio = KaraokeAudio::find($id);

        return KaraokeAudioResource::collection($getKaraokeAudio);
    }

    /*
     * Store Karaoke Audio
     */
    public function store($request)
    {
        $karaokeAudio = new KaraokeAudio;
        $karaokeAudio->audio_id = $request->input("audio_id");
        $karaokeAudio->username = $this->username;
        $saved = $karaokeAudio->save();

        return [$saved, "Audio saved", $karaokeAudio];
    }
}
