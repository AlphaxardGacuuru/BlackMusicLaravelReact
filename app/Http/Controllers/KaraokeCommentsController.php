<?php

namespace App\Http\Controllers;

use App\KaraokeCommentLikes;
use App\KaraokeComments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KaraokeCommentsController extends Controller
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

        $getKaraokeComments = KaraokeComments::orderBy('id', 'DESC')->get();

        $karaokeComments = [];

        foreach ($getKaraokeComments as $key => $karaokeComment) {

            // Check if user has liked comment
            $hasLiked = KaraokeCommentLikes::where('username', $authUsername)
                ->where('comment_id', $karaokeComment->id)
                ->exists();

            array_push($karaokeComments, [
                "id" => $karaokeComment->id,
                "karaoke_id" => $karaokeComment->karaoke_id,
                "text" => $karaokeComment->text,
                "username" => $karaokeComment->username,
                "name" => $karaokeComment->users->name,
                "pp" => preg_match("/http/", $karaokeComment->users->pp) ? $karaokeComment->users->pp : "/storage/" . $karaokeComment->users->pp,
                "hasLiked" => $hasLiked,
                "likes" => $karaokeComment->karaokeCommentLikes->count(),
                "created_at" => $karaokeComment->created_at->format("d M Y"),
            ]);
        }

        return $karaokeComments;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'text' => 'required',
        ]);

        /* Create new post */
        $karaokeComment = new KaraokeComments;
        $karaokeComment->karaoke_id = $request->input('id');
        $karaokeComment->username = auth()->user()->username;
        $karaokeComment->text = $request->input('text');
        $karaokeComment->save();

        // Show notification
        // $karaoke = Karaokes::where('id', $request->input('id'))->first();
        // $karaoke->users->username != auth()->user()->username &&
        // $karaoke->users->notify(new KaraokeCommentNotifications($karaoke->name));

        return response('Comment Posted', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\KaraokeComments  $karaokeComments
     * @return \Illuminate\Http\Response
     */
    public function show(KaraokeComments $karaokeComments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\KaraokeComments  $karaokeComments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KaraokeComments $karaokeComments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\KaraokeComments  $karaokeComments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $karaokeComment = KaraokeComments::where('id', $id)->first();
        KaraokeCommentLikes::where('comment_id', $id)->delete();
        KaraokeComments::find($id)->delete();

        return response('Comment deleted', 200);
    }
}
