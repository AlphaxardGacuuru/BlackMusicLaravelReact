<?php

namespace App\Http\Controllers;

use App\CartAudios;
use Illuminate\Http\Request;

class CartAudiosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CartAudios::all();
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
        /* Check if item is already in cart */
        $acartCheck = CartAudios::where('audio_id', $request->input('audio'))->where('username', auth()->user()->username)->count();
        /* Insert or Remove from cart */
        if ($acartCheck == 0) {
            $cartAudios = new CartAudios;
            $cartAudios->audio_id = $request->input('audio');
            $cartAudios->username = auth()->user()->username;
            $cartAudios->save();
            $message = 'Audio added to Cart';
        } else {
            CartAudios::where('audio_id', $request->input('audio'))->where('username', auth()->user()->username)->delete();
            $message = 'Audio removed from Cart';
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CartAudios  $cartAudios
     * @return \Illuminate\Http\Response
     */
    public function show(CartAudios $cartAudios)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CartAudios  $cartAudios
     * @return \Illuminate\Http\Response
     */
    public function edit(CartAudios $cartAudios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CartAudios  $cartAudios
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CartAudios $cartAudios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CartAudios  $cartAudios
     * @return \Illuminate\Http\Response
     */
    public function destroy(CartAudios $cartAudios)
    {
        //
    }
}
