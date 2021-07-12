<?php

namespace App\Http\Controllers;

use App\VideoAlbums;
use Illuminate\Http\Request;

class VideoAlbumsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return VideoAlbums::all();
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
            $vCover = $request->file('cover')->store('public/video-album-covers');
            $vCover = substr($vCover, 7);
        }

        /* Create new video album */
        $vAlbum = new VideoAlbums;
        $vAlbum->name = $request->input('name');
        $vAlbum->username = auth()->user()->username;
        $vAlbum->cover = $vCover;
        $vAlbum->released = $request->input('released');
        $vAlbum->save();

        return response('Video Album Created', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\VideoAlbums  $videoAlbums
     * @return \Illuminate\Http\Response
     */
    public function show(VideoAlbums $videoAlbums)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\VideoAlbums  $videoAlbums
     * @return \Illuminate\Http\Response
     */
    public function edit(VideoAlbums $videoAlbums)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\VideoAlbums  $videoAlbums
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VideoAlbums $videoAlbums)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\VideoAlbums  $videoAlbums
     * @return \Illuminate\Http\Response
     */
    public function destroy(VideoAlbums $videoAlbums)
    {
        //
    }
}
