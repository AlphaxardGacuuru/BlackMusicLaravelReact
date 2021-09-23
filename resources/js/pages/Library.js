import React from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import VideoMediaHorizontal from '../components/VideoMediaHorizontal'
import AudioMediaHorizontal from '../components/AudioMediaHorizontal'

const Library = (props) => {
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<center><h1>Library</h1></center>
				<hr />
				<center><h3>Videos</h3></center>

				{props.boughtVideos
					.filter((boughtVideo) => boughtVideo.username == props.auth.username)
					.map((boughtVideo, key) => (
						<VideoMediaHorizontal
							key={key}
							onClick={() => props.setShow(0)}
							setShow={props.setShow}
							link={`/video-show/${boughtVideo.video_id}`}
							thumbnail={
								props.videos.find((video) => video.id == boughtVideo.video_id) &&
								props.videos.find((video) => video.id == boughtVideo.video_id).thumbnail
							}
							name={
								props.videos.find((video) => video.id == boughtVideo.video_id) &&
								props.videos.find((video) => video.id == boughtVideo.video_id).name
							}
							username={
								props.videos.find((video) => video.id == boughtVideo.video_id) &&
								props.videos.find((video) => video.id == boughtVideo.video_id).username
							}
							ft={
								props.videos.find((video) => video.id == boughtVideo.video_id) &&
								props.videos.find((video) => video.id == boughtVideo.video_id).ft
							}
							showCartandBuyButton={false} />
					))}

				<center><h3 className="mt-5">Audios</h3></center>

				{props.boughtAudios
					.filter((boughtAudio) => boughtAudio.username == props.auth.username)
					.map((boughtAudio, key) => (
						<AudioMediaHorizontal
							key={key}
							setShow={props.setShow}
							link={`/audio-show/${boughtAudio.audio_id}`}
							thumbnail={
								`/storage/${props.audios.find((audio) => audio.id == boughtAudio.audio_id) &&
								props.audios.find((audio) => audio.id == boughtAudio.audio_id).thumbnail}`
							}
							name={
								props.audios.find((audio) => audio.id == boughtAudio.audio_id) &&
								props.audios.find((audio) => audio.id == boughtAudio.audio_id).name
							}
							username={
								props.audios.find((audio) => audio.id == boughtAudio.audio_id) &&
								props.audios.find((audio) => audio.id == boughtAudio.audio_id).username
							}
							ft={
								props.audios.find((audio) => audio.id == boughtAudio.audio_id) &&
								props.audios.find((audio) => audio.id == boughtAudio.audio_id).ft
							}
							audioId={boughtAudio.audio_id}
							showCartandBuyButton={false} />
					))}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Library
