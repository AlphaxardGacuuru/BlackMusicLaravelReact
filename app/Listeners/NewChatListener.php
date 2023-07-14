<?php

namespace App\Listeners;

use App\Events\NewChatEvent;
use App\Notifications\NewChatNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NewChatListener
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
     * @param  \App\Events\NewChatEvent  $event
     * @return void
     */
    public function handle(NewChatEvent $event)
    {
        $event->user->notify(new NewChatNotification($event->chat));
    }
}
