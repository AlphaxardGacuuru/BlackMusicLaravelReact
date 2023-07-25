<?php
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
//  */

Auth::routes();

// Social logins
Route::get('login/{website}', 'Auth\LoginController@redirectToProvider');
Route::get('login/{website}/callback', 'Auth\LoginController@handleProviderCallback');

// Update on Login Route
Route::post('login/update', 'Auth\LoginController@update');

Route::middleware(['auth:sanctum'])->group(function () {
    // Authenticated User
    Route::get('auth', 'UserController@auth');
});

Route::resources([
    'audios' => 'AudioController',
    'audio-likes' => 'AudioLikeController',
    'audio-comments' => 'AudioCommentController',
    'audio-comment-likes' => 'AudioCommentLikeController',
    'audio-albums' => 'AudioAlbumController',
    'bought-audios' => 'BoughtAudioController',
    'bought-videos' => 'BoughtVideoController',
    'cart-audios' => 'CartAudioController',
    'cart-videos' => 'CartVideoController',
    'chats' => 'ChatController',
    'decos' => 'DecoController',
    'follows' => 'FollowController',
    'karaokes' => 'KaraokeController',
    'karaoke-comments' => 'KaraokeCommentController',
    'karaoke-comment-likes' => 'KaraokeCommentLikeController',
    'karaoke-likes' => 'KaraokeLikeController',
    'karaoke-audios' => 'KaraokeAudioController',
    'kopokopo' => 'KopokopoController',
    'kopokopo-recipients' => 'KopokopoRecipientController',
    'notifications' => 'NotificationController',
    'posts' => 'PostController',
    'post-likes' => 'PostLikeController',
    'post-comments' => 'PostCommentController',
    'post-comment-likes' => 'PostCommentLikeController',
    'polls' => 'PollController',
    'referrals' => 'ReferralController',
    'saved-karaokes' => 'SavedKaraokeController',
    'search' => 'SearchController',
    'song-payouts' => 'SongPayoutController',
    'stories' => 'StoryController',
    'users' => 'UserController',
    'videos' => 'VideoController',
    'video-likes' => 'VideoLikeController',
    'video-comments' => 'VideoCommentController',
    'video-comment-likes' => 'VideoCommentLikeController',
    'video-albums' => 'VideoAlbumController',
]);

/*
* User
*/ 

// Musicians
Route::get('artists', 'UserController@artists');

/*
 * Post
 */

// Posts
Route::get('artist/posts/{username}', 'PostController@artistPosts');
Route::put('posts/mute/{username}', 'PostController@mute');

/*
 * Video
 */

// Video Charts
Route::get('video-charts/newly-released', 'VideoController@newlyReleased');
Route::get('video-charts/trending', 'VideoController@trending');
Route::get('video-charts/top-downloaded', 'VideoController@topDownloaded');
Route::get('video-charts/top-liked', 'VideoController@topLiked');
Route::get('videos/download/{id}', 'VideoController@download');
Route::get('artist/video-albums/{username}', 'VideoAlbumController@artistVideoAlbums');
Route::get('artist/videos/{username}', 'VideoController@artistVideos');
Route::get('artist/bought-videos/{username}', 'BoughtVideoController@artistBoughtVideos');

/*
 * Audio
 */

// Audio Charts
Route::get('audio-charts/newly-released', 'AudioController@newlyReleased');
Route::get('audio-charts/trending', 'AudioController@trending');
Route::get('audio-charts/top-downloaded', 'AudioController@topDownloaded');
Route::get('audio-charts/top-liked', 'AudioController@topLiked');
Route::get('audios/download/{id}', 'AudioController@download');
Route::get('artist/audio-albums/{username}', 'AudioAlbumController@artistAudioAlbums');
Route::get('artist/audios/{username}', 'AudioController@artistAudios');
Route::get('artist/bought-audios/{username}', 'BoughtAudioController@artistBoughtAudios');

/*
 * Stories
 */

// Stories
Route::post('stories/seen/{id}', 'StoryController@seen');
Route::put('stories/mute/{username}', 'StoryController@mute');

// Filepond Controller
Route::prefix('filepond')->group(function () {
    // User
    Route::post('avatar/{id}', 'FilepondController@updateAvatar');

    // Video
    Route::post('video-thumbnail', 'FilepondController@storeVideoThumbnail');
    Route::post('video-thumbnail/{id}', 'FilepondController@updateVideoThumbnail');
    Route::post('video', 'FilepondController@storeVideo');
    Route::post('video/{id}', 'FilepondController@updateVideo');
    Route::delete('video-thumbnail/{id}', 'FilepondController@destoryVideoThumbnail');
    Route::delete('video/{id}', 'FilepondController@destoryVideo');

    // Audio
    Route::post('audio-thumbnail', 'FilepondController@storeAudioThumbnail');
    Route::post('audio-thumbnail/{id}', 'FilepondController@updateAudioThumbnail');
    Route::post('audio', 'FilepondController@storeAudio');
    Route::post('audio/{id}', 'FilepondController@updateAudio');
    Route::delete('audio-thumbnail/{id}', 'FilepondController@destoryAudioThumbnail');
    Route::delete('audio/{id}', 'FilepondController@destoryAudio');

    // Post
    Route::post('posts', 'FilepondController@storePostMedia');
    Route::delete('posts/{id}', 'FilepondController@destroyPostMedia');

    // Karaoke
    Route::post('karaokes', 'FilepondController@storeKaraoke');
    Route::delete('karaokes/{id}', 'FilepondController@destroyKaraoke');

    // Chat
    Route::post('chats', 'FilepondController@storeChatMedia');
    Route::delete('chats/{id}', 'FilepondController@deleteChatMedia');

    // Story
    Route::post('stories', 'FilepondController@storeStory');
    Route::delete('stories/{id}', 'FilepondController@deleteStory');
});

// Kopokopo STK Push
Route::post('stk-push', 'KopokopoController@stkPush');

Broadcast::routes(['middleware' => ['auth:sanctum']]);

/*
 * Admin
 */
Route::prefix('admin')->group(function () {
    Route::get('admin', 'AdminController@admin');
    Route::get('users', 'AdminController@users');
    Route::get('videos', 'AdminController@videos');
    Route::get('audios', 'AdminController@audios');
    Route::get('kopokopo-recipients', 'AdminController@kopokopoRecipients');
    Route::get('song-payouts', 'AdminController@songPayouts');
});
