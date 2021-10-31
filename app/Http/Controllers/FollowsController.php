<?php

namespace App\Http\Controllers;

use App\Follows;
use App\Notifications;
use App\Notifications\FollowNotifications;
use App\User;
use Illuminate\Http\Request;

class FollowsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Follows::all();
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
        /* Add follow */
        $followQuery = Follows::where('followed', $request->musician)
            ->where('username', auth()->user()->username)
            ->count();

        if ($followQuery > 0) {
            Follows::where('followed', $request->musician)
                ->where('username', auth()->user()->username)
                ->delete();

            $message = "Unfollowed";
        } else {
            $post = new Follows;
            $post->followed = $request->input('musician');
            $post->username = auth()->user()->username;
            $post->muted = "no";
            $post->blocked = "no";
            $post->save();
            $message = "Followed";

            // Notify Musician
            $musician = User::where('username', $request->input('musician'))
                ->first();

            $musician->notify(new FollowNotifications);
        }

        return response('You ' . $message . ' ' . $request->musician, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Follows  $follows
     * @return \Illuminate\Http\Response
     */
    public function show(Follows $follows)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Follows  $follows
     * @return \Illuminate\Http\Response
     */
    public function edit(Follows $follows)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Follows  $follows
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Follows $follows)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Follows  $follows
     * @return \Illuminate\Http\Response
     */
    public function destroy(Follows $follows)
    {
        //
    }
}
