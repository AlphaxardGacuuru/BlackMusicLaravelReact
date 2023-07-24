import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import Carousel from "@/components/Core/Carousel"
import LoadingAudioMedia from "@/components/Audio/LoadingAudioMedia"
import LoadingAvatarMedia from "@/components/User/LoadingAvatarMedia"
import AudioMedia from "@/components/Audio/AudioMedia"
import AvatarMedia from "@/components/User/AvatarMedia"

const AudioCharts = (props) => {
	const location = useLocation()

	//Declare States
	const [chart, setChart] = useState("Newly Released")
	const [genre, setGenre] = useState("All")
	const [artistSlice, setArtistSlice] = useState(8)
	const [audioSlice, setAudioSlice] = useState(8)
	// Charts
	const [newlyReleased, setNewlyReleased] = useState([])
	const [trending, setTrending] = useState([])
	const [topDownloaded, setTopDownloaded] = useState([])
	const [topLiked, setTopLiked] = useState([])

	useEffect(() => {
		// Set state for chart list
		if (chart == "Newly Released") {
			// Fetch Newly Released Audios
			props.get("audio-charts/newly-released", setNewlyReleased)
		} else if (chart == "Trending") {
			// Fetch Trending Audios
			props.get("audio-charts/trending", setTrending)
		} else if (chart == "Top Downloaded") {
			// Fetch Top Downloaded Audios
			props.get("audio-charts/top-downloaded", setTopDownloaded)
		} else {
			// Fetch Top Liked Audios
			props.get("audio-charts/top-liked", setTopLiked)
		}
	}, [chart])

	useEffect(() => {
		// Load more on page bottom
		window.onscroll = function (ev) {
			if (location.pathname.match(/audio-charts/)) {
				const bottom =
					window.innerHeight + window.scrollY >=
					document.body.offsetHeight - document.body.offsetHeight / 16

				if (bottom) {
					setAudioSlice(audioSlice + 8)
				}
			}
		}
	}, [])

	// Array for links
	const charts = ["Newly Released", "Trending", "Top Downloaded", "Top Liked"]
	const genres = [
		"All",
		"Afro",
		"Benga",
		"Blues",
		"Boomba",
		"Country",
		"Cultural",
		"EDM",
		"Genge",
		"Gospel",
		"Hiphop",
		"Jazz",
		"Music of Kenya",
		"Pop",
		"R&B",
		"Rock",
		"Sesube",
		"Taarab",
	]

	// Set state for chart list
	if (chart == "Newly Released") {
		var chartList = newlyReleased
	} else if (chart == "Trending") {
		var chartList = trending
	} else if (chart == "Top Downloaded") {
		var chartList = topDownloaded
	} else {
		var chartList = topLiked
	}

	// Function for loading more artists
	const handleScroll = (e) => {
		const bottom =
			e.target.scrollLeft >= e.target.scrollWidth - e.target.scrollWidth / 3

		if (bottom) {
			setArtistSlice(artistSlice + 10)
		}
	}

	// Random array for dummy loading elements
	const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	return (
		<>
			<Carousel />
			<br />

			{/* <!-- Scroll menu - */}
			<div
				id="chartsMenu"
				className="hidden-scroll mt-2">
				<span>
					<Link to="/karaoke/charts">
						<h3>Karaoke</h3>
					</Link>
				</span>
				<span>
					<Link to="/video/charts">
						<h3>Videos</h3>
					</Link>
				</span>
				<span>
					<Link to="/audio/charts">
						<h3 className="active-scrollmenu">Audios</h3>
					</Link>
				</span>
			</div>

			{/* List of Charts */}
			<div
				id="chartsMenu"
				className="hidden-scroll m-0">
				{charts.map((chartItem, key) => (
					<span key={key}>
						<a
							href="#"
							onClick={(e) => {
								e.preventDefault()
								setChart(chartItem)
							}}>
							<h5
								className={
									chart == chartItem ? "active-scrollmenu m-0" : "m-0"
								}>
								{chartItem}
							</h5>
						</a>
					</span>
				))}
			</div>

			{/* List of Genres */}
			<div
				id="audio-chartsMenu"
				className="hidden-scroll m-0">
				{genres.map((genreItem, key) => (
					<span key={key}>
						<a
							href="#"
							onClick={(e) => {
								e.preventDefault()
								setGenre(genreItem)
							}}>
							<h6
								className={
									genre == genreItem ? "active-scrollmenu m-0" : "m-0"
								}>
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
					<h2>Artists</h2>
					<div
						className="hidden-scroll"
						onScroll={handleScroll}>
						{/* Loading animation */}
						{dummyArray
							.filter(() => chartList.length < 1)
							.map((item, key) => (
								<LoadingAvatarMedia key={key} />
							))}

						{/*  Echo Artists  */}
						<span style={{ padding: "5px" }}>
							{chartList.artists
								?.filter((artist) => artist.username != "@blackmusic")
								.slice(0, artistSlice)
								.map((artist, key) => (
									<AvatarMedia
										key={key}
										user={artist}
									/>
								))}
						</span>
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
					<h2 className="p-2">Songs</h2>
					{/* Loading Audio items */}
					{dummyArray
						.filter(() => chartList.length < 1)
						.map((item, key) => (
							<LoadingAudioMedia key={key} />
						))}

					{/* Audio Items */}
					{chartList.audios
						?.filter((audio) => audio.username != "@blackmusic")
						.filter((audio) => (genre == "All" ? true : audio.genre == genre))
						.slice(0, audioSlice)
						.map((audio, key) => (
							<div key={key}>
								<AudioMedia
									{...props}
									key={key}
									audio={audio}
								/>
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
