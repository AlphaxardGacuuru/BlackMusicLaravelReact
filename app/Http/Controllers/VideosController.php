<?php

namespace App\Http\Controllers;

// FFMpeg
// namespace ProtoneMedia\LaravelFFMpeg;

use App\BoughtVideos;
use App\CartVideos;
use App\User;
use App\VideoLikes;
use App\Videos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

// FFMpeg
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;

// use ProtoneMedia\LaravelFFMpeg\Support\ServiceProvider;

class VideosController extends Controller
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

        // Get Videos
        $getVideos = Videos::orderBy('id', 'ASC')->get();

        $videos = [];

        foreach ($getVideos as $key => $video) {

            // Check if user has liked video
            $hasLiked = VideoLikes::where('username', $authUsername)
                ->where('video_id', $video->id)
                ->exists();

            // Check if video in cart
            $inCart = CartVideos::where('video_id', $video->id)
                ->where('username', $authUsername)
                ->exists();

            // Check if user has bought video
            $hasBoughtVideo = BoughtVideos::where('username', $authUsername)
                ->where('video_id', $video->id)
                ->exists();

            // Get downloads
            $downloads = BoughtVideos::where('video_id', $video->id)
                ->count();

            array_push($videos, [
                "id" => $video->id,
                "video" => $video->video,
                "name" => $video->name,
                "username" => $video->username,
                "ft" => $video->ft,
                "album_id" => $video->album,
                "album" => $video->album ? $video->albums->name : "",
                "genre" => $video->genre,
                "thumbnail" => preg_match("/http/", $video->thumbnail) ? $video->thumbnail : "/storage/" . $video->thumbnail,
                "description" => $video->description,
                "released" => $video->released,
                "hasLiked" => $hasLiked,
                "likes" => $video->videoLikes->count(),
                "inCart" => $inCart,
                "hasBoughtVideo" => $hasBoughtVideo,
                "downloads" => $downloads,
                "created_at" => $video->created_at->format('d M Y'),
            ]);
        }

        return $videos;
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
        if ($request->hasFile('filepond-video')) {
            /* Handle video upload */
            $video = $request->file('filepond-video')->store('public/videos');
            $videoShort = substr($video, 7);
            $videoName = substr($video, 14);
            $videoName = substr($videoName, 0, strpos($videoName, "."));

            // Create frame from Video
            FFMpeg::open($video)
                ->getFrameFromSeconds(5)
                ->export()
                ->save('public/video-thumbnails/' . $videoName . '.png');

            return $videoShort;
        } else {
            // Handle form for video
            $this->validate($request, [
                'video' => 'required|string',
                'name' => 'required|string',
                'ft' => 'nullable|exists:users,username',
            ]);

            /* Create new video song */
            $video = new Videos;
            $video->video = $request->input('video');
            $video->name = $request->input('name');
            $video->username = auth()->user()->username;
            $video->ft = $request->input('ft') ? $request->input('ft') : null;
            $video->album = $request->input('album');
            $video->genre = $request->input('genre');
            /* Generate thumbnail */
            // $thumbnail = substr($video->video, 30);
            // $thumbnail = "https://img.youtube.com/vi/" . $thumbnail . "/hqdefault.jpg";
            // $video->thumbnail = $thumbnail;
            $thumbnail = substr($request->input('video'), 7);
            $thumbnail = substr($thumbnail, 0, strpos($thumbnail, "."));
            $thumbnail = 'video-thumbnails/' . $thumbnail . '.png';
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
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Videos  $videos
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $video = Videos::find($id);
        // Get file extesion
        $ext = substr($video->video, -3);

		$src = 'storage/' . $video->video;

		$name = $video->name . '.' . $ext;

        return response()->download($src, $name);
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
    public function destroy($id)
    {
        Storage::delete('public/videos/' . $id);
        return response("Video deleted", 200);
    }
}
