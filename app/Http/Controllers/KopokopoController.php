<?php

namespace App\Http\Controllers;

// Kopokopo dependency
use App\Kopokopo;
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
		// return Kopokopo::all();
		
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
            echo "My access token is: " . $data['accessToken'] . " It expires in: " . $data['expiresIn'] . "<br>";
        }
		
        // STKPush
        $stk = $K2->StkService();
        $response = $stk->initiateIncomingPayment([
            'paymentChannel' => 'M-PESA STK Push',
            // 'tillNumber' => 'K000000',
            'tillNumber' => 'K433842',
            'firstName' => auth()->user()->name,
            'lastName' => 'Doe',
            'phoneNumber' => substr_replace(auth()->user()->phone, '+254', 0, -9),
            'amount' => 200,
            'currency' => 'KES',
            'email' => auth()->user()->email,
            'callbackUrl' => 'https://test.black.co.ke/api/kopokopo',
            'accessToken' => $data['accessToken'],
        ]);

        if ($response['status'] == 'success') {
            $data = $result['data'];
            echo "The resource location is: " . json_encode($response['location']);
            // => 'https://sandbox.kopokopo.com/api/v1/incoming_payments/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'
            return response($response['status'], 200);
        } else {
            return response($response, 400);
        }
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
        $kopokopo = new Kopokopo;
        $kopokopo->sender_phone = $request->input('sender_phone');
        $kopokopo->first_name = $request->input('first_name');
        $kopokopo->last_name = $request->input('last_name');
        $kopokopo->amount = $request->input('amount');
        $kopokopo->reference = $request->input('transaction_reference');
        $kopokopo->middle_name = $request->input('middle_name');
        $kopokopo->service_name = $request->input('service_name');
        $kopokopo->business_number = $request->input('business_number');
        $kopokopo->internal_transaction_id = $request->input('internal_transaction_id');
        $kopokopo->transaction_timestamp = $request->input('transaction_timestamp');
        $kopokopo->transaction_type = $request->input('transaction_type');
        $kopokopo->account_number = $request->input('account_number');
        $kopokopo->currency = $request->input('currency');
        $kopokopo->signature = $request->input('signature');
        $kopokopo->save();

		// Create notification

        return response()->json([
            'status' => '01',
            'description' => 'Accepted',
            'subscriber_message' => 'Thank you John Doe for your payment of Ksh 4000. We value your business',
        ]);

        // $kopokopo = new Kopokopo;
        // $kopokopo->sender_phone = $request->input('senderPhoneNumber');
        // $kopokopo->first_name = $request->input('senderPhoneNumber');
        // // $kopokopo->first_name = 'name';
        // $kopokopo->save();

        // foreach ($request as $key => $value) {
        //     foreach ($value as $key1 => $value1) {
        //         return $key1;
        //     }
        // }

        // $kopokopo->data = $request->id;
        // $kopokopo->data = $request->type;
        // $kopokopo->data = $request->initiationTime;
        // $kopokopo->data = $request->status;
        // $kopokopo->data = $request->eventType;
        // $kopokopo->data = $request->resourceId;
        // $kopokopo->data = $request->reference;
        // $kopokopo->data = $request->originationTime;
        // $kopokopo->data = $request->senderPhoneNumber;
        // $kopokopo->data = $request->amount;
        // $kopokopo->data = $request->currency;
        // $kopokopo->data = $request->tillNumber;
        // $kopokopo->data = $request->system;
        // $kopokopo->data = $request->senderFirstName;
        // $kopokopo->data = $request->senderMiddleName;
        // $kopokopo->data = $request->senderLastName;
        // $kopokopo->data = $request->resourceStatus;
        // $kopokopo->data = $request->errors;
        // $kopokopo->data = $request->metadata;
        // $kopokopo->data = $request->linkSelf;
        // $kopokopo->data = $request->callbackUrl;
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
    public function update(Request $request, Kopokopo $kopokopo)
    {
        //
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
