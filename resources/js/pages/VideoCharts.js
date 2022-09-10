import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import Carousel from '../components/Carousel'
import LoadingVideoMediaVertical from '../components/LoadingVideoMediaVertical'
import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'
import LoadingAvatarMedia from '../components/LoadingAvatarMedia'
import { divide } from 'lodash'

const VideoMediaVertical = React.lazy(() => import('../components/VideoMediaVertical'))
const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))
const AvatarMedia = React.lazy(() => import('../components/AvatarMedia'))

const VideoCharts = (props) => {

	axios.defaults.baseURL = props.url

	useEffect(() => {
		// Fetch Video Albums
		axios.get(`/api/video-albums`)
			.then((res) => {
				props.setVideoAlbums(res.data)
				props.setLocalStorage("videoAlbums", res.data)
			}).catch(() => props.setErrors(["Failed to fetch video albums"]))

		// Fetch Videos
		axios.get(`/api/videos`)
			.then((res) => {
				props.setVideos(res.data)
				props.setLocalStorage("videos", res.data)
			}).catch(() => props.setErrors(["Failed to fetch videos"]))
	}, [])

	const history = useHistory()
	const location = useLocation()

	//Declare States 
	const [chart, setChart] = useState("Newly Released")
	const [genre, setGenre] = useState("All")
	const [artistSlice, setArtistSlice] = useState(10)
	const [videoSlice, setVideoSlice] = useState(10)

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
		var chartList = props.videos
	} else if (chart == "Trending") {
		var chartList = props.boughtVideos
	} else if (chart == "Top Downloaded") {
		var chartList = props.boughtVideos
	} else {
		var chartList = props.videoLikes
	}

	// Array for video id and frequency
	var artistsArray = []
	var videosArray = []

	// Generate Arrays
	chartList.filter((item) => {
		// Filter for genres
		// If genre is All then allow all videos
		if (genre == "All") {
			return true
		} else {
			// For Newly Released
			if (chart == "Newly Released") {
				return item.genre == genre
			}

			return props.videos.find((video) => video.id == item.video_id).genre == genre
		}
	}).forEach((video) => {

		// Set variable for id to be fetched
		if (chart == "Newly Released") {
			var getId = video.username
			var getIdTwo = video.id
		} else if (chart == "Trending") {
			var getId = video.artist
			var getIdTwo = video.video_id
		} else if (chart == "Top Downloaded") {
			var getId = video.artist
			var getIdTwo = video.video_id
		} else {
			var getId = props.videos.find((item) => item.id == video.video_id).username
			var getIdTwo = video.video_id
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

		// Populate Videos array
		if (videosArray.some((index) => index.key == getIdTwo)) {
			// Increment value if it exists
			var item = videosArray.find((index) => index.key == getIdTwo)
			item && item.value++
		} else {
			// Add item if it doesn't exist
			videosArray.push({ key: getIdTwo, value: 1 })
		}
	})

	// Sort array in descending order depending on the value
	artistsArray.sort((a, b) => b.value - a.value)
	videosArray.sort((a, b) => b.value - a.value)

	// Reverse list if chart is Newly Released
	if (chart == "Newly Released") {
		videosArray.reverse()
	}

	// Function for buying video to cart
	const onBuyVideos = (video) => {
		props.onCartVideos(video)
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
		if (location.pathname.match(/video-charts/)) {
			const bottom = (window.innerHeight + window.scrollY) >=
				(document.body.offsetHeight - document.body.offsetHeight / 16)

			if (bottom) {
				setVideoSlice(videoSlice + 8)
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
					<Link to="#">
						<h3 className="active-scrollmenu">Videos</h3>
					</Link>
				</span>
				<span>
					<Link to="/audio-charts">
						<h3>Audios</h3>
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
			<div id="video-chartsMenu" className="hidden-scroll m-0">
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

					{/* <!-- ****** Songs Area ****** - */}
					<h5>Songs</h5>
					<center className="hidden">
						<div className="d-flex flex-wrap justify-content-center" onScroll={handleScroll}>
							{/* Loading Video items */}
							{dummyArray
								.filter(() => props.videos.length < 1)
								.map((item, key) => (
									<center className="mx-1 mb-2">
										<LoadingVideoMediaVertical key={key} />
									</center>
								))}

							{/* Real Video items */}
							{videosArray
								.slice(0, videoSlice)
								.map((videoArray, key) => (
									<span key={key} style={{ textAlign: "center" }}>
										{props.videos
											.filter((video) => video.id == videoArray.key &&
												video.username != "@blackmusic")
											.map((video, key) => (
												<center key={video.id} className="mx-1 mb-2">
													<Suspense fallback={<LoadingVideoMediaVertical />}>
														<VideoMediaVertical
															{...props}
															video={video}
															onBuyVideos={onBuyVideos}
															onClick={() => props.setShow(0)} />
													</Suspense>
												</center>
											))}
									</span>
								))}
						</div>
					</center>
					{/* <!-- ****** Songs Area End ****** - */}

					{/* For mobile */}
					<div className="anti-hidden">
						{/* Loading Video items */}
						{dummyArray
							.filter(() => props.videos.length < 1)
							.map((item, key) => (<LoadingVideoMediaHorizontal key={key} />))}

						{/* Real Video items */}
						{videosArray
							.slice(0, videoSlice)
							.map((videoArray, key) => (
								<div key={key}>
									{props.videos
										.filter((video) => video.id == videoArray.key &&
											video.username != "@blackmusic")
										.map((video, key) => (
											<Suspense key={key} fallback={<LoadingVideoMediaHorizontal />}>
												<VideoMediaHorizontal
													{...props}
													video={video}
													onBuyVideos={onBuyVideos}
													onClick={() => props.setShow(0)} />
											</Suspense>
										))}
								</div>
							))}
						{/* <!-- End of Chart Area - */}
					</div>
				</div>
			</div>
		</>
	)
}

export default VideoCharts
