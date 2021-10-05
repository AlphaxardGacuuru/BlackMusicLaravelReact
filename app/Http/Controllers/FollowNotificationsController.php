<?php

namespace App\Http\Controllers;

use App\FollowNotifications;
use Illuminate\Http\Request;

class FollowNotificationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FollowNotifications::all();
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
     * @param  \App\FollowNotifications  $followNotifications
     * @return \Illuminate\Http\Response
     */
    public function show(FollowNotifications $followNotifications)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FollowNotifications  $followNotifications
     * @return \Illuminate\Http\Response
     */
    public function edit(FollowNotifications $followNotifications)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FollowNotifications  $followNotifications
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FollowNotifications $followNotifications)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FollowNotifications  $followNotifications
     * @return \Illuminate\Http\Response
     */
    public function destroy(FollowNotifications $followNotifications)
    {
        //
    }
}
