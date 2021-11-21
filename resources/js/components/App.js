import React, { useState, useEffect, useRef, useContext, createContext } from 'react'
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Redirect, useHistory, useLocation, Switch } from 'react-router-dom'
import axios from 'axios';

import Messages from './Messages'
import TopNav from './TopNav'
import BottomNav from './BottomNav'

import LoginPopUp from '../auth/LoginPopUp'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Referral from '../auth/Referral'

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
import Settings from '../pages/Settings'

import NotFound from '../pages/NotFound'

function App() {

	// Declare states
	const [login, setLogin] = useState()
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

	const [audioAlbums, setAudioAlbums] = useState([])
	const [audioComments, setAudioComments] = useState([])
	const [audioPayouts, setAudioPayouts] = useState([])
	const [audios, setAudios] = useState([])

	const [boughtAudios, setBoughtAudios] = useState([])
	const [boughtVideos, setBoughtVideos] = useState([])

	const [cartAudios, setCartAudios] = useState([])
	const [cartVideos, setCartVideos] = useState([])

	const [notifications, setNotifications] = useState([])
	const [posts, setPosts] = useState([])
	const [postComments, setPostComments] = useState([])
	const [referrals, setReferrals] = useState([])
	const [sms, setSMS] = useState([])
	const [users, setUsers] = useState([])

	const [videoAlbums, setVideoAlbums] = useState([])
	const [videoComments, setVideoComments] = useState([])
	const [videoPayouts, setVideoPayouts] = useState([])
	const [videos, setVideos] = useState([])

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

		// Fetch Audio Comments
		axios.get(`${url}/api/audio-comments`)
			.then((res) => setAudioComments(res.data))
			.catch(() => setErrors(["Failed to fetch audio comments"]))

		// Fetch Audios
		axios.get(`${url}/api/audios`)
			.then((res) => setAudios(res.data))
			.catch(() => setErrors(["Failed to fetch audios"]))

		// Fetch Audio Payouts
		axios.get(`${url}/api/audio-payouts`)
			.then((res) => setAudioPayouts(res.data))
			.catch(() => setErrors(["Failed to fetch audio payouts"]))

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

		// Fetch Notifications
		axios.get(`${url}/api/notifications`)
			.then((res) => setNotifications(res.data))
			.catch(() => setErrors(['Failed to fetch notifications']))

		// Fetch Post Comments
		axios.get(`${url}/api/post-comments`)
			.then((res) => setPostComments(res.data))
			.catch(() => setErrors(['Failed to fetch post comments']))

		//Fetch Posts
		axios.get(`${url}/api/posts`)
			.then((res) => setPosts(res.data))
			.catch(() => setErrors(['Failed to fetch posts']))

		//Fetch Referrals
		axios.get(`${url}/api/referrals`)
			.then((res) => setReferrals(res.data))
			.catch(() => setErrors(['Failed to fetch referrals']))

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

		// Fetch Video Comments
		axios.get(`${url}/api/video-comments`)
			.then((res) => setVideoComments(res.data))
			.catch(() => setErrors(["Failed to fetch video comments"]))

		//Fetch Videos
		axios.get(`${url}/api/videos`)
			.then((res) => setVideos(res.data))
			.catch(() => setErrors(["Failed to fetch videos"]))

		// Fetch Video Payouts
		axios.get(`${url}/api/video-payouts`)
			.then((res) => setVideoPayouts(res.data))
			.catch(() => setErrors(["Failed to fetch video payouts"]))

	}, [])

	//Fetch Auth
	const fetchAuth = async () => {
		const res = await fetch(`${url}/api/home`)
		const data = res.json()

		return data
	}

	// Function for following users
	const onFollow = (musician) => {
		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`${url}/api/follows`, {
				musician: musician
			}).then((res) => {
				setMessage(res.data)
				// Update users
				axios.get(`${url}/api/users`)
					.then((res) => setUsers(res.data))
				// Update posts
				axios.get(`${url}/api/posts`)
					.then((res) => setPosts(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				setErrors(newError)
			})
		});
	}

	// Function for adding video to cart
	const onCartVideos = (video) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${url}/api/cart-videos`, {
				video: video
			}).then((res) => {
				setMessage(res.data)
				// Update Videos
				axios.get(`${url}/api/videos`)
					.then((res) => setVideos(res.data))
				// Update Cart Videos
				axios.get(`${url}/api/cart-videos`)
					.then((res) => setCartVideos(res.data))
				// Update Video Albums
				axios.get(`${url}/api/video-albums`)
					.then((res) => setVideoAlbums(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				// Get validation errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				setErrors(newError)
			})
		});
	}

	// Function for buying video to cart
	const onBuyVideos = (video) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${url}/api/cart-videos`, {
				video: video
			}).then((res) => {
				setMessage(res.data)
				// Update Videos
				axios.get(`${url}/api/videos`)
					.then((res) => setVideos(res.data))
				// Update Cart Videos
				axios.get(`${url}/api/cart-videos`)
					.then((res) => setCartVideos(res.data))
				// Update Video Albums
				axios.get(`${url}/api/video-albums`)
					.then((res) => setVideoAlbums(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				setErrors(newError)
			})
		});
	}

	// Function for adding audio to cart
	const onCartAudios = (audio) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${url}/api/cart-audios`, {
				audio: audio
			}).then((res) => {
				setMessage(res.data)
				// Update Audios
				axios.get(`${url}/api/audios`)
					.then((res) => setAudios(res.data))
				// Update Cart Audios
				axios.get(`${url}/api/cart-audios`)
					.then((res) => setCartAudios(res.data))
				// Update Audio Albums
				axios.get(`${url}/api/audio-albums`)
					.then((res) => setAudioAlbums(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				setErrors(newError)
			})
		});
	}

	// Function for buying audio to cart
	const onBuyAudios = (audio) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${url}/api/cart-audios`, {
				audio: audio
			}).then((res) => {
				setMessage(res.data)
				// Update audios
				axios.get(`${url}/api/audios`)
					.then((res) => setAudios(res.data))
				// Update Cart Audios
				axios.get(`${url}/api/cart-audios`)
					.then((res) => setCartAudios(res.data))
				// Update Audio Albums
				axios.get(`${url}/api/audio-albums`)
					.then((res) => setAudioAlbums(res.data))
				history.push('/cart')
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				setErrors(newError)
			})
		});
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

	var showAudio = []
	var showArtist = []

	// Get audio to show
	if (audios.find((audio) => audio.id == show)) {
		var showAudio = audios.find((audio) => audio.id == show)

		// Get artist of audio to show 
		if (users.find((user) => user.username == showAudio.username)) {
			var showArtist = users.find((user) => user.username == showAudio.username)
		}
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

	/*
	*
	* Media Session Controls */
	if ('mediaSession' in navigator) {

		navigator.mediaSession.metadata = new MediaMetadata({
			title: showAudio.name,
			artist: showArtist.username,
			album: showAudio.album,
			artwork: [{ src: `${url}/storage/${showAudio.thumbnail}`, sizes: '512x512', type: 'image/png' }]
		});

		let skipTime = 10; // Time to skip in seconds

		navigator.mediaSession.setActionHandler('play', playSong);
		navigator.mediaSession.setActionHandler('pause', pauseSong);
		navigator.mediaSession.setActionHandler('seekbackward', function () {
			// User clicked "Seek Backward" media notification icon.
			audio.current.currentTime = Math.max(audio.current.currentTime - skipTime, 0);
		});
		navigator.mediaSession.setActionHandler('seekforward', function () {
			// User clicked "Seek Forward" media notification icon.
			audio.current.currentTime = Math.min(audio.current.currentTime + skipTime, audio.current.duration);
		});
		navigator.mediaSession.setActionHandler('previoustrack', prevSong);
		navigator.mediaSession.setActionHandler('nexttrack', nextSong);
	}

	// Search State
	const [search, setSearch] = useState("!@#$%^&")

	const searchInput = useRef(null)

	// Function to focus on search input
	const onSearchIconClick = () => {
		window.location.href.match("/search") && searchInput.current.focus()
	}

	/*
	*
	* Register service worker */
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/sw.js')
			// .then((reg) => console.log('Service worker registered', reg))
			// .catch((err) => console.log('Service worker not registered', err));
		})
	}

	/*
	*
	* Notifications */

	// // Request permission for notifications
	// Notification.requestPermission(
	// 	function (status) {
	// 		// console.log('Notification permission status: ', status)
	// 	}
	// )

	// // Show the notification
	// function displayNotification() {
	// 	if (Notification.permission == 'granted') {
	// 		navigator.serviceWorker.getRegistration()
	// 			.then(function (reg) {

	// 				var options = {
	// 					body: 'Here is a notification body',
	// 					actions: [
	// 						{
	// 							action: 'explore',
	// 							title: 'Go to the site',
	// 							icon: 'storage/img/musical-note.png'
	// 						}, {
	// 							action: 'close',
	// 							title: 'No thank you',
	// 							icon: 'storage/img/musical-note.png'
	// 						}
	// 					],
	// 					icon: 'storage/img/musical-note.png',
	// 					vibrate: [100, 50, 100],
	// 					// Allows us to identify notification
	// 					data: { primaryKey: 1 }
	// 				}

	// 				reg.showNotification('Hello world', options)
	// 			})
	// 	}
	// }

	// // Close the notification
	// self.addEventListener('notificationclose', function (event) {
	// 	var notification = event.notification
	// 	var primaryKey = notificatio.data.primaryKey
	// 	console.log('Closed notification: ', primaryKey)
	// })

	// // Notification Click
	// self.addEventListener('notificationclick', function (event) {
	// 	var notification = event.notification
	// 	var action = event.action

	// 	if (action === 'close') {
	// 		notification.close()
	// 	} else {
	// 		clients.openWindow('https://music.black.co.ke')
	// 	}
	// })

	// // Check if user is subscribed to push notifications
	// navigator.serviceWorker.ready
	// 	.then(function (reg) {
	// 		reg.pushManager.getSubscription()
	// 			.then(function (sub) {
	// 				if (sub == 'undefined') {
	// 					// Ask user to register for push
	// 					console.log("Not")
	// 				} else {
	// 					// You have subscription update server
	// 					console.log("Not")
	// 				}
	// 			})
	// 	})

	// // Subscribe to push service
	// navigator.serviceWorker.getRegistration()
	// 	.then(function (reg) {
	// 		reg.pushManager.subscribe({
	// 			userVisibleOnly: true
	// 		}).then(function (sub) {
	// 			// send sub.toJSON() to server
	// 			console.log(sub)
	// 		})
	// 	})

	// All states
	const GLOBAL_STATE = {
		login, setLogin,
		url, setUrl,
		auth, setAuth,
		message, setMessage,
		errors, setErrors,
		audioAlbums, setAudioAlbums,
		audioComments, setAudioComments,
		audioPayouts, setAudioPayouts,
		audios, setAudios,
		boughtAudios, setBoughtAudios,
		boughtVideos, setBoughtVideos,
		cartAudios, setCartAudios,
		cartVideos, setCartVideos,
		notifications, setNotifications,
		posts, setPosts,
		postComments, setPostComments,
		referrals, setReferrals,
		search, setSearch,
		show, setShow,
		sms, setSMS,
		users, setUsers,
		videoAlbums, setVideoAlbums,
		videoComments, setVideoComments,
		videoPayouts, setVideoPayouts,
		videos, setVideos,
		onFollow,
		onCartVideos,
		onBuyVideos,
		onCartAudios,
		onBuyAudios,
		// Audio Player state
		playBtn, setPlayBtn, 
		shuffle, setShuffle, 
		loop, setLoop, 
		dur, setDur, 
		volume, setVolume, 
		currentTime, setCurrentTime, 
		audio, 
		audioProgress, 
		audioContainer, 
		volumeProgress, 
		volumeContainer, 
		songs, 
		hasBought, 
		playSong, 
		pauseSong, 
		prevSong, 
		nextSong, 
		setProgress, 
		progressPercent, 
		onSetVolume, 
		fmtMSS, 
		audioLoader,
	}

	return (
		<>
			<Router>
				{login && <LoginPopUp {...GLOBAL_STATE} />}

				<TopNav {...GLOBAL_STATE} />

				<Route path="/login" exact render={(props) => (<Login {...GLOBAL_STATE} />)} />

				<Route path="/register/:name/:email/:avatar" exact render={(props) => (<Register {...GLOBAL_STATE} />)} />

				<Route path="/referral/:referer" exact render={(props) => (<Referral {...GLOBAL_STATE} />)} />

				<Route path="/" exact render={(props) => (<Index {...GLOBAL_STATE} />)} />

				<Route path="/search" exact render={(props) => (
					<>
						<Search {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/cart" exact render={(props) => (
					<>
						<Cart {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/library" exact render={(props) => (
					<>
						<Library {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />


				<Route path="/profile/:username" exact render={(props) => (
					<>
						<Profile {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/profile-edit" exact render={(props) => (
					<>
						<ProfileEdit {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/post-create" exact render={(props) => (
					<>
						<PostCreate {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/post-show/:id" exact render={(props) => (
					<>
						<PostShow {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				{/* Video Routes */}
				<Route path="/video-charts" exact render={(props) => (<VideoCharts {...GLOBAL_STATE} />)} />

				<Route path="/video-show/:show/:referer?" exact render={(props) => (<VideoShow {...GLOBAL_STATE} />)} />

				<Route path="/videos" exact render={(props) => (
					<>
						<Videos {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/video-create" exact render={(props) => (
					<>
						<VideoCreate {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/video-edit/:id" exact render={(props) => (
					<>
						<VideoEdit {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/video-album-create" exact render={(props) => (
					<>
						<VideoAlbumCreate {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/video-album-edit/:id" exact render={(props) => (
					<>
						<VideoAlbumEdit {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />


				{/* Audio Routes */}
				<Route path="/audio-charts" exact render={(props) => (<AudioCharts {...GLOBAL_STATE} />)} />

				<Route path="/audio-show/:show/:referer?" exact render={(props) => (<AudioShow {...GLOBAL_STATE} />)} />

				<Route path="/audios" exact render={(props) => (
					<>
						<Audios {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/audio-create" exact render={(props) => (
					<>
						<AudioCreate {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/audio-edit/:id" exact render={(props) => (
					<>
						<AudioEdit {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/audio-album-create" exact render={(props) => (
					<>
						<AudioAlbumCreate {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/audio-album-edit/:id" exact render={(props) => (
					<>
						<AudioAlbumEdit {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />


				<Route path="/admin" exact render={(props) => (
					<>
						<Admin {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />


				<Route path="/settings" exact render={(props) => (
					<>
						<Settings {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Messages {...GLOBAL_STATE} />

				<BottomNav {...GLOBAL_STATE} />

				{/* <center>
					<button className="mysonar-btn" onClick={displayNotification}>notify</button>
				</center>
				<br />
				<br />
				<br />
				<br /> */}

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
