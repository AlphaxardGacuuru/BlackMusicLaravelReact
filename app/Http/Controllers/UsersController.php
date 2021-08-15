<?php

namespace App\Http\Controllers;

use App\AudioAlbums;
use App\User;
use App\VideoAlbums;
use Illuminate\Http\Request;
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
            'profile-pic' => 'image|nullable|max:9999',
            'bio' => 'string|nullable|max:50',
            'withdrawal' => 'string|nullable',
        ]);

        /* Handle file upload */
        if ($request->hasFile('profile-pic')) {
            $pp = $request->file('profile-pic')->store('public/profile-pics');
            if (auth()->user()->pp != 'profile-pics/male_avatar.png') {
                Storage::delete('public/' . auth()->user()->pp);
            }
            $pp = substr($pp, 7);
        }

        /* Update profile */
        $user = User::find($id);

        if ($request->filled('name')) {
            $user->name = $request->input('name');
        }

        if ($request->filled('phone')) {
            $user->phone = $request->input('phone');
        }

        if ($request->hasFile('profile-pic')) {
            $user->pp = $pp;
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
