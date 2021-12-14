import React from 'react'

import VideoMediaHorizontal from '../components/VideoMediaHorizontal'
import AudioMediaHorizontal from '../components/AudioMediaHorizontal'

const Library = (props) => {
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<center><h1>Library</h1></center>
				<hr />
				{props.boughtVideos
					.filter((boughtVideo) => boughtVideo.username == props.auth.username)
					.length > 0 &&
					<center><h3>Videos</h3></center>}

				{props.boughtVideos
					.filter((boughtVideo) => boughtVideo.username == props.auth.username)
					.map((boughtVideo, key) => (
						<VideoMediaHorizontal
							key={key}
							onClick={() => props.setShow(0)}
							setShow={props.setShow}
							link={`/video-show/${boughtVideo.video_id}`}
							thumbnail={boughtVideo.thumbnail}
							name={boughtVideo.name}
							username={boughtVideo.artist}
							ft={boughtVideo.ft}
							showCartandBuyButton={false} />
					))}

				{props.boughtAudios
					.filter((boughtAudio) => boughtAudio.username == props.auth.username)
					.length > 0 &&
					<center><h3 className="mt-5">Audios</h3></center>}

				{props.boughtAudios
					.filter((boughtAudio) => boughtAudio.username == props.auth.username)
					.map((boughtAudio, key) => (
						<AudioMediaHorizontal
							key={key}
							setShow={props.setShow}
							link={`/audio-show/${boughtAudio.audio_id}`}
							thumbnail={`/storage/${boughtAudio.thumbnail}`}
							name={boughtAudio.name}
							username={boughtAudio.artist}
							ft={boughtAudio.ft}
							audioId={boughtAudio.audio_id}
							showCartandBuyButton={false} />
					))}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Library
