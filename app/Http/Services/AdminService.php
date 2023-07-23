<?php

namespace App\Http\Services;

use App\Http\Resources\AudioResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\VideoResource;
use App\Models\Audio;
use App\Models\BoughtAudio;
use App\Models\BoughtVideo;
use App\Models\KopokopoRecipient;
use App\Models\SongPayout;
use App\Models\User;
use App\Models\Video;

class AdminService extends Service
{
    /**
     * Display a listing of the users.
     */
    public function admin()
    {
        $normal = User::where("account_type", "normal")->count();
        $musicians = User::where("account_type", "musician")->count();
        $videos = Video::count();
        $boughtVideos = BoughtVideo::count();
        $audios = Audio::count();
        $boughtAudios = BoughtAudio::count();

        return ["data" => [
            "normal" => $normal,
            "musicians" => $musicians,
            "users" => $normal + $musicians,
            "videos" => $videos,
            "boughtVideos" => $boughtVideos,
            "audios" => $audios,
            "boughtAudios" => $boughtAudios,
        ]];
    }

    /**
     * Display a listing of users.
     */
    public function users()
    {
        $getUsers = User::all();

        return UserResource::collection($getUsers);
    }

    /**
     * Display a listing of videos.
     */
    public function videos()
    {
        $getVideos = Video::orderBy('id', 'ASC')->get();

        return VideoResource::collection($getVideos);
    }

    /**
     * Display a listing of audios.
     */
    public function audios()
    {
        $getAudios = Audio::orderBy('id', 'ASC')->get();

        return AudioResource::collection($getAudios);
    }

    /**
     * Display a listing of kopokopo recipients.
     */
    public function kopokopoRecipients()
    {
        $getKopokopoRecipients = KopokopoRecipient::all();

        return ["data" => $getKopokopoRecipients];
    }

    /**
     * Display a listing of song payouts.
     */
    public function songPayouts()
    {
        $getSongPayouts = SongPayout::all();

        return ["data" => $getSongPayouts];
    }
}
