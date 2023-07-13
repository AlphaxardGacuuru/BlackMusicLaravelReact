<?php

namespace App\Http\Services;

use App\Http\Resources\KaraokeResource;
use App\Models\Karaoke;

class KaraokeService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\AudioAlbum  $audioAlbum
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get Karaokes
        $getKaraokes = Karaoke::orderBy('id', 'ASC')->get();

		return KaraokeResource::collection($getKaraokes);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Karaoke  $karaoke
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getKaraoke = Karaoke::find($id);

		return new KaraokeResource($getKaraoke);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        $karaoke = new Karaoke;
        $karaoke->karaoke = $request->input("karaoke");
        $karaoke->username = auth("sanctum")->user()->username;
        $karaoke->audio_id = $request->input("audio_id");
        $karaoke->description = $request->input("description");
        $saved = $karaoke->save();

		return [$saved, "Karaoke posted", $karaoke];
    }
}
