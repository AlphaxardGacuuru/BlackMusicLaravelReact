<?php

namespace App\Providers;

use App\Events\AudioBoughtEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AudioBoughtListener
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
     * @param  AudioBoughtEvent  $event
     * @return void
     */
    public function handle(AudioBoughtEvent $event)
    {
        //
    }
}
