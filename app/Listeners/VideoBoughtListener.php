<?php

namespace App\Listeners;

use App\Events\VideoBoughtEvent;
use App\Notifications\BoughtVideoNotification;
use App\Notifications\DecoNotification;
use App\Notifications\VideoReceiptNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class VideoBoughtListener implements ShouldQueue
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
     * @param  \App\Events\VideoBoughtEvent  $event
     * @return void
     */
    public function handle(VideoBoughtEvent $event)
    {
        // Notify Artist
        foreach ($event->videos as $video) {
            $video->user->notify(new BoughtVideoNotification($video));
        }

        // Notify Current user
        auth('sanctum')->user()->notify(new VideoReceiptNotification($event->videos));

        /* Add deco notification */
        foreach ($event->decoArtists as $artist) {
            auth('sanctum')->user()->notify(new DecoNotification($artist));
        }
    }
}
