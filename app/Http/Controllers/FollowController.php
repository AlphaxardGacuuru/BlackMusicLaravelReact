<?php

namespace App\Http\Controllers;

use App\Events\FollowedEvent;
use App\Models\Follow;
use App\Models\User;
use App\Http\Services\FollowService;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function __construct(protected FollowService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
        [$added, $message] = $this->service->store($request);

        // Dispatch Event
        $musician = User::where('username', $request->input('musician'))->first();

        FollowedEvent::dispatchIf($added, $musician);

        return response(["message" => $message], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function show(Follow $follow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Follow $follow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Follow  $follow
     * @return \Illuminate\Http\Response
     */
    public function destroy(Follow $follow)
    {
        //
    }
}
