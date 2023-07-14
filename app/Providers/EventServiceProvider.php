<?php

namespace App\Providers;

use App\Events\AudioBoughtEvent;
use App\Events\AudioCommentedEvent;
use App\Events\AudioCommentLikedEvent;
use App\Events\AudioLikedEvent;
use App\Events\AudioUploadedEvent;
use App\Events\ChatDeletedEvent;
use App\Events\FollowedEvent;
use App\Events\KopokopoCreatedEvent;
use App\Events\NewChatEvent;
use App\Events\PostCommentedEvent;
use App\Events\PostCommentLikedEvent;
use App\Events\PostedEvent;
use App\Events\PostLikedEvent;
use App\Events\StoryCreatedEvent;
use App\Events\VideoBoughtEvent;
use App\Events\VideoCommentedEvent;
use App\Events\VideoCommentLikedEvent;
use App\Events\VideoLikedEvent;
use App\Events\VideoUploadedEvent;
use App\Listeners\AudioBoughtListener;
use App\Listeners\AudioCommentedListener;
use App\Listeners\AudioCommentLikedListener;
use App\Listeners\AudioLikedListener;
use App\Listeners\AudioUploadedListener;
use App\Listeners\ChatDeletedListener;
use App\Listeners\FollowedListener;
use App\Listeners\KopokopoCreatedListener;
use App\Listeners\NewChatListener;
use App\Listeners\PostCommentedListener;
use App\Listeners\PostCommentLikedListener;
use App\Listeners\PostedListener;
use App\Listeners\PostLikedListener;
use App\Listeners\RegisteredListener;
use App\Listeners\StoryCreatedListener;
use App\Listeners\VideoBoughtListener;
use App\Listeners\VideoCommentedListener;
use App\Listeners\VideoCommentLikedListener;
use App\Listeners\VideoLikedListener;
use App\Listeners\VideoUploadedListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
            RegisteredListener::class
        ],
        VideoUploadedEvent::class => [VideoUploadedListener::class],
        AudioUploadedEvent::class => [AudioUploadedListener::class],
        NewChatEvent::class => [NewChatListener::class],
        ChatDeletedEvent::class => [ChatDeletedListener::class],
        VideoLikedEvent::class => [VideoLikedListener::class],
        VideoCommentedEvent::class => [VideoCommentedListener::class],
        VideoCommentLikedEvent::class => [VideoCommentLikedListener::class],
        AudioLikedEvent::class => [AudioLikedListener::class],
        AudioCommentedEvent::class => [AudioCommentedListener::class],
        AudioCommentLikedEvent::class => [AudioCommentLikedListener::class],
        VideoBoughtEvent::class => [VideoBoughtListener::class],
        AudioBoughtEvent::class => [AudioBoughtListener::class],
        PostLikedEvent::class => [PostLikedListener::class],
        PostedEvent::class => [PostedListener::class],
        PostCommentedEvent::class => [PostCommentedListener::class],
        PostCommentLikedEvent::class => [PostCommentLikedListener::class],
        FollowedEvent::class => [FollowedListener::class],
        KopokopoCreatedEvent::class => [KopokopoCreatedListener::class],
        StoryCreatedEvent::class => [StoryCreatedListener::class],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
