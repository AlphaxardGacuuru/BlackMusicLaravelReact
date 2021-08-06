import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'

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
						<div key={key}
							className="media p-2 border-bottom">
							<div className="media-left thumbnail">
								<Link to={`/video-show/${boughtVideo.video_id}`}>
									<Img src={props.videos
										.find((video) => video.id == boughtVideo.video_id)
										.thumbnail}
										width="160em"
										height="90em" />
								</Link>
							</div>
							<div className="media-body ml-2">
								<h6 className="m-0 pt-2 pr-1 pl-1"
									style={{
										width: "150px",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>
									{props.videos
										.find((video) => video.id == boughtVideo.video_id)
										.name}
								</h6>
								<h6 className="mt-0 mr-1 ml-1 mb-2 pt-0 pr-1 pl-1 pb-0">
									<small>{props.videos
										.find((video) => video.id == boughtVideo.video_id)
										.username}</small>
								</h6>
							</div>
						</div>
					))}

				<center><h3 className="mt-5">Audios</h3></center>

				{props.boughtAudios
					.filter((boughtAudio) => boughtAudio.username == props.auth.username)
					.map((boughtAudio, key) => (
						<div
							key={key}
							className="d-flex p-2 border-bottom">
							<div
								className="thumbnail"
								style={{
									width: "50px",
									height: "50px"
								}}>
								<Link to={`/audio-show/${boughtAudio.audio_id}`}>
									<Img src={`/storage/${props.audios
										.find((audio) => audio.id == boughtAudio.audio_id).thumbnail}`}
										width="100%"
										height="50px" />
								</Link>
							</div>
							<div className="ml-2 mr-auto">
								<h6
									className="mb-0 pb-0"
									style={{
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>
									{props.audios
										.find((audio) => audio.id == boughtAudio.audio_id)
										.name}
								</h6>
								<h6 className="mt-0 pt-0">
									<small>
										{props.audios
											.find((audio) => audio.id == boughtAudio.audio_id)
											.username}
									</small>
									<small className="ml-1">
										{props.audios
											.find((audio) => audio.id == boughtAudio.audio_id)
											.ft}
									</small>
								</h6>
							</div>
						</div>
					))}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Library
