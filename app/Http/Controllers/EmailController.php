<?php

namespace App\Http\Controllers;

use App\Email;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Email::all();
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
        $email = new Email;
        $email->recipient = $request->input('recipient');
        $email->sender = $request->input('sender');
        $email->from = $request->input('from');
        $email->subject = $request->input('subject');
        $email->body_plain = $request->input('body-plain');
        $email->stripped_text = $request->input('stripped-text');
        $email->stripped_signature = $request->input('stripped-signature');
        $email->body_html = $request->input('body-html');
        $email->stripped_html = $request->input('stripped-html');
        $email->attachment_count = $request->input('attachment-count');
        $email->attachment_x = $request->input('attachment-x');
        $email->timestamp = $request->input('timestamp');
        $email->token = $request->input('token');
        $email->signature = $request->input('signature');
        $email->message_headers = $request->input('message-headers');
        $email->content_id_map = $request->input('content-id-map');
        $email->save();

        return response('Saved', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function show(Email $email)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function edit(Email $email)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Email $email)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function destroy(Email $email)
    {
        //
    }
}
