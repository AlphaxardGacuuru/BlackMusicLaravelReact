<?php

namespace App\Http\Controllers;

use App\Events\ChatDeletedEvent;
use App\Events\NewChatEvent;
use App\Models\Chat;
use App\Models\User;
use App\Http\Services\ChatService;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function __construct(protected ChatService $service)
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

        [$saved, $message, $chat] =$this->service->store($request);

        $user = User::where("username", $request->input("to"))->get()->first();

        NewChatEvent::dispatchIf($saved, $chat, $user);

        return response([
            "message" => $message,
            "data" => $chat,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function show($username)
    {
        return $this->service->show($username);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

		ChatDeletedEvent::dispatchIf($deleted, $id);

        return response(["message" => $message], 200);
    }
}
