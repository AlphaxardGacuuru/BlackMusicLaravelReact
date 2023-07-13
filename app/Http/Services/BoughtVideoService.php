<?php

namespace App\Http\Services;

use App\Http\Resources\BoughtVideoResource;
use App\Models\BoughtAudio;
use App\Models\BoughtVideo;
use App\Models\CartVideo;
use App\Models\Deco;
use App\Models\Kopokopo;
use Illuminate\Support\Facades\DB;

class BoughtVideoService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getBoughtVideos = BoughtVideo::where("username", $this->username)->get();

        return BoughtVideoResource::collection($getBoughtVideos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        $canBuy = "";
        $StructuredBoughtVideos = [];
        $boughtVideos = [];
        $decoArtists = [];

        /* Fetch songs from Cart Videos */
        $cartVideos = CartVideo::where('username', auth('sanctum')->user()->username)
            ->get();

        foreach ($cartVideos as $cartVideo) {
            // Get Cost of Bought Videos and Audios
            $totalVideos = BoughtVideo::where('username', auth('sanctum')->user()->username)
                ->count() * 20;
            $totalAudios = BoughtAudio::where('username', auth('sanctum')->user()->username)
                ->count() * 10;

            // Get Total Cash paid
            $kopokopo = Kopokopo::where('username', auth('sanctum')->user()->username);
            $kopokopoSum = $kopokopo->sum('amount');
            $balance = $kopokopoSum - ($totalVideos + $totalAudios);

            // Check if user can buy songs in cart
            $canBuy = intval($balance / 20);

            if ($canBuy >= 1) {
                $notBought = BoughtVideo::where('username', auth('sanctum')->user()->username)
                    ->where('video_id', $cartVideo->video_id)
                    ->doesntExist();

                if ($notBought) {

                    // Transaction to make sure a video is bought and remove from cart and if user qualifies, a deco is saved
                    $artist = DB::transaction(function () use ($cartVideo) {

                        $this->storeBoughtVideo($cartVideo);

                        /* Add deco if necessary */
                        $artist = $this->storeDeco($cartVideo);

                        /* Delete from cart */
                        CartVideo::where('video_id', $cartVideo->video_id)
                            ->where('username', auth('sanctum')->user()->username)
                            ->delete();

                        return $artist;
                    });

                    // Update array for use in Event
					array_push($boughtVideos, $cartVideo->video);
                    // Update array for use in Receipt
                    array_push($StructuredBoughtVideos,
                        $this->structure(
                            $cartVideo->video,
                            auth('sanctum')->user()->username
                        ));

                    // Update Deco arry
                    $artist && array_push($decoArtists, $artist);
                }
            }
        }

        return [$StructuredBoughtVideos, $boughtVideos, $decoArtists];
    }

    // Store Bought Video
    private function storeBoughtVideo($cartVideo)
    {
        /* Add song to videos_bought */
        $boughtVideo = new BoughtVideo;
        $boughtVideo->video_id = $cartVideo->video_id;
        $boughtVideo->price = 20;
        $boughtVideo->username = auth('sanctum')->user()->username;
        $boughtVideo->name = $cartVideo->video->name;
        $boughtVideo->artist = $cartVideo->video->username;
        $boughtVideo->save();
    }

    // Store Deco
    public function storeDeco($cartVideo)
    {
        /* Check if songs are 10 */
        $userDecos = Deco::where('username', auth('sanctum')->user()->username)
            ->where('artist', $cartVideo->video->username)
            ->count();

        $userVideos = BoughtVideo::where('username', auth('sanctum')->user()->username)
            ->where('artist', $cartVideo->video->username)
            ->count();

        $decoBalance = ($userVideos / 10) - $userDecos;

        $canAddDeco = intval($decoBalance);

        /* If deco balance >= 1 then add deco */
        if ($canAddDeco >= 1) {
            $deco = new Deco;
            $deco->username = auth('sanctum')->user()->username;
            $deco->artist = $cartVideo->video->username;
            $deco->save();

            return $cartVideo->video->username;
        }
    }

    /*
     * Artist's Bought Videos */
    public function artistBoughtVideos($username)
    {
        $getArtistBoughtVideos = BoughtVideo::where("artist", $username)->get();

        return BoughtVideoResource::collection($getArtistBoughtVideos);
    }

    /*
     * Structure for video */
    public function structure($video, $username)
    {
        return [
            "id" => $video->id,
            "video" => $video->video,
            "name" => $video->name,
            "artistName" => $video->user->name,
            "username" => $video->username,
            "avatar" => $video->user->avatar,
            "artistDecos" => $video->user->decos->count(),
            "ft" => $video->ft,
            "videoAlbumId" => $video->video_album_id,
            "album" => $video->album->name,
            "genre" => $video->genre,
            "thumbnail" => $video->thumbnail,
            "description" => $video->description,
            "released" => $video->released,
            "hasLiked" => $video->hasLiked($username),
            "likes" => $video->likes->count(),
            "comments" => $video->comments->count(),
            "inCart" => $video->inCart($username),
            "hasBoughtVideo" => $video->hasBoughtVideo($username),
            "hasBought1" => $video->user->hasBought1($username),
            "hasFollowed" => $video->user->hasFollowed($username),
            "downloads" => $video->bought->count(),
            "createdAt" => $video->created_at,
        ];
    }
}
