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
Route::get('home', 'HomeController@index')->name('home');

// Social logins
Route::get('login/{website}', 'Auth\LoginController@redirectToProvider');
Route::get('login/{website}/callback', 'Auth\LoginController@handleProviderCallback');

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/products', 'ProductController@store');
    Route::put('/products/{id}', 'ProductController@update');
    Route::delete('/products/{id}', 'ProductController@destroy');
});

Route::resources([
    'users' => 'UsersController',
    'posts' => 'PostsController',
    'post-likes' => 'PostLikesController',
    'post-comments' => 'PostCommentsController',
    'post-comment-likes' => 'PostCommentLikesController',
    'polls' => 'PollsController',
    'audios' => 'AudiosController',
    'audio-likes' => 'AudioLikesController',
    'audio-comments' => 'AudioCommentsController',
    'audio-comment-likes' => 'AudioCommentLikesController',
    'audio-albums' => 'AudioAlbumsController',
    'audio-notifications' => 'AudioNotificationsController',
    'cart-audios' => 'CartAudiosController',
    'bought-audios' => 'BoughtAudiosController',
    'videos' => 'VideosController',
    'video-likes' => 'VideoLikesController',
    'video-comments' => 'VideoCommentsController',
    'video-comment-likes' => 'VideoCommentLikesController',
    'video-albums' => 'VideoAlbumsController',
    'video-payouts' => 'VideoPayoutsController',
    'video-notifications' => 'VideoNotificationsController',
    'bought-videos' => 'BoughtVideosController',
    'library' => 'BoughtVideosController',
    'follows' => 'FollowsController',
    'follow-notifications' => 'FollowNotificationsController',
    'cart-videos' => 'CartVideosController',
    'referrals' => 'ReferralsController',
    'search' => 'SearchController',
    'admin' => 'PayoutsController',
    'notifications' => 'NotificationsController',
    'decos' => 'DecosController',
]);
