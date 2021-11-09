<?php

namespace App\Http\Controllers;

use App\Notifications;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Check if user is logged in
        if (Auth::check()) {
            $getNotifications = auth()->user()->notifications;
        } else {
            $getNotifications = [];
        }

        $notifications = [];

        foreach ($getNotifications as $notification) {

            // Check if notification is read
            $isRead = $notification->read_at ? true : false;

            array_push($notifications, [
                "id" => $notification->id,
                "type" => explode('\\', $notification->type)[2],
                "from" => $notification->data['from'],
                "message" => $notification->data['message'],
                "isRead" => $isRead,
                "created_at" => $notification->created_at->format('d M Y'),
            ]);
        }

        return $notifications;
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
     * @param  \App\Notifications  $notifications
     * @return \Illuminate\Http\Response
     */
    public function show(Notifications $notifications)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Notifications  $notifications
     * @return \Illuminate\Http\Response
     */
    public function edit(Notifications $notifications)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Notifications  $notifications
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notifications $notifications)
    {
        return auth()->user()->notifications->markAsRead();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Notifications  $notifications
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if ($id == 0) {
            auth()->user()->notifications()->delete();
        } else {
            Notifications::find($id)->delete();
        }
    }
}
