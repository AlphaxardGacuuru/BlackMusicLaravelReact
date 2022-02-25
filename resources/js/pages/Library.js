import React, { Suspense } from 'react'

import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'
import LoadingAudioMediaHorizontal from '../components/LoadingAudioMediaHorizontal'

const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))
const AudioMediaHorizontal = React.lazy(() => import('../components/AudioMediaHorizontal'))

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
						<Suspense key={key} fallback={<LoadingVideoMediaHorizontal />}>
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
						</Suspense>
					))}

				{props.boughtAudios
					.filter((boughtAudio) => boughtAudio.username == props.auth.username)
					.length > 0 &&
					<center><h3 className="mt-5">Audios</h3></center>}

				{props.boughtAudios
					.filter((boughtAudio) => boughtAudio.username == props.auth.username)
					.map((boughtAudio, key) => (
						<Suspense key={key} fallback={<LoadingAudioMediaHorizontal />}>
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
						</Suspense>
					))}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Library
