<?php

namespace App\Http\Controllers;

use App\VideoAlbums;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoAlbumsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get Video Albums
        $getVideoAlbums = VideoAlbums::all();

        $videoAlbums = [];

        foreach ($getVideoAlbums as $key => $videoAlbum) {
            array_push($videoAlbums, [
                "id" => $videoAlbum->id,
                "username" => $videoAlbum->username,
                "name" => $videoAlbum->name,
                "cover" => $videoAlbum->cover,
                "released" => $videoAlbum->released,
                "created_at" => $videoAlbum->created_at->format("d M Y"),
            ]);
        }

		return $videoAlbums;
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
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'cover' => 'nullable|image|max:1999',
        ]);

        /* Handle file upload */
        if ($request->hasFile('cover')) {
            $vCover = $request->file('cover')->store('public/video-album-covers');
            $vCover = substr($vCover, 7);
            Storage::delete('public/' . VideoAlbums::where('id', $id)->first()->cover);
        }

        /* Create new video album */
        $vAlbum = VideoAlbums::find($id);

        if ($request->filled('name')) {
            $vAlbum->name = $request->input('name');
        }

        if ($request->hasFile('cover')) {
            $vAlbum->cover = $vCover;
        }

        if ($request->filled('released')) {
            $vAlbum->released = $request->input('released');
        }

        $vAlbum->save();

        return response('Video Album Edited', 200);
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
