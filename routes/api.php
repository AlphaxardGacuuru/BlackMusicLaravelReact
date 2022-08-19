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

Route::get('home', 'HomeController@index')->name('home');

Route::resources([
	'admin' => 'AdminController',
    'audios' => 'AudiosController',
    'audio-likes' => 'AudioLikesController',
    'audio-comments' => 'AudioCommentsController',
    'audio-comment-likes' => 'AudioCommentLikesController',
    'audio-albums' => 'AudioAlbumsController',
    'bought-audios' => 'BoughtAudiosController',
    'bought-videos' => 'BoughtVideosController',
    'cart-audios' => 'CartAudiosController',
    'cart-videos' => 'CartVideosController',
	'chat' => 'ChatController',
    'decos' => 'DecosController',
	'email' => 'EmailController',
    'follows' => 'FollowsController',
	'karaokes' => 'KaraokesController',
	'karaoke-comments' => 'KaraokeCommentsController',
	'karaoke-comment-likes' => 'KaraokeCommentLikesController',
	'karaoke-likes' => 'KaraokeLikesController',
    'kopokopo' => 'KopokopoController',
    'kopokopo-recipients' => 'KopokopoRecipientsController',
    'notifications' => 'NotificationsController',
    'posts' => 'PostsController',
    'post-likes' => 'PostLikesController',
    'post-comments' => 'PostCommentsController',
    'post-comment-likes' => 'PostCommentLikesController',
    'polls' => 'PollsController',
	'push' => 'PushController',
    'referrals' => 'ReferralsController',
	'saved-karaokes' => 'SavedKaraokesController',
    'search' => 'SearchController',
    'song-payouts' => 'SongPayoutsController',
    'sms' => 'SMSController',
    'users' => 'UsersController',
    'videos' => 'VideosController',
    'video-likes' => 'VideoLikesController',
    'video-comments' => 'VideoCommentsController',
    'video-comment-likes' => 'VideoCommentLikesController',
    'video-albums' => 'VideoAlbumsController',
]);

Route::get('mailable', function () {

    $amount = 100;
    $phone = '0700364446';

    return new App\Mail\SongPayout($amount, $phone);
});