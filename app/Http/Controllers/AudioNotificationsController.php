<?php

namespace App\Http\Controllers;

use App\AudioNotifications;
use Illuminate\Http\Request;

class AudioNotificationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AudioNotifications::all();
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
     * @param  \App\AudioNotifications  $audioNotifications
     * @return \Illuminate\Http\Response
     */
    public function show(AudioNotifications $audioNotifications)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AudioNotifications  $audioNotifications
     * @return \Illuminate\Http\Response
     */
    public function edit(AudioNotifications $audioNotifications)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AudioNotifications  $audioNotifications
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AudioNotifications $audioNotifications)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AudioNotifications  $audioNotifications
     * @return \Illuminate\Http\Response
     */
    public function destroy(AudioNotifications $audioNotifications)
    {
        //
    }
}
