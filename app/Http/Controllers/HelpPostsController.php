<?php

namespace App\Http\Controllers;

use App\HelpPosts;
use App\Notifications\HelpPostNotifications;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class HelpPostsController extends Controller
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

        $getHelpPosts = HelpPosts::orderBy('id', 'ASC')->get();

        $helpPosts = [];

        // Populate array
        foreach ($getHelpPosts as $key => $helpPost) {

            array_push($helpPosts, [
                "id" => $helpPost->id,
                "name" => $helpPost->users->name,
                "username" => $helpPost->users->username,
                "to" => $helpPost->to,
                "pp" => preg_match("/http/", $helpPost->users->pp) ? $helpPost->users->pp : "/storage/" . $helpPost->users->pp,
                "decos" => $helpPost->users->decos->count(),
                "text" => $helpPost->text,
                "media" => $helpPost->media,
                "created_at" => $helpPost->created_at->format("d/m/Y h:ia"),
            ]);
        }

        return $helpPosts;
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
            $media = $request->file('filepond-media')->store('public/help-post-media');
            $media = substr($media, 7);
            return $media;
        } else {
            $this->validate($request, [
                'text' => 'required',
            ]);

            /* Create new post */
            $helpPost = new HelpPosts;
            $helpPost->username = auth()->user()->username;
            $helpPost->to = $request->input('to');
            $helpPost->text = $request->input('text');
            $helpPost->media = $request->input('media');
            $helpPost->save();

            // Get user
            $user = User::where('username', $request->input('to'))->first();
            $user->notify(new HelpPostNotifications);

            return response('Sent', 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\HelpPosts  $helpPosts
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

        $getHelpPosts = HelpPosts::where('username', $authUsername)
            ->orWhere('to', $authUsername)
            ->orderBy('id', 'DESC')
            ->get();

        $helpThreadsZero = [];
        $helpThreads = [];

        // Get sender and recipient
        foreach ($getHelpPosts as $key => $helpPost) {
            array_push($helpThreadsZero, $helpPost->username);
            array_push($helpThreadsZero, $helpPost->to);
        }

        // Get only unique entries
        $helpThreadsZero = array_unique($helpThreadsZero);

        // Remove auth username
        $key = array_search($authUsername, $helpThreadsZero);
        unset($helpThreadsZero[$key]);

        // Get threads
        foreach ($helpThreadsZero as $key => $username) {
            $array = HelpPosts::where('username', $authUsername)
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

            array_push($helpThreads, [
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

        return $helpThreads;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\HelpPosts  $helpPosts
     * @return \Illuminate\Http\Response
     */
    public function edit(HelpPosts $helpPosts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\HelpPosts  $helpPosts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HelpPosts $helpPosts)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\HelpPosts  $helpPosts
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Check file extension and handle filepond delete accordingly
        $ext = substr($id, -3);

        if ($ext == 'jpg' || $ext == 'png' || $ext == 'gif') {
            Storage::delete('public/help-post-media/' . $id);
            return response("Help Post media deleted", 200);
        } else {
            $helpPost = HelpPosts::where('id', $id)->first();
            Storage::delete('public/' . $helpPost->media);
            HelpPosts::find($id)->delete();

            return response("Help Post deleted", 200);
        }
    }
}
