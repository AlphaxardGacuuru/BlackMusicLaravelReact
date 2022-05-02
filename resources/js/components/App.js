import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
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
import DownloadApp from '../pages/DownloadApp';

import Profile from '../pages/Profile'
import ProfileEdit from '../pages/ProfileEdit'
import PostCreate from '../pages/PostCreate'
import PostShow from '../pages/PostShow'
import PostEdit from '../pages/PostEdit'

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
import Chat from '../pages/Chat'
import ChatThread from '../pages/ChatThread'
import NewChat from '../pages/NewChat'

import NotFound from '../pages/NotFound'
import { random } from 'lodash';

function App() {

	// console.log(process.env.MIX_APP_URL)

	const url = window.location.href.match(/https/) ?
		'https://music.black.co.ke' :
		'http://localhost:3000'

	axios.defaults.baseURL = url

	// Function for checking local storage
	const getLocalStorage = (state) => {
		if (localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return []
		}
	}

	// Function to set local storage
	const setLocalStorage = (state, data) => {
		localStorage.setItem(state, JSON.stringify(data))
	}

	// Declare states
	const [login, setLogin] = useState()
	const [autoLoggedIn, setAutoLoggedIn] = useState()
	const [auth, setAuth] = useState(localStorage.getItem("auth") ?
		JSON.parse(localStorage.getItem("auth")) :
		{
			"name": "Guest",
			"username": "@guest",
			"pp": "/storage/profile-pics/male_avatar.png",
			"account_type": "normal"
		})
	const [message, setMessage] = useState('')
	const [errors, setErrors] = useState([])

	const [audioAlbums, setAudioAlbums] = useState(getLocalStorage("audioAlbums"))
	const [audios, setAudios] = useState(getLocalStorage("audios"))

	const [boughtAudios, setBoughtAudios] = useState(getLocalStorage("boughtAudios"))
	const [boughtVideos, setBoughtVideos] = useState(getLocalStorage("boughtVideos"))

	const [cartAudios, setCartAudios] = useState(getLocalStorage("cartAudios"))
	const [cartVideos, setCartVideos] = useState(getLocalStorage("cartVideos"))

	const [posts, setPosts] = useState(getLocalStorage("posts"))
	const [users, setUsers] = useState(getLocalStorage("users"))

	const [videoAlbums, setVideoAlbums] = useState(getLocalStorage("videoAlbums"))
	const [videos, setVideos] = useState(getLocalStorage("videos"))

	// Reset Messages and Errors to null after 3 seconds
	if (errors.length > 0 || message.length > 0) {
		setTimeout(() => setErrors([]), 3000);
		setTimeout(() => setMessage(''), 3000);
	}

	// Fetch data on page load
	useEffect(() => {
		// Fetch Auth
		axios.get(`/api/home`)
			.then((res) => {
				// Check if login expired
				if (!res.data && localStorage.getItem("auth")) {
					// Autologin if user has already registered
					axios.get('/sanctum/csrf-cookie').then(() => {
						axios.post(`/api/login`, {
							phone: getLocalStorage("auth").phone,
							password: getLocalStorage("auth").phone,
							remember: 'checked'
						})
					})
					// Trigger Fetch
					setAutoLoggedIn(true)
				} else {
					if (res.data) {
						setAuth(res.data)
						setLocalStorage("auth", res.data)
					}

					// Fetch Audio Albums
					axios.get(`/api/audio-albums`)
						.then((res) => {
							setAudioAlbums(res.data)
							setLocalStorage("audioAlbums", res.data)
						}).catch(() => setErrors(["Failed to fetch audio albums"]))

					// Fetch Audios
					axios.get(`/api/audios`)
						.then((res) => {
							setAudios(res.data)
							setLocalStorage("audios", res.data)
						}).catch(() => setErrors(["Failed to fetch audios"]))

					// Fetch Bought Audios
					axios.get(`/api/bought-audios`)
						.then((res) => {
							setBoughtAudios(res.data)
							setLocalStorage("boughtAudios", res.data)
						}).catch(() => setErrors(['Failed to fetch bought audios']))

					// Fetch Bought Videos
					axios.get(`/api/bought-videos`)
						.then((res) => {
							setBoughtVideos(res.data)
							setLocalStorage("boughtVideos", res.data)
						}).catch(() => setErrors(['Failed to fetch bought videos']))

					// Fetch Cart Audios
					axios.get(`/api/cart-audios`)
						.then((res) => {
							setCartAudios(res.data)
							setLocalStorage("cartAudios", res.data)
						}).catch(() => setErrors(['Failed to fetch cart audios']))

					// Fetch Cart Videos
					axios.get(`/api/cart-videos`)
						.then((res) => {
							setCartVideos(res.data)
							setLocalStorage("cartVideos", res.data)
						}).catch(() => setErrors(['Failed to fetch cart videos']))

					//Fetch Posts
					axios.get(`/api/posts`)
						.then((res) => {
							setPosts(res.data)
							setLocalStorage("posts", res.data)
						}).catch(() => setErrors(['Failed to fetch posts']))

					//Fetch Users
					axios.get(`/api/users`)
						.then((res) => {
							setUsers(res.data)
							setLocalStorage("users", res.data)
						}).catch(() => setErrors(['Failed to fetch users']))

					// Fetch Video Albums
					axios.get(`/api/video-albums`)
						.then((res) => {
							setVideoAlbums(res.data)
							setLocalStorage("videoAlbums", res.data)
						}).catch(() => setErrors(["Failed to fetch video albums"]))

					// Fetch Videos
					axios.get(`/api/videos`)
						.then((res) => {
							setVideos(res.data)
							setLocalStorage("videos", res.data)
						}).catch(() => setErrors(["Failed to fetch videos"]))
				}
			}).catch(() => setErrors(["Failed to fetch auth"]))

		console.log("effect rendered")

	}, [autoLoggedIn])

	console.log("rendered")

	// Function for following users
	const onFollow = (musician) => {
		// Change follow button
		const newUsers = users
			.filter((item) => {
				// Get the exact user and change follow button
				if (item.username == musician) {
					item.hasFollowed = !item.hasFollowed
				}
				return true
			})
		// Set new Users
		setUsers(newUsers)

		// Add follow
		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`/api/follows`, {
				musician: musician
			}).then((res) => {
				setMessage(res.data)
				// Update users
				axios.get(`/api/users`)
					.then((res) => {
						setUsers(res.data)
						setLocalStorage("users", res.data)
					})
				// Update posts
				axios.get(`/api/posts`)
					.then((res) => {
						setPosts(res.data)
						setLocalStorage("posts", res.data)
					})
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
		// Change cart button
		const newVideos = videos
			.filter((item) => {
				// Get the exact video and change cart button
				if (item.id == video) {
					item.inCart = !item.inCart
				}
				return true
			})
		// Set new Videos
		setVideos(newVideos)

		// Change delete from cart button for cart videos
		const newCartVideos = cartVideos
			.filter((item) => {
				// Get the exact video
				if (item.video_id == video) {
					return false
				} else {
					return true
				}
			})
		// Set new Cart Videos
		setCartVideos(newCartVideos)

		// Add Video to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`/api/cart-videos`, {
				video: video
			}).then((res) => {
				setMessage(res.data)
				// Update Videos
				axios.get(`/api/videos`)
					.then((res) => {
						setVideos(res.data)
						setLocalStorage("videos", res.data)
					})
				// Update Cart Videos
				axios.get(`/api/cart-videos`)
					.then((res) => {
						setCartVideos(res.data)
						setLocalStorage("cartVideos", res.data)
					})
				// Update Video Albums
				axios.get(`/api/video-albums`)
					.then((res) => {
						setVideoAlbums(res.data)
						setLocalStorage("videoAlbums", res.data)
					})
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

	// Function for adding audio to cart
	const onCartAudios = (audio) => {
		// Change cart button
		const newAudios = audios
			.filter((item) => {
				// Get the exact audio and change cart button
				if (item.id == audio) {
					item.inCart = !item.inCart
				}
				return true
			})
		// Set new Audios
		setAudios(newAudios)

		// Change delete from cart button for cart audios
		const newCartAudios = cartAudios
			.filter((item) => {
				// Get the exact audio
				if (item.audio_id == audio) {
					return false
				} else {
					return true
				}
			})
		// Set new Cart Audios
		setCartAudios(newCartAudios)

		// Add Audio to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`/api/cart-audios`, {
				audio: audio
			}).then((res) => {
				setMessage(res.data)
				// Update Audios
				axios.get(`/api/audios`)
					.then((res) => {
						setAudios(res.data)
						setLocalStorage("audios", res.data)
					})
				// Update Cart Audios
				axios.get(`/api/cart-audios`)
					.then((res) => {
						setCartAudios(res.data)
						setLocalStorage("cartAudios", res.data)
					})
				// Update Audio Albums
				axios.get(`/api/audio-albums`)
					.then((res) => {
						setAudioAlbums(res.data)
						setLocalStorage("audioAlbums", res.data)
					})
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

	var showId

	if (localStorage.getItem("show")) {
		showId = JSON.parse(localStorage.getItem("show")).id
	} else {
		showId = ""
	}

	/*
	* Audio Player */
	const [show, setShow] = useState(showId)
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

		if (playPromise != undefined) {
			playPromise.then(() => {
				// Automatic playback started!
				// Show playing UI.
				setPlayBtn(true)
				setAudioLoader(false)
				audio.current.currentTime = getLocalStorage("show").time
			}).catch((error) => {
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
		.map((boughtAudio) => (songs.push(boughtAudio.audio_id)))

	// Keep track of song
	// let songIndex = songs.indexOf(show.toString())
	let songIndex = songs.indexOf(show)

	const fmtMSS = (s) => { return (s - (s %= 60)) / 60 + (10 < s ? ':' : ':0') + ~~(s) }

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
		if (!showAudio.hasBoughtAudio && showAudio.username != auth.username) {
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
			artwork: [{ src: `/storage/${showAudio.thumbnail}`, sizes: '512x512', type: 'image/png' }]
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

	// Social Input states
	const [id, setId] = useState()
	const [to, setTo] = useState()
	const [placeholder, setPlaceholder] = useState()
	const [text, setText] = useState("")
	const [media, setMedia] = useState("")
	const [para1, setPara1] = useState("")
	const [para2, setPara2] = useState("")
	const [para3, setPara3] = useState("")
	const [para4, setPara4] = useState("")
	const [para5, setPara5] = useState("")
	const [urlTo, setUrlTo] = useState()
	const [urlToTwo, setUrlToTwo] = useState()
	const [urlToDelete, setUrlToDelete] = useState()
	const [stateToUpdate, setStateToUpdate] = useState()
	const [stateToUpdateTwo, setStateToUpdateTwo] = useState()
	const [showImage, setShowImage] = useState()
	const [showPoll, setShowPoll] = useState()
	const [showMentionPicker, setShowMentionPicker] = useState(false)
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [showImagePicker, setShowImagePicker] = useState(false)
	const [showPollPicker, setShowPollPicker] = useState(false)
	const [editing, setEditing] = useState(false)

	// Declare new FormData object for form data
	const formData = new FormData();

	// Handle form submit for Social Input
	const onSubmit = (e) => {
		e.preventDefault()
		
		// Add form data to FormData object
		formData.append("text", text);
		id && formData.append("id", id);
		to && formData.append("to", to);
		media && formData.append("media", media);
		para1 && formData.append("para1", para1);
		para2 && formData.append("para2", para2);
		para3 && formData.append("para3", para3);
		para4 && formData.append("para4", para4);
		para5 && formData.append("para5", para5);
		editing && formData.append("_method", "put");

		// Send data to HelpPostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`/api${urlTo}`, formData)
				.then((res) => {
					setMessage(res.data)
					// Updated State One
					axios.get(`/api${urlTo}`)
						.then((res) => stateToUpdate(res.data))
					// Updated State Two
					axios.get(`/api${urlToTwo}`)
						.then((res) => stateToUpdateTwo && stateToUpdateTwo(res.data))
					// Clear text unless editing
					!editing && setText("")
					setShowMentionPicker(false)
					setShowEmojiPicker(false)
					setShowImagePicker(false)
					setShowPollPicker(false)
				}).catch((err) => {
					const resErrors = err.response.data.errors

					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					// Show error message
					// newError.push(err.response.data.message)
					setErrors(newError)
				})
		})
	}

	/*
	*
	* Register service worker */
	if (window.location.href.match(/https/)) {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('/sw.js')
				// .then((reg) => console.log('Service worker registered', reg))
				// .catch((err) => console.log('Service worker not registered', err));
			})
		}
	}

	// Show the notification
	function displayNotification() {
		if (Notification.permission == 'granted') {
			navigator.serviceWorker.getRegistration()
				.then((reg) => {
					var options = {
						body: 'Here is a notification body',
						actions: [
							{
								action: 'explore',
								title: 'Go to the site',
								icon: 'storage/img/musical-note.png'
							},
							{
								action: 'close',
								title: 'No thank you',
								icon: 'storage/img/musical-note.png'
							}
						],
						icon: 'storage/img/musical-note.png',
						vibrate: [100, 50, 100],
						// Allows us to identify notification
						data: { primaryKey: 1 }
					}
					reg.showNotification('Hello world', options)
				})
		}
	}

	// Subscribe to push service
	function subscribeToPush() {
		navigator.serviceWorker.getRegistration()
			.then((reg) => {
				reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: process.env.MIX_VAPID_PUBLIC_KEY
				}).then((sub) => {
					// send sub.toJSON() to server
					const parsed = JSON.parse(JSON.stringify(sub))

					axios.get('sanctum/csrf-cookie').then(() => {
						axios.post(`/api/push`, {
							endpoint: parsed.endpoint,
							auth: parsed.keys.auth,
							p256dh: parsed.keys.p256dh,
						}).then((res) => {
							setMessage(res.data)
						}).catch((err) => {
							const resErrors = err.response.data.errors
							var resError
							var newError = []
							for (resError in resErrors) {
								newError.push(resErrors[resError])
							}
							setErrors(newError)
							console.log(err.response.data.message)
						})
					});
				})
			})
	}

	function sendPush() {
		axios.get('/api/push/create')
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err.response.data))
	}

	// All states
	const GLOBAL_STATE = {
		getLocalStorage, setLocalStorage,
		login, setLogin,
		url,
		auth, setAuth,
		message, setMessage,
		errors, setErrors,
		audioAlbums, setAudioAlbums,
		audios, setAudios,
		boughtAudios, setBoughtAudios,
		boughtVideos, setBoughtVideos,
		cartAudios, setCartAudios,
		cartVideos, setCartVideos,
		posts, setPosts,
		users, setUsers,
		videoAlbums, setVideoAlbums,
		videos, setVideos,
		search, setSearch,
		users, setUsers,
		videoAlbums, setVideoAlbums,
		videos, setVideos,
		onFollow,
		onCartVideos,
		onCartAudios,
		displayNotification,
		subscribeToPush,
		sendPush,
		// Search 
		onSearchIconClick,
		searchInput,
		// Audio Player
		showAudio,
		showArtist,
		show, setShow,
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
		playSong,
		pauseSong,
		prevSong,
		nextSong,
		setProgress,
		progressPercent,
		onSetVolume,
		fmtMSS,
		audioLoader,
		// Social Input
		id, setId,
		to, setTo,
		text, setText,
		media, setMedia,
		para1, setPara1,
		para2, setPara2,
		para3, setPara3,
		para4, setPara4,
		para5, setPara5,
		placeholder, setPlaceholder,
		urlTo, setUrlTo,
		urlToTwo, setUrlToTwo,
		urlToDelete, setUrlToDelete,
		stateToUpdate, setStateToUpdate,
		stateToUpdateTwo, setStateToUpdateTwo,
		showImage, setShowImage,
		showPoll, setShowPoll,
		showMentionPicker, setShowMentionPicker,
		showEmojiPicker, setShowEmojiPicker,
		showImagePicker, setShowImagePicker,
		showPollPicker, setShowPollPicker,
		editing, setEditing,
		onSubmit,
	}

	const showLoginPopUp = auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />

	return (
		<>
			<Router>
				{login && <LoginPopUp {...GLOBAL_STATE} />}

				<TopNav {...GLOBAL_STATE} />
				<Route path="/download-app" exact render={(props) => (<DownloadApp {...GLOBAL_STATE} />)} />

				<Route path="/login" exact render={(props) => (<Login {...GLOBAL_STATE} />)} />
				<Route path="/register/:name/:email/:avatar" exact render={(props) => (<Register {...GLOBAL_STATE} />)} />
				<Route path="/referral/:referer" exact render={(props) => (<Referral {...GLOBAL_STATE} />)} />
				<Route path="/" exact render={(props) => (<Index {...GLOBAL_STATE} />)} />
				<Route path="/search" exact render={(props) => (
					<>
						<Search {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/cart" exact render={(props) => (
					<>
						<Cart {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/library" exact render={(props) => (
					<>
						<Library {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/profile/:username" exact render={(props) => (
					<>
						<Profile {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/profile-edit" exact render={(props) => (
					<>
						<ProfileEdit {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/post-create" exact render={(props) => (
					<>
						<PostCreate {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/post-show/:id" exact render={(props) => (
					<>
						<PostShow {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/post-edit/:id" exact render={(props) => (
					<>
						<PostEdit {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />

				{/* Video Routes */}
				<Route path="/video-charts" exact render={(props) => (<VideoCharts {...GLOBAL_STATE} />)} />
				<Route path="/video-show/:show/:referer?" exact render={(props) => (<VideoShow {...GLOBAL_STATE} />)} />
				<Route path="/videos" exact render={(props) => (
					<>
						<Videos {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/video-create" exact render={(props) => (
					<>
						<VideoCreate {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/video-edit/:id" exact render={(props) => (
					<>
						<VideoEdit {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/video-album-create" exact render={(props) => (
					<>
						<VideoAlbumCreate {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/video-album-edit/:id" exact render={(props) => (
					<>
						<VideoAlbumEdit {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />

				{/* Audio Routes */}
				<Route path="/audio-charts" exact render={(props) => (<AudioCharts {...GLOBAL_STATE} />)} />
				<Route path="/audio-show/:show/:referer?" exact render={(props) => (<AudioShow {...GLOBAL_STATE} />)} />
				<Route path="/audios" exact render={(props) => (
					<>
						<Audios {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/audio-create" exact render={(props) => (
					<>
						<AudioCreate {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/audio-edit/:id" exact render={(props) => (
					<>
						<AudioEdit {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/audio-album-create" exact render={(props) => (
					<>
						<AudioAlbumCreate {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/audio-album-edit/:id" exact render={(props) => (
					<>
						<AudioAlbumEdit {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/admin" exact render={(props) => (
					<>
						<Admin {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/settings" exact render={(props) => (
					<>
						<Settings {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/chat" exact render={(props) => (
					<>
						<Chat {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/chat/:username" exact render={(props) => (
					<>
						<ChatThread {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />
				<Route path="/new-chat" exact render={(props) => (
					<>
						<NewChat {...GLOBAL_STATE} />
						{showLoginPopUp}
					</>
				)} />

				<Messages {...GLOBAL_STATE} />
				<BottomNav {...GLOBAL_STATE} />
			</Router>

			<audio
				onTimeUpdate={(e) => {
					updateProgress()
					setCurrentTime(e.target.currentTime)
					setLocalStorage("show", {
						"id": show,
						"time": e.target.currentTime
					})
				}}
				onCanPlay={(e) => setDur(e.target.duration)}
				ref={audio}
				type="audio/*"
				preload='true'
				// autoPlay={true}
				src={`/storage/${showAudio.audio}`} />
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