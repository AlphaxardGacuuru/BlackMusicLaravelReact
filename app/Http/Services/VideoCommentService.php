<?php

namespace App\Http\Services;

use App\Http\Resources\VideoCommentResource;
use App\Models\VideoComment;

class VideoCommentService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getVideoComments = VideoComment::orderBy('id', 'DESC')->get();

        return VideoCommentResource::collection($getVideoComments);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VideoComment  $videoComment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getVideoComments = VideoComment::where("video_id", $id)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return VideoCommentResource::collection($getVideoComments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        /* Create new post */
        $videoComment = new VideoComment;
        $videoComment->video_id = $request->input('id');
        $videoComment->username = auth('sanctum')->user()->username;
        $videoComment->text = $request->input('text');

        $saved = $videoComment->save();

        return [$saved, "Comment posted", $videoComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\VideoComments  $videoComments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = VideoComment::find($id)->delete();

        return [$deleted, "Comment deleted"];
    }
}
