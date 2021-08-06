<?php

namespace App\Http\Controllers;

use App\AudioAlbums;
use App\Audios;
use Illuminate\Http\Request;

class AudiosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Audios::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        $this->validate($request, [
            'audio' => 'required',
            'thumbnail' => 'required',
            'name' => 'required|string',
            'ft' => 'nullable|exists:users,username',
        ]);

        /* Handle audio upload */
        if ($request->hasFile('audio')) {
            $song = $request->file('audio')->store('public/audios');
            $song = substr($song, 7);
        }

        /* Handle thumbnail upload */
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail')->store('public/audio-thumbnails');
            $thumbnail = substr($thumbnail, 7);
        }

        /* Create new audio song */
        $audio = new Audios;
        $audio->name = $request->input('name');
        $audio->username = auth()->user()->username;
        $audio->ft = $request->input('ft') ? $request->input('ft') : "";
        $audio->album = $request->input('album');
        $audio->genre = $request->input('genre');
        $audio->audio = $song;
        $audio->thumbnail = $thumbnail;
        $audio->description = $request->input('description');
        $audio->released = $request->input('released');
        $audio->save();

        // Check if Single Album exists
        $singleCheck = AudioAlbums::where('username', auth()->user()->username)->where('name', 'Singles')->first();

        if (!$singleCheck) {

            /* Create new video album */
            $aAlbum = new AudioAlbums;
            $aAlbum->name = "Single";
            $aAlbum->username = auth()->user()->username;
            $aAlbum->cover = "audio-album-covers/musical-note.png";
            $aAlbum->save();
        }

        return response('Audio Uploaded', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Audios  $audios
     * @return \Illuminate\Http\Response
     */
    public function show(Audios $audios)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Audios  $audios
     * @return \Illuminate\Http\Response
     */
    public function edit(Audios $audios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Audios  $audios
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Audios $audios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Audios  $audios
     * @return \Illuminate\Http\Response
     */
    public function destroy(Audios $audios)
    {
        //
    }
}
