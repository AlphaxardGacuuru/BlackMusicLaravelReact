import React, { useState, useEffect, useRef, useContext, createContext } from 'react'
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios';

import Messages from './Messages'
import TopNav from './TopNav'
import BottomNav from './BottomNav'

import LoginPopUp from '../auth/LoginPopUp';
import Login from '../auth/Login'
import Register from '../auth/Register'

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
	const [users, setUsers] = useState([])
	const [posts, setPosts] = useState([])
	const [postLikes, setPostLikes] = useState([])
	const [postComments, setPostComments] = useState([])
	const [postCommentLikes, setPostCommentLikes] = useState([])
	const [polls, setPolls] = useState([])
	const [audios, setAudios] = useState([])
	const [audioAlbums, setAudioAlbums] = useState([])
	const [audioComments, setAudioComments] = useState([])
	const [audioCommentLikes, setAudioCommentLikes] = useState([])
	const [audioLikes, setAudioLikes] = useState([])
	const [audioNotifications, setAudioNotifications] = useState([])
	const [audioPayouts, setAudioPayouts] = useState([])
	const [boughtAudios, setBoughtAudios] = useState([])
	const [boughtVideos, setBoughtVideos] = useState([])
	const [decos, setDecos] = useState([])
	const [decoNotifications, setDecoNotifications] = useState([])
	const [follows, setFollows] = useState([])
	const [followNotifications, setFollowNotifications] = useState([])
	const [sms, setSMS] = useState([])
	const [kopokopo, setKopokopo] = useState([])
	const [kopokopoNotifications, setKopokopoNotifications] = useState([])
	const [notifications, setNotifications] = useState([])
	const [videos, setVideos] = useState([])
	const [videoComments, setVideoComments] = useState([])
	const [videoCommentLikes, setVideoCommentLikes] = useState([])
	const [videoLikes, setVideoLikes] = useState([])
	const [videoNotifications, setVideoNotifications] = useState([])
	const [cartAudios, setCartAudios] = useState([])
	const [cartVideos, setCartVideos] = useState([])
	const [videoAlbums, setVideoAlbums] = useState([])
	const [videoPayouts, setVideoPayouts] = useState([])

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

		// Fetch Audio Notifications
		axios.get(`${url}/api/audio-notifications`)
			.then((res) => setAudioNotifications(res.data))
			.catch(() => setErrors(["Failed to fetch audio notifications"]))

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

		// Fetch Decos
		axios.get(`${url}/api/decos`)
			.then((res) => setDecos(res.data))
			.catch(() => setErrors(['Failed to fetch decos']))

		// Fetch Decos Notifications
		axios.get(`${url}/api/deco-notifications`)
			.then((res) => setDecoNotifications(res.data))
			.catch(() => setErrors(['Failed to fetch decos notifications']))

		// Fetch Follows
		axios.get(`${url}/api/follows`)
			.then((res) => setFollows(res.data))
			.catch(() => setErrors(['Failed to fetch follows']))

		// Fetch Follows Notifications
		axios.get(`${url}/api/follow-notifications`)
			.then((res) => setFollowNotifications(res.data))
			.catch(() => setErrors(['Failed to fetch follow notifications']))

		// Fetch Kopokopo
		// axios.get(`${url}/api/kopokopo`)
		// 	.then((res) => setKopokopo(res.data))
		// 	.catch(() => setErrors(['Failed to fetch kopokopo']))

		// Fetch Kopokopo
		axios.get(`${url}/api/kopokopo-notifications`)
			.then((res) => setKopokopoNotifications(res.data))
			.catch(() => setErrors(['Failed to fetch kopokopo notifications']))

		// Fetch Notifications
		axios.get(`${url}/api/notifications`)
			.then((res) => setNotifications(res.data))
			.catch(() => setErrors(['Failed to fetch notifications']))

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

		// Fetch Video Notifications
		axios.get(`${url}/api/video-notifications`)
			.then((res) => setVideoNotifications(res.data))
			.catch(() => setErrors(["Failed to fetch video notifications"]))

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

	/*
	*
	* Media Session Controls */
	if ('mediaSession' in navigator) {

		navigator.mediaSession.metadata = new MediaMetadata({
			title: showAudio.name,
			artist: showArtist.username,
			album: showAudio.album,
			artwork: [
				{ src: showAudio.thumbnail, sizes: '512x512', type: 'image/png' },
			]
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

	return (
		<>
			<Router>
				{login && <LoginPopUp {...{ url }} />}

				<TopNav {...{ url, auth, setLogin, setMessage, setErrors, setAuth, cartVideos, cartAudios, search, setSearch, notifications, followNotifications, decoNotifications, videoNotifications, audioNotifications, kopokopoNotifications }} />

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
					<>
						<Search {...{ url, auth, setLogin, setMessage, setErrors, search, setSearch, searchInput, users, videos, videoAlbums, audios, audioAlbums, cartVideos, setCartVideos, boughtVideos, cartAudios, setCartAudios, boughtAudios, hasBought, setShow }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/cart" exact render={(props) => (
					<>
						<Cart {...{ url, auth, setMessage, setErrors, cartVideos, setCartVideos, setBoughtVideos, videos, cartAudios, setCartAudios, setBoughtAudios, audios, setShow }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/library" exact render={(props) => (
					<>
						<Library {...{ auth, videos, boughtVideos, audios, boughtAudios, setShow }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />


				<Route path="/profile/:username" exact render={(props) => (
					<>
						<Profile {...{ setMessage, setErrors, auth, setAuth, url, users, videos, boughtVideos, cartVideos, setCartVideos, videoAlbums, audios, boughtAudios, cartAudios, setCartAudios, audioAlbums, posts, setPosts, postLikes, setPostLikes, postComments, polls, setPolls, decos, follows, setFollows, setShow }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/profile-edit" exact render={(props) => (
					<>
						<ProfileEdit {...{ setMessage, setErrors, auth, setAuth, url, users, decos }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/post-create" exact render={(props) => (
					<>
						<PostCreate {...{ url, auth, setMessage, setErrors, setPosts }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/post-show/:id" exact render={(props) => (
					<>
						<PostShow {...{ url, auth, setMessage, setErrors, users, postComments, setPostComments, postCommentLikes, setPostCommentLikes, decos }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				{/* Video Routes */}
				<Route path="/video-charts" exact render={(props) => (
					<VideoCharts {...{ url, auth, setMessage, setErrors, users, videos, boughtVideos, cartVideos, setCartVideos, videoLikes, follows, setFollows, setShow }} />
				)} />

				<Route path="/video-show/:show" exact render={(props) => (
					<VideoShow {...{ url, auth, setMessage, setErrors, users, decos, videos, boughtVideos, cartVideos, setCartVideos, videoLikes, setVideoLikes, videoComments, setVideoComments, videoCommentLikes, setVideoCommentLikes, videoAlbums, follows, setFollows, setShow }} />
				)} />

				<Route path="/videos" exact render={(props) => (
					<>
						<Videos {...{ url, auth, setMessage, setErrors, users, setUsers, videos, boughtVideos, videoLikes, videoAlbums, setVideoAlbums, videoPayouts, setAudioAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/video-create" exact render={(props) => (
					<>
						<VideoCreate {...{ url, auth, setMessage, setErrors, setVideos, videoAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/video-edit/:id" exact render={(props) => (
					<>
						<VideoEdit {...{ url, auth, setMessage, setErrors, videos, setVideos, videoAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/video-album-create" exact render={(props) => (
					<>
						<VideoAlbumCreate {...{ url, auth, setMessage, setErrors, setVideoAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/video-album-edit/:id" exact render={(props) => (
					<>
						<VideoAlbumEdit {...{ url, auth, setMessage, setErrors, videoAlbums, setVideoAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />


				{/* Audio Routes */}
				<Route path="/audio-charts" exact render={(props) => (
					<AudioCharts {...{ url, auth, setMessage, setErrors, users, audios, boughtAudios, cartAudios, setCartAudios, audioLikes, follows, setFollows, setShow }} />
				)} />

				<Route path="/audio-show/:show" exact render={(props) => (
					<AudioShow {...{ url, auth, setMessage, setErrors, users, decos, audios, boughtAudios, cartAudios, setCartAudios, audioLikes, setAudioLikes, audioComments, setAudioComments, audioCommentLikes, setAudioCommentLikes, audioAlbums, follows, setFollows, show, setShow, playBtn, setPlayBtn, shuffle, setShuffle, loop, setLoop, dur, setDur, volume, setVolume, currentTime, setCurrentTime, audio, audioProgress, audioContainer, volumeProgress, volumeContainer, songs, hasBought, playSong, pauseSong, prevSong, nextSong, setProgress, progressPercent, onSetVolume, fmtMSS, audioLoader }} />
				)} />

				<Route path="/audios" exact render={(props) => (
					<>
						<Audios {...{ url, auth, setMessage, setErrors, audios, setAudios, boughtAudios, audioLikes, audioAlbums, setAudioAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/audio-create" exact render={(props) => (
					<>
						<AudioCreate {...{ url, auth, setMessage, setErrors, setAudios, audioAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/audio-edit/:id" exact render={(props) => (
					<>
						<AudioEdit {...{ url, auth, setMessage, setErrors, audios, setAudios, audioAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/audio-album-create" exact render={(props) => (
					<>
						<AudioAlbumCreate {...{ url, auth, setMessage, setErrors, setAudioAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Route path="/audio-album-edit/:id" exact render={(props) => (
					<>
						<AudioAlbumEdit {...{ url, auth, setMessage, setErrors, audioAlbums, setAudioAlbums }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />


				<Route path="/admin" exact render={(props) => (
					<>
						<Admin {...{ url, auth, setMessage, setErrors, users, decos, videos, boughtVideos, videoPayouts, audios, boughtAudios, audioPayouts }} />
						{auth.username == "@guest" && <LoginPopUp {...{ url }} />}
					</>
				)} />

				<Messages {...{ message, errors }} />

				<BottomNav {...{ url, auth, setMessage, setErrors, setAuth, cartVideos, cartAudios, audios, audioProgress, audioContainer, progressPercent, show, setShow, playBtn, audio, songs, playSong, pauseSong, prevSong, nextSong, audioLoader, onSearchIconClick }} />

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
