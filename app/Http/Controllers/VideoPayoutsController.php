<?php

namespace App\Http\Controllers;

use App\BoughtVideos;
use App\Notifications\VideoPayoutNotifications;
use App\User;
use App\VideoPayouts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Kopokopo\SDK\K2;

class VideoPayoutsController extends Controller
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

        // Get video payouts
        $getVideoPayouts = VideoPayouts::where('username', $authUsername)
            ->get();

        $videoPayouts = [];

        // Populate video payouts array
        foreach ($getVideoPayouts as $key => $videoPayout) {
            array_push($videoPayouts, [
                'amount' => $videoPayout->amount,
                'created_at' => $videoPayout->created_at->format('d F Y'),
            ]);
        }

        // Check if there's any outstanding cash
        $totalVideoEarnings = $totalVideos20 + $totalVideos200;
        $balance = $totalVideoEarnings - $getVideoPayouts->sum('amount');

        return response([
            'videoPayouts' => $videoPayouts,
            'totalVideoEarnings' => $totalVideoEarnings,
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
            'callbackUrl' => 'https://music.black.co.ke/api/video-payouts',
            'description' => 'Video Payout',
            'category' => 'salaries',
            'tags' => ["tag 1", "tag 2"],
            'metadata' => [
                // 'customerId' => '8675309',
                'notes' => 'Video payment for May 2018',
            ],
            'accessToken' => $data['accessToken'],
        ]);

        if ($response['status'] == 'success') {
            // echo "The resource location is:" . json_encode($response['location']);
            // => 'https://sandbox.kopokopo.com/api/v1/payments/d76265cd-0951-e511-80da-0aa34a9b2388'

            $videoPayout = new VideoPayouts;
            $videoPayout->username = auth()->user()->username;
            $videoPayout->amount = $request->input('amount');
            $videoPayout->save();

			// Get send video payout notification
            auth()->user()->notify(new VideoPayoutNotifications($request->input('amount')));

            return response("Video Payout Added", 200);
        }
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
