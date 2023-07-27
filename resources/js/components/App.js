import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
// import Axios from "axios"

import AudioPlayer from "@/components/Audio/AudioPlayer"
import onAudioPlayer from "../functions/onAudioPlayer"

import RouteList from "./Core/RouteList"
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
	const [boughtAudios, setBoughtAudios] = useState(
		getLocalStorage("boughtAudios")
	)
	const [boughtVideos, setBoughtVideos] = useState(
		getLocalStorage("boughtVideos")
	)
	const [cartAudios, setCartAudios] = useState(getLocalStorage("cartAudios"))
	const [cartVideos, setCartVideos] = useState(getLocalStorage("cartVideos"))
	const [chatThreads, setChatThreads] = useState(getLocalStorage("chatThreads"))
	const [karaokes, setKaraokes] = useState(getLocalStorage("karaokes"))
	const [posts, setPosts] = useState(getLocalStorage("posts"))
	const [savedKaraokes, setSavedKaraokes] = useState(
		getLocalStorage("savedKaraokes")
	)
	const [stories, setStories] = useState(getLocalStorage("stories"))
	const [users, setUsers] = useState(getLocalStorage("users"))
	const [artists, setArtists] = useState(getLocalStorage("artists"))
	const [videos, setVideos] = useState(getLocalStorage("videos"))
	const [videoAlbums, setVideoAlbums] = useState(getLocalStorage("videoAlbums"))

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

					Axios.get("sanctum/csrf-cookie").then(() => {
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
		boughtAudios,
		setBoughtAudios,
		boughtVideos,
		setBoughtVideos,
		cartAudios,
		setCartAudios,
		cartVideos,
		setCartVideos,
		chatThreads,
		setChatThreads,
		karaokes,
		setKaraokes,
		posts,
		setPosts,
		users,
		setUsers,
		artists,
		setArtists,
		videoAlbums,
		setVideoAlbums,
		videos,
		setVideos,
		search,
		setSearch,
		stories,
		setStories,
		savedKaraokes,
		setSavedKaraokes,
		// Notifications
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

	return (
		<React.Fragment>
			<RouteList GLOBAL_STATE={GLOBAL_STATE} />
			<AudioPlayer {...GLOBAL_STATE} />

			{/* Install button */}
			<button
				ref={btnAdd}
				style={{ display: "none" }}>
				test
			</button>
		</React.Fragment>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
