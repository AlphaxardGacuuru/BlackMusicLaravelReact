@component('mail::message')
# Congratulations! Withdrawal successful.

KES {{ $amount }} has been sent to you via MPESA to {{ $phone }} as a settlement for your bought songs, keep up the great work.
Invite more friends and supporters to buy more of your songs.

@component('mail::button', ['url' => 'https://music.black.co.ke/#/settings'])
Invite friends
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent