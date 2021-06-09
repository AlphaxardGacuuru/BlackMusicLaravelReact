<?php

namespace App\Http\Controllers;

use App\CartVideos;
use Illuminate\Http\Request;

class CartVideosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CartVideos::all();
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
        $vcartCheck = CartVideos::where('video_id', $request->input('video'))->where('username', auth()->user()->username)->count();
        /* Insert or Remove from cart */
        if ($vcartCheck == 0) {
            $cartVideos = new CartVideos;
            $cartVideos->video_id = $request->input('video');
            $cartVideos->username = auth()->user()->username;
            $cartVideos->save();
            $message = 'Video added to Cart';
        } else {
            CartVideos::where('video_id', $request->input('video'))->where('username', auth()->user()->username)->delete();
            $message = 'Video removed from Cart';
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CartVideos  $cartVideos
     * @return \Illuminate\Http\Response
     */
    public function show(CartVideos $cartVideos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CartVideos  $cartVideos
     * @return \Illuminate\Http\Response
     */
    public function edit(CartVideos $cartVideos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CartVideos  $cartVideos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CartVideos $cartVideos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CartVideos  $cartVideos
     * @return \Illuminate\Http\Response
     */
    public function destroy(CartVideos $cartVideos)
    {
        //
    }
}
