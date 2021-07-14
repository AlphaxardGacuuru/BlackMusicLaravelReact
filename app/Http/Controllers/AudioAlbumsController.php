<?php

namespace App\Http\Controllers;

use App\AudioAlbums;
use Illuminate\Http\Request;

class AudioAlbumsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AudioAlbums::all();
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
            'cover' => 'required|image|max:1999',
        ]);

/* Handle file upload */
        if ($request->hasFile('cover')) {
            $aCover = $request->file('cover')->store('public/audio-album-covers');
            $aCover = substr($aCover, 7);
        }

/* Create new video album */
        $aAlbum = new AudioAlbums;
        $aAlbum->name = $request->input('name');
        $aAlbum->username = auth()->user()->username;
        $aAlbum->cover = $aCover;
        $aAlbum->released = $request->input('released');
        $aAlbum->save();

        return response('Audio Album Created', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AudioAlbums  $audioAlbums
     * @return \Illuminate\Http\Response
     */
    public function show(AudioAlbums $audioAlbums)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AudioAlbums  $audioAlbums
     * @return \Illuminate\Http\Response
     */
    public function edit(AudioAlbums $audioAlbums)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AudioAlbums  $audioAlbums
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AudioAlbums $audioAlbums)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AudioAlbums  $audioAlbums
     * @return \Illuminate\Http\Response
     */
    public function destroy(AudioAlbums $audioAlbums)
    {
        //
    }
}
