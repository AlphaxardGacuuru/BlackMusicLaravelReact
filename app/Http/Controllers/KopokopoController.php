<?php

namespace App\Http\Controllers;

// Kopokopo dependency
use App\Kopokopo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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
        // Do not hard code these values
        $options = [
            'clientId' => '1hEtWa9CzOo7ge7R0MoxOYd9LtW5IkzcbFwIpz385Ms',
            'clientSecret' => 'AWmptk5WjDpTau9PIELbVBqiw3pDiM5dlILssKX9N3E',
            'apiKey' => '6rgIMwloH24KVndBVEMVpdFpoSG4L0tQd3YpcADyIpA',
            'baseUrl' => 'https://sandbox.kopokopo.com',
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
            'tillNumber' => 'K000000',
            'firstName' => 'Jane',
            'lastName' => 'Doe',
            'phoneNumber' => '+254700364446',
            'amount' => 3455,
            'currency' => 'KES',
            'email' => 'alphaxardgacuuru47@gmail.com',
            'callbackUrl' => 'http://localhost:3000/api/kopokopo',
            'accessToken' => $data['accessToken'],
        ]);

        if ($response['status'] == 'success') {
            $data = $result['data'];
            echo "The resource location is:" . json_encode($response['location']);
            // => 'https://sandbox.kopokopo.com/api/v1/incoming_payments/247b1bd8-f5a0-4b71-a898-f62f67b8ae1c'
        }

        // return "you're here";
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
