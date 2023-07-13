<?php

namespace App\Http\Controllers;

use App\Events\StoryCreatedEvent;
use App\Models\Story;
use App\Http\Services\StoryService;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function __construct(protected StoryService $service)
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
            "media" => "required|string",
            "text" => "nullable|string",
        ]);

        [$saved, $message, $story] = $this->service->store($request);

        StoryCreatedEvent::dispatchIf($saved, $story);

        return response([
            "message" => $message,
            "data" => $story,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Story  $story
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
     * @param  \App\Models\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        [$saved, $message, $story] = $this->service->update($request, $id);

        return response([
            "message" => $message,
            "data" => $story,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

        return response(["message" => $message], 200);
    }

    /*
     * Seen */
    public function seen($id)
    {
        [$saved, $message, $story] = $this->service->seen($id);

        return response([
            "message" => $message,
            "data" => $story,
        ], 200);
    }

    /*
     * Mute */
    public function mute($username)
    {
        [$saved, $message, $story] = $this->service->mute($username);

        return response([
            "message" => $message,
            "data" => $story,
        ], 200);
    }
}
