<?php

namespace App\Http\Services;

use App\Http\Resources\VideoAlbumResource;
use App\Models\VideoAlbum;
use Illuminate\Support\Facades\Storage;

class VideoAlbumService extends Service
{
    // Get Video Albums
    public function index()
    {
        $getVideoAlbums = VideoAlbum::all();
		
		return VideoAlbumResource::collection($getVideoAlbums);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VideoAlbum  $videoAlbum
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getVideoAlbum = VideoAlbum::find($id);

		return new VideoAlbumResource($getVideoAlbum);
    }

    public function store($request)
    {
        /* Handle file upload */
        if ($request->hasFile('cover')) {
            $vCover = $request->file('cover')->store('public/video-album-covers');
            $vCover = substr($vCover, 7);
        }

        /* Create new video album */
        $vAlbum = new VideoAlbum;
        $vAlbum->name = $request->input('name');
        $vAlbum->username = auth('sanctum')->user()->username;
        $vAlbum->cover = $vCover;
        $vAlbum->released = $request->input('released');
        $saved = $vAlbum->save();

		$message = "Video Album " . $vAlbum->name . " created";

		return [$saved, $message, $vAlbum];
    }

    public function update($request, $id)
    {
        /* Handle file upload */
        if ($request->hasFile('cover')) {
            $cover = $request->file('cover')->store('public/video-album-covers');
            // Format for saving in DB
            $cover = substr($cover, 7);

            $oldCover = VideoAlbum::where('id', $id)->first()->cover;

            $oldCover = substr($oldCover, 9);

            Storage::disk("public")->delete($oldCover);
        }

        /* Create new video album */
        $vAlbum = VideoAlbum::find($id);

        if ($request->filled('name')) {
            $vAlbum->name = $request->input('name');
        }

        if ($request->hasFile('cover')) {
            $vAlbum->cover = $cover;
        }

        if ($request->filled('released')) {
            $vAlbum->released = $request->input('released');
        }

        $saved = $vAlbum->save();

		$message = $vAlbum->name . " edited";

		return [$saved, $message, $vAlbum];
    }

    /*
     * Artist's Video Albums */
    public function artistVideoAlbums($username)
    {
        $getArtistVideoAlbums = VideoAlbum::where("username", $username)->get();
		
		return VideoAlbumResource::collection($getArtistVideoAlbums);
    }
}
