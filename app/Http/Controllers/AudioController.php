<?php

namespace App\Http\Controllers;

use App\Http\Services\AudioService;
use App\Models\Audio;
use Illuminate\Http\Request;

class AudioController extends Controller
{
    public function __construct(protected AudioService $service)
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
        // Handle form for audio
        $this->validate($request, [
            'audio' => 'required|string',
            'name' => 'required|string',
            'thumbnail' => 'required',
            'ft' => 'nullable|exists:users,username',
        ]);

        [$saved, $message, $audio] = $this->service->store($request);

        return response([
            "message" => $message,
            "data" => $audio,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Audio  $audio
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
     * @param  \App\Models\Audio  $audio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'nullable|string',
            'ft' => 'nullable|exists:users,username',
        ]);

        [$saved, $message, $audio] = $this->service->update($request, $id);

        return response([
            "message" => $message,
            "data" => $audio,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Audio  $audio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Audio $audio, $id)
    {
        //
    }

    /*
     * Download Audio
     */
    public function download($id)
    {
        [$src, $name] = $this->service->download($id);

		return response()->download($src, $name);
    }

    /*
     * Display a listing of the charts.
     *
     */
    public function newlyReleased()
    {
        return $this->service->newlyReleased();
    }

    public function trending()
    {
        return $this->service->trending();
    }

    public function topDownloaded()
    {
        return $this->service->topDownloaded();
    }

    public function topLiked()
    {
        return $this->service->topLiked();
    }

    /*
     * Artist's Audios */
    public function artistAudios($username)
    {
        return $this->service->artistAudios($username);
    }
}
