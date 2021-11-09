<?php

namespace App\Http\Controllers;

use App\Notifications\VideoCommentNotifications;
use App\VideoCommentLikes;
use App\Videos;
use App\VideoComments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VideoCommentsController extends Controller
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

        $getVideoComments = VideoComments::all();

        $videoComments = [];

        foreach ($getVideoComments as $key => $videoComment) {

            // Check if user has liked comment
            $hasLiked = VideoCommentLikes::where('username', $authUsername)
                ->where('comment_id', $videoComment->id)
                ->exists();

            array_push($videoComments, [
                "id" => $videoComment->id,
                "video_id" => $videoComment->video_id,
                "text" => $videoComment->text,
                "username" => $videoComment->username,
                "name" => $videoComment->users->name,
                "pp" => preg_match("/http/", $videoComment->users->pp) ? $videoComment->users->pp : "/storage/" . $videoComment->users->pp,
                "hasLiked" => $hasLiked,
                "likes" => $videoComment->videoCommentLikes->count(),
                "created_at" => $videoComment->created_at->format("d M Y"),
            ]);
        }

        return $videoComments;
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
        $this->validate($request, [
            'text' => 'required',
        ]);

        /* Create new post */
        $videoComment = new VideoComments;
        $videoComment->video_id = $request->input('video');
        $videoComment->username = auth()->user()->username;
        $videoComment->text = $request->input('text');
        $videoComment->save();

        // Show notification
        $video = Videos::where('id', $request->input('video'))->first();
        $video->users->username != auth()->user()->username &&
        $video->users->notify(new VideoCommentNotifications($video->name));

        return response('Comment Posted', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\VideoComments  $videoComments
     * @return \Illuminate\Http\Response
     */
    public function show(VideoComments $videoComments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\VideoComments  $videoComments
     * @return \Illuminate\Http\Response
     */
    public function edit(VideoComments $videoComments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\VideoComments  $videoComments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VideoComments $videoComments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\VideoComments  $videoComments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $videoComment = VideoComments::where('id', $id)->first();
        VideoCommentLikes::where('comment_id', $id)->delete();
        VideoComments::find($id)->delete();

        return response('Comment deleted', 200);
    }
}
