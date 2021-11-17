<?php

namespace App\Http\Controllers;

use App\Referrals;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReferralsController extends Controller
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

		$referrals = [];

        $level1Revenue = $level2Revenue = $level3Revenue = $level4Revenue = 0;

        // Fetch for level 1
        $level1Referrals = Referrals::where('username', $authUsername)
            ->get();

        foreach ($level1Referrals as $key => $referral) {

            // Total Bought Videos
            $boughtVideos = $referral->boughtVideos->count();

            // Total Bought Audios
            $boughtAudios = $referral->boughtAudios->count();

            // Total Revenue Generated
            $revenue = $boughtVideos + $boughtAudios * 10;

            $level1Revenue += $revenue;

            array_push($referrals, [
                'level' => 'Level 1',
                'referee' => $referral->referee,
                'boughtVideos' => $boughtVideos,
                'boughtAudios' => $boughtAudios,
                'revenue' => $revenue
            ]);

            // Fetch for level 2
            $level2Referrals = Referrals::where('username', $referral->referee)
                ->get();

            foreach ($level2Referrals as $key => $referral) {

                // Total Bought Videos
                $boughtVideos = $referral->boughtVideos->count();

                // Total Bought Audios
                $boughtAudios = $referral->boughtAudios->count();

                // Total Revenue Generated
                $revenue = $boughtVideos + $boughtAudios * 5;

                $level2Revenue += $revenue;

                array_push($referrals, [
                    'level' => 'Level 2',
                    'referee' => $referral->referee,
                    'boughtVideos' => $boughtVideos,
                    'boughtAudios' => $boughtAudios,
                    'revenue' => $revenue
                ]);

                // Fetch for level 3
                $level3Referrals = Referrals::where('username', $referral->referee)
                    ->get();

                foreach ($level3Referrals as $key => $referral) {

                    // Total Bought Videos
                    $boughtVideos = $referral->boughtVideos->count();

                    // Total Bought Audios
                    $boughtAudios = $referral->boughtAudios->count();

                    // Total Revenue Generated
                    $revenue = $boughtVideos + $boughtAudios * 2.5;

                    $level3Revenue += $revenue;

                    array_push($referrals, [
                        'level' => 'Level 3',
                        'referee' => $referral->referee,
                        'boughtVideos' => $boughtVideos,
                        'boughtAudios' => $boughtAudios,
                        'revenue' => $revenue
                    ]);

                    // Fetch for level 4
                    $level4Referrals = Referrals::where('username', $referral->referee)
                        ->get();

                    foreach ($level4Referrals as $key => $referral) {

                        // Total Bought Videos
                        $boughtVideos = $referral->boughtVideos->count();

                        // Total Bought Audios
                        $boughtAudios = $referral->boughtAudios->count();

                        // Total Revenue Generated
                        $revenue = $boughtVideos + $boughtAudios * 1.25;

                        $level4Revenue += $revenue;

                        array_push($referrals, [
                            'level' => 'Level 4',
                            'referee' => $referral->referee,
                            'boughtVideos' => $boughtVideos,
                            'boughtAudios' => $boughtAudios,
                            'revenue' => $revenue
                        ]);
                    }
                }
            }
        }

        return response([
			'referrals' => $referrals,
			'level1Revenue' => $level1Revenue,
			'level2Revenue' => $level2Revenue,
			'level3Revenue' => $level3Revenue,
			'level4Revenue' => $level4Revenue,
			'totalRevenue' => $level1Revenue + $level2Revenue + $level3Revenue + $level4Revenue,
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
     * @param  \App\Referrals  $referrals
     * @return \Illuminate\Http\Response
     */
    public function show(Referrals $referrals)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Referrals  $referrals
     * @return \Illuminate\Http\Response
     */
    public function edit(Referrals $referrals)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Referrals  $referrals
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Referrals $referrals)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Referrals  $referrals
     * @return \Illuminate\Http\Response
     */
    public function destroy(Referrals $referrals)
    {
        //
    }
}
