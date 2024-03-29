<?php

namespace App\Http\Controllers;

use App\BoughtAudios;
use App\BoughtVideos;
use App\CartVideos;
use App\Decos;
use App\Kopokopo;
use App\Notifications\BoughtVideoNotifications;
use App\Notifications\DecoNotifications;
use App\Notifications\VideoReceiptNotifications;
use App\User;
use App\Videos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoughtVideosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getBoughtVideos = BoughtVideos::all();

        $boughtVideos = [];

        foreach ($getBoughtVideos as $key => $boughtVideo) {
            array_push($boughtVideos, [
                "id" => $boughtVideo->id,
                "video_id" => $boughtVideo->video_id,
                "username" => $boughtVideo->username,
				"price" => $boughtVideo->price,
                "ft" => $boughtVideo->videos->ft,
                "name" => $boughtVideo->videos->name,
                "artist" => $boughtVideo->artist,
                "thumbnail" => preg_match("/http/", $boughtVideo->videos->thumbnail) ?
                $boughtVideo->videos->thumbnail :
                "/storage/" . $boughtVideo->videos->thumbnail,
				// Fetch Video for use in VideoMedia component
				"video" => $boughtVideo->videos
            ]);
        }

        return $boughtVideos;
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
        $cartVideos = CartVideos::where('username', auth()->user()->username)
            ->get();

        foreach ($cartVideos as $cartVideo) {
            // Get Cost of Bought Videos
            $totalVideos = BoughtVideos::where('username', auth()->user()->username)->count() * 20;
            $totalAudios = BoughtAudios::where('username', auth()->user()->username)->count() * 10;
            $betterPhone = substr_replace(auth()->user()->phone, '+254', 0, -9);
			
            // Get Total Cash paid
            $kopokopo = Kopokopo::where('sender_phone_number', $betterPhone)->sum('amount');
            $balance = $kopokopo - ($totalVideos + $totalAudios);
            // Check if user can buy songs in cart
            $permission = intval($balance / 20);

            if ($permission >= 1) {
                $bvQuery = BoughtVideos::where('username', auth()->user()->username)
                    ->where('video_id', $cartVideo->video_id)
                    ->count();
                if ($bvQuery == 0) {
                    /* Add song to videos_bought */
                    $boughtVideos = new BoughtVideos;
                    $boughtVideos->video_id = $cartVideo->video_id;
                    $boughtVideos->reference = "ODT2TA2060";
                    $boughtVideos->price = 20;
                    $boughtVideos->username = auth()->user()->username;
                    $boughtVideos->name = $cartVideo->videos->name;
                    $boughtVideos->artist = $cartVideo->videos->username;
                    $boughtVideos->save();

                    /* Showing video song bought notification */
                    $user = User::where('username', $cartVideo->videos->username)
                        ->first();

                    $user->notify(new BoughtVideoNotifications($cartVideo));

                    /* Add deco if necessary */
                    /* Check if songs are 10 */
                    $userDecos = Decos::where('username', auth()->user()->username)
                        ->where('artist', $cartVideo->videos->username)
                        ->count();
                    $uservideos = BoughtVideos::where('username', auth()->user()->username)
                        ->where('artist', $cartVideo->videos->username)
                        ->count();
                    $uservideos = $uservideos / 10;
                    $decoBalance = $uservideos - $userDecos;
                    $decoPermission = intval($decoBalance);

                    /* If deco balance >= 1 then add deco */
                    if ($decoPermission >= 1) {
                        $deco = new Decos;
                        $deco->username = auth()->user()->username;
                        $deco->artist = $cartVideo->videos->username;
                        $deco->save();

                        /* Add deco notification */
                        auth()->user()->notify(new DecoNotifications($cartVideo->videos->username));
                    }
                    /* Delete from cart */
                    CartVideos::where('video_id', $cartVideo->video_id)
                        ->where('username', auth()->user()->username)
                        ->delete();

                    // Update array
                    array_push($approved, $cartVideo->videos->id);
                }
            }
        }

        $receiptVideos = [];

        foreach ($approved as $key => $id) {

            $video = Videos::find($id);

            array_push($receiptVideos, [
                "id" => $video->id,
                "video" => $video->video,
                "name" => $video->name,
                "username" => $video->username,
                "ft" => $video->ft,
                "album" => $video->album,
                "genre" => $video->genre,
                "thumbnail" => preg_match("/http/", $video->thumbnail) ? $video->thumbnail : "/storage/" . $video->thumbnail,
            ]);
        }

        // Notify User
        if (count($receiptVideos) > 0) {
            auth()->user()->notify(new VideoReceiptNotifications($receiptVideos));
        }

        return response($receiptVideos, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BoughtVideos  $boughtVideos
     * @return \Illuminate\Http\Response
     */
    public function show(BoughtVideos $boughtVideos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BoughtVideos  $boughtVideos
     * @return \Illuminate\Http\Response
     */
    public function edit(BoughtVideos $boughtVideos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BoughtVideos  $boughtVideos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BoughtVideos $boughtVideos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BoughtVideos  $boughtVideos
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoughtVideos $boughtVideos)
    {
        //
    }
}
