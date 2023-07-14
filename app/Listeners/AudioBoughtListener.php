<?php

namespace App\Listeners;

use App\Events\AudioBoughtEvent;
use App\Notifications\AudioReceiptNotification;
use App\Notifications\BoughtAudioNotification;
use App\Notifications\DecoNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AudioBoughtListener implements ShouldQueue
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
     * @param  \App\Events\AudioBoughtEvent  $event
     * @return void
     */
    public function handle(AudioBoughtEvent $event)
    {
        // Notify Artist
        foreach ($event->audios as $audio) {
            $audio->user->notify(new BoughtAudioNotification($audio));
        }

        // Notify Current user
        auth('sanctum')->user()->notify(new AudioReceiptNotification($event->audios));

        /* Add deco notification */
        foreach ($event->decoArtists as $artist) {
            auth('sanctum')->user()->notify(new DecoNotification($artist));
        }
    }
}
