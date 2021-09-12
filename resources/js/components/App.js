import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

import Messages from './Messages'
import TopNav from './TopNav'
import BottomNav from './BottomNav'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Index from '../pages/Index'
import Profile from '../pages/Profile'
import ProfileEdit from '../pages/ProfileEdit'
import PostCreate from '../pages/PostCreate'
import PostShow from '../pages/PostShow'

import VideoCharts from '../pages/VideoCharts'
import VideoShow from '../pages/VideoShow'
import AudioCharts from '../pages/AudioCharts'
import AudioShow from '../pages/AudioShow'

import Cart from '../pages/Cart'
import Library from '../pages/Library'

import Videos from '../pages/Videos'
import VideoCreate from '../pages/VideoCreate'
import VideoEdit from '../pages/VideoEdit'
import VideoAlbumCreate from '../pages/VideoAlbumCreate'
import VideoAlbumEdit from '../pages/VideoAlbumEdit'
import Audios from '../pages/Audios'
import AudioCreate from '../pages/AudioCreate'
import AudioEdit from '../pages/AudioEdit'
import AudioAlbumCreate from '../pages/AudioAlbumCreate'
import AudioAlbumEdit from '../pages/AudioAlbumEdit'

import Admin from '../pages/Admin'

function App() {

	// Declare states
	const [url, setUrl] = useState('http://localhost:3000')
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

		// For Users
		const getUsers = async () => {
			const usersFromServer = await fetchUsers()
			setUsers(usersFromServer)
		}
		getUsers()

		// For Videos
		const getVideos = async () => {
			const videosFromServer = await fetchVideos()
			setVideos(videosFromServer)
		}
		getVideos()

		// For Posts
		const getPosts = async () => {
			const postsFromServer = await fetchPosts()
			setPosts(postsFromServer)
		}

		getPosts()

		fetchPolls()

		fetchPostLikes()

		fetchPostComments()

		fetchPostCommentLikes()

		fetchDecos()

		fetchFollows()

		fetchBoughtAudios()

		fetchBoughtVideos()

		fetchCartVideos()

		fetchVideoLikes()

		fetchVideoComments()

		fetchVideoCommentLikes()

		fetchVideoAlbums()

		// fetchVideoPayouts()

		fetchAudios()

		fetchAudioAlbums()

		fetchAudioLikes()

		fetchAudioComments()

		fetchAudioCommentLikes()

		fetchCartAudios()

	}, [])

	//Fetch Auth
	const fetchAuth = async () => {
		const res = await fetch(`${url}/api/home`)
		const data = res.json()

		return data
	}

	//Fetch Users
	const fetchUsers = async () => {
		const res = await fetch(`${url}/api/users`)
		const data = res.json()

		return data
	}

	//Fetch Posts
	const fetchPosts = async () => {
		const res = await fetch(`${url}/api/posts`)
		const data = res.json()

		return data
	}

	// Fetch Post Likes
	const fetchPostLikes = () => {
		axios.get(`${url}/api/post-likes`)
			.then((res) => setPostLikes(res.data))
			.catch(() => setErrors(['Failed to fetch post likes']))
	}

	// Fetch Post Comments
	const fetchPostComments = () => {
		axios.get(`${url}/api/post-comments`)
			.then((res) => setPostComments(res.data))
			.catch(() => setErrors(['Failed to fetch post comments']))
	}

	// Fetch Post Comment likes
	const fetchPostCommentLikes = () => {
		axios.get(`${url}/api/post-comment-likes`)
			.then((res) => setPostCommentLikes(res.data))
			.catch(() => setErrors(['failed to fetch post comment likes']))
	}

	// Fetch Polls
	const fetchPolls = () => {
		axios.get(`${url}/api/polls`)
			.then((res) => setPolls(res.data))
			.catch(() => setErrors(['Failed to fetch polls']))
	}

	// Fetch Decos
	const fetchDecos = () => {
		axios.get(`${url}/api/decos`)
			.then((res) => setDecos(res.data))
			.catch(() => setErrors(['Failed to fetch decos']))
	}

	// Fetch Follows
	const fetchFollows = () => {
		axios.get(`${url}/api/follows`)
			.then((res) => setFollows(res.data))
			.catch(() => setErrors(['Failed to fetch follows']))
	}

	//Fetch Videos
	const fetchVideos = async () => {
		const res = await fetch(`${url}/api/videos`)
		const data = res.json()

		return data
	}

	// Fetch Liked Videos
	const fetchVideoLikes = () => {
		axios.get(`${url}/api/video-likes`)
			.then((res) => setVideoLikes(res.data))
			.catch(() => setErrors(["Failed to fetch video likes"]))
	}

	// Fetch Videos Comments
	const fetchVideoComments = () => {
		axios.get(`${url}/api/video-comments`)
			.then((res) => setVideoComments(res.data))
			.catch(() => setErrors(["Failed to fetch video comments"]))
	}

	// Fetch Videos Comments Likes
	const fetchVideoCommentLikes = () => {
		axios.get(`${url}/api/video-comment-likes`)
			.then((res) => setVideoCommentLikes(res.data))
			.catch(() => setErrors(["Failed to fetch video comment likes"]))
	}

	// Fetch Video Albums
	const fetchVideoAlbums = () => {
		axios.get(`${url}/api/video-albums`)
			.then((res) => setVideoAlbums(res.data))
			.catch(() => setErrors(["Failed to fetch video albums"]))
	}

	// Fetch Cart Videos
	const fetchCartVideos = () => {
		axios.get(`${url}/api/cart-videos`)
			.then((res) => setCartVideos(res.data))
			.catch(() => setErrors(['Failed to fetch cart videos']))
	}

	// Fetch Bought Videos
	const fetchBoughtVideos = () => {
		axios.get(`${url}/api/bought-videos`)
			.then((res) => setBoughtVideos(res.data))
			.catch(() => setErrors(['Failed to fetch bought videos']))
	}

	// Fetch Video Payouts
	const fetchVideoPayouts = () => {
		axios.get(`${url}/api/video-payouts`)
			.then((res) => setVideoPayouts(res.data))
			.catch(() => setErrors(["Failed to fetch video payouts"]))
	}

	// Fetch Audios
	const fetchAudios = () => {
		axios.get(`${url}/api/audios`)
			.then((res) => setAudios(res.data))
			.catch(() => setErrors(["Failed to fetch audios"]))
	}

	// Fetch Audio Albums
	const fetchAudioAlbums = () => {
		axios.get(`${url}/api/audio-albums`)
			.then((res) => setAudioAlbums(res.data))
			.catch(() => setErrors(["Failed to fetch audio albums"]))
	}

	// Fetch Audio Likes
	const fetchAudioLikes = () => {
		axios.get(`${url}/api/audio-likes`)
			.then((res) => setAudioLikes(res.data))
			.catch(() => setErrors(["Failed to fetch audio likes"]))
	}

	// Fetch Audio Comments
	const fetchAudioComments = () => {
		axios.get(`${url}/api/audio-comments`)
			.then((res) => setAudioComments(res.data))
			.catch(() => setErrors(["Failed to fetch audio comments"]))
	}

	// Fetch Audio Comments Likes
	const fetchAudioCommentLikes = () => {
		axios.get(`${url}/api/audio-comment-likes`)
			.then((res) => setAudioCommentLikes(res.data))
			.catch(() => setErrors(['Failed to fetch audio comment likes']))
	}

	// Fetch Cart Audios
	const fetchCartAudios = () => {
		axios.get(`${url}/api/cart-audios`)
			.then((res) => setCartAudios(res.data))
			.catch(() => setErrors(['Failed to fetch cart audios']))
	}

	// Fetch Bought Audios
	const fetchBoughtAudios = () => {
		axios.get(`${url}/api/bought-audios`)
			.then((res) => setBoughtAudios(res.data))
			.catch(() => setErrors(["Failed to fetch bought audios"]))
	}


	// Audio Player
	const [show, setShow] = useState(0)
	const [playBtn, setPlayBtn] = useState(true)
	const [shuffle, setShuffle] = useState(false)
	const [loop, setLoop] = useState(false)
	const [dur, setDur] = useState(0)
	const [volume, setVolume] = useState(0.3)
	const [currentTime, setCurrentTime] = useState(0)
	const [progressPercent, setProgressPercent] = useState()

	// Listen for show change and autoplay song
	useEffect(() => {
		var playPromise = audio.current.play();

		if (playPromise !== undefined) {
			playPromise.then(_ => {
				// Automatic playback started!
				// Show playing UI.
				setPlayBtn(true)
			})
				.catch(error => {
					// Auto-play was prevented
					// Show paused UI.
					setPlayBtn(false)
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

	return (
		<>
			<Router>
				<TopNav {...{ url, auth, setMessage, setErrors, setAuth, cartVideos, cartAudios }} />
				<Route path="/login" exact render={(props) => (<Login {...{ setMessage, setErrors, setAuth, url }} />)} />
				<Route path="/register" exact render={(props) => (<Register {...{ setMessage, setErrors, setAuth, url }} />)} />
				<Route path="/" exact render={(props) => (
					<Index {...{ url, auth, setMessage, setErrors, users, videos, boughtVideos, cartVideos, setCartVideos, posts, setPosts, postLikes, setPostLikes, postComments, polls, setPolls, decos, follows, setFollows }} />
				)} />

				<Route path="/profile/:username" exact render={(props) => (
					<Profile {...{ setMessage, setErrors, auth, setAuth, url, users, videos, boughtVideos, cartVideos, setCartVideos, videoAlbums, audios, boughtAudios, cartAudios, setCartAudios, audioAlbums, posts, setPosts, postLikes, setPostLikes, postComments, polls, setPolls, decos, follows, setFollows }} />
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

				<Route path="/cart" exact render={(props) => (
					<Cart {...{ url, auth, setMessage, setErrors, cartVideos, setCartVideos, videos, cartAudios, setCartAudios, audios }} />
				)} />

				<Route path="/video-charts" exact render={(props) => (
					<VideoCharts {...{ url, auth, setMessage, setErrors, users, videos, boughtVideos, cartVideos, setCartVideos, videoLikes, follows, setFollows }} />
				)} />

				<Route path="/video-show/:show" exact render={(props) => (
					<VideoShow {...{ url, auth, setMessage, setErrors, users, decos, videos, boughtVideos, cartVideos, setCartVideos, videoLikes, setVideoLikes, videoComments, setVideoComments, videoCommentLikes, setVideoCommentLikes, videoAlbums, follows, setFollows }} />
				)} />

				<Route path="/audio-charts" exact render={(props) => (
					<AudioCharts {...{ url, auth, setMessage, setErrors, users, audios, boughtAudios, cartAudios, setCartAudios, audioLikes, follows, setFollows }} />
				)} />

				<Route path="/audio-show/:show" exact render={(props) => (
					<AudioShow {...{ url, auth, setMessage, setErrors, users, decos, audios, boughtAudios, cartAudios, setCartAudios, audioLikes, setAudioLikes, audioComments, setAudioComments, audioCommentLikes, setAudioCommentLikes, audioAlbums, follows, setFollows, show, setShow, playBtn, setPlayBtn, shuffle, setShuffle, loop, setLoop, dur, setDur, volume, setVolume, currentTime, setCurrentTime, audio, audioProgress, audioContainer, volumeProgress, volumeContainer, songs, hasBought, playSong, pauseSong, prevSong, nextSong, setProgress, progressPercent, onSetVolume, fmtMSS }} />
				)} />

				<Route path="/library" exact render={(props) => (
					<Library {...{ auth, videos, boughtVideos, audios, boughtAudios, setShow }} />
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

				<BottomNav {...{ url, auth, setMessage, setErrors, setAuth, cartVideos, cartAudios, audios, audioProgress, audioContainer, progressPercent, show, setShow, playBtn, audio, songs, playSong, pauseSong, prevSong, nextSong }} />
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
