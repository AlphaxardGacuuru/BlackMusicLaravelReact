import React, { useState, useEffect, Suspense } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import Carousel from '../components/Carousel'
import LoadingAudioMediaHorizontal from '../components/LoadingAudioMediaHorizontal'
import LoadingAvatarMedia from '../components/LoadingAvatarMedia'

const AudioMediaHorizontal = React.lazy(() => import('../components/AudioMediaHorizontal'))
const AvatarMedia = React.lazy(() => import('../components/AvatarMedia'))

const AudioCharts = (props) => {

	axios.defaults.baseURL = props.url

	useEffect(() => {
		// Fetch Audio Albums
		axios.get(`/api/audio-albums`)
			.then((res) => {
				props.setAudioAlbums(res.data)
				props.setLocalStorage("audioAlbums", res.data)
			}).catch(() => props.setErrors(["Failed to fetch audio albums"]))

		// Fetch Audios
		axios.get(`/api/audios`)
			.then((res) => {
				props.setAudios(res.data)
				props.setLocalStorage("audios", res.data)
			}).catch(() => props.setErrors(["Failed to fetch audios"]))
	}, [])

	const history = useHistory()
	const location = useLocation()

	//Declare States 
	const [chart, setChart] = useState("Newly Released")
	const [genre, setGenre] = useState("All")
	const [artistSlice, setArtistSlice] = useState(10)
	const [audioSlice, setAudioSlice] = useState(10)

	// Array for links
	const charts = ["Newly Released", "Trending", "Top Downloaded", "Top Liked"]
	const genres = ["All", "Afro", "Benga", "Blues", "Boomba", "Country", "Cultural", "EDM", "Genge", "Gospel", "Hiphop", "Jazz", "Music of Kenya", "Pop", "R&B", "Rock", "Sesube", "Taarab"]

	// Set class for chart link
	const onChart = (chartItem) => {
		setChart(chartItem)
	}

	// Set class for genre link
	const onGenre = (genreItem) => {
		setGenre(genreItem)
	}

	// Set state for chart list
	if (chart == "Newly Released") {
		var chartList = props.audios
	} else if (chart == "Trending") {
		var chartList = props.boughtAudios
	} else if (chart == "Top Downloaded") {
		var chartList = props.boughtAudios
	} else {
		var chartList = props.audioLikes
	}

	// Array for audio id and frequency
	var artistsArray = []
	var audiosArray = []

	// Generate Arrays
	chartList.filter((item) => {
		// Filter for genres
		// If genre is All then allow all audios
		if (genre == "All") {
			return true
		} else {

			// For Newly Released
			if (chart == "Newly Released") {
				return item.genre == genre
			}

			return props.audios.find((audio) => audio.id == item.audio_id).genre == genre
		}

	}).forEach((audio) => {

		// Set variable for id to be fetched
		if (chart == "Newly Released") {
			var getId = audio.username
			var getIdTwo = audio.id
		} else if (chart == "Trending") {
			var getId = audio.artist
			var getIdTwo = audio.audio_id
		} else if (chart == "Top Downloaded") {
			var getId = audio.artist
			var getIdTwo = audio.audio_id
		} else {
			var getId = props.audios.find((item) => item.id == audio.audio_id).username
			var getIdTwo = audio.audio_id
		}

		// Populate Artists array
		if (artistsArray.some((index) => index.key == getId)) {
			// Increment value if it exists
			var item = artistsArray.find((index) => index.key == getId)
			item && item.value++
		} else {
			// Add item if it doesn't exist
			artistsArray.push({ key: getId, value: 1 })
		}

		// Populate audios array
		if (audiosArray.some((index) => index.key == getIdTwo)) {
			// Increment value if it exists
			var item = audiosArray.find((index) => index.key == getIdTwo)
			item && item.value++
		} else {
			// Add item if it doesn't exist
			audiosArray.push({ key: getIdTwo, value: 1 })
		}
	})

	// Sort array in descending order depending on the value
	artistsArray.sort((a, b) => b.value - a.value)
	audiosArray.sort((a, b) => b.value - a.value)

	// Reverse list if chart is Newly Released
	if (chart == "Newly Released") {
		audiosArray.reverse()
	}

	// Function for buying audio to cart
	const onBuyAudios = (audio) => {
		props.onCartAudios(audio)
		setTimeout(() => history.push('/cart'), 1000)
	}

	// Function for loading more artists
	const handleScroll = (e) => {
		const bottom = e.target.scrollLeft >= (e.target.scrollWidth - (e.target.scrollWidth / 3));

		if (bottom) {
			setArtistSlice(artistSlice + 10)
		}
	}

	// Load more on page bottom
	window.onscroll = function (ev) {
		if (location.pathname.match(/audio-charts/)) {
			const bottom = (window.innerHeight + window.scrollY) >=
				(document.body.offsetHeight - document.body.offsetHeight / 16)

			if (bottom) {
				setAudioSlice(audioSlice + 8)
			}
		};
	}

	// Random array for dummy loading elements
	const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	return (
		<>
			<Carousel />
			<br />

			{/* <!-- Scroll menu - */}
			<div id="chartsMenu" className="hidden-scroll mt-2">
				<span>
					<Link to="/karaoke-charts">
						<h3>Karaoke</h3>
					</Link>
				</span>
				<span>
					<Link to="/video-charts">
						<h3>Videos</h3>
					</Link>
				</span>
				<span>
					<Link to="/audio-charts">
						<h3 className="active-scrollmenu">Audios</h3>
					</Link>
				</span>
			</div>

			{/* List of Charts */}
			<div id="chartsMenu" className="hidden-scroll m-0">
				{charts.map((chartItem, key) => (
					<span key={key}>
						<a href="#" onClick={(e) => {
							e.preventDefault()
							onChart(chartItem)
						}}>
							<h5 className={chart == chartItem ? "active-scrollmenu m-0" : "m-0"}>
								{chartItem}
							</h5>
						</a>
					</span>
				))}
			</div>

			{/* List of Genres */}
			<div id="audio-chartsMenu" className="hidden-scroll m-0">
				{genres.map((genreItem, key) => (
					<span key={key}>
						<a href="#" onClick={(e) => {
							e.preventDefault()
							onGenre(genreItem)
						}}>
							<h6 className={genre == genreItem ? "active-scrollmenu m-0" : "m-0"}>
								{genreItem}
							</h6>
						</a>
					</span>
				))}
			</div>
			{/* End of List Genres */}

			{/* <!-- Chart Area - */}
			<div className="row">
				<div className="col-sm-12">
					{/* <!-- ****** Artists Area Start ****** - */}
					<h5>Artists</h5>
					<div className="hidden-scroll" onScroll={handleScroll}>
						{/* Loading animation */}
						{dummyArray
							.filter(() => props.users.length < 1)
							.map((item, key) => (<LoadingAvatarMedia key={key} />))}

						{/*  Echo Artists  */}
						{artistsArray
							.filter((artist) => artist.key !=
								props.auth.username &&
								artist.key != "@blackmusic")
							.slice(0, artistSlice)
							.map((artistArray, key) => (
								<span key={key} style={{ padding: "5px" }}>
									{props.users
										.filter((user) => user.username == artistArray.key)
										.map((user, key) => (
											<Suspense key={key} fallback={<LoadingAvatarMedia />}>
												<AvatarMedia key={key} user={user} />
											</Suspense>
										))}
								</span>
							))}
						{/* Echo Artists End */}
					</div>
					{/* <!-- ****** Artists Area End ****** - */}
				</div>
			</div>

			<br />

			{/* <!-- ****** Songs Area ****** - */}
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-10">
					<h5 className="p-2">Songs</h5>
					{/* Loading Audio items */}
					{dummyArray
						.filter(() => props.videos.length < 1)
						.map((item, key) => (<LoadingAudioMediaHorizontal key={key} />))}

					{/* Audio Items */}
					{audiosArray
						.slice(0, audioSlice)
						.map((audioArray, key) => (
							<div key={key}>
								{props.audios
									.filter((audio) => audio.id == audioArray.key &&
										audio.username != "@blackmusic")
									.map((audio, key) => (
										<Suspense key={audio.id} fallback={<LoadingAudioMediaHorizontal />}>
											<AudioMediaHorizontal
												{...props}
												audio={audio}
												onBuyAudios={onBuyAudios} />
										</Suspense>
									))}
							</div>
						))}
					{/* <!-- ****** Songs Area End ****** - */}
				</div>
				<div className="col-sm-1"></div>
			</div>
		</>
	)
}

export default AudioCharts
