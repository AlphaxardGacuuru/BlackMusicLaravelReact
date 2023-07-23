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
        $totalUsers = User::count();
        $totalMusicians = User::where("account_type", "musician")->count();
        $totalVideos = Video::count();
        $totalBoughtVideos = BoughtVideo::count();
        $totalAudios = Audio::count();
        $totalBoughtAudios = BoughtAudio::count();

        return ["data" => [
            "totalUsers" => $totalUsers,
            "totalMusicians" => $totalMusicians,
            "totalVideos" => $totalVideos,
            "totalBoughtVideos" => $totalBoughtVideos,
            "totalAudios" => $totalAudios,
            "totalBoughtAudios" => $totalBoughtAudios,
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
