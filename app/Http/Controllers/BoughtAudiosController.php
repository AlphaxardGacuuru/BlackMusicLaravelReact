<?php

namespace App\Http\Controllers;

use App\BoughtAudios;
use App\Audios;
use App\BoughtVideos;
use App\CartAudios;
use App\Decos;
use App\Kopokopo;
use App\User;
use App\Notifications\BoughtAudioNotifications;
use App\Notifications\DecoNotifications;
use Illuminate\Http\Request;

class BoughtAudiosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getBoughtAudios = BoughtAudios::where('username', auth()->user()->username)->get();

        $boughtAudios = [];

        foreach ($getBoughtAudios as $key => $boughtAudio) {
            array_push($boughtAudios, [
                "id" => $boughtAudio->id,
                "audio_id" => $boughtAudio->audio_id,
                "username" => $boughtAudio->username,
                "ft" => $boughtAudio->audios->ft,
                "name" => $boughtAudio->name,
                "artist" => $boughtAudio->artist,
                "thumbnail" => $boughtAudio->audios->thumbnail,
            ]);
        }

		return $boughtAudios;
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
        $permission = "";
        $approved = [];
        /* Fetch songs from Cart Audios */
        $cartAudiosCheck = CartAudios::where('username', auth()->user()->username)->get();

        foreach ($cartAudiosCheck as $cartAudio) {
            // Get Cost of Bought Videos at each price
            $totalVideos20 = BoughtVideos::where('username', auth()->user()->username)
                ->where('price', 20)
                ->count() * 20;
            $totalVideos200 = BoughtVideos::where('username', auth()->user()->username)
                ->where('price', 200)
                ->count() * 200;
            $totalAudios100 = BoughtAudios::where('username', auth()->user()->username)
                ->where('price', 100)
                ->count() * 100;
            $betterPhone = substr_replace(auth()->user()->phone, '+254', 0, -9);
            // Get Total Cash paid
            $kopokopo = Kopokopo::where('sender_phone', $betterPhone)->sum('amount');
            $balance = $kopokopo - ($totalVideos20 + $totalVideos200 + $totalAudios100);
            // Check if user can buy songs in cart
            $permission = intval($balance / 200);

            if ($permission >= 1) {
                $baQuery = BoughtAudios::where('username', auth()->user()->username)
                    ->where('audio_id', $cartAudio->audio_id)
                    ->count();
                if ($baQuery == 0) {
                    /* Add song to audios_bought */
                    $boughtAudios = new BoughtAudios;
                    $boughtAudios->audio_id = $cartAudio->audio_id;
                    $boughtAudios->reference = "ODT2TA2060";
                    $boughtAudios->price = 200;
                    $boughtAudios->username = auth()->user()->username;
                    $boughtAudios->name = $cartAudio->audios->audio_name;
                    $boughtAudios->artist = $cartAudio->audios->username;
                    $boughtAudios->save();

                    /* Showing audio song bought notification */
                    $user = User::where('username', $cartAudio->audios->username)
                        ->first();

                    $user->notify(new BoughtAudioNotifications($cartAudio));

                    /* Add deco if necessary */
                    /* Check if songs are 10 */
                    $userDecos = Decos::where('username', auth()->user()->username)
                        ->where('artist', $cartAudio->audios->username)
                        ->count();
                    $useraudios = BoughtAudios::where('username', auth()->user()->username)
                        ->where('artist', $cartAudio->audios->username)
                        ->count();
                    $useraudios = $useraudios / 10;
                    $decoBalance = $useraudios - $userDecos;
                    $decoPermission = intval($decoBalance);

                    /* If deco balance >= 1 then add deco */
                    if ($decoPermission >= 1) {
                        $deco = new Decos;
                        $deco->username = auth()->user()->username;
                        $deco->artist = $cartAudio->audios->username;
                        $deco->save();

                        /* Add deco notification */
                        auth()->user()->notify(new DecoNotifications($cartAudio->audios->username));
                    }
                    /* Delete from cart */
                    CartAudios::where('audio_id', $cartAudio->audio_id)
                        ->where('username', auth()->user()->username);
                    // ->delete();

                    // Update array
                    array_push($approved, $cartAudio->audio_id);
                }
            }
        }

        $receiptAudios = [];

        foreach ($approved as $key => $id) {
            $audio = Audios::find($id);

            array_push($receiptAudios, [
                "id" => $audio->id,
                "audio" => $audio->audio,
                "name" => $audio->name,
                "username" => $audio->username,
                "ft" => $audio->ft,
                "album" => $audio->album,
                "genre" => $audio->genre,
                "thumbnail" => $audio->thumbnail,
            ]);
        }

        return response($receiptAudios, 200);

        return response($approved, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BoughtAudios  $boughtAudios
     * @return \Illuminate\Http\Response
     */
    public function show(BoughtAudios $boughtAudios)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BoughtAudios  $boughtAudios
     * @return \Illuminate\Http\Response
     */
    public function edit(BoughtAudios $boughtAudios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BoughtAudios  $boughtAudios
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BoughtAudios $boughtAudios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BoughtAudios  $boughtAudios
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoughtAudios $boughtAudios)
    {
        //
    }
}
