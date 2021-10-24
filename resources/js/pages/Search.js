import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'
import VideoMediaHorizontal from '../components/VideoMediaHorizontal'
import AudioMediaHorizontal from '../components/AudioMediaHorizontal'

const Search = (props) => {

	// Arrays for dates
	const months = [
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	];

	var hasBought = false

	// if (props.boughtVideos.some((boughtVideo) => {
	// 	return boughtVideo.video_id == showVideo.id &&
	// 		boughtVideo.username == props.auth.username ||
	// 		props.auth.username == "@blackmusic" ||
	// 		props.auth.username == showVideo.username
	// })) {
	// 	hasBought = true
	// }

	// Function for following musicians
	const onFollow = (musician) => {
		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/follows`, {
				musician: musician
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/follows`).then((res) => props.setFollows(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		});
	}

	// Function for adding video to cart
	const onCartVideos = (video) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-videos`, {
				video: video
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/cart-videos`).then((res) => props.setCartVideos(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		});
	}

	// Function for buying video to cart
	const onBuyVideos = (video) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-videos`, {
				video: video
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/cart-videos`).then((res) => props.setCartVideos(res.data))
				history.push('/cart')
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		});
	}

	// Function for adding audio to cart
	const onCartAudios = (audio) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-audios`, {
				audio: audio
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/cart-audios`).then((res) => props.setCartAudios(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		});
	}

	// Function for buying audio to cart
	const onBuyAudios = (audio) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-audios`, {
				audio: audio
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/cart-audios`).then((res) => props.setCartAudios(res.data))
				history.push('/cart')
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		});
	}

	return (
		<>
			<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-8">

					{/* <!-- For mobile --> */}
					{/* <!-- ***** Header Area Start ***** --> */}
					<header style={{ backgroundColor: "#232323" }} className="header-area anti-hidden">
						<div className="container-fluid p-0">
							<div className="row">
								<div className="col-12 p-0">

									{/* <!-- Contact form --> */}
									<div className="contact-form">
										<input
											ref={props.searchInput}
											className="form-control"
											placeholder="Search songs and artists"
											style={{ color: "white", width: "100%" }}
											onChange={(e) => {
												var regex = new RegExp(e.target.value, 'gi');
												props.setSearch(regex)
											}} />
									</div>

								</div>
							</div>
						</div>
					</header>
					<br className="anti-hidden" />

					{/* <!-- ****** Artists Area Start ****** --> */}
					<h4>Artists</h4>
					<div className="hidden-scroll">
						{/*  Echo Artists  */}
						{props.users
							.filter((user) => {
								return user.username != props.auth.username &&
									user.username != "@blackmusic" &&
									user.username.match(props.search)
							})
							.map((artist, key) => (
								<span key={key} className="pt-0 pl-0 pr-0 pb-2" style={{ borderRadius: "10px" }}>
									<center>
										<div className="card avatar-thumbnail" style={{ borderRadius: "50%" }}>
											<Link to={"/profile/" + artist.username}>
												<Img src={artist.pp}
													width='150px'
													height='150px' />
											</Link>
										</div>
										<h6 className="mt-2"
											style={{
												width: "100px",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											{artist.name}
										</h6>
										<h6 style={{
											width: "100px",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
											<small>{artist.username}</small>
										</h6>
									</center>
								</span>
							))}
						{/* Echo Artists End */}
					</div>
					{/* <!-- ****** Artists Area End ****** - */}
				</div>
				<div className="col-sm-2"></div>
			</div>

			<div className="row">
				<div className="col-sm-3"></div>
				<div className="col-sm-3">

					{/* Songs to watch Area */}
					<div className="p-2 mt-2">
						<h4>Videos</h4>
					</div>
					{props.videos
						.filter((video) => video.name.match(props.search) && video.username != props.auth.username)
						.slice(0, 5)
						.map((video, key) => (
							<VideoMediaHorizontal
								key={key}
								onClick={() => props.setShow(0)}
								setShow={props.setShow}
								link={`/video-show/${video.id}`}
								thumbnail={video.thumbnail}
								name={video.name}
								username={video.username}
								ft={video.ft}
								videoInCart={video.inCart}
								hasBoughtVideo={!video.hasBoughtVideo}
								videoId={video.id}
								onCartVideos={onCartVideos}
								onBuyVideos={onBuyVideos} />
						))}
				</div>

				<div className="col-sm-3">
					{/* Song Suggestion Area */}
					<div className="p-2 mt-2 border-bottom">
						<h4>Audios</h4>
					</div>
					{props.audios
						.filter((audio) => audio.name.match(props.search) && audio.username != props.auth.username)
						.slice(0, 5)
						.map((audio, key) => (
							<AudioMediaHorizontal
								key={key}
								setShow={props.setShow}
								link={`/audio-show/${audio.id}`}
								thumbnail={`/storage/${audio.thumbnail}`}
								name={audio.name}
								username={audio.username}
								ft={audio.ft}
								hasBoughtAudio={!props.hasBought}
								audioInCart={audio.inCart}
								audioId={audio.id}
								onCartAudios={onCartAudios}
								onBuyAudios={onBuyAudios} />
						))}
				</div>
				<div className="col-sm-3"></div>
			</div>

			<div className="row">
				<div className="col-sm-3"></div>
				<div className="col-sm-3">
					<div className="p-2 mt-5 mb-3 border-bottom">
						<h4>Video Albums</h4>
					</div>

					{/* Video Albums */}
					{props.videoAlbums
						.filter((videoAlbum) => {
							return videoAlbum.name != "Singles" &&
								videoAlbum.name.match(props.search) &&
								videoAlbum.username != props.auth.username
						})
						.map((videoAlbum, key) => (
							<div key={key} className="mb-3">
								<div className="media">
									<div className="media-left">
										<Img src={`/storage/${videoAlbum.cover}`}
											width="auto"
											height="100"
											alt={"album cover"} />
									</div>
									<div className="media-body p-2">
										<small>Video Album</small>
										<h1>{videoAlbum.name}</h1>
										<h6>{videoAlbum.created_at}</h6>
									</div>
								</div>
							</div>
						))}
				</div>

				<div className="col-sm-3">
					{/* Videos Albums End */}
					<div className="p-2 mt-5 mb-3 border-bottom">
						<h4>Audio Albums</h4>
					</div>

					{/* Audio Albums */}
					{props.audioAlbums
						.filter((audioAlbum) => {
							return audioAlbum.name != "Singles" &&
								audioAlbum.name.match(props.search) &&
								audioAlbum.username != props.auth.username
						})
						.map((audioAlbum, key) => (
							<div key={key} className="mb-3">
								<div className="media">
									<div className="media-left">
										<Img src={`/storage/${audioAlbum.cover}`}
											width="auto"
											height="100"
											alt={"album cover"} />
									</div>
									<div className="media-body p-2">
										<small>Audio Album</small>
										<h1>{audioAlbum.name}</h1>
										<h6>{audioAlbum.create_at}</h6>
									</div>
								</div>
							</div>
						))}
					{/* Audio Albums End */}
				</div>
				<div className="col-sm-3"></div>
			</div>
		</>
	)
}

export default Search
