<?php

namespace App\Http\Controllers;

use App\Models\KaraokeComment;
use App\Http\Services\KaraokeCommentService;
use Illuminate\Http\Request;

class KaraokeCommentController extends Controller
{
    public function __construct(protected KaraokeCommentService $service)
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

        [$saved, $message, $karaokeComment] = $this->service->store($request);

        return response([
            "message" => $message,
            "data" => $karaokeComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KaraokeComment  $karaokeComment
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
     * @param  \App\Models\KaraokeComment  $karaokeComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KaraokeComment $karaokeComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KaraokeComment  $karaokeComment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

        return response(["message" => $message], 200);
    }
}
