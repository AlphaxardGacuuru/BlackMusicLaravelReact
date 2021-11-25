<?php

namespace App\Http\Controllers;

use App\BoughtVideos;
use App\User;
use App\VideoPayouts;
use Illuminate\Http\Request;
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
        return VideoPayouts::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
            echo "My access token is: " . $data['accessToken'] . " It expires in: " . $data['expiresIn'] . "<br>";
        }

        // Add receipient
        // $pay = $K2->PayService();

        // $response = $pay->addPayRecipient([
        //     'type' => 'mobile_wallet',
        //     'firstName' => 'Alphaxard',
        //     'lastName' => 'Gacuuru',
        //     'email' => 'alphaxardgacuuru47@gmail.com',
        //     'phoneNumber' => '+254700364446',
        //     'network' => 'Safaricom',
        //     'accessToken' => $data['accessToken'],
        // ]);

        // if ($response['status'] == 'success') {
        //     echo "The resource location is:" . json_encode($response['location']);
        // }

        // Pay
        $pay = $K2->PayService();

        $response = $pay->sendPay([
            'destinationType' => 'mobile_wallet',
            'destinationReference' => 'c7f300c0-f1ef-4151-9bbe-005005aa3747',
            'amount' => '20000',
            'currency' => 'KES',
            'callbackUrl' => 'https://test.black.co.ke/api/video-payouts',
            'description' => 'Salary payment for May 2018',
            'category' => 'salaries',
            'tags' => ["tag 1", "tag 2"],
            'metadata' => [
                'customerId' => '8675309',
                'notes' => 'Salary payment for May 2018',
            ],
            'accessToken' => 'myRand0mAcc3ssT0k3n',
        ]);

        if ($response['status'] == 'success') {
            echo "The resource location is:" . json_encode($response['location']);
            // => 'https://sandbox.kopokopo.com/api/v1/payments/d76265cd-0951-e511-80da-0aa34a9b2388'
        }
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
