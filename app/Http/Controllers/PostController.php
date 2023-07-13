<?php

namespace App\Http\Controllers;

use App\Events\PostedEvent;
use App\Models\Post;
use App\Http\Services\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(protected PostService $service)
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

        [$saved, $message, $post] = $this->service->store($request);

		// Dispatch event
		PostedEvent::dispatchIf($saved, $post);

        return response([
            "message" => $message,
            "data" => $post,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
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
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        [$saved, $message, $post] = $this->service->update($request, $id);

        return response([
            "message" => $message,
            "data" => $post,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destory($id);

        return response(["message" => $message], 200);
    }

	/*
	* Mute */
	public function mute($username)
	{
		[$saved, $message] = $this->service->mute($username);

        return response([
            "message" => $message,
        ], 200);
	} 

    /*
     * Artist's Posts */
    public function artistPosts($username)
    {
        return $this->service->artistPosts($username);
    }
}
