<?php

namespace App\Http\Controllers;

use App\AudioAlbums;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AudioAlbumsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get Audio Albums
        $getAudioAlbums = AudioAlbums::all();

        $audioAlbums = [];

        foreach ($getAudioAlbums as $key => $audioAlbum) {
            array_push($audioAlbums, [
                "id" => $audioAlbum->id,
                "username" => $audioAlbum->username,
                "name" => $audioAlbum->name,
                "cover" => $audioAlbum->cover,
                "released" => $audioAlbum->released,
                "created_at" => $audioAlbum->created_at->format("d M Y"),
            ]);
        }

        return $audioAlbums;
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AudioAlbums  $audioAlbums
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'cover' => 'nullable|image|max:1999',
        ]);

        /* Handle file upload */
        if ($request->hasFile('cover')) {
            $aCover = $request->file('cover')->store('public/audio-album-covers');
            $aCover = substr($aCover, 7);
            Storage::delete('public/' . AudioAlbums::where('id', $id)->first()->cover);
        }

        /* Create new video album */
        $aAlbum = AudioAlbums::find($id);

        if ($request->filled('name')) {
            $aAlbum->name = $request->input('name');
        }

        if ($request->hasFile('cover')) {
            $aAlbum->cover = $aCover;
        }

        if ($request->filled('released')) {
            $aAlbum->released = $request->input('released');
        }

        $aAlbum->save();

        return response("Audio Album Edited", 200);
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
