<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AudioPayout extends Mailable
{
    use Queueable, SerializesModels;

	public $amount, $phone;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($amount, $phone)
    {
        $this->amount = $amount;
		$this->phone = $phone;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mails.audio-payout');
    }
}
