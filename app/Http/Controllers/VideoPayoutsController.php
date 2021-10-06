<?php

namespace App\Http\Controllers;

use App\BoughtVideos;
use App\User;
use App\VideoPayouts;
use Illuminate\Http\Request;

class VideoPayoutsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return VideoPayouts::all();
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
        $videoPayout = new VideoPayouts;
        $videoPayout->username = $request->input('username');
        $videoPayout->amount = $request->input('amount');
        $videoPayout->save();

		return response("Video Payout Added", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\VideoPayouts  $videoPayouts
     * @return \Illuminate\Http\Response
     */
    public function show(VideoPayouts $videoPayouts)
    {
        $musicians = User::where('account_type', 'musician')->get();

        foreach ($musicians as $key => $musician) {

            $totalBoughtVideos20 = BoughtVideos::where('artist', $musician->username)->where('price', 20)->count() * 20;
            $totalBoughtVideos200 = BoughtVideos::where('artist', $musician->username)->where('price', 200)->count() * 200;
            $totalVideoPayouts = VideoPayouts::where('username', $musician->username)->sum('amount');

            $balance = ($totalBoughtVideos20 + $totalBoughtVideos200) - $totalVideoPayouts;

            if ($balance != 0) {
                $videoPayouts[$key] = array(
                    'name' => $musician->name,
                    'username' => $musician->username,
                    'email' => $musician->email,
                    'phone' => $musician->phone,
                    'amount' => $balance,
                );
            }
        }

        return $videoPayouts;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\VideoPayouts  $videoPayouts
     * @return \Illuminate\Http\Response
     */
    public function edit(VideoPayouts $videoPayouts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\VideoPayouts  $videoPayouts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VideoPayouts $videoPayouts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\VideoPayouts  $videoPayouts
     * @return \Illuminate\Http\Response
     */
    public function destroy(VideoPayouts $videoPayouts)
    {
        //
    }
}
