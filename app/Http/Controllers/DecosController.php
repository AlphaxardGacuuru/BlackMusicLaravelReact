<?php

namespace App\Http\Controllers;

use App\Decos;
use Illuminate\Http\Request;

class DecosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Decos::all();
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
     * @param  \App\Decos  $decos
     * @return \Illuminate\Http\Response
     */
    public function show(Decos $decos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Decos  $decos
     * @return \Illuminate\Http\Response
     */
    public function edit(Decos $decos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Decos  $decos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Decos $decos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Decos  $decos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Decos $decos)
    {
        //
    }
}
