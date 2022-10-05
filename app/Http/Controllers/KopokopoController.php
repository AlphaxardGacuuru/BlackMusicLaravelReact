<?php

namespace App\Http\Controllers;

// Kopokopo dependency
use App\Kopokopo;
use App\User;
use Illuminate\Http\Request;
use Kopokopo\SDK\K2;

class KopokopoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $kopokopo->sender_username = $username;
        $kopokopo->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Kopokopo  $kopokopo
     * @return \Illuminate\Http\Response
     */
    public function show(Kopokopo $kopokopo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Kopokopo  $kopokopo
     * @return \Illuminate\Http\Response
     */
    public function edit(Kopokopo $kopokopo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Kopokopo  $kopokopo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $amount)
    {
        // Get phone in better format
        $betterPhone = substr_replace(auth()->user()->phone, '+254', 0, -9);

        // Get first and last name
        $parts = explode(" ", auth()->user()->name);

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
            'amount' => $amount,
            'currency' => 'KES',
            'email' => auth()->user()->email,
            'callbackUrl' => 'https://music.black.co.ke/api/kopokopo',
            'accessToken' => $data['accessToken'],
        ]);

        if ($response['status'] == 'success') {
            $data = $result['data'];
            // echo "The resource location is: " . json_encode($response['location']);
            // => 'https://sandbox.kopokopo.com/api/v1/incoming_payments/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'
            return response('Request sent to your phone', 200);
        } else {
            return response($response['status'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Kopokopo  $kopokopo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Kopokopo $kopokopo)
    {
        //
    }
}
