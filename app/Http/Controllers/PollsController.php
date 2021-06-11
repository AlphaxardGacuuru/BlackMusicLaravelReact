<?php

namespace App\Http\Controllers;

use App\Polls;
use Illuminate\Http\Request;

class PollsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Polls::all();
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
        // Check if user has voted
        $checkPoll = Polls::where('username', auth()->user()->username)->where('post_id', $request->input('post'))->first();

        if (!$checkPoll) {
            $poll = new Polls;
            $poll->post_id = $request->input('post');
            $poll->username = auth()->user()->username;
            $poll->parameter = $request->input('parameter');
            $poll->save();
            $message = "Voted";
        } else {
            Polls::where('username', auth()->user()->username)
                ->where('post_id', $request->input('post'))
                ->delete();
            $message = "Vote removed";
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Polls  $polls
     * @return \Illuminate\Http\Response
     */
    public function show(Polls $polls)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Polls  $polls
     * @return \Illuminate\Http\Response
     */
    public function edit(Polls $polls)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Polls  $polls
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Polls $polls)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Polls  $polls
     * @return \Illuminate\Http\Response
     */
    public function destroy(Polls $polls)
    {
        //
    }
}
