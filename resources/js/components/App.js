import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';

import Messages from './Messages'
import TopNav from './TopNav'
import BottomNav from './BottomNav'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Index from '../pages/Index'
import Search from '../pages/Search'
import Cart from '../pages/Cart'
import Library from '../pages/Library'

import Profile from '../pages/Profile'
import ProfileEdit from '../pages/ProfileEdit'
import PostCreate from '../pages/PostCreate'
import PostShow from '../pages/PostShow'

import VideoCharts from '../pages/VideoCharts'
import VideoShow from '../pages/VideoShow'
import Videos from '../pages/Videos'
import VideoCreate from '../pages/VideoCreate'
import VideoEdit from '../pages/VideoEdit'
import VideoAlbumCreate from '../pages/VideoAlbumCreate'
import VideoAlbumEdit from '../pages/VideoAlbumEdit'

import AudioCharts from '../pages/AudioCharts'
import AudioShow from '../pages/AudioShow'
import Audios from '../pages/Audios'
import AudioCreate from '../pages/AudioCreate'
import AudioEdit from '../pages/AudioEdit'
import AudioAlbumCreate from '../pages/AudioAlbumCreate'
import AudioAlbumEdit from '../pages/AudioAlbumEdit'

import Admin from '../pages/Admin'

function App() {
	// Declare states
	const [url, setUrl] = useState(window.location.href.match(/https/) ?
		'https://test.black.co.ke' :
		'http://localhost:3000')
	const [auth, setAuth] = useState({
		"name": "Guest",
		"username": "@guest",
		"pp": "profile-pics/male_avatar.png",
		"account_type": "normal"
	})
	const [message, setMessage] = useState('')
	const [errors, setErrors] = useState([])
	const [users, setUsers] = useState([{
		"id": 1,
		"name": "Marvin Unruly",
		"username": "@unruly",
		"email": "mmwanzi76@gmail.com",
		"email_verified_at": null,
		"phone": "0",
		"gender": "male",
		"account_type": "normal",
		"account_type_2": "",
		"pp": "profile-pics/male_avatar.png",
		"pb": "img/male_avatar.png",
		"bio": "Limitless",
		"dob": "",
		"location": null,
		"withdrawal": "",
		"created_at": "-000001-11-30T00:00:00.000000Z",
		"updated_at": "2020-10-22T20:07:37.000000Z"
	}])
	const [posts, setPosts] = useState([])
	const [postLikes, setPostLikes] = useState([])
	const [postComments, setPostComments] = useState([])
	const [postCommentLikes, setPostCommentLikes] = useState([])
	const [polls, setPolls] = useState([])
	const [videos, setVideos] = useState([{
		"id": 91,
		"video": "https://www.youtube.com/embed/EdKKYry-FwQ",
		"name": "Kenyan Shrap Gang Type Beat Supreme",
		"username": "@sammyking",
		"ft": "",
		"album": "",
		"genre": "Hiphop",
		"thumbnail": "https://img.youtube.com/vi/EdKKYry-FwQ/hqdefault.jpg",
		"description": "",
		"released": null,
		"created_at": "2020-05-08T12:41:00.000000Z",
		"updated_at": "2021-03-15T17:43:59.000000Z"
	}])
	const [videoLikes, setVideoLikes] = useState([])
	const [videoComments, setVideoComments] = useState([])
	const [videoCommentLikes, setVideoCommentLikes] = useState([])
	const [cartAudios, setCartAudios] = useState([])
	const [cartVideos, setCartVideos] = useState([])
	const [boughtAudios, setBoughtAudios] = useState([])
	const [boughtVideos, setBoughtVideos] = useState([])
	const [videoAlbums, setVideoAlbums] = useState([])
	const [videoPayouts, setVideoPayouts] = useState([])
	const [audios, setAudios] = useState([{
		"id": 15,
		"audio": "audios/TDX5401snYHLg0ODYlG9ODVC1PsEYMhsnC5748JX.mp3",
		"name": "Audio 1",
		"username": "@blackmusic",
		"ft": "",
		"album": "6",
		"genre": "Hiphop",
		"thumbnail": "audio-thumbnails/qkKbj8XDU8c72J2rkUi06vkaTlYxLiMzTb0HpQuE.jpg",
		"description": "Audio 1",
		"released": "2021-08-13",
		"created_at": "2021-08-14T21:23:39.000000Z",
		"updated_at": "2021-08-14T21:23:39.000000Z"
	}])
	const [audioLikes, setAudioLikes] = useState([])
	const [audioAlbums, setAudioAlbums] = useState([])
	const [audioComments, setAudioComments] = useState([])
	const [audioCommentLikes, setAudioCommentLikes] = useState([])
	const [decos, setDecos] = useState([])
	const [follows, setFollows] = useState([])
	const [sms, setSMS] = useState([])
	const [kopokopo, setKopokopo] = useState([])

	// Reset Messages and Errors to null after 3 seconds
	if (errors.length > 0 || message.length > 0) {
		setTimeout(() => setErrors([]), 3000);
		setTimeout(() => setMessage(''), 3000);
	}

	// Fetch data on page load
	useEffect(() => {
		// For Auth
		const getAuth = async () => {
			const authFromServer = await fetchAuth()
			setAuth(authFromServer)
		}
		getAuth()

		// Fetch Audio Albums
		axios.get(`${url}/api/audio-albums`)
			.then((res) => setAudioAlbums(res.data))
			.catch(() => setErrors(["Failed to fetch audio albums"]))

		// Fetch Audio Comments Likes
		axios.get(`${url}/api/audio-comment-likes`)
			.then((res) => setAudioCommentLikes(res.data))
			.catch(() => setErrors(['Failed to fetch audio comment likes']))

		// Fetch Audio Comments
		axios.get(`${url}/api/audio-comments`)
			.then((res) => setAudioComments(res.data))
			.catch(() => setErrors(["Failed to fetch audio comments"]))

		// Fetch Audio Likes
		axios.get(`${url}/api/audio-likes`)
			.then((res) => setAudioLikes(res.data))
			.catch(() => setErrors(["Failed to fetch audio likes"]))

		// Fetch Audios
		axios.get(`${url}/api/audios`)
			.then((res) => setAudios(res.data))
			.catch(() => setErrors(["Failed to fetch audios"]))

		// Fetch Bought Audios
		axios.get(`${url}/api/bought-audios`)
			.then((res) => setBoughtAudios(res.data))
			.catch(() => setErrors(["Failed to fetch bought audios"]))

		// Fetch Bought Videos
		axios.get(`${url}/api/bought-videos`)
			.then((res) => setBoughtVideos(res.data))
			.catch(() => setErrors(['Failed to fetch bought videos']))

		// Fetch Cart Audios
		axios.get(`${url}/api/cart-audios`)
			.then((res) => setCartAudios(res.data))
			.catch(() => setErrors(['Failed to fetch cart audios']))

		// Fetch Cart Videos
		axios.get(`${url}/api/cart-videos`)
			.then((res) => setCartVideos(res.data))
			.catch(() => setErrors(['Failed to fetch cart videos']))

		// Fetch Decos
		axios.get(`${url}/api/decos`)
			.then((res) => setDecos(res.data))
			.catch(() => setErrors(['Failed to fetch decos']))

		// Fetch Follows
		axios.get(`${url}/api/follows`)
			.then((res) => setFollows(res.data))
			.catch(() => setErrors(['Failed to fetch follows']))

		// Fetch Kopokopo
		// axios.get(`${url}/api/kopokopo`)
		// 	.then((res) => setKopokopo(res.data))
		// 	.catch(() => setErrors(['Failed to fetch kopokopo']))

		// Fetch Polls
		axios.get(`${url}/api/polls`)
			.then((res) => setPolls(res.data))
			.catch(() => setErrors(['Failed to fetch polls']))

		// Fetch Post Comment likes
		axios.get(`${url}/api/post-comment-likes`)
			.then((res) => setPostCommentLikes(res.data))
			.catch(() => setErrors(['Failed to fetch post comment likes']))

		// Fetch Post Comments
		axios.get(`${url}/api/post-comments`)
			.then((res) => setPostComments(res.data))
			.catch(() => setErrors(['Failed to fetch post comments']))

		// Fetch Post Likes
		axios.get(`${url}/api/post-likes`)
			.then((res) => setPostLikes(res.data))
			.catch(() => setErrors(['Failed to fetch post likes']))

		//Fetch Posts
		axios.get(`${url}/api/posts`)
			.then((res) => setPosts(res.data))
			.catch(() => setErrors(['Failed to fetch posts']))

		//Fetch SMS
		axios.get(`${url}/api/sms`)
			.then((res) => setSMS(res.data))
			.catch(() => setErrors(['Failed to fetch SMSs']))

		//Fetch Users
		axios.get(`${url}/api/users`)
			.then((res) => setUsers(res.data))
			.catch(() => setErrors(['Failed to fetch users']))

		// Fetch Video Albums
		axios.get(`${url}/api/video-albums`)
			.then((res) => setVideoAlbums(res.data))
			.catch(() => setErrors(["Failed to fetch video albums"]))

		// Fetch Video Comments Likes
		axios.get(`${url}/api/video-comment-likes`)
			.then((res) => setVideoCommentLikes(res.data))
			.catch(() => setErrors(["Failed to fetch video comment likes"]))

		// Fetch Video Comments
		axios.get(`${url}/api/video-comments`)
			.then((res) => setVideoComments(res.data))
			.catch(() => setErrors(["Failed to fetch video comments"]))

		// Fetch Liked Videos
		axios.get(`${url}/api/video-likes`)
			.then((res) => setVideoLikes(res.data))
			.catch(() => setErrors(["Failed to fetch video likes"]))

		//Fetch Videos
		axios.get(`${url}/api/videos`)
			.then((res) => setVideos(res.data))
			.catch(() => setErrors(["Failed to fetch videos"]))

		// Fetch Video Payouts
		// axios.get(`${url}/api/video-payouts`)
		// 	.then((res) => setVideoPayouts(res.data))
		// 	.catch(() => setErrors(["Failed to fetch video payouts"]))

	}, [])

	//Fetch Auth
	const fetchAuth = async () => {
		const res = await fetch(`${url}/api/home`)
		const data = res.json()

		return data
	}

	/*
	* Audio Player */
	const [show, setShow] = useState(0)
	const [playBtn, setPlayBtn] = useState(true)
	const [shuffle, setShuffle] = useState(false)
	const [loop, setLoop] = useState(false)
	const [dur, setDur] = useState(0)
	const [volume, setVolume] = useState(0.3)
	const [currentTime, setCurrentTime] = useState(0)
	const [progressPercent, setProgressPercent] = useState()
	const [audioLoader, setAudioLoader] = useState(true)

	// Listen for show change and autoplay song
	useEffect(() => {
		var playPromise = audio.current.play();

		if (playPromise !== undefined) {
			playPromise.then(_ => {
				// Automatic playback started!
				// Show playing UI.
				setPlayBtn(true)
				setAudioLoader(false)
			})
				.catch(error => {
					// Auto-play was prevented
					// Show paused UI.
					setPlayBtn(false)
					setAudioLoader(true)
				});
		}
	}, [show])

	// Set Refs
	const audio = React.useRef(null)
	const audioProgress = React.useRef(null)
	const audioContainer = React.useRef()
	const volumeProgress = React.useRef()
	const volumeContainer = React.useRef()

	// Get audio to show
	if (audios.find((audio) => audio.id == show)) {
		var showAudio = audios.find((audio) => audio.id == show)
	} else {
		var showAudio = []
	}

	// Get artist of audio to show 
	if (users.find((user) => user.username == showAudio.username)) {
		var showArtist = users.find((user) => user.username == showAudio.username)
	} else {
		var showArtist = []
	}

	// Song titles
	var songs = [];

	// Add bought song ids to songs array
	boughtAudios
		.filter((boughtAudio) => boughtAudio.username == auth.username)
		.map((boughtAudio) => (songs.push(boughtAudio.audio_id)))

	// Keep track of song
	let songIndex = songs.indexOf(show.toString())

	const fmtMSS = (s) => { return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s) }

	var hasBought = false

	if (boughtAudios.some((boughtAudio) => {
		return boughtAudio.audio_id == showAudio.id &&
			boughtAudio.username == auth.username ||
			auth.username == "@blackmusic" ||
			auth.username == showAudio.username
	})) {
		hasBought = true
	}

	// Play song
	const playSong = () => {
		setPlayBtn(true)
		audio.current.play();
	}

	// Pause song
	const pauseSong = () => {
		setPlayBtn(false)
		audio.current.pause();
	}

	// Previous song
	const prevSong = () => {
		songIndex--;

		if (loop) {
			if (songIndex < 0) {
				songIndex = songs.length - 1;
			}
		} else {
			if (songIndex < 0) {
				songIndex = 0
			}
		}

		// Shuffle
		if (shuffle) {
			const max = songs.length - 1
			const min = 0
			songIndex = Math.floor(Math.random() * (max - min + 1)) + min;
		}

		setShow(songs[songIndex])
	}

	// Next song
	const nextSong = () => {
		songIndex++;

		// Loop
		if (loop) {
			if (songIndex > songs.length - 1) {
				songIndex = 0
			}
		} else {
			if (songIndex > songs.length - 1) {
				songIndex = songs.length - 1
			}
		}

		// Shuffle
		if (shuffle) {
			const max = songs.length - 1
			const min = 0
			songIndex = Math.floor(Math.random() * (max - min + 1)) + min;
		}

		setShow(songs[songIndex])
	}

	// Update audio progress bar
	function updateProgress() {
		const progress = (audio.current.currentTime / audio.current.duration) * 100;
		progress >= 0 && setProgressPercent(progress)
		// audioProgress.current.style.width = `${progressPercent}%`;

		{/* Pause at 10s if user has not bought the audio */ }
		if (!hasBought) {
			if (audio.current.currentTime >= 10) {
				pauseSong()
				setErrors([`Buy song to continue!`])
			}
		}
	}

	// Set audio progress bar
	function setProgress(e) {
		const width = audioContainer.current.clientWidth;
		const clickX = e.nativeEvent.offsetX
		var seekTo = (clickX / width) * audio.current.duration
		audio.current.currentTime = seekTo
	}

	// Set volume progress bar
	const onSetVolume = (e) => {
		const width = volumeContainer.current.clientWidth;
		const clickX = e.nativeEvent.offsetX
		audio.current.volume = clickX / width
		setVolume(clickX / width)
	}

	// Song ends
	// audio.current.addEventListener('ended', nextSong);

	// Search State
	const [search, setSearch] = useState("!@#$%^&")

	const searchInput = useRef(null)

	// Function to focus on search input
	const onSearchIconClick = () => {
		window.location.href.match("/search") && searchInput.current.focus()
	}

	//Register service worker
	// if ('serviceWorker' in navigator) {
	// 	window.addEventListener('load', () => {
	// 		navigator.serviceWorker.register('/sw.js')
	// 			.then((reg) => console.log('Service worker registered', reg))
	// 			.catch((err) => console.log('Service worker not registered', err));
	// 	})
	// }

	// // Install button
	// let deferredPrompt;
	// // Listen to the install prompt
	// window.addEventListener('beforeinstallprompt', (e) => {
	// 	deferredPrompt = e;
	// 	// Show the button
	// 	btnAdd.style.display = 'block';

	// 	// Action when button is clicked
	// 	btnAdd.addEventListener('click', (e) => {
	// 		// Show install banner
	// 		deferredPrompt.prompt();
	// 		// Check if the user accepted
	// 		// deferredPrompt.userChoice.then((choiceResult) => {
	// 		// 	if(choiceResult.outcome === 'accepted') {
	// 		// 		btnAdd.innerHTML = 'User accepted';
	// 		// 	}
	// 		// 	deferredPrompt = null;
	// 		// });

	// 		window.addEventListener('appinstalled', (evt) => {
	// 			btnAdd.innerHTML = 'Installed';
	// 		});
	// 	});
	// });

	return (
		<>
			<Router>
				{/* <div id="preloader">
					<div class="preload-content">
						<div id="sonar-load"></div>
					</div>
				</div> */}
				<TopNav {...{ url, auth, setMessage, setErrors, setAuth, cartVideos, cartAudios, search, setSearch }} />

				<Route path="/login" exact render={(props) => (
					<Login {...{ setMessage, setErrors, setAuth, url }} />
				)} />
				<Route path="/register/:name/:email/:avatar" exact render={(props) => (
					<Register {...{ setMessage, setErrors, setAuth, url, users, sms, setSMS }} />
				)} />


				<Route path="/" exact render={(props) => (
					<Index {...{ url, auth, setMessage, setErrors, users, videos, boughtVideos, cartVideos, setCartVideos, posts, setPosts, postLikes, setPostLikes, postComments, polls, setPolls, decos, follows, setFollows, setShow }} />
				)} />

				<Route path="/search" exact render={(props) => (
					<Search {...{ url, auth, setMessage, setErrors, search, setSearch, searchInput, users, videos, videoAlbums, audios, audioAlbums, cartVideos, setCartVideos, boughtVideos, cartAudios, setCartAudios, boughtAudios, hasBought, setShow }} />
				)} />

				<Route path="/cart" exact render={(props) => (
					<Cart {...{ url, auth, setMessage, setErrors, cartVideos, setCartVideos, setBoughtVideos, videos, cartAudios, setCartAudios, setBoughtAudios, audios, setShow }} />
				)} />

				<Route path="/library" exact render={(props) => (
					<Library {...{ auth, videos, boughtVideos, audios, boughtAudios, setShow }} />
				)} />


				<Route path="/profile/:username" exact render={(props) => (
					<Profile {...{ setMessage, setErrors, auth, setAuth, url, users, videos, boughtVideos, cartVideos, setCartVideos, videoAlbums, audios, boughtAudios, cartAudios, setCartAudios, audioAlbums, posts, setPosts, postLikes, setPostLikes, postComments, polls, setPolls, decos, follows, setFollows, setShow }} />
				)} />

				<Route path="/profile-edit" exact render={(props) => (
					<ProfileEdit {...{ setMessage, setErrors, auth, setAuth, url, users, decos }} />
				)} />

				<Route path="/post-create" exact render={(props) => (
					<PostCreate {...{ url, auth, setMessage, setErrors, setPosts }} />
				)} />

				<Route path="/post-show/:id" exact render={(props) => (
					<PostShow {...{ url, auth, setMessage, setErrors, users, postComments, setPostComments, postCommentLikes, setPostCommentLikes, decos }} />
				)} />

				{/* Video Routes */}
				<Route path="/video-charts" exact render={(props) => (
					<VideoCharts {...{ url, auth, setMessage, setErrors, users, videos, boughtVideos, cartVideos, setCartVideos, videoLikes, follows, setFollows, setShow }} />
				)} />

				<Route path="/video-show/:show" exact render={(props) => (
					<VideoShow {...{ url, auth, setMessage, setErrors, users, decos, videos, boughtVideos, cartVideos, setCartVideos, videoLikes, setVideoLikes, videoComments, setVideoComments, videoCommentLikes, setVideoCommentLikes, videoAlbums, follows, setFollows, setShow }} />
				)} />

				<Route path="/videos" exact render={(props) => (
					<Videos {...{ url, auth, setMessage, setErrors, users, setUsers, videos, boughtVideos, videoLikes, videoAlbums, setVideoAlbums, videoPayouts, setAudioAlbums }} />
				)} />

				<Route path="/video-create" exact render={(props) => (
					<VideoCreate {...{ url, auth, setMessage, setErrors, setVideos, videoAlbums }} />
				)} />

				<Route path="/video-edit/:id" exact render={(props) => (
					<VideoEdit {...{ url, auth, setMessage, setErrors, videos, setVideos, videoAlbums }} />
				)} />

				<Route path="/video-album-create" exact render={(props) => (
					<VideoAlbumCreate {...{ url, auth, setMessage, setErrors, setVideoAlbums }} />
				)} />

				<Route path="/video-album-edit/:id" exact render={(props) => (
					<VideoAlbumEdit {...{ url, auth, setMessage, setErrors, videoAlbums, setVideoAlbums }} />
				)} />


				{/* Audio Routes */}
				<Route path="/audio-charts" exact render={(props) => (
					<AudioCharts {...{ url, auth, setMessage, setErrors, users, audios, boughtAudios, cartAudios, setCartAudios, audioLikes, follows, setFollows, setShow }} />
				)} />

				<Route path="/audio-show/:show" exact render={(props) => (
					<AudioShow {...{ url, auth, setMessage, setErrors, users, decos, audios, boughtAudios, cartAudios, setCartAudios, audioLikes, setAudioLikes, audioComments, setAudioComments, audioCommentLikes, setAudioCommentLikes, audioAlbums, follows, setFollows, show, setShow, playBtn, setPlayBtn, shuffle, setShuffle, loop, setLoop, dur, setDur, volume, setVolume, currentTime, setCurrentTime, audio, audioProgress, audioContainer, volumeProgress, volumeContainer, songs, hasBought, playSong, pauseSong, prevSong, nextSong, setProgress, progressPercent, onSetVolume, fmtMSS, audioLoader }} />
				)} />

				<Route path="/audios" exact render={(props) => (
					<Audios {...{ url, auth, setMessage, setErrors, audios, setAudios, boughtAudios, audioLikes, audioAlbums, setAudioAlbums }} />
				)} />

				<Route path="/audio-create" exact render={(props) => (
					<AudioCreate {...{ url, auth, setMessage, setErrors, setAudios, audioAlbums }} />
				)} />

				<Route path="/audio-edit/:id" exact render={(props) => (
					<AudioEdit {...{ url, auth, setMessage, setErrors, audios, setAudios, audioAlbums }} />
				)} />

				<Route path="/audio-album-create" exact render={(props) => (
					<AudioAlbumCreate {...{ url, auth, setMessage, setErrors, setAudioAlbums }} />
				)} />

				<Route path="/audio-album-edit/:id" exact render={(props) => (
					<AudioAlbumEdit {...{ url, auth, setMessage, setErrors, audioAlbums, setAudioAlbums }} />
				)} />


				<Route path="/admin" exact render={(props) => (
					<Admin {...{ url, auth, setMessage, setErrors, users, decos, videos, boughtVideos, audios, boughtAudios }} />
				)} />

				<Messages {...{ message, errors }} />

				<BottomNav {...{ url, auth, setMessage, setErrors, setAuth, cartVideos, cartAudios, audios, audioProgress, audioContainer, progressPercent, show, setShow, playBtn, audio, songs, playSong, pauseSong, prevSong, nextSong, onSearchIconClick }} />
			</Router>

			<audio
				onTimeUpdate={(e) => {
					updateProgress()
					setCurrentTime(e.target.currentTime)
				}}
				onCanPlay={(e) => setDur(e.target.duration)}
				ref={audio}
				type="audio/*"
				preload='true'
				// autoPlay={true}
				src={`/storage/${audios.find((audio) => audio.id == show) &&
					audios.find((audio) => audio.id == show).audio}`} />
		</>
	);
}

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(
		<App />,
		document.getElementById('app')
	);
}
