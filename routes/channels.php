<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('post.created', fn() => true);
Broadcast::channel('post.commented', fn() => true);
Broadcast::channel('kopokopo-received', fn() => true);
Broadcast::channel('chat-created', fn() => true);
Broadcast::channel('chat-deleted', fn() => true);
Broadcast::channel('chat', function ($user) {
    // if ($user->canJoinRoom($username)) {
    return [
        'id' => $user->id,
        'name' => $user->name,
        "username" => $user->username,
    ];
    // }
});
