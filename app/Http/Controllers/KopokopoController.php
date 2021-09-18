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
            // 'clientId' => 'o7wE4rdF-bXJV8JbPknbribTxjTxiEVD-Qn44KGjo_E',
            'clientSecret' => 'AWmptk5WjDpTau9PIELbVBqiw3pDiM5dlILssKX9N3E',
            // 'clientSecret' => 'nkOf5bqUP_5wSMquZIhUa_GvRAkNIkBOCMqGwGuMc3w',
            'apiKey' => '6rgIMwloH24KVndBVEMVpdFpoSG4L0tQd3YpcADyIpA',
            // 'apiKey' => '1aa7d918b8a4cd2472d74dc90e429edd4cd6d999',
            'baseUrl' => 'https://sandbox.kopokopo.com',
            // 'baseUrl' => 'https: //app.kopokopo.com',
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
            'tillNumber' => 'K000000',
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
            // echo "The resource location is:" . json_encode($response['location']);
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
        $kopokopo->sender_phone = $request->status;
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
