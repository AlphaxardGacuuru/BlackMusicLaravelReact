<?php

use Illuminate\Http\Request;
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
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Public Routes
// Login/Register
// Route::post('login', 'Auth\LoginController@login');
// Route::post('register', 'Auth\LoginController@register');

Auth::routes();
// Route::post('logout', 'Auth\LoginController@logout');
Route::group(['middleware' => 'web'], function () {
    Route::get('home', 'HomeController@index')->name('home');
});

// Social logins
Route::get('login/{website}', 'Auth\LoginController@redirectToProvider');
Route::get('login/{website}/callback', 'Auth\LoginController@handleProviderCallback');

Route::resources([
    'audios' => 'AudiosController',
    'audio-likes' => 'AudioLikesController',
    'audio-comments' => 'AudioCommentsController',
    'audio-comment-likes' => 'AudioCommentLikesController',
    'audio-albums' => 'AudioAlbumsController',
    'audio-notifications' => 'AudioNotificationsController',
    'bought-audios' => 'BoughtAudiosController',
    'bought-videos' => 'BoughtVideosController',
    'cart-audios' => 'CartAudiosController',
    'cart-videos' => 'CartVideosController',
    'decos' => 'DecosController',
    'follows' => 'FollowsController',
    'follow-notifications' => 'FollowNotificationsController',
    'kopokopo' => 'KopokopoController',
    'notifications' => 'NotificationsController',
    'posts' => 'PostsController',
    'post-likes' => 'PostLikesController',
    'post-comments' => 'PostCommentsController',
    'post-comment-likes' => 'PostCommentLikesController',
    'polls' => 'PollsController',
    'referrals' => 'ReferralsController',
    'search' => 'SearchController',
    'users' => 'UsersController',
    'videos' => 'VideosController',
    'video-likes' => 'VideoLikesController',
    'video-comments' => 'VideoCommentsController',
    'video-comment-likes' => 'VideoCommentLikesController',
    'video-albums' => 'VideoAlbumsController',
    'video-payouts' => 'VideoPayoutsController',
    'video-notifications' => 'VideoNotificationsController',
]);
