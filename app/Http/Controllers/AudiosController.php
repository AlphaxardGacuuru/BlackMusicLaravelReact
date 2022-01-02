<?php

namespace App\Http\Controllers;

use App\AudioLikes;
use App\Audios;
use App\BoughtAudios;
use App\CartAudios;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AudiosController extends Controller
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

        // Get Audios
        $getAudios = Audios::orderBy('id', 'ASC')->get();

        $audios = [];

        foreach ($getAudios as $key => $audio) {

            // Check if user has liked
            $hasLiked = AudioLikes::where('username', $authUsername)
                ->where('audio_id', $audio->id)
                ->exists();

            // Check if audio in cart
            $inCart = CartAudios::where('audio_id', $audio->id)
                ->where('username', $authUsername)
                ->exists();

            // Check if user has bought audio
            $hasBoughtAudio = BoughtAudios::where('username', $authUsername)
                ->where('audio_id', $audio->id)
                ->exists();

            // Get downloads
            $downloads = BoughtAudios::where('audio_id', $audio->id)
                ->count();

            array_push($audios, [
                "id" => $audio->id,
                "audio" => $audio->audio,
                "name" => $audio->name,
                "username" => $audio->username,
                "ft" => $audio->ft,
                "album_id" => $audio->album,
                "album" => $audio->album ? $audio->albums->name : "",
                "genre" => $audio->genre,
                "thumbnail" => $audio->thumbnail,
                "description" => $audio->description,
                "released" => $audio->released,
                "hasLiked" => $hasLiked,
                "likes" => $audio->audioLikes->count(),
                "inCart" => $inCart,
                "hasBoughtAudio" => $hasBoughtAudio,
                "downloads" => $downloads,
                "created_at" => $audio->created_at->format('d M Y'),
            ]);
        }

        return $audios;
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
        if ($request->hasFile('filepond-thumbnail')) {
            /* Handle thumbnail upload */
            $thumbnail = $request->file('filepond-thumbnail')->store('public/audio-thumbnails');
            $thumbnail = substr($thumbnail, 7);
            return $thumbnail;
        } elseif ($request->hasFile('filepond-audio')) {
            /* Handle audio upload */
            $song = $request->file('filepond-audio')->store('public/audios');
            $song = substr($song, 7);
            return $song;
        } else {
            $this->validate($request, [
                'audio' => 'required',
                'name' => 'required|string',
                'thumbnail' => 'required',
                'ft' => 'nullable|exists:users,username',
            ]);

            /* Create new audio song */
            $audio = new Audios;
            $audio->name = $request->input('name');
            $audio->username = auth()->user()->username;
            $audio->ft = $request->input('ft') ? $request->input('ft') : "";
            $audio->album = $request->input('album');
            $audio->genre = $request->input('genre');
            $audio->audio = $request->input('audio');
            $audio->thumbnail = $request->input('thumbnail');
            $audio->description = $request->input('description');
            $audio->released = $request->input('released');
            $audio->save();

            // Check if user is musician
            // $accountCheck = User::where('username', auth()->user()->username)->first();

            // if ($accountCheck->account_type == "normal") {
            //     $user = User::find($accountCheck->id);
            //     $user->account_type = "musician";
            //     $user->save();
            // }

            return response('Audio Uploaded', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Audios  $audios
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $audio = Audios::find($id);
        // Get file extesion
        $ext = substr($audio->audio, -3);

		$src = 'storage/' . $audio->audio;

		$name = $audio->name . '.' . $ext;

        return response()->download($src, $name);
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
    public function update(Request $request, $id)
    {
        if ($request->hasFile('filepond')) {
            $request->file('filepond')->store('public/audios');
        } else {
            $this->validate($request, [
                'name' => 'nullable|string',
                'ft' => 'nullable|exists:users,username',
            ]);

            /* Handle thumbnail upload */
            if ($request->hasFile('thumbnail')) {
                $thumbnail = $request->file('thumbnail')->store('public/audio-thumbnails');
                $thumbnail = substr($thumbnail, 7);
                Storage::delete('public/' . Audios::where('id', $id)->first()->thumbnail);
            }

            $audio = Audios::find($id);

            if ($request->filled('name')) {
                $audio->name = $request->input('name');
            }

            if ($request->filled('ft')) {
                $audio->ft = $request->input('ft');
            }

            if ($request->filled('album')) {
                $audio->album = $request->input('album');
            }

            if ($request->filled('genre')) {
                $audio->genre = $request->input('genre');
            }

            if ($request->hasFile('thumbnail')) {
                $audio->thumbnail = $thumbnail;
            }

            if ($request->filled('description')) {
                $audio->description = $request->input('description');
            }

            if ($request->filled('released')) {
                $audio->released = $request->input('released');
            }

            $audio->save();

            return response("Audio Edited", 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Audios  $audios
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Check file extension and handle filepond delete accordingly
        $ext = substr($id, -3);

        // If image
        if ($ext == 'jpg' || $ext == 'png' || $ext == 'gif') {
            Storage::delete('public/audio-thumbnails/' . $id);
            return response("Audio thumbnail deleted", 200);
            // If audio
        } elseif ($ext == 'mp3' || $ext == 'mp4' || $ext == 'm4A' || $ext == 'wav' || $ext == 'aac') {
            Storage::delete('public/audios/' . $id);
            return response("Audio deleted", 200);
        }
    }
}
