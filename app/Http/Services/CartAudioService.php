<?php

namespace App\Http\Services;

use App\Http\Resources\CartAudioResource;
use App\Models\BoughtAudio;
use App\Models\CartAudio;

class CartAudioService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getCartAudios = CartAudio::where('username', $this->username)
            ->get();

        return CartAudioResource::collection($getCartAudios);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$cartAudio = "data";
		
        /* Check if item is already in cart */
        $inCart = CartAudio::where('audio_id', $request->input('audio'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        /* Check item in not already bought*/
        $notBought = BoughtAudio::where('username', auth('sanctum')->user()->username)
            ->where('audio_id', $request->input('audio'))
            ->doesntExist();

        /* Insert or Remove from cart */
        if ($inCart && $notBought) {
            CartAudio::where('audio_id', $request->input('audio'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = 'Audio removed from Cart';
            $added = false;
        } else {
            $cartAudio = new CartAudio;
            $cartAudio->audio_id = $request->input('audio');
            $cartAudio->username = auth('sanctum')->user()->username;
            $cartAudio->save();

            $message = 'Audio added to Cart';
            $added = true;
        }

        return [$added, $message, $cartAudio];
    }
}
