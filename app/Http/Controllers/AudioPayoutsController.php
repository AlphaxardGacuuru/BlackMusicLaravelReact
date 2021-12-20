<?php

namespace App\Http\Controllers;

use App\User;
use App\BoughtAudios;
use App\Notifications\AudioPayoutNotifications;
use App\AudioPayouts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AudioPayoutsController extends Controller
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
		
        // Get cost of bought audios at each price and multiply by profit
        $totalAudios100 = BoughtAudios::where('artist', $authUsername)
            ->where('price', 100)
            ->count() * 50;

        // Get audio payouts
        $getAudioPayouts = AudioPayouts::where('username', $authUsername)
            ->get();

        $audioPayouts = [];
		
        // Populate audio payouts array
        foreach ($getAudioPayouts as $key => $audioPayout) {
            array_push($audioPayouts, [
                'amount' => $audioPayout->amount,
				'created_at' => $audioPayout->created_at->format('d F Y')
            ]);
        }

        // Check if there's any outstanding cash
        $balance = $totalAudios100 - $getAudioPayouts->sum('amount');

        return response([
            'audioPayouts' => $audioPayouts,
            'totalAudioEarnings' => $totalAudios100,
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
    public function update(Request $request, $id)
    {
        // Do not hard code these values
        $options = [
            'clientId' => env('KOPOKOPO_CLIENT_ID_SANDBOX'),
            // 'clientId' => env('KOPOKOPO_CLIENT_ID'),
            'clientSecret' => env('KOPOKOPO_CLIENT_SECRET_SANDBOX'),
            // 'clientSecret' => env('KOPOKOPO_CLIENT_SECRET'),
            'apiKey' => env('KOPOKOPO_API_KEY_SANDBOX'),
            // 'apiKey' => env('KOPOKOPO_API_KEY'),
            'baseUrl' => env('KOPOKOPO_BASE_URL_SANDBOX'),
            // 'baseUrl' => env('KOPOKOPO_BASE_URL'),
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
            'amount' => $request->input('amount'),
            'currency' => 'KES',
            'callbackUrl' => 'https://music.black.co.ke/api/audio-payouts',
            'description' => 'Audio Payout',
            'category' => 'salaries',
            'tags' => ["tag 1", "tag 2"],
            'metadata' => [
                // 'customerId' => '8675309',
                'notes' => 'Audio payment for May 2018',
            ],
            'accessToken' => $data['accessToken'],
        ]);

        if ($response['status'] == 'success') {
            // echo "The resource location is:" . json_encode($response['location']);
            // => 'https://sandbox.kopokopo.com/api/v1/payments/d76265cd-0951-e511-80da-0aa34a9b2388'

            $audioPayout = new AudioPayouts;
            $audioPayout->username = auth()->user()->username;
            $audioPayout->amount = $request->input('amount');
            $audioPayout->save();

			// Get send audio payout notification
            auth()->user()->notify(new AudioPayoutNotifications($request->input('amount')));

            return response("Audio Payout Added", 200);
        }
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
