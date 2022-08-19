<?php

namespace App\Http\Controllers;

use App\KaraokeLikes;
use App\Karaokes;
use App\SavedKaraokes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavedKaraokesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Check if user is logged in
        if (Auth::check()) {
            $authUsername = auth()->user()->username;
        } else {
            $authUsername = '@guest';
        }

        // Get saved Karaokes
        $getSavedKarokes = SavedKaraokes::where('username', $authUsername)
            ->orderBy('id', 'ASC')
            ->get();

        foreach ($getSavedKarokes as $savedKaroke) {

            // Get Karaokes
            $karaoke = Karaokes::where('id', $savedKaroke->karaoke_id)->first();

            $savedKaraokes = [];

            // Check if user has liked karaoke
            $hasLiked = KaraokeLikes::where('username', $authUsername)
                ->where('karaoke_id', $karaoke->id)
                ->exists();

            array_push($savedKaraokes, [
                "id" => $karaoke->id,
                "karaoke" => $karaoke->karaoke,
                "audio_id" => $karaoke->audio_id,
                "audio" => $karaoke->audios->name,
                "name" => $karaoke->users->name,
                "username" => $karaoke->users->username,
                "pp" => $karaoke->users->pp,
                "decos" => $karaoke->users->decos->count(),
                "description" => $karaoke->description,
                "hasLiked" => $hasLiked,
                "likes" => $karaoke->karaokeLikes->count(),
                "comments" => $karaoke->karaokeComments->count(),
                "created_at" => $karaoke->created_at->format('d M Y'),
            ]);
        }

        return $savedKaraokes;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Handle form for karaoke
        $this->validate($request, [
            'id' => 'required|integer',
        ]);

        $hasSaved = SavedKaraokes::where('karaoke_id', $request->input('id'))
            ->where('username', auth()->user()->username)
            ->exists();

        if ($hasSaved) {
            SavedKaraokes::where('karaoke_id', $request->input('id'))
                ->where('username', auth()->user()->username)
                ->delete();

            $message = "Karaoke removed";
        } else {
            /* Create new karaoke song */
            $savedKaraoke = new SavedKaraokes;
            $savedKaraoke->karaoke_id = $request->input('id');
            $savedKaraoke->username = auth()->user()->username;
            $savedKaraoke->save();

            $message = "Karaoke saved";
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SavedKaraokes  $savedKaraokes
     * @return \Illuminate\Http\Response
     */
    public function show(SavedKaraokes $savedKaraokes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SavedKaraokes  $savedKaraokes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SavedKaraokes $savedKaraokes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SavedKaraokes  $savedKaraokes
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
