<?php

namespace App\Http\Controllers;

use App\KaraokeAudios;
use Illuminate\Http\Request;

class KaraokeAudiosController extends Controller
{
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
        // Handle form for karaoke
        $this->validate($request, [
            'audio' => 'required|integer',
        ]);

        /* Create new Karaoke Audio */
        $karaokeAudio = new KaraokeAudios;
        $karaokeAudio->audio_id = $request->input('audio');
        $karaokeAudio->username = auth()->user()->username;
        $karaokeAudio->save();

        return response("Karaoke Audio saved", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\KaraokeAudios  $karaokeAudios
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getKaraokeAudio = KaraokeAudios::orderby('id', 'DESC')->first();

        $karaokeAudio = [
            "id" => $getKaraokeAudio->id,
            "audio_id" => $getKaraokeAudio->audio_id,
            "audio_name" => $getKaraokeAudio->audios->name,
            "audio_thumbnail" => $getKaraokeAudio->audios->thumbnail,
            "username" => $getKaraokeAudio->username,
            "created_at" => $getKaraokeAudio->created_at,
            "update_at" => $getKaraokeAudio->update_at,
        ];

        return response($karaokeAudio, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\KaraokeAudios  $karaokeAudios
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KaraokeAudios $karaokeAudios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\KaraokeAudios  $karaokeAudios
     * @return \Illuminate\Http\Response
     */
    public function destroy(KaraokeAudios $karaokeAudios)
    {
        //
    }
}
