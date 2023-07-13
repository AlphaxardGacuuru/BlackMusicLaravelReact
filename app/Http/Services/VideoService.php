<?php

namespace App\Http\Services;

use App\Http\Resources\UserResource;
use App\Http\Resources\VideoResource;
use App\Models\User;
use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class VideoService extends Service
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        // Get Videos
        $getVideos = Video::orderBy('id', 'ASC')->get();

        return VideoResource::collection($getVideos);
    }

    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        // Get Video
        $getVideo = Video::find($id);

        return new VideoResource($getVideo);
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store($request)
    {
        /* Create new video song */
        $video = new Video;
        $video->video = $request->input('video');
        $video->name = $request->input('name');
        $video->username = auth("sanctum")->user()->username;
        $video->ft = $request->input('ft');
        $video->video_album_id = $request->input('video_album_id');
        $video->genre = $request->input('genre');
        $video->thumbnail = $request->input('thumbnail');
        $video->description = $request->input('description');
        $video->released = $request->input('released');
        $saved = $video->save();

		$message = "Video " . $video->name . " uploaded";

		return [$saved, $message, $video];
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update($request, $id)
    {
        $video = Video::find($id);

        if ($request->filled('name')) {
            $video->name = $request->input('name');
        }

        if ($request->filled('ft')) {
            $video->ft = $request->input('ft');
        }

        if ($request->filled('video_album_id')) {
            $video->video_album_id = $request->input('video_album_id');
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

        if ($request->filled('thumbnail')) {
            $video->thumbnail = $request->input('thumbnail');

            // Delete thumbnail
            $oldThumbnail = Video::find($id)->thumbnail;
            Storage::delete('public/' . $oldThumbnail);
        }

        if ($request->filled('video')) {
            $video->video = $request->input('video');

            // Delete video
            $oldVideo = Video::find($id)->video;
            Storage::delete('public/' . $oldVideo);
        }

        $saved = $video->save();

		$message = $video->name . " edited";

		return [$saved, $message, $video];
    }

    /**
     * Download Video.
     *
     */
    public function download($video, $id)
    {
        $video = Video::find($id);
        // Get file extesion
        $ext = substr($video->video, -3);

        $src = 'storage/' . $video->video;

        $name = $video->name . '.' . $ext;

        return response()->download($src, $name);
    }

    /**
     * Newly Released Chart
     *
     */
    public function newlyReleased()
    {
        // Get Videos
        $newlyReleased = Video::orderBy("id", "desc")->get();

        return response($this->chart($newlyReleased), 200);
    }

    /**
     * Trending Chart
     *
     */
    public function trending()
    {
        $trending = DB::table('bought_videos')
            ->select('video_id', DB::raw('count(*) as bought'))
            ->where("created_at", ">=", Carbon::now()->subWeek())
            ->groupBy('video_id')
            ->orderBy('bought', 'DESC')
            ->get();

        return response($this->chart($trending, true), 200);
    }

    /**
     * Top Downloaded
     *
     */
    public function topDownloaded()
    {
        $topDownloaded = DB::table('bought_videos')
            ->select('video_id', DB::raw('count(*) as bought'))
            ->groupBy('video_id')
            ->orderBy('bought', 'DESC')
            ->get();

        return response($this->chart($topDownloaded, true), 200);
    }

    /**
     * Top Liked
     *
     */
    public function topLiked()
    {
        $topLiked = DB::table('video_likes')
            ->select('video_id', DB::raw('count(*) as likes'))
            ->groupBy('video_id')
            ->orderBy('likes', 'DESC')
            ->get();

        return response($this->chart($topLiked, true), 200);
    }

    /**
     * Structure charts
     *
     */
    public function chart($list, $loop = false)
    {
        $videos = $list;

        // Check if items should be fetched
        if ($loop) {
            $videos = [];

            foreach ($list as $item) {
                $video = Video::find($item->video_id);

                array_push($videos, $video);
            }
        }

        // Transform data using resource
        $videos = VideoResource::collection($videos);

        $chartArtists = [];

        // Populate Videos and Artists array
        foreach ($videos as $video) {
            array_push($chartArtists, $video->username);
        }

        // Count occurrences of artists
        $chartArtists = array_count_values($chartArtists);

        // Sort artists based on most occurences
        arsort($chartArtists);

        // Get usernames only
        $chartArtists = array_keys($chartArtists);

        $artists = [];

        // Get Artists
        foreach ($chartArtists as $artist) {
            $getArtist = User::where("username", $artist)->first();

            $getArtist = new UserResource($getArtist);

            array_push($artists, $getArtist);
        }

        return ["data" => [
            "artists" => $artists,
            "videos" => $videos,
        ]];
    }

    /*
     * Artist's Videos */
    public function artistVideos($username)
    {
        $getArtistVideos = Video::where("username", $username)->get();
		
		return VideoResource::collection($getArtistVideos);
    }
}
