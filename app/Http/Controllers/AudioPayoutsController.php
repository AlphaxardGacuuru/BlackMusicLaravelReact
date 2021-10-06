<?php

namespace App\Http\Controllers;

use App\User;
use App\BoughtAudios;
use App\AudioPayouts;
use Illuminate\Http\Request;

class AudioPayoutsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AudioPayouts::all();
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
        $audioPayout = new AudioPayouts;
        $audioPayout->username = $request->input('username');
        $audioPayout->amount = $request->input('amount');
        $audioPayout->save();

		return response("Audio Payout Added", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AudioPayouts  $audioPayouts
     * @return \Illuminate\Http\Response
     */
    public function show(AudioPayouts $audioPayouts)
    {
        $musicians = User::where('account_type', 'musician')->get();

        foreach ($musicians as $key => $musician) {

            $totalBoughtAudios20 = BoughtAudios::where('artist', $musician->username)->where('price', 20)->count() * 20;
            $totalBoughtAudios200 = BoughtAudios::where('artist', $musician->username)->where('price', 200)->count() * 200;
            $totalAudioPayouts = AudioPayouts::where('username', $musician->username)->sum('amount');

            $balance = ($totalBoughtAudios20 + $totalBoughtAudios200) - $totalAudioPayouts;

            if ($balance != 0) {
                $audioPayouts[$key] = array(
                    'name' => $musician->name,
                    'username' => $musician->username,
                    'email' => $musician->email,
                    'phone' => $musician->phone,
                    'amount' => $balance,
                );
            }
        }

        return $audioPayouts;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AudioPayouts  $audioPayouts
     * @return \Illuminate\Http\Response
     */
    public function edit(AudioPayouts $audioPayouts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AudioPayouts  $audioPayouts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AudioPayouts $audioPayouts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AudioPayouts  $audioPayouts
     * @return \Illuminate\Http\Response
     */
    public function destroy(AudioPayouts $audioPayouts)
    {
        //
    }
}
