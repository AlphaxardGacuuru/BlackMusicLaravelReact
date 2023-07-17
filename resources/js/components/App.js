import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route } from "react-router-dom"
// import Axios from "axios"

import LoginPopUp from "@/components/Auth/LoginPopUp"
import Messages from "@/components/Core/Messages"
import TopNav from "@/components/Layouts/TopNav"
import BottomNav from "@/components/Layouts/BottomNav"
import AudioPlayer from "@/components/Audio/AudioPlayer"
import ScrollToTop from "@/components/Core/ScrollToTop"
import onAudioPlayer from "../functions/onAudioPlayer"

import Admin from "@/pages/admin"

import AudioCharts from "@/pages/audio/charts"
import AudioShow from "@/pages/audio/[id]"
import AudioCreate from "@/pages/audio/create"
import Audios from "@/pages/audio/index"
import AudioEdit from "@/pages/audio/edit/[id]"
import AudioAlbumCreate from "@/pages/audio/album/create"
import AudioAlbumEdit from "@/pages/audio/album/edit/[id]"

import Chat from "@/pages/chat/index"
import ChatThread from "@/pages/chat/[username]"
import NewChat from "@/pages/chat/new"

import KaraokeCharts from "@/pages/karaoke/charts"
import KaraokeShow from "@/pages/karaoke/[id]"
import KaraokeCreate from "@/pages/karaoke/create"

import PostCreate from "@/pages/post/create"
import PostShow from "@/pages/post/[id]"
import PostEdit from "@/pages/post/edit/[id]"

import Profile from "@/pages/profile/[username]"
import ProfileEdit from "@/pages/profile/edit"

import StoryShow from "@/pages/story/[id]"
import StoryCreate from "@/pages/story/create"

import VideoCharts from "@/pages/video/charts"
import VideoShow from "@/pages/video/[id]"
import Videos from "@/pages/video/index"
import VideoCreate from "@/pages/video/create"
import VideoEdit from "@/pages/video/edit/[id]"
import VideoAlbumCreate from "@/pages/video/album/create"
import VideoAlbumEdit from "@/pages/video/album/edit/[id]"

import NotFound from "@/pages/404"
import ServerError from "@/pages/500"
import Cart from "@/pages/Cart"
import DownloadApp from "@/pages/download-app"
import Index from "@/pages/index"
import Library from "@/pages/Library"
import Login from "@/pages/login"
import PrivacyPolicy from "@/pages/privacy-policy"
import Register from "@/pages/register"
import Referral from "@/pages/referral"
import Search from "@/pages/Search"
import Settings from "@/pages/Settings"

import { random } from "lodash"

function App() {
	// Function for checking local storage
	const getLocalStorage = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return []
		}
	}

	// Function for checking local storage
	const getLocalStorageAuth = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return {
				name: "Guest",
				username: "@guest",
				avatar: "/storage/avatars/male-avatar.png",
				accountType: "normal",
				decos: 0,
				posts: 0,
				fans: 0,
			}
		}
	}

	// Function to set local storage
	const setLocalStorage = (state, data) => {
		localStorage.setItem(state, JSON.stringify(data))
	}

	const url = process.env.MIX_APP_URL

	// Declare states
	const [messages, setMessages] = useState([])
	const [errors, setErrors] = useState([])
	const [login, setLogin] = useState()
	const [auth, setAuth] = useState(getLocalStorageAuth("auth"))

	const [audios, setAudios] = useState(getLocalStorage("audios"))
	const [audioAlbums, setAudioAlbums] = useState(getLocalStorage("audioAlbums"))
	const [audioLikes, setAudioLikes] = useState(getLocalStorage("audioLikes"))
	const [boughtAudios, setBoughtAudios] = useState(
		getLocalStorage("boughtAudios")
	)
	const [boughtVideos, setBoughtVideos] = useState(
		getLocalStorage("boughtVideos")
	)
	const [cartAudios, setCartAudios] = useState(getLocalStorage("cartAudios"))
	const [cartVideos, setCartVideos] = useState(getLocalStorage("cartVideos"))
	const [karaokes, setKaraokes] = useState([])
	const [posts, setPosts] = useState(getLocalStorage("posts"))
	const [stories, setStories] = useState(getLocalStorage("stories"))
	const [users, setUsers] = useState(getLocalStorage("users"))
	const [videos, setVideos] = useState(getLocalStorage("videos"))
	const [videoAlbums, setVideoAlbums] = useState(getLocalStorage("videoAlbums"))
	const [videoLikes, setVideoLikes] = useState(getLocalStorage("videoLikes"))

	// Search State
	const [search, setSearch] = useState("!@#$%^&")
	const searchInput = useRef(null)

	// Function for fetching data from API
	const get = (endpoint, setState, storage = null, errors = true) => {
		Axios.get(`/api/${endpoint}`)
			.then((res) => {
				var data = res.data ? res.data.data : []
				setState(data)
				storage && setLocalStorage(storage, data)
			})
			.catch(() => errors && setErrors([`Failed to fetch ${endpoint}`]))
	}

	// Function for getting errors from responses
	const getErrors = (err, message = false) => {
		const resErrors = err.response.data.errors
		var newError = []
		for (var resError in resErrors) {
			newError.push(resErrors[resError])
		}
		// Get other errors
		message && newError.push(err.response.data.message)
		setErrors(newError)
	}

	// Fetch data on page load
	useEffect(() => {
		// Import Js for Bootstrap
		import("bootstrap/dist/js/bootstrap")

		// Redirect if URL is not secure
		var unsecureUrl = window.location.href.match(/http:\/\/music.black.co.ke/)

		if (unsecureUrl) {
			window.location.href = "https://music.black.co.ke"
		}

		get("auth", setAuth, "auth", false)
		get("cart-videos", setCartVideos, "cartVideos")
		get("cart-audios", setCartAudios, "cartAudios")
	}, [])

	console.log("rendered")

	const audioStates = onAudioPlayer(getLocalStorage, get, setErrors, auth)

	// Function to focus on search input
	const onSearchIconClick = () => {
		window.location.href.match("/search") && searchInput.current.focus()
	}

	/*
	 *
	 * Register service worker */
	if (window.location.href.match(/https/)) {
		if ("serviceWorker" in navigator) {
			window.addEventListener("load", () => {
				navigator.serviceWorker.register("/sw.js")
				// .then((reg) => console.log('Service worker registered', reg))
				// .catch((err) => console.log('Service worker not registered', err));
			})
		}
	}

	/*
	 *
	 * PWA Install button */
	let deferredPrompt
	var btnAdd = useRef()
	const [downloadLink, setDownloadLink] = useState()
	const [downloadLinkText, setDownloadLinkText] = useState("")

	// Listen to the install prompt
	window.addEventListener("beforeinstallprompt", (e) => {
		deferredPrompt = e

		// Show the button
		setDownloadLink(true)

		// Action when button is clicked
		btnAdd.current.addEventListener("click", (e) => {
			// Show install banner
			deferredPrompt.prompt()
			// Check if the user accepted
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === "accepted") {
					setDownloadLinkText("User accepted")
				}
				deferredPrompt = null
			})

			window.addEventListener("appinstalled", (evt) => {
				setDownloadLinkText("Installed")
			})
		})
	})

	// Show the notification
	function displayNotification() {
		if (Notification.permission == "granted") {
			navigator.serviceWorker.getRegistration().then((reg) => {
				var options = {
					body: "Here is a notification body",
					actions: [
						{
							action: "explore",
							title: "Go to the site",
							icon: "storage/img/musical-note.png",
						},
						{
							action: "close",
							title: "No thank you",
							icon: "storage/img/musical-note.png",
						},
					],
					icon: "storage/img/musical-note.png",
					vibrate: [100, 50, 100],
					// Allows us to identify notification
					data: { primaryKey: 1 },
				}
				reg.showNotification("Hello world", options)
			})
		}
	}

	// Subscribe to push service
	function subscribeToPush() {
		navigator.serviceWorker.getRegistration().then((reg) => {
			reg.pushManager
				.subscribe({
					userVisibleOnly: true,
					applicationServerKey: process.env.MIX_VAPID_PUBLIC_KEY,
				})
				.then((sub) => {
					// send sub.toJSON() to server
					const parsed = JSON.parse(JSON.stringify(sub))

					Axiosget("sanctum/csrf-cookie").then(() => {
						Axios.post(`/api/push`, {
							endpoint: parsed.endpoint,
							auth: parsed.keys.auth,
							p256dh: parsed.keys.p256dh,
						})
							.then((res) => {
								setMessages([res.data])
							})
							.catch((err) => {
								const resErrors = err.response.data.errors
								var resError
								var newError = []
								for (resError in resErrors) {
									newError.push(resErrors[resError])
								}
								setErrors(newError)
								console.log(err.response.data.message)
							})
					})
				})
		})
	}

	function sendPush() {
		Axios.get("/api/push/create")
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err.response.data))
	}

	// All states
	const GLOBAL_STATE = {
		get,
		getErrors,
		getLocalStorage,
		setLocalStorage,
		login,
		setLogin,
		url,
		auth,
		setAuth,
		messages,
		setMessages,
		errors,
		setErrors,
		audios,
		setAudios,
		audioAlbums,
		setAudioAlbums,
		audioLikes,
		setAudioLikes,
		boughtAudios,
		setBoughtAudios,
		boughtVideos,
		setBoughtVideos,
		cartAudios,
		setCartAudios,
		cartVideos,
		setCartVideos,
		karaokes,
		setKaraokes,
		posts,
		setPosts,
		users,
		setUsers,
		videoAlbums,
		setVideoAlbums,
		videos,
		setVideos,
		search,
		setSearch,
		users,
		setUsers,
		videos,
		setVideos,
		videoAlbums,
		setVideoAlbums,
		videoLikes,
		setVideoLikes,
		karaokes,
		setKaraokes,
		stories,
		setStories,
		displayNotification,
		subscribeToPush,
		sendPush,
		// Search
		onSearchIconClick,
		searchInput,
		// Audio Player
		audioStates,
		// PWA
		btnAdd,
		downloadLink,
		setDownloadLink,
		downloadLinkText,
		setDownloadLinkText,
	}

	const showLoginPopUp = auth.username == "@guest" && (
		<LoginPopUp {...GLOBAL_STATE} />
	)

	return (
		<>
			<Router>
				<ScrollToTop />
				{login && <LoginPopUp {...GLOBAL_STATE} />}

				<TopNav {...GLOBAL_STATE} />
				<Route
					path="/download"
					exact
					render={(props) => <DownloadApp {...GLOBAL_STATE} />}
				/>

				<Route
					path="/login"
					exact
					render={(props) => <Login {...GLOBAL_STATE} />}
				/>
				<Route
					path="/register/:name/:email/:avatar"
					exact
					render={(props) => <Register {...GLOBAL_STATE} />}
				/>
				<Route
					path="/referral/:referer"
					exact
					render={(props) => <Referral {...GLOBAL_STATE} />}
				/>
				<Route path="/" exact render={(props) => <Index {...GLOBAL_STATE} />} />
				<Route
					path="/search"
					exact
					render={(props) => (
						<>
							<Search {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/cart"
					exact
					render={(props) => (
						<>
							<Cart {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/library"
					exact
					render={(props) => (
						<>
							<Library {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/profile/:username"
					exact
					render={(props) => (
						<>
							<Profile {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/profile/edit"
					exact
					render={(props) => (
						<>
							<ProfileEdit {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/post/create"
					exact
					render={(props) => (
						<>
							<PostCreate {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/post/show/:id"
					exact
					render={(props) => (
						<>
							<PostShow {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/post/edit/:id"
					exact
					render={(props) => (
						<>
							<PostEdit {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>

				{/* Karaoke Routes */}
				<Route
					path="/karaoke/charts"
					exact
					render={(props) => <KaraokeCharts {...GLOBAL_STATE} />}
				/>
				<Route
					path="/karaoke/create/:audio"
					exact
					render={(props) => <KaraokeCreate {...GLOBAL_STATE} />}
				/>
				<Route
					path="/karaoke/show/:id"
					exact
					render={(props) => <KaraokeShow {...GLOBAL_STATE} />}
				/>

				{/* Video Routes */}
				<Route
					path="/video/charts"
					exact
					render={(props) => <VideoCharts {...GLOBAL_STATE} />}
				/>
				<Route
					path="/video/show/:id/:referer?"
					exact
					render={(props) => <VideoShow {...GLOBAL_STATE} />}
				/>
				<Route
					path="/video"
					exact
					render={(props) => (
						<>
							<Videos {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/video/create"
					exact
					render={(props) => (
						<>
							<VideoCreate {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/video/edit/:id"
					exact
					render={(props) => (
						<>
							<VideoEdit {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/video/album/create"
					exact
					render={(props) => (
						<>
							<VideoAlbumCreate {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/video/album/edit/:id"
					exact
					render={(props) => (
						<>
							<VideoAlbumEdit {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>

				{/* Audio Routes */}
				<Route
					path="/audio/charts"
					exact
					render={(props) => <AudioCharts {...GLOBAL_STATE} />}
				/>
				<Route
					path="/audio/show/:show/:referer?"
					exact
					render={(props) => <AudioShow {...GLOBAL_STATE} />}
				/>
				<Route
					path="/audio"
					exact
					render={(props) => (
						<>
							<Audios {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/audio/create"
					exact
					render={(props) => (
						<>
							<AudioCreate {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/audio/edit/:id"
					exact
					render={(props) => (
						<>
							<AudioEdit {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/audio/album/create"
					exact
					render={(props) => (
						<>
							<AudioAlbumCreate {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/audio/album/edit/:id"
					exact
					render={(props) => (
						<>
							<AudioAlbumEdit {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/admin"
					exact
					render={(props) => (
						<>
							<Admin {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/settings"
					exact
					render={(props) => (
						<>
							<Settings {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route path="/privacy-policy" exact render={() => <PrivacyPolicy />} />
				<Route
					path="/chat"
					exact
					render={(props) => (
						<>
							<Chat {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/chat/:username"
					exact
					render={(props) => (
						<>
							<ChatThread {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/chat/new"
					exact
					render={(props) => (
						<>
							<NewChat {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/story/:id"
					exact
					render={(props) => (
						<>
							<Story {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>
				<Route
					path="/story/create"
					exact
					render={(props) => (
						<>
							<StoryCreate {...GLOBAL_STATE} />
							{showLoginPopUp}
						</>
					)}
				/>

				<Messages {...GLOBAL_STATE} />
				<BottomNav {...GLOBAL_STATE} />
			</Router>

			<AudioPlayer {...GLOBAL_STATE} />

			{/* Install button */}
			<button ref={btnAdd} style={{ display: "none" }}>
				test
			</button>
		</>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
