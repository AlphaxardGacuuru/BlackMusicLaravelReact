import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useState } from 'react'
import Img from '../components/Img'
import Button from '../components/Button'

const AudioShow = (props) => {

	let { show } = useParams();

	// Get audio to show
	if (props.audios.find((audio) => audio.id == show)) {
		var showAudio = props.audios.find((audio) => audio.id == show)
	} else {
		var showAudio = []
	}

	// Get artist of audio to show 
	if (props.users.find((user) => user.username == showAudio.username)) {
		var showArtist = props.users.find((user) => user.username == showAudio.username)
	} else {
		var showArtist = []
	}

	const [text, setText] = useState("")
	const [tabClass, setTabClass] = useState("comments")

	// Arrays for dates
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	const [playBtn, setPlayBtn] = useState(false)
	const progress = React.useRef(null)
	const progressContainer = React.useRef(null)
	var progressWidth
	var currTime = React.useRef(null)
	var durTime = React.useRef(null)

	// Song titles
	const songs = ['hey', 'summer', 'ukulele'];

	// Keep track of song
	let songIndex = 2;

	// Initially load song details into DOM
	loadSong(songs[songIndex]);

	// Update song details
	let title;
	let audioSrc;
	let coverSrc;

	function loadSong(song) {
		title = song;
		audioSrc = `/storage/audios/${song}.mp3`;
		coverSrc = `/storage/audio-thumbnails/${song}.jpg`;
	}

	const [audio, setAudio] = useState(new Audio(audioSrc))

	// Play song
	const playSong = () => {
		setPlayBtn(true)
		audio.play();
	}

	// Pause song
	const pauseSong = () => {
		setPlayBtn(false)
		audio.pause();
	}

	// Previous song
	const prevSong = () => {
		songIndex--;

		if (songIndex < 0) {
			songIndex = songs.length - 1;
		}

		loadSong(songs[songIndex]);

		// setAudio(new Audio(audioSrc))

		playSong();
	}

	// Next song
	const nextSong = () => {
		songIndex++;

		if (songIndex > songs.length - 1) {
			songIndex = 0;
		}

		loadSong(songs[songIndex]);

		// setAudio(new Audio(audioSrc))

		playSong();
	}

	// Update progress bar
	function updateProgress(e) {
		const { duration, currentTime } = e.srcElement;
		const progressPercent = (currentTime / duration) * 100;
		progressWidth = `${progressPercent}%`;
	}

	// Set progress bar
	function setProgress(e) {
		const width = this.clientWidth;
		const clickX = e.offsetX;
		const duration = audio.duration;

		audio.currentTime = (clickX / width) * duration;
	}

	//get duration & currentTime for Time of song
	function DurTime(e) {
		const { duration, currentTime } = e.srcElement;
		var sec;
		var sec_d;

		// define minutes currentTime
		let min = (currentTime == null) ? 0 :
			Math.floor(currentTime / 60);
		min = min < 10 ? '0' + min : min;

		// define seconds currentTime
		function get_sec(x) {
			if (Math.floor(x) >= 60) {

				for (var i = 1; i <= 60; i++) {
					if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
						sec = Math.floor(x) - (60 * i);
						sec = sec < 10 ? '0' + sec : sec;
					}
				}
			} else {
				sec = Math.floor(x);
				sec = sec < 10 ? '0' + sec : sec;
			}
		}

		get_sec(currentTime, sec);

		// change currentTime DOM
		currTime = min + ':' + sec;

		// define minutes duration
		let min_d = (isNaN(duration) === true) ? '0' :
			Math.floor(duration / 60);
		min_d = min_d < 10 ? '0' + min_d : min_d;


		function get_sec_d(x) {
			if (Math.floor(x) >= 60) {

				for (var i = 1; i <= 60; i++) {
					if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
						sec_d = Math.floor(x) - (60 * i);
						sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
					}
				}
			} else {
				sec_d = (isNaN(duration) === true) ? '0' :
					Math.floor(x);
				sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
			}
		}

		// define seconds duration
		get_sec_d(duration);

		// change duration DOM
		durTime = min_d + ':' + sec_d;

	};

	// Time/song update
	audio.addEventListener('timeupdate', updateProgress);

	// Song ends
	audio.addEventListener('ended', nextSong);

	// Time of song
	audio.addEventListener('timeupdate', DurTime);

	// console.log(progressWidth)

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

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div
					className="ml-2 mr-2"
					style={{
						borderTopLeftRadius: "10px",
						borderTopRightRadius: "10px",
						borderBottomRightRadius: "10px",
						borderBottomLeftRadius: "10px",
						overflow: "hidden"
					}}>
					<center>
						<Img src={coverSrc} alt="music-cover" />
					</center>
				</div>

				{/* <!-- Progress Container --> */}
				<div
					className="progress m-2 mt-4 mb-3"
					style={{ height: "5px" }}>
					<div
						className="progress-bar"
						style={{
							background: "#232323",
							width: `${progressWidth}`,
							height: "5px"
						}}>
					</div>
				</div>

				<div className="d-flex justify-content-center">
					<div className="p-2">
						<button
							className="mysonar-btn"
							style={{ color: "#232323" }}
							onClick={prevSong}>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-skip-backward"
								viewBox="0 0 16 16">
								<path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
							</svg>
						</button>
					</div>
					<div className="p-2">
						<button
							className="mysonar-btn"
							onClick={playBtn ? pauseSong : playSong}>
							{playBtn ?
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-pause"
									viewBox="0 0 16 16">
									<path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
								</svg> :
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-play"
									viewBox="0 0 16 16">
									<path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
								</svg>
							}
						</button>
					</div>
					<div className="p-2">
						<button
							className="mysonar-btn"
							style={{ color: "#232323" }}
							onClick={nextSong}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-skip-forward"
								viewBox="0 0 16 16">
								<path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" />
							</svg>
						</button>
					</div>
				</div>
				<h4>{title}</h4>

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
						<small>Album</small> <span>{showAudio.album}</span><br />
						<small>Genre</small> <span>{showAudio.genre}</span><br />
						<small>Posted</small> <span>
							{new Date(showAudio.created_at).getDay()}
							{" " + months[new Date(showAudio.created_at).getMonth()]}
							{" " + new Date(showAudio.created_at).getFullYear()}
						</span>
					</div>

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
					<div className="p-2">
						<a href={`whatsapp://send?text=https://music.black.co.ke/audio-show/${show}`}>
							<svg className='bi bi-reply' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'>
								<path fillRule='evenodd'
									d='M9.502 5.013a.144.144 0 0 0-.202.134V6.3a.5.5 0 0 1-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 0 1 1.921-.306 7.403 7.403 0 0 1 .798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 0 1 .45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 0 1 .042-.028.147.147 0 0 0 0-.252.494.494 0 0 1-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 0 0-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 0 1-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.667z' />
							</svg>
							<b> SHARE</b>
						</a>
					</div>
				</div>
				{/* Audio Area End */}

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

				{/* Artist Area */}
				<div className="p-2 border-bottom">
					<div className='media'>
						<div className='media-left'>
							<Link to={`/profile/${showArtist.username}`}>
								<Img src={"/storage/" + showArtist.pp} width={"40px"} height={"40px"} />
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
								<small>{showArtist.name} {showArtist.username}</small>
							</h6>
							<span style={{
								color: "gold",
								paddingTop: "10px"
							}}
								className='fa fa-circle-o'>
							</span>
							<small>{props.decos.filter((deco) => deco.username == showArtist.username).length}</small>
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
					{props.boughtAudios.find((boughtAudio) => {
						return boughtAudio.username == props.auth.username &&
							boughtAudio.artist == showArtist.username &&
							boughtAudio.audio_id == show ||
							props.auth.username == "@blackmusic"
					}) && <div className='media p-2 border-bottom'>
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
					{props.audioComments
						.filter((comment) => comment.audio_id == show)
						.map((comment, index) => (
							<div key={index} className='media p-2 border-bottom'>
								<div className='media-left'>
									<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
										<Link to={`/home/${comment.username}`}>
											<Img src={`/storage/${props.users.find((user) => user.username == comment.username).pp}`}
												width="40px" height="40px" />
										</Link>
									</div>
								</div>
								<div className='media-body'>
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
										</span>
										<span style={{ fontSize: "10px" }}> {props.decos.filter((deco) => {
											return deco.username == comment.username
										}).length}</span>
										<small>
											<i className="float-right mr-1">{new Date(comment.created_at).toDateString()}</i>
										</small>
									</h6>
									<p className="mb-0">{comment.text}</p>

									{/* Comment likes */}
									{props.audioCommentLikes.find((commentLike) => {
										return commentLike.comment_id == comment.id &&
											commentLike.username == props.auth.username
									}) ? <a href="#" style={{ color: "#cc3300" }} onClick={(e) => {
										e.preventDefault()
										onCommentLike(comment.id)
									}}>
										<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
											className='bi bi-heart-fill' viewBox='0 0 16 16'>
											<path fillRule='evenodd'
												d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
										</svg>
									</a>
										: <a href='#' onClick={(e) => {
											e.preventDefault()
											onCommentLike(comment.id)
										}}>
											<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
												className='bi bi-heart' viewBox='0 0 16 16'>
												<path
													d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
											</svg>
										</a>}
									<small> {props.audioCommentLikes.filter((commentLike) => commentLike.comment_id == comment.id).length}
									</small>

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
						))
					}
				</div>
			</div>
			{/* <!-- End of Comment Section --> */}
			<div className="col-sm-4"></div>
		</div>
	)
}

export default AudioShow
