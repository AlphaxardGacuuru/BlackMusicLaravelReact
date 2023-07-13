<?php

namespace App\Http\Services;

use App\Http\Resources\CartVideoResource;
use App\Models\BoughtVideo;
use App\Models\CartVideo;

class CartVideoService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getCartVideos = CartVideo::where('username', $this->username)
            ->get();
			
			return CartVideoResource::collection($getCartVideos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$cartVideo = "data";
		
        /* Check if item is already in cart */
        $inCart = CartVideo::where('video_id', $request->input('video'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        /* Check item in not already bought*/
        $notBought = BoughtVideo::where('username', auth('sanctum')->user()->username)
            ->where('video_id', $request->input('video'))
            ->doesntExist();

        /* Insert or Remove from cart */
        if ($inCart && $notBought) {
            CartVideo::where('video_id', $request->input('video'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = 'Video removed from Cart';
			$added = false;
        } else {
			$cartVideo = new CartVideo;
            $cartVideo->video_id = $request->input('video');
            $cartVideo->username = auth('sanctum')->user()->username;
            $cartVideo->save();
			
            $message = 'Video added to Cart';
			$added = true;
        }

		return [$added, $message, $cartVideo];
    }
}
