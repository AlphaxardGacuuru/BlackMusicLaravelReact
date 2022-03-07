<?php

namespace App\Http\Controllers;

use App\BoughtAudios;
use App\BoughtVideos;
use App\Notifications\SongPayoutNotifications;
use App\SongPayouts;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Kopokopo\SDK\K2;

class SongPayoutsController extends Controller
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
        $totalVideos20 = BoughtVideos::where('artist', $authUsername)
            ->where('price', 20)
            ->count() * 10;
        $totalVideos200 = BoughtVideos::where('artist', $authUsername)
            ->where('price', 200)
            ->count() * 100;
        $totalAudios100 = BoughtAudios::where('artist', $authUsername)
            ->where('price', 100)
            ->count() * 50;

        // Get video payouts
        $getSongPayouts = SongPayouts::where('username', $authUsername)
            ->get();

        $songPayouts = [];

        // Populate song payouts array
        foreach ($getSongPayouts as $key => $songPayout) {
            array_push($songPayouts, [
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $amount = $request->input('amount');

        // Do not hard code these values
        $options = [
            // 'clientId' => env('KOPOKOPO_CLIENT_ID_SANDBOX'),
            'clientId' => env('KOPOKOPO_CLIENT_ID'),
            // 'clientSecret' => env('KOPOKOPO_CLIENT_SECRET_SANDBOX'),
            'clientSecret' => env('KOPOKOPO_CLIENT_SECRET'),
            // 'apiKey' => env('KOPOKOPO_API_KEY_SANDBOX'),
            'apiKey' => env('KOPOKOPO_API_KEY'),
            // 'baseUrl' => env('KOPOKOPO_BASE_URL_SANDBOX'),
            'baseUrl' => env('KOPOKOPO_BASE_URL'),
        ];

        $K2 = new K2($options);

        // Get one of the services
        $tokens = $K2->TokenService();

        // Use the service
        $result = $tokens->getToken();

        if ($result['status'] == 'success') {
            $data = $result['data'];
            // echo "My access token is: " . $data['accessToken'] . " It expires in: " . $data['expiresIn'] . "<br>";
        }

        $pay = $K2->PayService();

        // Pay
        $response = $pay->sendPay([
            'destinationType' => 'mobile_wallet',
            'destinationReference' => $request->input('destination_reference'),
            // 'amount' => $amount > 1000 ? $amount : $amount - 50, 
            'amount' => $amount,
            'currency' => 'KES',
            'callbackUrl' => 'https://music.black.co.ke/api/song-payouts',
            'description' => 'Song Payout',
            'category' => 'salaries',
            'tags' => ["tag 1", "tag 2"],
            'metadata' => [
                // 'customerId' => '8675309',
                'notes' => 'Song payment for May 2018',
            ],
            'accessToken' => $data['accessToken'],
        ]);

        if ($response['status'] == 'success') {
            // echo "The resource location is:" . json_encode($response['location']);
            // => 'https://sandbox.kopokopo.com/api/v1/payments/d76265cd-0951-e511-80da-0aa34a9b2388'

            $songPayout = new SongPayouts;
            $songPayout->username = auth()->user()->username;
            $songPayout->amount = $request->input('amount');
            $songPayout->save();

            // Get send video payout notification
            auth()->user()->notify(new SongPayoutNotifications($amount));

            return response("Song Payout Added", 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SongPayouts  $songPayouts
     * @return \Illuminate\Http\Response
     */
    public function show(SongPayouts $songPayouts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SongPayouts  $songPayouts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SongPayouts $songPayouts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SongPayouts  $songPayouts
     * @return \Illuminate\Http\Response
     */
    public function destroy(SongPayouts $songPayouts)
    {
        //
    }
}
