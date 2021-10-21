<?php

namespace App\Http\Controllers;

use App\AudioAlbums;
use App\Audios;
use App\BoughtAudios;
use App\BoughtVideos;
use App\CartAudios;
use App\CartVideos;
use App\Follows;
use App\Mail\WelcomeMail;
use App\User;
use App\VideoAlbums;
use App\Videos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        Mail::to(auth()->user())
            ->send(new WelcomeMail);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /* Handle file upload */
        if ($request->hasFile('filepond-profile-pic')) {
            $pp = $request->file('filepond-profile-pic')->store('public/profile-pics');
            $pp = substr($pp, 7);

            // Delete profile pic
            if (auth()->user()->pp != 'profile-pics/male_avatar.png') {
                Storage::delete('public/' . auth()->user()->pp);
            }

            $user = User::find(auth()->user()->id);
            $user->pp = $pp;
            $user->save();

            return response("Account updated", 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($username)
    {
        $getUser = User::where('username', $username)->first();

        // Check if user has bought atleast 1 song
        $hasBoughtVideo = BoughtVideos::where('username', auth()->user()->username)
            ->where('artist', $username)
            ->count();

        // Check if user has bought atleast 1 song
        $hasBoughtAudio = BoughtAudios::where('username', auth()->user()->username)
            ->where('artist', $username)
            ->count();

        $hasBought1 = ($hasBoughtVideo + $hasBoughtAudio) > 1 ? true : false;

        // Get profile info
        $profile = array(
            "name" => $getUser->name,
            "username" => $getUser->username,
            "email" => $getUser->email,
            "pp" => preg_match("/http/", $getUser->pp) ? $getUser->pp : '/storage/' . $getUser->pp,
            "following" => Follows::where('username', $username)->count() - 1,
            "fans" => Follows::where('followed', $username)->count() - 1,
            "hasFollowed" => Follows::where('followed', $username)
                ->where('username', auth()->user()->username)
                ->exists(),
            "hasBought1" => $hasBought1,
        );

        // Audios
        // Get Audio Albums
        $getAudioAlbums = AudioAlbums::where('username', $username)
            ->get();

        $audioAlbums = [];

        foreach ($getAudioAlbums as $key => $audioAlbum) {
            array_push($audioAlbums, [
                "id" => $audioAlbum->id,
                "username" => $audioAlbum->username,
                "name" => $audioAlbum->name,
                "cover" => $audioAlbum->cover,
                "released" => $audioAlbum->released,
                "created_at" => $audioAlbum->created_at->format("d M Y"),
            ]);
        }

        // Get Audios
        $getAudios = Audios::where('username', $username)
            ->get();

        $audios = [];

        foreach ($getAudios as $key => $audio) {

            // Check if audio in cart
            $inCart = CartAudios::where('audio_id', $audio->id)
                ->where('username', auth()->user()->username)
                ->exists();

            // Check if user has bought audio
            $hasBoughtAudio = BoughtAudios::where('username', auth()->user()->username)
                ->where('audio_id', $audio->id)
                ->exists();

            array_push($audios, [
                "id" => $audio->id,
                "audio" => $audio->audio,
                "name" => $audio->name,
                "username" => $audio->username,
                "ft" => $audio->ft,
                "album" => $audio->album,
                "genre" => $audio->genre,
                "thumbnail" => $audio->thumbnail,
                "description" => $audio->description,
                "released" => $audio->released,
                "inCart" => $inCart,
                "hasBoughtAudio" => $hasBoughtAudio,
                "created_at" => $audio->created_at,
            ]);
        }

        // Videos
        // Get Video Albums
        $getVideoAlbums = VideoAlbums::where('username', $username)
            ->get();

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

        // Get Videos
        $getVideos = Videos::where('username', '!=', auth()->user()->username)
            ->orderBy('id', 'ASC')
            ->get();

        $videos = [];

        foreach ($getVideos as $key => $video) {
            // Check if video in cart
            $inCart = CartVideos::where('video_id', $video->id)
                ->where('username', auth()->user()->username)
                ->exists();

            // Check if user has bought video
            $hasBoughtVideo = BoughtVideos::where('username', auth()->user()->username)
                ->where('video_id', $video->id)
                ->exists();

            array_push($videos, [
                "id" => $video->id,
                "video" => $video->video,
                "name" => $video->name,
                "username" => $video->username,
                "ft" => $video->ft,
                "album" => $video->album,
                "genre" => $video->genre,
                "thumbnail" => preg_match("/http/", $video->thumbnail) ? $video->thumbnail : '/storage/' . $video->thumbnail,
                "description" => $video->description,
                "released" => $video->released,
                "inCart" => $inCart,
                "hasBoughtVideo" => $hasBoughtVideo,
                "created_at" => $video->created_at,
            ]);
        }

        return [
            "profile" => $profile,
            "audioAlbums" => $audioAlbums,
            "audios" => $audios,
            "videoAlbums" => $videoAlbums,
            "videos" => $videos,
        ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'string|nullable|max:20',
            'phone' => 'string|nullable|startsWith:07|min:10|max:10',
            'filepond-profile-pic' => 'nullable|max:9999',
            'bio' => 'string|nullable|max:50',
            'withdrawal' => 'string|nullable',
        ]);

        /* Update profile */
        $user = User::find($id);

        if ($request->filled('name')) {
            $user->name = $request->input('name');
        }

        if ($request->filled('phone')) {
            $user->phone = $request->input('phone');
        }

        if ($request->filled('account_type')) {
            $user->account_type = $request->input('account_type');

            /* Create new video album */
            $aAlbum = new AudioAlbums;
            $aAlbum->name = "Singles";
            $aAlbum->username = auth()->user()->username;
            $aAlbum->cover = "audio-album-covers/musical-note.png";
            $aAlbum->save();

            /* Create new video album */
            $vAlbum = new VideoAlbums;
            $vAlbum->name = "Singles";
            $vAlbum->username = auth()->user()->username;
            $vAlbum->cover = "video-album-covers/musical-note.png";
            $vAlbum->save();
        }

        if ($request->filled('bio')) {
            $user->bio = $request->input('bio');
        }

        if ($request->filled('withdrawal')) {
            $user->withdrawal = $request->input('withdrawal');
        }

        $user->save();

        return response("Account updated", 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
