<?php

namespace App\Http\Controllers;

use App\BoughtVideos;
use App\BoughtAudios;
use App\SongPayouts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Check if user is logged in
        if (Auth::check()) {
            $authUsername = auth()->user()->username;
        } else {
            $authUsername = '@guest';
        }

        // Get cost of bought videos at each price and multiply by profit
        $totalVideos20 = BoughtVideos::where('price', 20)
            ->count() * 10;
        $totalVideos200 = BoughtVideos::where('price', 200)
            ->count() * 100;
        $totalAudios100 = BoughtAudios::where('price', 100)
            ->count() * 50;

        // Get video payouts
        $getSongPayouts = SongPayouts::get();

        $songPayouts = [];

        // Populate song payouts array
        foreach ($getSongPayouts as $key => $songPayout) {
            array_push($songPayouts, [
				'username' => $songPayout->username,
                'amount' => $songPayout->amount,
                'created_at' => $songPayout->created_at->format('d F Y'),
            ]);
        }

        // Check if there's any outstanding cash
        $totalEarnings = $totalVideos20 + $totalVideos200 + $totalAudios100;
        $balance = $totalEarnings - $getSongPayouts->sum('amount');

        return response([
            'songPayouts' => $songPayouts,
            'totalEarnings' => $totalEarnings,
            'balance' => $balance,
        ], 200);
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
        //
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
