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
        $getUsers = User::all();

        $users = [];

        // Get Users
        foreach ($getUsers as $key => $user) {
            // Check if user has followed User
            $hasFollowed = Follows::where('followed', $user->username)
                ->where('username', auth()->user()->username)
                ->exists();

            // Check if user has bought atleast 1 song
            $hasBoughtVideo = BoughtVideos::where('username', auth()->user()->username)
                ->where('artist', $user->username)
                ->count();

            // Check if user has bought atleast 1 song
            $hasBoughtAudio = BoughtAudios::where('username', auth()->user()->username)
                ->where('artist', $user->username)
                ->count();

            $hasBought1 = ($hasBoughtVideo + $hasBoughtAudio) > 1 ? true : false;

            array_push($users, [
				"id" => $user->id,
                "name" => $user->name,
                "username" => $user->username,
                "account_type" => $user->account_type,
                "pp" => preg_match("/http/", $user->pp) ? $user->pp : "/storage/" . $user->pp,
                "bio" => $user->bio,
                "posts" => $user->posts->count(),
                "following" => $user->follows->count() - 1,
                "fans" => Follows::where('followed', $user->username)->count() - 1,
                "hasFollowed" => $hasFollowed,
                "hasBought1" => $hasBought1,
                "decos" => $user->decos->count(),
            ]);
        }

		return $users;
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
		// 
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
