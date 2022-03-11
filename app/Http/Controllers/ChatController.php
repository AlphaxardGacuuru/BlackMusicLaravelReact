<?php

namespace App\Http\Controllers;

use App\Chat;
use App\Notifications\ChatNotifications;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ChatController extends Controller
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

        $getChat = Chat::orderBy('id', 'ASC')->get();

        $chat = [];

        // Populate array
        foreach ($getChat as $key => $chatItem) {

            array_push($chat, [
                "id" => $chatItem->id,
                "name" => $chatItem->users->name,
                "username" => $chatItem->users->username,
                "to" => $chatItem->to,
                "pp" => preg_match("/http/", $chatItem->users->pp) ? $chatItem->users->pp : "/storage/" . $chatItem->users->pp,
                "decos" => $chatItem->users->decos->count(),
                "text" => $chatItem->text,
                "media" => $chatItem->media,
                "created_at" => $chatItem->created_at->format("d M Y h:ia"),
            ]);
        }

        return $chat;
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
        if ($request->hasFile('filepond-media')) {
            /* Handle media upload */
            $media = $request->file('filepond-media')->store('public/chat-media');
            $media = substr($media, 7);
            return $media;
        } else {
            $this->validate($request, [
                'text' => 'required',
            ]);

            /* Create new post */
            $chat = new Chat;
            $chat->username = auth()->user()->username;
            $chat->to = $request->input('to');
            $chat->text = $request->input('text');
            $chat->media = $request->input('media');
            $chat->save();

            // Get user
            $user = User::where('username', $request->input('to'))->first();
            $user->notify(new ChatNotifications);

            return response('Sent', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Check if user is logged in
        if (Auth::check()) {
            $authUsername = auth()->user()->username;
        } else {
            $authUsername = '@guest';
        }

        $getChat = Chat::where('username', $authUsername)
            ->orWhere('to', $authUsername)
            ->orderBy('id', 'DESC')
            ->get();

        $chatThreadsZero = [];
        $chatThreads = [];

        // Get sender and recipient
        foreach ($getChat as $key => $chatItem) {
            array_push($chatThreadsZero, $chatItem->username);
            array_push($chatThreadsZero, $chatItem->to);
        }

        // Get only unique entries
        $chatThreadsZero = array_unique($chatThreadsZero);

        // Remove auth username
        $key = array_search($authUsername, $chatThreadsZero);
        unset($chatThreadsZero[$key]);

        // Get threads
        foreach ($chatThreadsZero as $key => $username) {
            $array = Chat::where('username', $authUsername)
                ->where('to', $username)
                ->orWhere('username', $username)
                ->where('to', $authUsername)
                ->orderBy('id', 'DESC')
                ->first();

            // Get user info
            $usernameInfo = User::where('username', $username)
                ->first();

            // Check if media exists
            $hasMedia = $array->media;

            array_push($chatThreads, [
                'id' => $array->id,
                'link' => $username,
                'pp' => preg_match('/http/', $usernameInfo->pp) ? $usernameInfo->pp : '/storage/' . $usernameInfo->pp,
                'name' => $usernameInfo->name,
                'username' => $username,
                'to' => $array->to,
                'text' => $array->text,
                'hasMedia' => $hasMedia,
                'created_at' => $array->created_at->format('h:ia'),
            ]);
        }

        return $chatThreads;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function edit(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Chat  $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Check file extension and handle filepond delete accordingly
        $ext = substr($id, -3);

        if ($ext == 'jpg' || $ext == 'png' || $ext == 'gif') {
            Storage::delete('public/chat-media/' . $id);
            return response("Chat media deleted", 200);
        } else {
            $chatItem = Chat::where('id', $id)->first();
            Storage::delete('public/' . $chatItem->media);
            Chat::find($id)->delete();

            return response("Chat deleted", 200);
        }
    }
}
