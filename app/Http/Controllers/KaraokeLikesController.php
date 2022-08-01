<?php

namespace App\Http\Controllers;

use App\KaraokeLikes;
use Illuminate\Http\Request;

class KaraokeLikesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return KaraokeLikes::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $karaokeLikeCount = KaraokeLikes::where('karaoke_id', $request->input('karaoke'))
            ->where('username', auth()->user()->username)
            ->count();

        if ($karaokeLikeCount > 0) {
            KaraokeLikes::where('karaoke_id', $request->input('karaoke'))
                ->where('username', auth()->user()->username)
                ->delete();

            $message = "Like removed";
        } else {
            $karaokeLike = new KaraokeLikes;
            $karaokeLike->karaoke_id = $request->input('karaoke');
            $karaokeLike->username = auth()->user()->username;
            $karaokeLike->save();

            $message = "Karaoke liked";
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\KaraokeLikes  $karaokeLikes
     * @return \Illuminate\Http\Response
     */
    public function show(KaraokeLikes $karaokeLikes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\KaraokeLikes  $karaokeLikes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KaraokeLikes $karaokeLikes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\KaraokeLikes  $karaokeLikes
     * @return \Illuminate\Http\Response
     */
    public function destroy(KaraokeLikes $karaokeLikes)
    {
        //
    }
}
