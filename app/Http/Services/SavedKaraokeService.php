<?php

namespace App\Http\Services;

use App\Http\Resources\SavedKaraokeResource;
use App\Models\SavedKaraoke;

class SavedKaraokeService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get saved Karaokes
        $getSavedKarokes = SavedKaraoke::where('username', $this->username)
            ->orderBy('id', 'ASC')
            ->get();
			
			return SavedKaraokeResource::collection($getSavedKarokes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
		$savedKaraoke = "data";
        
		$hasSaved = SavedKaraoke::where('karaoke_id', $request->input('id'))
            ->where('username', auth('sanctum')->user()->username)
            ->exists();

        if ($hasSaved) {
            SavedKaraoke::where('karaoke_id', $request->input('id'))
                ->where('username', auth('sanctum')->user()->username)
                ->delete();

            $message = "Karaoke removed";
			$added = false;
        } else {
            /* Create new karaoke song */
            $savedKaraoke = new SavedKaraoke;
            $savedKaraoke->karaoke_id = $request->input('id');
            $savedKaraoke->username = auth('sanctum')->user()->username;
            $savedKaraoke->save();

            $message = "Karaoke saved";
			$added = true;
        }

		return [$added, $message, $savedKaraoke];
    }
}
