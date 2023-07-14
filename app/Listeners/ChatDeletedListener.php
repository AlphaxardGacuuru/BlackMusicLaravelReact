<?php

namespace App\Listeners;

use App\Events\ChatDeletedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ChatDeletedListener
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
     * @param  \App\Events\ChatDeletedEvent  $event
     * @return void
     */
    public function handle(ChatDeletedEvent $event)
    {
        //
    }
}
