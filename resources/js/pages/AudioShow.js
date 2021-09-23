import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios';

import Img from '../components/Img'
import Button from '../components/Button'
import AudioMediaHorizontal from '../components/AudioMediaHorizontal';

const AudioShow = (props) => {

	let { show } = useParams();

	let history = useHistory()

	// Set Show if it's equal to 0
	props.show == 0 && setTimeout(() => props.setShow(show), 1000)

	// Set State
	const [text, setText] = useState("")
	const [tabClass, setTabClass] = useState("comments")

	// Get audio to show
	if (props.audios.find((audio) => audio.id == props.show)) {
		var showAudio = props.audios.find((audio) => audio.id == props.show)

		// Get artist of audio to show 
		var showArtist = props.users.find((user) => user.username == showAudio.username)
	} else {
		var showAudio = []
		var showArtist = []
	}


	// Arrays for dates
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// Function for liking audio
	const onAudioLike = () => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/audio-likes`, {
				audio: show
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/audio-likes`).then((res) => props.setAudioLikes(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		})
	}

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

	// Function for posting comment
	const onComment = (e) => {
		e.preventDefault()

		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/audio-comments`, {
				audio: show,
				text: text
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/audio-comments`).then((res) => props.setAudioComments(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		})

		setText("")
	}

	// Function for liking posts
	const onCommentLike = (comment) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/audio-comment-likes`, {
				comment: comment
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/audio-comment-likes`).then((res) => props.setAudioCommentLikes(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		})
	}

	// Function for deleting comments
	const onDeleteComment = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/audio-comments/${id}`).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/audio-comments`).then((res) => props.setAudioComments(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		})
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

	// Function for downloading audio
	const onDownload = () => {
		window.open(`${props.url}/api/audios/${showAudio.id}`)
		props.setMessage(`Downloading ${showAudio.name}`)
	}

	return (
		<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-7">
				{/* <div
									className="spinner-border text-dark"
									style={{
										borderTopWidth: "2px",
										borderBottomWidth: "2px",
										borderLeftWidth: "2px",
										width: "100px",
										height: "100px",
									}}>
								</div> */}
				<div
					className="ml-2 mr-2"
					style={{
						borderTopLeftRadius: "10px",
						borderTopRightRadius: "10px",
						borderBottomRightRadius: "10px",
						borderBottomLeftRadius: "10px",
						overflow: "hidden",
						width: "auto",
						maxHeight: "495px",
					}}>
					<center>
						{props.audioLoader ?
							<div id="sonar-load" className="mt-5 mb-5"></div> :
							<Img
								src={`/storage/${showAudio.thumbnail}`}
								width="100%"
								height="auto"
								alt="music-cover" />}
					</center>
				</div>

				{/* <!-- Progress Container --> */}
				<div
					ref={props.audioContainer}
					className="progress ml-2 mr-2 mt-4"
					style={{ height: "5px" }}
					onClick={props.setProgress}>
					<div
						ref={props.audioProgress}
						className="progress-bar"
						style={{
							background: "#232323",
							height: "5px",
							width: props.progressPercent
						}}>
					</div>
				</div>
				{/* Progress Container End */}

				{/* Audio Controls */}
				<div className="d-flex justify-content-between">
					<div style={{ cursor: "pointer" }} className="p-2">{props.fmtMSS(props.currentTime)}</div>
					<div
						style={{
							cursor: "pointer",
							color: props.shuffle && "#FFD700"
						}}
						className="p-2"
						onClick={() => {
							props.setShuffle(props.shuffle ? false : true)
							props.setLoop(props.loop && false)
						}}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-shuffle"
							viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
							<path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
						</svg>
					</div>
					<div style={{ cursor: "pointer" }} className="p-2">
						<span onClick={props.prevSong}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-skip-backward"
								viewBox="0 0 16 16">
								<path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
							</svg>
						</span>
					</div>
					<div style={{ cursor: "pointer" }} className="p-2">
						<span
							onClick={props.playBtn ? props.pauseSong : props.playSong}>
							{props.playBtn ?
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="2em"
									height="2em"
									fill="currentColor"
									className="bi bi-pause"
									viewBox="0 0 16 16">
									<path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
								</svg> :
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="2em"
									height="2em"
									fill="currentColor"
									className="bi bi-play"
									viewBox="0 0 16 16">
									<path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
								</svg>
							}
						</span>
					</div>
					<div style={{ cursor: "pointer" }} className="p-2">
						<span onClick={props.nextSong}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-skip-forward"
								viewBox="0 0 16 16">
								<path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" />
							</svg>
						</span>
					</div>
					<div
						style={{
							cursor: "pointer",
							color: props.loop && "#FFD700"
						}}
						className="p-2"
						onClick={() => {
							props.setLoop(props.loop ? false : true)
							props.setShuffle(props.shuffle && false)
						}}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-arrow-repeat"
							viewBox="0 0 16 16">
							<path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
							<path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
						</svg>
					</div>
					<div style={{ cursor: "pointer" }} className="p-2">{props.fmtMSS(props.dur)}</div>
				</div>

				<div className="d-flex justify-content-end">
					{/* <!-- Volume Container --> */}
					<div style={{ cursor: "pointer" }} className="volume-show">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-volume-up" viewBox="0 0 16 16">
							<path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
							<path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
							<path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
						</svg>
					</div>
					<div
						ref={props.volumeContainer}
						className="progress volume-hide ml-2 mr-2 mt-2 float-right"
						style={{
							height: "5px",
							width: "25%"
						}}
						onClick={props.onSetVolume}>
						<div
							ref={props.volumeProgress}
							className="progress-bar"
							style={{
								background: "#232323",
								height: "5px",
								width: Math.round(props.volume * 100)
							}}>
						</div>
					</div>
				</div>
				{/* Audio Controls End */}

				<div className="d-flex justify-content-between">
					{/* Audio likes */}
					<div className="p-2 mr-2">
						{props.audioLikes.find((audioLike) => {
							return audioLike.audio_id == show &&
								audioLike.username == props.auth.username
						}) ? <a href="#" style={{ color: "#cc3300" }}
							onClick={(e) => {
								e.preventDefault()
								onAudioLike()
							}}>
							<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
								className='bi bi-heart-fill' viewBox='0 0 16 16'>
								<path fillRule='evenodd'
									d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
							</svg>

							<small> {props.audioLikes.filter((audioLike) => audioLike.audio_id == show).length}
							</small>
						</a>
							: <a href='#' onClick={(e) => {
								e.preventDefault()
								onAudioLike()
							}}>
								<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
									className='bi bi-heart' viewBox='0 0 16 16'>
									<path
										d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
								</svg>

								<small> {props.audioLikes.filter((audioLike) => audioLike.audio_id == show).length}
								</small>
							</a>}
					</div>

					{/* Share button */}
					<div className="p-2 mr-2">
						<a href={`whatsapp://send?text=https://music.black.co.ke/audio-show/${show}`}>
							<svg className='bi bi-reply' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'>
								<path fillRule='evenodd'
									d='M9.502 5.013a.144.144 0 0 0-.202.134V6.3a.5.5 0 0 1-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 0 1 1.921-.306 7.403 7.403 0 0 1 .798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 0 1 .45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 0 1 .042-.028.147.147 0 0 0 0-.252.494.494 0 0 1-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 0 0-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 0 1-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.667z' />
							</svg>
							<b> SHARE</b>
						</a>
					</div>

					{/* Download button */}
					{props.hasBought &&
						<div className="p-2">
							<Button btnClass="mysonar-btn" btnText="download" onClick={onDownload} />
						</div>}
				</div>

				{/* Audio Info Area */}
				<div className="d-flex flex-row">
					<div className="p-2 mr-auto">
						<h6 className="m-0 p-0"
							style={{
								width: "200px",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "clip"
							}}>
							<small>Song name {showAudio.name}</small>
						</h6>
						<small>Album</small> <span>
							{showAudio.album ?
								props.audioAlbums.length &&
								props.audioAlbums.find((audioAlbum) => audioAlbum.id == showAudio.album).name : ""}
						</span><br />
						<small>Genre</small> <span>{showAudio.genre}</span><br />
						<small>Posted</small> <span>
							{new Date(showAudio.created_at).getDay()}
							{" " + months[new Date(showAudio.created_at).getMonth()]}
							{" " + new Date(showAudio.created_at).getFullYear()}
						</span>
					</div>
				</div>

				{/* <!-- Read more section --> */}
				<div className="p-2 border-bottom">
					<button
						href="#collapseExample"
						className="mysonar-btn"
						data-toggle="collapse"
						aria-expanded="false"
						aria-controls="collapseExample">
						Read more
					</button>
					<div className="collapse" id="collapseExample">
						<div className="card card-body">
							{showAudio.description}
						</div>
					</div>
				</div>
				{/* Audio Info Area End */}

				{/* Artist Area */}
				<div className="p-2 border-bottom">
					<div className='media'>
						<div className='media-left'>
							<Link to={`/profile/${showArtist && showArtist.username}`}>
								<Img src={`/storage/${showArtist && showArtist.pp}`} width={"40px"} height={"40px"} />
							</Link>
						</div>
						<div className='media-body'>
							<h6 className="m-0 p-0"
								style={{
									width: "140px",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip"
								}}>
								<small>{showArtist && showArtist.name} {showArtist && showArtist.username}</small>
							</h6>
							<span style={{
								color: "gold",
								paddingTop: "10px"
							}}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-circle"
									viewBox="0 0 16 16">
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
								</svg>
							</span>
							<small className="ml-1 mr-1">
								{props.decos.filter((deco) => deco.username == showArtist.username).length}
							</small>
							<span style={{ fontSize: "1rem" }}>&#x2022;</span>
							<small> {props.follows.filter((follow) => follow.username == showArtist.username).length} fans</small>

							{/* Check whether user has bought at least one song from musician */}
							{/* Check whether user has followed musician and display appropriate button */}
							{props.boughtAudios.find((boughtAudio) => {
								return boughtAudio.username == props.auth.username &&
									boughtAudio.artist == showArtist.username
							}) || props.auth.username == "@blackmusic" ? props.follows.find((follow) => {
								return follow.followed == showArtist.username && follow.username == props.auth.username
							}) ? <button className={'btn btn-light float-right rounded-0'}
								onClick={() => onFollow(showArtist.username)}>
								Followed
								<svg className='bi bi-check' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
									<path fillRule='evenodd'
										d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z' />
								</svg>
							</button>
								: <Button btnClass={'mysonar-btn float-right'}
									onClick={() => onFollow(showArtist.username)}
									btnText={'follow'} />
								: <Button btnClass={'mysonar-btn float-right'}
									onClick={() =>
										props.setErrors([`You must have bought atleast one song by ${showArtist.username}`])}
									btnText={'follow'} />}
						</div>
					</div>
				</div>
				{/* Artist Area End */}

				<br />

				{/* Tab for Comment and Up Next */}
				<div className="d-flex">
					<div className="p-2 flex-fill anti-hidden">
						<h6 className={tabClass == "comments" ? "active-scrollmenu" : "p-2"}
							onClick={() => setTabClass("comments")}>
							<center>Comments</center>
						</h6>
					</div>
					<div className="p-2 flex-fill anti-hidden">
						<h6 className={tabClass == "recommended" ? "active-scrollmenu" : "p-1"}
							onClick={() => setTabClass("recommended")}>
							<center>Recommended</center>
						</h6>
					</div>
				</div>

				{/* <!-- Comment Form ---> */}
				<div className={tabClass == "comments" ? "" : "hidden"}>
					{props.hasBought &&
						<div className='media p-2 border-bottom'>
							<div className="media-left">
								<Img src={"/storage/" + props.auth.pp} width={"40px"} height={"40px"} />
							</div>
							<div className="media-body contact-form">
								<form onSubmit={onComment}>
									<input
										type="text"
										className="form-control"
										placeholder="Add a comment"
										value={text}
										onChange={(e) => setText(e.target.value)} />
									<br />
									<Button
										type="submit"
										btnClass={"mysonar-btn float-right"}
										btnText={"Comment"} />
								</form>
							</div>
						</div>
					}
					{/* <!-- End of Comment Form --> */}

					{/* <!-- Comment Section --> */}
					{props.hasBought &&
						props.audioComments
							.filter((comment) => comment.audio_id == show)
							.map((comment, index) => (
								<div key={index} className='media p-2 border-bottom'>
									<div className='media-left'>
										<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
											<Link to={`/profile/${comment.username}`}>
												<Img src={`/storage/${props.users.find((user) => user.username == comment.username).pp}`}
													width="40px" height="40px" />
											</Link>
										</div>
									</div>
									<div className="media-body ml-2">
										<h6 className="media-heading m-0"
											style={{
												width: "100%",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											<b>{props.users.find((user) => user.username == comment.username).name}</b>
											<small>{comment.username} </small>
											<span style={{ color: "gold" }}>
												<svg className="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16"
													fill="currentColor" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd"
														d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
												</svg>
												<span className="ml-1" style={{ fontSize: "10px" }}>
													{props.decos.filter((deco) => deco.username == comment.username).length}
												</span>
											</span>
											<small>
												<i className="float-right mr-1">{new Date(comment.created_at).toDateString()}</i>
											</small>
										</h6>
										<p className="mb-0">{comment.text}</p>

										{/* Comment likes */}
										{props.audioCommentLikes.find((commentLike) => {
											return commentLike.comment_id == comment.id &&
												commentLike.username == props.auth.username
										}) ?
											<a href="#" style={{ color: "#cc3300" }} onClick={(e) => {
												e.preventDefault()
												onCommentLike(comment.id)
											}}>
												<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
													className='bi bi-heart-fill' viewBox='0 0 16 16'>
													<path fillRule='evenodd'
														d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
												</svg>
												<small className="ml-1">
													{props.audioCommentLikes
														.filter((commentLike) => commentLike.comment_id == comment.id).length}
												</small>
											</a> :
											<a href='#' onClick={(e) => {
												e.preventDefault()
												onCommentLike(comment.id)
											}}>
												<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
													className='bi bi-heart' viewBox='0 0 16 16'>
													<path
														d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
												</svg>
												<small className="ml-1">
													{props.audioCommentLikes
														.filter((commentLike) => commentLike.comment_id == comment.id).length}
												</small>
											</a>}

										{/* <!-- Default dropup button --> */}
										<div className="dropup float-right">
											<a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
												aria-haspopup="true" aria-expanded="false">
												<svg className="bi bi-three-dots-vertical" width="1em" height="1em" viewBox="0 0 16 16"
													fill="currentColor" xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd"
														d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
												</svg>
											</a>
											<div className="dropdown-menu dropdown-menu-right p-0" style={{ borderRadius: "0" }}>
												{comment.username == props.auth.username &&
													<a href='#' className="dropdown-item" onClick={(e) => {
														e.preventDefault();
														onDeleteComment(comment.id)
													}}>
														<h6>Delete comment</h6>
													</a>}
											</div>
										</div>
									</div>
								</div>
							))}
				</div>
				{/* End of Comment Section */}
			</div>

			{/* -- Up next area -- */}
			<div className={tabClass == "recommended" ? "col-sm-3" : "col-sm-3 hidden"}>
				<div className="p-2 border-bottom">
					<h5>Up next</h5>
				</div>
				{!props.boughtAudios.some((boughtAudio) => {
					return boughtAudio.username == props.auth.username
				}) &&
					<center>
						<h6 className="mt-4" style={{ color: "grey" }}>You haven't bought any audios</h6>
					</center>}

				{props.boughtAudios
					.filter((boughtAudio) => boughtAudio.username == props.auth.username && boughtAudio.audio_id != props.show)
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
				{/* <!-- End of Up next Area --> */}

				{/* Song Suggestion Area */}
				<div className="p-2 mt-5 border-bottom">
					<h5>Songs to watch</h5>
				</div>
				{props.audios
					.filter((audio) => !props.boughtAudios
						.some((boughtAudio) =>
							boughtAudio.audio_id == audio.id &&
							boughtAudio.username == props.auth.username
						) && audio.username != props.auth.username && audio.id != show)
					.slice(0, 10)
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
							audioInCart={
								props.cartAudios
									.some((cartAudio) => {
										return cartAudio.audio_id == audio.id &&
											cartAudio.username == props.auth.username
									})
							}
							audioId={audio.id}
							onCartAudios={onCartAudios}
							onBuyAudios={onBuyAudios} />
					))}
			</div>
			{/* <!-- End of Song Suggestion Area --> */}
			<div className="1"></div>
		</div>
	)
}

export default AudioShow
