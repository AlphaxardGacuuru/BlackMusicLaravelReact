<?php

namespace App\Http\Controllers;

use App\Events\AudioCommentedEvent;
use App\Http\Services\AudioCommentService;
use App\Models\Audio;
use App\Models\AudioComment;
use Illuminate\Http\Request;

class AudioCommentController extends Controller
{
    public function __construct(protected AudioCommentService $service)
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

        [$saved, $message, $audioComment] = $this->service->store($request);

        $audio = Audio::find($request->input("id"));

        AudioCommentedEvent::dispatchIf($saved, $audio);

        return response([
            "message" => $message,
            "data" => $audioComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AudioComment  $audioComment
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
     * @param  \App\Models\AudioComment  $audioComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AudioComment $audioComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AudioComment  $audioComment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

        return response(["message" => $message], 200);
    }
}
