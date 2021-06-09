<?php

namespace App\Http\Controllers;

use App\BoughtVideos;
use Illuminate\Http\Request;

class BoughtVideosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BoughtVideos::all();
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
     * @param  \App\BoughtVideos  $boughtVideos
     * @return \Illuminate\Http\Response
     */
    public function show(BoughtVideos $boughtVideos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BoughtVideos  $boughtVideos
     * @return \Illuminate\Http\Response
     */
    public function edit(BoughtVideos $boughtVideos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BoughtVideos  $boughtVideos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BoughtVideos $boughtVideos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BoughtVideos  $boughtVideos
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoughtVideos $boughtVideos)
    {
        //
    }
}
