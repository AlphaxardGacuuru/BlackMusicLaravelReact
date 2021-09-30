<?php

namespace App\Http\Controllers;

// AfricasTalking
use AfricasTalking\SDK\AfricasTalking;
use App\SMS;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SMSController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SMS::all();
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
        if ($request->filled('phone')) {

            Http::withHeaders([
                'apiKey' => 'be25ed4a43e7a6bddc176e0b38772afb52790ca0c29287b539cf390d3e08a73b',
                // 'apiKey' => '59f00f7e0a06b0f8b6fa1d88a1bd043082e2493cc25b0f0eab7a58f6e62339e2',
            ])->post('https://api.sandbox.africastalking.com/auth-token/generate', [
                // ])->post('https://api.africastalking.com/auth-token/generate', [
                'username' => 'sandbox',
                // 'username' => 'kwanza',
            ]);

            $phone = $request->input('phone');
            $betterPhone = substr_replace($phone, '+254', 0, -9);

            // Set your app credentials
            $username = "sandbox";
            // $username = "kwanza";
            $apiKey = "be25ed4a43e7a6bddc176e0b38772afb52790ca0c29287b539cf390d3e08a73b";
            // $apiKey = "59f00f7e0a06b0f8b6fa1d88a1bd043082e2493cc25b0f0eab7a58f6e62339e2";

            // Initialize the SDK
            $AT = new AfricasTalking($username, $apiKey);

            // Get the SMS service
            $sms = $AT->sms();

            // Set the numbers you want to send to in international format
            $recipients = $betterPhone;

            // Set your message
            $message = $request->input('message');

            // Set your shortCode or senderId
            $from = "";

            if (strlen($betterPhone) > 5) {
                try {
                    // Thats it, hit send and we'll take care of the rest
                    $result = $sms->send([
                        'to' => $recipients,
                        'message' => $message,
                        'from' => $from,
                    ]);

                    foreach ($result as $key => $value) {
                        if (gettype($value) != "string") {
                            foreach ($value as $key1 => $value1) {
                                if (gettype($value1) != "string") {
                                    foreach ($value1 as $key2 => $value2) {
                                        if (gettype($value2) == "array") {
                                            foreach ($value2 as $key3 => $value3) {
                                                // Save to database
                                                $sms = new SMS;
                                                $sms->message_id = $value3->messageId;
                                                $sms->number = $value3->number;
                                                $sms->text = $message;
                                                $sms->status = $value3->status;
                                                $sms->status_code = $value3->statusCode;
                                                $sms->cost = $value3->cost;
                                                $sms->save();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return response("SMS Sent", 200);
                } catch (Exception $e) {
                    echo "Error: " . $e->getMessage();
                }
            }
        } else {
            // Save callback data
            $sms = SMS::where('message_id', $request->id)->first();
            $sms->delivery_status = $request->input('status');
            $sms->network_code = $request->input('networkCode');
            $sms->failure_reason = $request->input('failureReason');
            $sms->retry_count = $request->input('retryCount');
            $sms->save();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SMS  $sMS
     * @return \Illuminate\Http\Response
     */
    public function show(SMS $sMS)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\SMS  $sMS
     * @return \Illuminate\Http\Response
     */
    public function edit(SMS $sMS)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SMS  $sMS
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Store the received json in $callback
        $callback = file_get_contents('input:://input');
        // Decode the received json and store into $callbackurl
        $callbackUrl = json_decode($callback, true);

        $sms = new SMS;
        $sms->message_id = $callback['id'];
        $sms->status = $callback['status'];
        $sms->number = $callback['phoneNumber'];
        $sms->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SMS  $sMS
     * @return \Illuminate\Http\Response
     */
    public function destroy(SMS $sMS)
    {
        //
    }
}
