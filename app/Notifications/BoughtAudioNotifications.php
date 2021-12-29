<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BoughtAudioNotifications extends Notification
{
    use Queueable;

	protected $cartAudio;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($cartAudio)
    {
        $this->cartAudio = $cartAudio;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

	public function toDatabase($notifiable)
	{
		return [
			'url' => '/profile/' . auth()->user()->username,
			'from' => auth()->user()->username,
			'id' => $this->cartAudio->audios->username,
			'message' => auth()->user()->username . ' bought ' . $this->cartAudio->audios->name,
		];
	}

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
