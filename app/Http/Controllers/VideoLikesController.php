<?php

namespace App\Http\Controllers;

use App\Notifications\VideoLikeNotifications;
use App\VideoLikes;
use App\Videos;
use Illuminate\Http\Request;

class VideoLikesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return VideoLikes::all();
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
        $videoLikeCount = VideoLikes::where('video_id', $request->input('video'))
            ->where('username', auth()->user()->username)
            ->count();

        if ($videoLikeCount > 0) {
            VideoLikes::where('video_id', $request->input('video'))
                ->where('username', auth()->user()->username)
                ->delete();

            $message = "Like removed";
        } else {
            $videoLike = new VideoLikes;
            $videoLike->video_id = $request->input('video');
            $videoLike->username = auth()->user()->username;
            $videoLike->save();

            $message = "Video liked";

            // Show notification
            $video = Videos::where('id', $request->input('video'))->first();
            $video->users->username != auth()->user()->username &&
            $video->users->notify(new VideoLikeNotifications($video->name));
        }

        return response($message, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\VideoLikes  $videoLikes
     * @return \Illuminate\Http\Response
     */
    public function show(VideoLikes $videoLikes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\VideoLikes  $videoLikes
     * @return \Illuminate\Http\Response
     */
    public function edit(VideoLikes $videoLikes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\VideoLikes  $videoLikes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VideoLikes $videoLikes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\VideoLikes  $videoLikes
     * @return \Illuminate\Http\Response
     */
    public function destroy(VideoLikes $videoLikes)
    {
        //
    }
}
