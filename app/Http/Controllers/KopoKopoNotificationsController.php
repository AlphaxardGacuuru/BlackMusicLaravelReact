<?php

namespace App\Http\Controllers;

use App\KopokopoNotifications;
use Illuminate\Http\Request;

class KopokopoNotificationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return KopokopoNotifications::all();
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
     * @param  \App\KopoKopoNotifications  $kopoKopoNotifications
     * @return \Illuminate\Http\Response
     */
    public function show(KopoKopoNotifications $kopoKopoNotifications)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\KopoKopoNotifications  $kopoKopoNotifications
     * @return \Illuminate\Http\Response
     */
    public function edit(KopoKopoNotifications $kopoKopoNotifications)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\KopoKopoNotifications  $kopoKopoNotifications
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KopoKopoNotifications $kopoKopoNotifications)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\KopoKopoNotifications  $kopoKopoNotifications
     * @return \Illuminate\Http\Response
     */
    public function destroy(KopoKopoNotifications $kopoKopoNotifications)
    {
        //
    }
}
