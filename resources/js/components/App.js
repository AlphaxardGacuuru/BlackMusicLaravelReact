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
import Help from '../pages/Help'
import HelpThread from '../pages/HelpThread'

import NotFound from '../pages/NotFound'

function App() {

	// console.log(process.env.MIX_APP_URL)

	const url = window.location.href.match(/https/) ?
		'https://music.black.co.ke' :
		'http://localhost:3000'

	axios.defaults.baseURL = 'http://localhost:3000';

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
	const [autoLoginFailed, setAutoLoginFailed] = useState()
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

	const [admin, setAdmin] = useState(getLocalStorage("admin"))
	const [audioAlbums, setAudioAlbums] = useState(getLocalStorage("audioAlbums"))
	const [audioPayouts, setAudioPayouts] = useState(getLocalStorage("audioPayouts"))
	const [audios, setAudios] = useState(getLocalStorage("audios"))
	const [audioComments, setAudioComments] = useState(getLocalStorage("audioComments"))

	const [boughtAudios, setBoughtAudios] = useState(getLocalStorage("boughtAudios"))
	const [boughtVideos, setBoughtVideos] = useState(getLocalStorage("boughtVideos"))

	const [cartAudios, setCartAudios] = useState(getLocalStorage("cartAudios"))
	const [cartVideos, setCartVideos] = useState(getLocalStorage("cartVideos"))

	const [helpPosts, setHelpPosts] = useState(getLocalStorage("helpPosts"))
	const [helpThreads, setHelpThreads] = useState(getLocalStorage("helpThreads"))
	const [kopokopoRecipients, setKopokopoRecipients] = useState(getLocalStorage("kopokopoRecipients"))
	const [notifications, setNotifications] = useState(getLocalStorage("notifications"))

	const [posts, setPosts] = useState(getLocalStorage("posts"))
	const [postComments, setPostComments] = useState(getLocalStorage("postComments"))
	const [referrals, setReferrals] = useState(getLocalStorage("referrals"))
	const [songPayouts, setSongPayouts] = useState(getLocalStorage("songPayouts"))
	const [users, setUsers] = useState(getLocalStorage("users"))

	const [videoAlbums, setVideoAlbums] = useState(getLocalStorage("videoAlbums"))
	const [videos, setVideos] = useState(getLocalStorage("videos"))
	const [videoComments, setVideoComments] = useState(getLocalStorage("videoComments"))

	// Reset Messages and Errors to null after 3 seconds
	if (errors.length > 0 || message.length > 0) {
		setTimeout(() => setErrors([]), 3000);
		setTimeout(() => setMessage(''), 3000);
	}

	// Autologin if user has already registered
	const autoLogin = () => {
		if (auth.username == "@guest" && localStorage.getItem("auth")) {
			axios.get('/sanctum/csrf-cookie').then(() => {
				axios.post(`/api/login`, {
					phone: getLocalStorage("auth").phone,
					password: getLocalStorage("auth").phone,
					remember: 'checked'
				}).then(() => {
					// Update Logged in user
					axios.get(`/api/home`)
						.then((res) => {
							// Check if auto login has worked
							if (res.data) {
								setAuth(res.data)
								// if auto login failed fetch everything
								autoLoginFailed && setAutoLoginFailed(false)
							} else {
								// If auto login failed, logout
								axios.get('/sanctum/csrf-cookie').then(() => {
									axios.post(`/api/logout`)
										.then(() => {
											setAuth({
												"name": "Guest",
												"username": "@guest",
												"pp": "profile-pics/male_avatar.png",
												"account_type": "normal"
											})
											// Set autoLoginFailed to refresh everything
											setAutoLoginFailed(true)
											// Retry login
											autoLogin()
										});
								})
							}
						})
				})
			});
		}
	}

	// Call the auto login function
	autoLogin()

	// Fetch data on page load
	useEffect(() => {

		// Fetch Auth
		axios.get(`/api/home`)
			.then((res) => {
				if (res.data) {
					setAuth(res.data)
					setLocalStorage("auth", res.data)
				}
			}).catch(() => setErrors(["Failed to fetch auth"]))

		// Fetch Admin
		axios.get(`/api/admin`)
			.then((res) => {
				setAdmin(res.data)
				setLocalStorage("admin", res.data)
			}).catch(() => setErrors(["Failed to fetch admin"]))

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

		// Fetch Audio Comments
		axios.get(`/api/audio-comments`)
			.then((res) => {
				setAudioComments(res.data)
				setLocalStorage("audioComments", res.data)
			}).catch(() => setErrors(["Failed to fetch audio comments"]))

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

		// Fetch Help Posts
		axios.get(`/api/help-posts`)
			.then((res) => {
				setHelpPosts(res.data)
				setLocalStorage("helpPosts", res.data)
			}).catch(() => setErrors(['Failed to fetch help posts']))

		// Fetch Help Threads
		axios.get(`/api/help-posts/1`)
			.then((res) => {
				setHelpThreads(res.data)
				setLocalStorage("helpThreads", res.data)
			}).catch(() => setErrors(['Failed to fetch help threads']))

		// Fetch Kopokopo Recipients
		axios.get(`/api/kopokopo-recipients`)
			.then((res) => {
				setKopokopoRecipients(res.data)
				setLocalStorage("kopokopoRecipients", res.data)
			}).catch(() => setErrors(['Failed to fetch kopokopo recipients']))

		// Fetch Notifications
		axios.get(`/api/notifications`)
			.then((res) => {
				setNotifications(res.data)
				setLocalStorage("notifications", res.data)
			}).catch(() => setErrors(['Failed to fetch notifications']))

		//Fetch Posts
		axios.get(`/api/posts`)
			.then((res) => {
				setPosts(res.data)
				setLocalStorage("posts", res.data)
			}).catch(() => setErrors(['Failed to fetch posts']))

		// Fetch Post Comments
		axios.get(`/api/post-comments`)
			.then((res) => {
				setPostComments(res.data)
				setLocalStorage("postComments", res.data)
			}).catch(() => setErrors(['Failed to fetch post comments']))

		//Fetch Referrals
		axios.get(`/api/referrals`)
			.then((res) => {
				setReferrals(res.data)
				setLocalStorage("referrals", res.data)
			}).catch(() => setErrors(['Failed to fetch referrals']))

		// Fetch Song Payouts
		axios.get(`/api/song-payouts`)
			.then((res) => setLocalStorage("songPayouts", res.data))
			.catch(() => setErrors(["Failed to fetch song payouts"]))

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

		// Fetch Video Comments
		axios.get(`/api/video-comments`)
			.then((res) => {
				setVideoComments(res.data)
				setLocalStorage("videoComments", res.data)
			}).catch(() => setErrors(["Failed to fetch video comments"]))

		console.log("effect rendered")

	}, [autoLoginFailed])

	console.log("rendered")

	// Function for following users
	const onFollow = (musician) => {
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
						setLocalStorage("videoAlbums")
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

	// Function for buying video to cart
	const onBuyVideos = (video) => {
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

	// Function for buying audio to cart
	const onBuyAudios = (audio) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`/api/cart-audios`, {
				audio: audio
			}).then((res) => {
				setMessage(res.data)
				// Update audios
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

		if (playPromise != undefined) {
			playPromise.then(() => {
				// Automatic playback started!
				// Show playing UI.
				setPlayBtn(true)
				setAudioLoader(false)
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
	let songIndex = songs.indexOf(show.toString())

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
		if (!showAudio.hasBoughtAudio) {
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
	const [text, setText] = useState("")
	const [media, setMedia] = useState("")
	const [para1, setPara1] = useState("")
	const [para2, setPara2] = useState("")
	const [para3, setPara3] = useState("")
	const [para4, setPara4] = useState("")
	const [para5, setPara5] = useState("")
	const [placeholder, setPlaceholder] = useState()
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
					// Clear text
					setText("")
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
		getLocalStorage, setLocalStorage,
		login, setLogin,
		url,
		auth, setAuth,
		message, setMessage,
		errors, setErrors,
		admin, setAdmin,
		audioAlbums, setAudioAlbums,
		audioPayouts, setAudioPayouts,
		audios, setAudios,
		audioComments, setAudioComments,
		boughtAudios, setBoughtAudios,
		boughtVideos, setBoughtVideos,
		cartAudios, setCartAudios,
		cartVideos, setCartVideos,
		helpPosts, setHelpPosts,
		helpThreads, setHelpThreads,
		kopokopoRecipients, setKopokopoRecipients,
		notifications, setNotifications,
		posts, setPosts,
		postComments, setPostComments,
		referrals, setReferrals,
		songPayouts, setSongPayouts,
		users, setUsers,
		videoAlbums, setVideoAlbums,
		videos, setVideos,
		search, setSearch,
		users, setUsers,
		videoAlbums, setVideoAlbums,
		videos, setVideos,
		videoComments, setVideoComments,
		onFollow,
		onCartVideos,
		onBuyVideos,
		onCartAudios,
		onBuyAudios,
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
		onSubmit
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

				<Route path="/help" exact render={(props) => (
					<>
						<Help {...GLOBAL_STATE} />
						{auth.username == "@guest" && <LoginPopUp {...GLOBAL_STATE} />}
					</>
				)} />

				<Route path="/help/:username" exact render={(props) => (
					<>
						<HelpThread {...GLOBAL_STATE} />
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
