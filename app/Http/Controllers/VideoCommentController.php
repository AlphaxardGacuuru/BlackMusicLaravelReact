<?php

namespace App\Http\Controllers;

use App\Events\VideoCommentedEvent;
use App\Models\Video;
use App\Models\VideoComment;
use App\Http\Services\VideoCommentService;
use Illuminate\Http\Request;

class VideoCommentController extends Controller
{
    public function __construct(protected VideoCommentService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->service->index();
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

        [$saved, $message, $videoComment] = $this->service->store($request);

        $video = Video::find($request->input("id"));

        VideoCommentedEvent::dispatchIf($saved, $video);

        return response([
            "message" => $message,
            "data" => $videoComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VideoComment  $videoComment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VideoComment  $videoComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VideoComment $videoComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VideoComment  $videoComment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

        return response(["message" => $message], 200);
    }
}
