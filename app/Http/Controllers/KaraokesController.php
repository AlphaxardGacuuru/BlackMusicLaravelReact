<?php

namespace App\Http\Controllers;

use App\Audios;
use App\KaraokeComments;
use App\KaraokeLikes;
use App\Karaokes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class KaraokesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Check if user is logged in
        if (Auth::check()) {
            $authUsername = auth()->user()->username;
        } else {
            $authUsername = '@guest';
        }

        // Get Karaokes
        $getKaraokes = Karaokes::orderBy('id', 'ASC')->get();

        $karaokes = [];

        foreach ($getKaraokes as $key => $karaoke) {

            // Check if user has liked karaoke
            $hasLiked = KaraokeLikes::where('username', $authUsername)
                ->where('karaoke_id', $karaoke->id)
                ->exists();

            array_push($karaokes, [
                "id" => $karaoke->id,
                "karaoke" => $karaoke->karaoke,
                "audio_id" => $karaoke->audio_id,
                "audio" => $karaoke->audios->name,
                "name" => $karaoke->users->name,
                "username" => $karaoke->users->username,
                "pp" => $karaoke->users->pp,
                "decos" => $karaoke->users->decos->count(),
                "description" => $karaoke->description,
                "hasLiked" => $hasLiked,
                "likes" => $karaoke->karaokeLikes->count(),
                "comments" => $karaoke->karaokeComments->count(),
                "created_at" => $karaoke->created_at->format('d M Y'),
            ]);
        }

        return $karaokes;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->hasFile('filepond-karaoke')) {
            /* Handle karaoke upload */
            $karaoke = $request->file('filepond-karaoke')->store('public/karaokes');
            $karaokeShort = substr($karaoke, 7);

            return $karaokeShort;

        } else {
            // Handle form for karaoke
            $this->validate($request, [
                'audio' => 'required|string',
                'karaoke' => 'required|string',
                'description' => 'required|string',
            ]);

            /* Create new karaoke song */
            $karaoke = new Karaokes;
            $karaoke->karaoke = $request->input('karaoke');
            $karaoke->username = auth()->user()->username;
            $karaoke->audio_id = $request->input('audio');
            $karaoke->description = $request->input('description');
            $karaoke->save();

            return response('Karaoke Uploaded', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Karaokes  $karaokes
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Check if user is logged in
        if (Auth::check()) {
            $authUsername = auth()->user()->username;
        } else {
            $authUsername = '@guest';
        }

        // Get Karaokes
        $getKaraoke = Karaokes::find($id)->first();

        // Check if user has liked karaoke
        $hasLiked = KaraokeLikes::where('username', $authUsername)
            ->where('karaoke_id', $id)
            ->exists();

        $karaoke = [
            "id" => $getKaraoke->id,
            "karaoke" => $getKaraoke->karaoke,
            "audio_id" => $getKaraoke->audio_id,
            "audio" => $getKaraoke->audios->name,
            "name" => $getKaraoke->users->name,
            "username" => $getKaraoke->users->username,
            "pp" => $getKaraoke->users->pp,
            "decos" => $getKaraoke->users->decos->count(),
            "description" => $getKaraoke->description,
            "hasLiked" => $hasLiked,
            "likes" => $getKaraoke->karaokeLikes->count(),
            "comments" => $getKaraoke->karaokeComments->count(),
            "created_at" => $getKaraoke->created_at->format('d M Y'),
        ];

        return $karaoke;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Karaokes  $karaokes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Karaokes $karaokes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Karaokes  $karaokes
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Storage::delete('public/karaokes/' . $id);
        return response("Karaoke deleted", 200);
    }
}
