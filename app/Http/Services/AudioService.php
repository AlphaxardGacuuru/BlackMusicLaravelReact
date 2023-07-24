<?php

namespace App\Http\Services;

use App\Http\Resources\AudioResource;
use App\Http\Resources\UserResource;
use App\Models\Audio;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AudioService extends Service
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        $getAudios = Audio::orderBy('id', 'ASC')->get();

        return AudioResource::collection($getAudios);
    }

    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        // Get Audio
        $getAudio = Audio::find($id);

        return new AudioResource($getAudio);
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store($request)
    {
        /* Create new audio song */
        $audio = new Audio;
        $audio->audio = $request->input('audio');
        $audio->name = $request->input('name');
        $audio->username = auth('sanctum')->user()->username;
        $audio->ft = $request->input('ft');
        $audio->audio_album_id = $request->input('audio_album_id');
        $audio->genre = $request->input('genre');
        $audio->thumbnail = $request->input('thumbnail');
        $audio->description = $request->input('description');
        $audio->released = $request->input('released');
        $saved = $audio->save();

		return [$saved, "Audio Uploaded", $audio];
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update($request, $id)
    {
        $audio = Audio::find($id);

        if ($request->filled('name')) {
            $audio->name = $request->input('name');
        }

        if ($request->filled('ft')) {
            $audio->ft = $request->input('ft');
        }

        if ($request->filled('audio_album_id')) {
            $audio->audio_album_id = $request->input('audio_album_id');
        }

        if ($request->filled('genre')) {
            $audio->genre = $request->input('genre');
        }

        if ($request->filled('description')) {
            $audio->description = $request->input('description');
        }

        if ($request->filled('released')) {
            $audio->released = $request->input('released');
        }

        if ($request->filled('thumbnail')) {
            $audio->thumbnail = $request->input('thumbnail');

            // Delete thumbnail
            $oldThumbnail = Audio::find($id)->thumbnail;
            Storage::delete('public/' . $oldThumbnail);
        }

        if ($request->filled('audio')) {
            $audio->audio = $request->input('audio');

            // Delete audio
            $oldAudio = Audio::find($id)->audio;
            Storage::delete('public/' . $oldAudio);
        }

        $saved = $audio->save();

		$message = $audio->name . " edited";

		return [$saved, $message, $audio];
    }

    /**
     * Download Audio.
     *
     */
    public function download($id)
    {
        $audio = Audio::find($id);
        // Get file extesion
        $ext = substr($audio->audio, -3);

        $src = $audio->audio;

        $name = $audio->name . '.' . $ext;

        return [$src, $name];
    }

    /**
     * Newly Released Chart
     *
     */
    public function newlyReleased()
    {
        // Get Audios
        $newlyReleased = Audio::orderBy("id", "desc")->get();

        return response($this->chart($newlyReleased), 200);
    }

    /**
     * Trending Chart
     *
     */
    public function trending()
    {
        $trending = DB::table('bought_audios')
            ->select('audio_id', DB::raw('count(*) as bought'))
            ->where("created_at", ">=", Carbon::now()->subWeek())
            ->groupBy('audio_id')
            ->orderBy('bought', 'DESC')
            ->get();

        return response($this->chart($trending, true), 200);
    }

    /**
     * Top Downloaded
     *
     */
    public function topDownloaded()
    {
        $topDownloaded = DB::table('bought_audios')
            ->select('audio_id', DB::raw('count(*) as bought'))
            ->groupBy('audio_id')
            ->orderBy('bought', 'DESC')
            ->get();

        return response($this->chart($topDownloaded, true), 200);
    }

    /**
     * Top Liked
     *
     */
    public function topLiked()
    {
        $topLiked = DB::table('audio_likes')
            ->select('audio_id', DB::raw('count(*) as likes'))
            ->groupBy('audio_id')
            ->orderBy('likes', 'DESC')
            ->get();

        return response($this->chart($topLiked, true), 200);
    }

    /**
     * Structure charts
     *
     */
    public function chart($list, $loop = false)
    {
        $audios = $list;

        // Check if items should be fetched
        if ($loop) {
            $audios = [];

            foreach ($list as $item) {
                $audio = Audio::find($item->audio_id);

                array_push($audios, $audio);
            }
        }

        // Transform data using resource
        $audios = AudioResource::collection($audios);

        $chartArtists = [];

        // Populate Audios and Artists array
        foreach ($audios as $audio) {
            array_push($chartArtists, $audio->username);
        }

        // Count occurrences of artists
        $chartArtists = array_count_values($chartArtists);

        // Sort artists based on most occurences
        arsort($chartArtists);

        // Get usernames only
        $chartArtists = array_keys($chartArtists);

        $artists = [];

        // Get Artists
        foreach ($chartArtists as $artist) {
            $getArtist = User::where("username", $artist)->first();

            $getArtist = new UserResource($getArtist);

            array_push($artists, $getArtist);
        }

        return ["data" => [
            "artists" => $artists,
            "audios" => $audios,
        ]];
    }

    /*
     * Artist's Audios */
    public function artistAudios($username)
    {
        $getArtistAudios = Audio::where("username", $username)->get();

        return AudioResource::collection($getArtistAudios);
    }
}
