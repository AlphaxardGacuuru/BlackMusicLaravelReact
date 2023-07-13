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
}
