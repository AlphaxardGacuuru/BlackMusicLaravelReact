@component('mail::message')
# Congratulations! You just purchased {{ count($videos) }} video{{ count($videos) > 1 ? "s" : ""}}.

Thank you for supporting Kenyan artists, here's your receipt.

@component('mail::panel')
@foreach ($videos as $video)
	{{ $video['name'] }}<br>
	{{ $video['username'], $video['ft'] }}<br><br>
	@endforeach
@endcomponent

@component('mail::button', ['url' => 'https://music.black.co.ke/#/library'])
CHECK THEM OUT
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
