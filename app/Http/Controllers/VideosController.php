<?php

namespace App\Http\Controllers;

use App\User;
use App\Videos;
use Illuminate\Http\Request;

class VideosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Videos::all();
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
            'video' => 'required|regex:/^https:\/\/youtu.be\/[A-z0-9]+/',
            'name' => 'required|string',
            'ft' => 'nullable|exists:users,username',
        ]);

        /* Handle file upload */
        /* if ($request->hasFile('video')) {
        Storage::putFile('public/video-uploads', $request->file('video'));
        $path = $request->file('video')->hashName();
        return $path = $request->file('video')->hashName();
        }
        return ''; */

        /* Create new video song */
        $video = new Videos;
        /* Change url to enable embedding */
        $video->video = substr_replace($request->input('video'), 'https://www.youtube.com/embed', 0, 16);
        $video->name = $request->input('name');
        $video->username = auth()->user()->username;
        $video->ft = $request->input('ft') ? $request->input('ft') : "";
        $video->album = $request->input('album');
        $video->genre = $request->input('genre');
        /* Generate thumbnail */
        $thumbnail = substr($video->video, 30);
        $thumbnail = "https://img.youtube.com/vi/" . $thumbnail . "/hqdefault.jpg";
        $video->thumbnail = $thumbnail;
        $video->description = $request->input('description');
        $video->released = $request->input('released');
        $video->save();

        // Check if user is musician
        $accountCheck = User::where('username', auth()->user()->username)->first();

        if ($accountCheck->account_type == "normal") {
            $user = User::find($accountCheck->id);
            $user->account_type = "musician";
            $user->save();
        }

        return response('Video Uploaded', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Videos  $videos
     * @return \Illuminate\Http\Response
     */
    public function show(Videos $videos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Videos  $videos
     * @return \Illuminate\Http\Response
     */
    public function edit(Videos $videos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Videos  $videos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'nullable|string',
            'ft' => 'nullable|exists:users,username',
        ]);

        /* Create new video song */
            $video = Videos::find($id);

        if ($request->filled('name')) {
            $video->name = $request->input('name');
        }
        if ($request->filled('ft')) {
            $video->ft = $request->input('ft');
        }
        if ($request->filled('album')) {
            $video->album = $request->input('album');
        }
        if ($request->filled('genre')) {
            $video->genre = $request->input('genre');
        }
        if ($request->filled('description')) {
            $video->description = $request->input('description');
        }
        if ($request->filled('released')) {
            $video->released = $request->input('released');
        }

        $video->save();

        return response('Video Edited', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Videos  $videos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Videos $videos)
    {
        //
    }
}
