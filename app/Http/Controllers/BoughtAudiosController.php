<?php

namespace App\Http\Controllers;

use App\AudioNotifications;
use App\BoughtAudios;
use App\BoughtVideos;
use App\CartAudios;
use App\DecoNotifications;
use App\Decos;
use App\Kopokopo;
use App\User;
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
        /* Fetch songs from Cart Videos */
        $cartAudiosCheck = CartAudios::where('username', auth()->user()->username)->get();

        foreach ($cartAudiosCheck as $cartAudioCheck) {
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
                    ->where('audio_id', $cartAudioCheck->audio_id)
                    ->count();
                if ($baQuery == 0) {
                    /* Add song to videos_bought */
                    $boughtAudios = new BoughtAudios;
                    $boughtAudios->audio_id = $cartAudioCheck->audio_id;
                    $boughtAudios->reference = "ODT2TA2060";
                    $boughtAudios->price = 200;
                    $boughtAudios->username = auth()->user()->username;
                    $boughtAudios->name = $cartAudioCheck->audios->audio_name;
                    $boughtAudios->artist = $cartAudioCheck->audios->username;
                    // $boughtAudios->save();

                    /* Showing video song bought notification */
                    $audioNotifications = new AudioNotifications;
                    $audioNotifications->audio_id = $cartAudioCheck->audio_id;
                    $audioNotifications->username = auth()->user()->username;
                    $audioNotifications->artist = $cartAudioCheck->audios->username;
                    // $audioNotifications->save();

                    /* Add deco if necessary */
                    /* Check if songs are 10 */
                    $userDecos = Decos::where('username', auth()->user()->username)
                        ->where('artist', $cartAudioCheck->audios->username)
                        ->count();
                    $uservideos = BoughtAudios::where('username', auth()->user()->username)
                        ->where('username', $cartAudioCheck->audios->username)
                        ->count();
                    $uservideos = $uservideos / 10;
                    $decoBalance = $uservideos - $userDecos;
                    $decoPermission = intval($decoBalance);

                    /* If deco balance >= 1 then add deco */
                    if ($decoPermission >= 1) {
                        $deco = new Decos;
                        $deco->username = auth()->user()->username;
                        $deco->artist = $cartAudioCheck->video->username;
                        // $deco->save();

                        /* Add deco notification */
                        $decoNotification = new DecoNotifications;
                        $decoNotification->username = auth()->user()->username;
                        $decoNotification->artist = $cartAudioCheck->video->username;
                        // $decoNotification->save();
                    }
                    /* Delete from cart */
                    CartAudios::where('audio_id', $cartAudioCheck->audio_id)
                        ->where('username', auth()->user()->username);
                    // ->delete();

                    // Update array
                    array_push($approved, $cartAudioCheck->audio_id);
                }
            }
        }

        $totalVideos = BoughtAudios::where('username', auth()->user()->username)->count() * 20;
        $phone = substr_replace(auth()->user()->phone, "+254", 0, -9);
        $kopokopo = Kopokopo::where('sender_phone', $phone)->sum('amount');
        $balance = $kopokopo - $totalVideos;

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
