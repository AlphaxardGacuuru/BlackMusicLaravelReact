<?php

namespace App\Http\Services;

use App\Models\KaraokeLike;

class KaraokeLikeService extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$karaokeLike = "data";
		
        $hasLiked = KaraokeLike::where('karaoke_id', $request->input('karaoke'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        if ($hasLiked) {
            KaraokeLike::where('karaoke_id', $request->input('karaoke'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = "Like removed";
			$added = false;
        } else {
			$karaokeLike = new KaraokeLike;
            $karaokeLike->karaoke_id = $request->input('karaoke');
            $karaokeLike->username = auth('sanctum')->user()->username;
            $karaokeLike->save();
			
            $message = "Karaoke liked";
			$added = true;
        }

		return [$added, $message, $karaokeLike];
    }
}
