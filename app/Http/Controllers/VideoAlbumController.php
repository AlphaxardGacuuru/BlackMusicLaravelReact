<?php

namespace App\Http\Controllers;

use App\Models\VideoAlbum;
use App\Http\Services\VideoAlbumService;
use Illuminate\Http\Request;

class VideoAlbumController extends Controller
{
    public function __construct(protected VideoAlbumService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->service->index();
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

        [$saved, $message, $videoAlbum] = $this->service->store($request);

        return response([
            "message" => $message,
            "data" => $videoAlbum,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VideoAlbum  $videoAlbum
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VideoAlbum  $videoAlbum
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'cover' => 'nullable|image|max:1999',
        ]);

        [$saved, $message, $videoAlbum] = $this->service->update($request, $id);

        return response([
            "message" => $message,
            "data" => $videoAlbum,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VideoAlbum  $videoAlbum
     * @return \Illuminate\Http\Response
     */
    public function destroy(VideoAlbum $videoAlbum)
    {
        //
    }

	/*
	* Artist's Video Albums */
	public function artistVideoAlbums($username, VideoAlbumService $service)
	{
		return $service->artistVideoAlbums($username);
	} 
}
