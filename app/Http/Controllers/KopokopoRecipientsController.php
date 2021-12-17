<?php

namespace App\Http\Controllers;

use App\KopokopoRecipients;
use Illuminate\Http\Request;
use Kopokopo\SDK\K2;

class KopokopoRecipientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return KopokopoRecipients::all();
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

        // Add receipient
        $pay = $K2->PayService();

        $response = $pay->addPayRecipient([
            'type' => 'mobile_wallet',
            'firstName' => 'Alphaxard',
            'lastName' => 'Gacuuru',
            'email' => 'alphaxardgacuuru47@gmail.com',
            'phoneNumber' => '+254700364446',
            'network' => 'Safaricom',
            'accessToken' => $data['accessToken'],
        ]);

        if ($response['status'] == 'success') {
            // echo "The resource location is:" . json_encode($response['location']);
			
            $array = explode('/', $response['location']);
            $destinationReferrence = end($array);

            // Save destination reference
            $kopokopoRecipient = new KopokopoRecipients;
            $kopokopoRecipient->username = auth()->user()->username;
            $kopokopoRecipient->destination_reference = $destinationReferrence;
            $kopokopoRecipient->save();

            return response('Recipient Wallet Created', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\KopokopoRecipients  $kopokopoRecipients
     * @return \Illuminate\Http\Response
     */
    public function show(KopokopoRecipients $kopokopoRecipients)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\KopokopoRecipients  $kopokopoRecipients
     * @return \Illuminate\Http\Response
     */
    public function edit(KopokopoRecipients $kopokopoRecipients)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\KopokopoRecipients  $kopokopoRecipients
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KopokopoRecipients $kopokopoRecipients)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\KopokopoRecipients  $kopokopoRecipients
     * @return \Illuminate\Http\Response
     */
    public function destroy(KopokopoRecipients $kopokopoRecipients)
    {
        //
    }
}
