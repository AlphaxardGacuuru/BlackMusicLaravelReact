import React, { useState, useEffect, Suspense } from 'react'

import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'
import LoadingAudioMediaHorizontal from '../components/LoadingAudioMediaHorizontal'
import LoadingKaraokeMedia from '../components/LoadingKaraokeMedia'
import axios from 'axios'

const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))
const AudioMediaHorizontal = React.lazy(() => import('../components/AudioMediaHorizontal'))
const KaraokeMedia = React.lazy(() => import('../components/KaraokeMedia'))

const Library = (props) => {

	axios.defaults.baseURL = props.url

	const [savedKaraokes, setSavedKaraokes] = useState([])
	const [tabClass, setTabClass] = useState("videos")

	useEffect(() => {
		// Fetch Saved Karaokes
		axios.get("/api/saved-karaokes")
			.then((res) => setSavedKaraokes(res.data))
			.catch(() => props.setErrors(["Failed to Fetch Saved Karaokes"]))
	}, [])


	return (
		<>
			<center><h1>Library</h1></center>

			{/* Tabs for Videos, Audios and Karaokes */}
			<div className="d-flex">
				<div className="p-2 flex-fill anti-hidden">
					<h4 className={tabClass == "videos" ? "active-scrollmenu" : "p-1"}
						onClick={() => setTabClass("videos")}>
						<center>Videos</center>
					</h4>
				</div>
				<div className="p-2 flex-fill anti-hidden">
					<h4 className={tabClass == "audios" ? "active-scrollmenu" : "p-1"}
						onClick={() => setTabClass("audios")}>
						<center>Audios</center>
					</h4>
				</div>
				<div className="p-2 flex-fill anti-hidden">
					<h4 className={tabClass == "karaokes" ? "active-scrollmenu" : "p-1"}
						onClick={() => setTabClass("karaokes")}>
						<center>Karaokes</center>
					</h4>
				</div>
			</div>
			{/* Tabs for Videos, Audios and Karaokes End */}

			<div className="row">
				<div className="col-sm-1"></div>
				{/* Video Area */}
				<div className={tabClass == "videos" ? "col-sm-3" : "col-sm-3 hidden"}>
					<center className="hidden"><h4>Videos</h4></center>
					{props.boughtVideos
						.filter((boughtVideo) => boughtVideo.username == props.auth.username)
						.length == 0 &&
						<center className="mt-3">
							<h6 style={{ color: "grey" }}>You haven't bought any videos</h6>
						</center>}

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
				</div>
				{/* Video Area End */}

				{/* Audio Area */}
				<div className={tabClass == "audios" ? "col-sm-4" : "col-sm-4 hidden"}>
					<center className="hidden"><h4>Audios</h4></center>
					{props.boughtAudios
						.filter((boughtAudio) => boughtAudio.username == props.auth.username)
						.length == 0 &&
						<center className="mt-3">
							<h6 style={{ color: "grey" }}>You haven't bought any audios</h6>
						</center>}

					{props.boughtAudios
						.filter((boughtAudio) => boughtAudio.username == props.auth.username)
						.map((boughtAudio, key) => (
							<Suspense key={key} fallback={<LoadingAudioMediaHorizontal />}>
								<AudioMediaHorizontal
									key={key}
									setShow={props.setShow}
									setLocalStorage={props.setLocalStorage}
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
				{/* Audio Area End */}

				{/* Karaoke Area */}
				<div className={tabClass == "karaokes" ? "col-sm-3" : "col-sm-3 hidden"}>
					<center className="hidden"><h4>Karaokes</h4></center>
					<div className="d-flex justify-content-around flex-wrap">
						{savedKaraokes
							.length == 0 &&
							<center className="mt-3">
								<h6 style={{ color: "grey" }}>You haven't saved any karaokes</h6>
							</center>}

						{savedKaraokes
							.map((savedKaraoke, key) => (
								<Suspense key={key} fallback={<LoadingKaraokeMedia />}>
									<KaraokeMedia
										key={key}
										setShow={props.setShow}
										link={`/karaoke-show/${savedKaraoke.karaoke_id}`}
										src={`/storage/${savedKaraoke.karaoke}`}
										name={savedKaraoke.name}
										username={savedKaraoke.username} />
								</Suspense>
							))}
					</div>
				</div>
				{/* Karaoke Area End */}
				<div className="col-sm-1"></div>
			</div>
		</>
	)
}

export default Library
