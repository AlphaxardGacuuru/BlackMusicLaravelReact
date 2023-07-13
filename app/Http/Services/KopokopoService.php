<?php

namespace App\Http\Services;

use App\Models\Kopokopo;
use App\Models\User;
use Kopokopo\SDK\K2;

class KopokopoService extends Service
{
    /*
     *
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        //
    }

    /**
     * Send STK Push to Kopokopo.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Kopokopo  $kopokopo
     * @return \Illuminate\Http\Response
     */
    public function stkPush($request)
    {
        // Get phone in better format
        $betterPhone = substr_replace(auth('sanctum')->user()->phone, '+254', 0, -9);

        // Get first and last name
        $parts = explode(" ", auth('sanctum')->user()->name);

        $lastname = array_pop($parts);

        $firstname = implode(" ", $parts);

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

        // STKPush
        $stk = $K2->StkService();
        $response = $stk->initiateIncomingPayment([
            'paymentChannel' => 'M-PESA STK Push',
            'tillNumber' => 'K433842',
            'firstName' => $firstname,
            'lastName' => $lastname,
            'phoneNumber' => $betterPhone,
            'amount' => $request->input('amount'),
            'amount' => '+254700364446',
            'currency' => 'KES',
            'email' => auth('sanctum')->user()->email,
            'callbackUrl' => 'https://music.black.co.ke/api/kopokopo',
            'accessToken' => $data['accessToken'],
        ]);

        if ($response['status'] == 'success') {
            $data = $result['data'];
            // echo "The resource location is: " . json_encode($response['location']);
            // => 'https://sandbox.kopokopo.com/api/v1/incoming_payments/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'
            return response(["message" => "Request sent to your phone"], 200);
        } else {
            return response(["message" => $response], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        // Shorten attributes
        $attributes = $request->data['attributes'];
        // Shorten event
        $event = $attributes['event'];
        // Shorten resource
        $resource = $event['resource'];

        // Get username
        $betterPhone = substr_replace($resource['sender_phone_number'], '0', 0, -9);

        $username = User::where('phone', $betterPhone)
            ->first()
            ->username;

        $kopokopo = new Kopokopo;
        $kopokopo->kopokopo_id = $request->data['id'];
        $kopokopo->type = $request->data['type'];
        $kopokopo->initiation_time = $attributes['initiation_time'];
        $kopokopo->status = $attributes['status'];
        $kopokopo->event_type = $event['type'];
        $kopokopo->resource_id = $resource['id'];
        $kopokopo->reference = $resource['reference'];
        $kopokopo->origination_time = $resource['origination_time'];
        $kopokopo->sender_phone_number = $resource['sender_phone_number'];
        $kopokopo->amount = $resource['amount'];
        $kopokopo->currency = $resource['currency'];
        $kopokopo->till_number = $resource['till_number'];
        $kopokopo->system = $resource['system'];
        $kopokopo->resource_status = $resource['status'];
        $kopokopo->sender_first_name = $resource['sender_first_name'];
        $kopokopo->sender_middle_name = $resource['sender_middle_name'];
        $kopokopo->sender_last_name = $resource['sender_last_name'];
        $kopokopo->username = $username;
        $kopokopo->save();
    }
}
