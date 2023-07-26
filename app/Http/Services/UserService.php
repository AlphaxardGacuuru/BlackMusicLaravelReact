<?php

namespace App\Http\Services;

use App\Http\Resources\UserResource;
use App\Models\AudioAlbum;
use App\Models\User;
use App\Models\VideoAlbum;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getUsers = User::all();

        return UserResource::collection($getUsers);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($username)
    {
        $getUser = User::where("username", $username)->first();

        return new UserResource($getUser);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update($request, $id)
    {
        /* Update profile */
        $user = User::find($id);

        if ($request->filled('name')) {
            $user->name = $request->input('name');
        }

        if ($request->filled('phone')) {
            $user->phone = $request->input('phone');
            $user->password = Hash::make($request->input('phone'));
        }

        if ($request->filled('accountType') && $user->account_type == "normal") {

            $user->account_type = $request->input('accountType');

            DB::transaction(function () {

                /* Create new video album */
                $vAlbum = new VideoAlbum;
                $vAlbum->name = "Singles";
                $vAlbum->username = auth('sanctum')->user()->username;
                $vAlbum->cover = "video-album-covers/musical-note.png";
                $vAlbum->released = Carbon::now();
                $vAlbum->save();

                /* Create new audio album */
                $aAlbum = new AudioAlbum;
                $aAlbum->name = "Singles";
                $aAlbum->username = auth('sanctum')->user()->username;
                $aAlbum->cover = "audio-album-covers/musical-note.png";
                $vAlbum->released = Carbon::now();
                $aAlbum->save();

            });
        }

        if ($request->filled('bio')) {
            $user->bio = $request->input('bio');
        }

        if ($request->filled('withdrawal')) {
            $user->withdrawal = $request->input('withdrawal');
        }

        $saved = $user->save();

        return [$saved, "Account updated", $user];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function auth()
    {
        $auth = auth('sanctum')->user();

        return new UserResource($auth);
    }

    /*
     * Artists */
    public function artists()
    {
        $getArtists = User::where("account_type", "musician")
            ->where("username", "!=", $this->username)
            ->where("username", "!=", "@blackmusic")
            ->paginate(10);

        return UserResource::collection($getArtists);
    }
}
