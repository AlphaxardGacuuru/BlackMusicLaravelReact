<?php

namespace App\Http\Controllers;

use App\BoughtAudios;
use App\BoughtVideos;
use App\SongPayouts;
use App\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get cost of bought videos at each price and multiply by profit
        $totalVideos = BoughtVideos::where('price', 20)->count() * 10;
        $totalAudios = BoughtAudios::where('price', 10)->count() * 5;

        $songPayouts = [];

        $getUsers = User::where('account_type', 'musician')->get();

        foreach ($getUsers as $key => $user) {
            // Get cost of bought videos at each price and multiply by profit
            $totalVideos = BoughtVideos::where('artist', $user->username)->count() * 10;
            $totalAudios = BoughtAudios::where('artist', $user->username)->count() * 5;

            // Get song payouts
            $songPayoutSum = SongPayouts::where('username', $user->username)
                ->get()
                ->sum('amount');

            // Check if there's any outstanding cash
            $totalEarnings = $totalVideos + $totalAudios;
            $balance = $totalEarnings - $songPayoutSum;

            // Populate song payouts array
            // Only add recipients who don't have a balance
            if ($balance) {
                array_push($songPayouts, [
                    'name' => $user->name,
                    'username' => $user->username,
                    'amount' => $user->amount,
                    'earnings' => $totalEarnings,
                    'payouts' => $songPayoutSum,
                    'balance' => $balance,
                ]);
            }
        }

        return response([
            'songPayouts' => $songPayouts,
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
