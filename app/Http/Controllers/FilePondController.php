<?php

namespace App\Http\Controllers;

use App\Models\Audio;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilePondController extends Controller
{
    /*
     * Handle Profile Pic Upload */
    public function updateAvatar(Request $request, $id)
    {
        $this->validate($request, [
            'filepond-avatar' => 'required|image',
        ]);

        $avatar = $request->file('filepond-avatar')->store('public/avatars');
        $avatar = substr($avatar, 7);

        $user = User::find($id);

        // Delete profile pic if it's not the default one
        if ($user->avatar != '/storage/avatars/male_avatar.png') {
            Storage::delete('public/' . $user->avatar);
        }

        $user->avatar = $avatar;
        $user->save();

        return response("Account updated", 200);
    }

    /*
     *
     * Handle Video Uploads
     *
     */

    /*
     * Handle Video Thumbnail Upload */
    public function storeVideoThumbnail(Request $request)
    {
        $this->validate($request, [
            'filepond-thumbnail' => 'required|image',
        ]);

        $thumbnail = $request->file('filepond-thumbnail')->store('public/video-thumbnails');
        $thumbnail = substr($thumbnail, 7);
        return $thumbnail;
    }

    /*
     * Handle Video Upload */
    public function storeVideo(Request $request)
    {
        $this->validate($request, [
            'filepond-video' => 'required|file',
        ]);

        $video = $request->file('filepond-video')->store('public/videos');
        $videoShort = substr($video, 7);

        return $videoShort;
    }

    /*
     * Update VideoThumbnail */
    public function updateVideoThumbnail(Request $request, $id)
    {
        $this->validate($request, [
            'filepond-thumbnail' => 'required|image',
        ]);

        $thumbnail = $request->file('filepond-thumbnail')->store('public/video-thumbnails');
        $thumbnail = substr($thumbnail, 7);

        $video = Video::find($id);

        // Delete thumbnail
        $oldThumbnail = $video->thumbnail;
        Storage::delete('public/' . $oldThumbnail);

        // Update Thumbnail
        $video->thumbnail = $thumbnail;
        $video->save();
    }

    /*
     * Update VideoThumbnail */
    public function updateVideo(Request $request, $id)
    {
        $this->validate($request, [
            'filepond-video' => 'required|file',
        ]);

        $videoFile = $request->file('filepond-video')->store('public/videos');
        $videoFile = substr($videoFile, 7);

        $video = Video::find($id);

        // Delete thumbnail
        $oldvideoFile = $video->video;
        Storage::delete('public/' . $oldvideoFile);

        // Update Thumbnail
        $video->video = $videoFile;
        $video->save();
    }

    /*
     * Handle Video Thumbnail Delete */
    public function destoryVideoThumbnail($id)
    {
        Storage::delete('public/video-thumbnails/' . $id);
        return response("Video thumbnail deleted", 200);
    }

    /*
     * Handle Video Delete */
    public function destoryVideo($id)
    {
        Storage::delete('public/videos/' . $id);
        return response("Video deleted", 200);
    }

    /*
     *
     * Handle Audio Uploads
     *
     */

    /*
     * Handle Audio Thumbnail Upload */
    public function storeAudioThumbnail(Request $request)
    {
        $this->validate($request, [
            'filepond-thumbnail' => 'required|image',
        ]);

        $thumbnail = $request->file('filepond-thumbnail')->store('public/audio-thumbnails');
        $thumbnail = substr($thumbnail, 7);
        return $thumbnail;
    }

    /*
     * Handle Audio Upload */
    public function storeAudio(Request $request)
    {
        $this->validate($request, [
            'filepond-audio' => 'required|file',
        ]);

        /* Handle audio upload */
        $audio = $request->file('filepond-audio')->store('public/audios');
        $audioShort = substr($audio, 7);

        return $audioShort;
    }

    /*
     * Update AudioThumbnail */
    public function updateAudioThumbnail(Request $request, $id)
    {
        $this->validate($request, [
            'filepond-thumbnail' => 'required|image',
        ]);

        $thumbnail = $request->file('filepond-thumbnail')->store('public/audio-thumbnails');
        $thumbnail = substr($thumbnail, 7);

        $audio = Audio::find($id);

        // Delete thumbnail
        $oldThumbnail = $audio->thumbnail;
        Storage::delete('public/' . $oldThumbnail);

        // Update Thumbnail
        $audio->thumbnail = $thumbnail;
        $audio->save();
    }

    /*
     * Update AudioThumbnail */
    public function updateAudio(Request $request, $id)
    {
        $this->validate($request, [
            'filepond-audio' => 'required|file',
        ]);

        $audioFile = $request->file('filepond-audio')->store('public/audios');
        $audioFile = substr($audioFile, 7);

        $audio = Audio::find($id);

        // Delete thumbnail
        $oldaudioFile = $audio->audio;
        Storage::delete('public/' . $oldaudioFile);

        // Update Thumbnail
        $audio->audio = $audioFile;
        $audio->save();
    }

    /*
     * Handle Audio Thumbnail Delete */
    public function destoryAudioThumbnail($id)
    {
        Storage::delete('public/audio-thumbnails/' . $id);
        return response("Audio thumbnail deleted", 200);
    }

    /*
     * Handle Audio Delete */
    public function destoryAudio($id)
    {
        Storage::delete('public/audios/' . $id);
        return response("Audio deleted", 200);
    }

    /*
     *
     * Handle Post Uploads
     *
     */

    /*
     * Handle Post Media */
    public function storePostMedia(Request $request)
    {
        $this->validate($request, [
            'filepond-media' => 'required',
        ]);

        /* Handle media upload */
        $media = $request->file('filepond-media')->store('public/post-media');
        $media = substr($media, 7);
        return $media;
    }

    /*
     * Handle Post Media Delete */
    public function destroyPostMedia($id)
    {
        Storage::delete('public/post-media/' . $id);
        return response("Post media deleted", 200);
    }

    /*
     *
     * Handle Karaokes
     *
     */

    /*
     * Handle Karaoke */
    public function storeKaraoke(Request $request)
    {
        $this->validate($request, [
            'filepond-karaoke' => 'required',
        ]);

        /* Handle Karaoke upload */
        $karaoke = $request->file('filepond-karaoke')->store('public/karaokes');
        $karaoke = substr($karaoke, 7);
        return $karaoke;
    }

    /*
     * Handle Karaoke Delete */
    public function destroyKaraoke($id)
    {
        Storage::delete('public/karaokes/' . $id);
        return response("Karaoke deleted", 200);
    }

    /*
     *
     * Handle Chat Media
     *
     */

    /*
     * Handle Chat Media */
    public function storeChatMedia(Request $request)
    {
        $this->validate($request, [
            'filepond-media' => 'required',
        ]);

        $media = $request->file('filepond-media')->store('public/chat-media');
        $media = substr($media, 7);
        return $media;
    }

    /*
     * Handle Chat Delete */
    public function deleteChatMedia($id)
    {
        Storage::delete('public/chat-media/' . $id);
        return response("Chat media deleted", 200);
    }

    /*
     *
     * Handle Story Media
     *
     */

    /*
     * Handle Story */
    public function storeStory(Request $request)
    {
        $this->validate($request, [
            'filepond-media' => 'required',
        ]);

        $file = $request->file('filepond-media');
        // Get Mime Type
        $mime = substr($file->getMimeType(), 0, 5);
        // Store File
        $stored = $file->store('public/stories');
        // Get Filename
        $media = substr($stored, 7);

        return [$mime => $media];
    }

    /*
     * Handle Story Delete */
    public function deleteStory($id)
    {
        Storage::delete('public/stories/' . $id);
        return response("Story deleted", 200);
    }
}
