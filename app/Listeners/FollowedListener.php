<?php

namespace App\Listeners;

use App\Events\FollowedEvent;
use App\Notifications\FollowedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class FollowedListener implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\FollowedEvent  $event
     * @return void
     */
    public function handle(FollowedEvent $event)
    {
        $event->user->notify(new FollowedNotification);
    }
}
