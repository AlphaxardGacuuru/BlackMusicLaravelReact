import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'
import VideoMediaHorizontal from '../components/VideoMediaHorizontal'

const VideoCharts = (props) => {

	const history = useHistory()

	const location = useLocation()

	//Declare States 
	const [chart, setChart] = useState("Newly Released")
	const [genre, setGenre] = useState("All")
	const [artistSlice, setArtistSlice] = useState(10)
	const [videoSlice, setVideoSlice] = useState(8)

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

	// Function for adding video to cart
	const onCartVideos = (video) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-videos`, {
				video: video
			}).then((res) => {
				props.setMessage(res.data)
				// Update Videos
				axios.get(`${props.url}/api/videos`)
					.then((res) => props.setVideos(res.data))
				// Update Cart Videos
				axios.get(`${props.url}/api/cart-videos`)
					.then((res) => props.setCartVideos(res.data))
				// Update Videos Albums
				axios.get(`${props.url}/api/video-albums`)
					.then((res) => props.setVideoAlbums(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		});
	}

	// Function for buying video to cart
	const onBuyVideos = (video) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-videos`, {
				video: video
			}).then((res) => {
				props.setMessage(res.data)
				// Update Videos
				axios.get(`${props.url}/api/videos`)
					.then((res) => props.setVideos(res.data))
				// Update Cart Videos
				axios.get(`${props.url}/api/cart-videos`)
					.then((res) => props.setCartVideos(res.data))
				// Update Videos Albums
				axios.get(`${props.url}/api/video-albums`)
					.then((res) => props.setVideoAlbums(res.data))
				setTimeout(() => history.push('/cart'), 1000)
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		});
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
			const bottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - document.body.offsetHeight / 16)

			if (bottom) {
				setVideoSlice(videoSlice + 8)
			}
		};
	}

	return (
		<>
			{/* Carousel */}
			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
				{/* <ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				</ol> */}
				<div className="carousel-inner">
					{props.videos
						.slice(0, 3)
						.map((video, key) => (
							<div
								key={key}
								className={`carousel-item ${key == 0 && 'active'}`}
								style={{ overflow: "hidden" }}>
								<Img imgClass={"d-block w-100"} src={video.thumbnail} />
								<div className="carousel-caption d-none d-md-block">
									<h5 style={{ color: "white" }}>{video.name}</h5>
									<p style={{ color: "white" }} >{video.username}</p>
								</div>
							</div>
						))}
				</div>
				{/* <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a> */}
			</div>
			{/*  Carousel End  */}

			{/* <!-- Scroll menu - */}
			<div id="chartsMenu" className="hidden-scroll mt-2">
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
							<h5 className={chart == chartItem ? "active-scrollmenu m-0" : "m-0"}>{chartItem}</h5>
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
							<h6 className={genre == genreItem ? "active-scrollmenu m-0" : "m-0"}>{genreItem}</h6>
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
											<span key={key} className="m-0 p-0">
												<center>
													<div className="card avatar-thumbnail" style={{ borderRadius: "50%" }}>
														<Link to={"/profile/" + user.username}>
															<Img src={user.pp}
																width='150px'
																height='150px' />
														</Link>
													</div>
													<h6 className="mt-2 mb-0"
														style={{
															width: "100px",
															whiteSpace: "nowrap",
															overflow: "hidden",
															textOverflow: "clip"
														}}>
														{user.name}
													</h6>
													<h6 style={{
														width: "100px",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "clip"
													}}>
														{user.username}
													</h6>
												</center>
											</span>
										))}
								</span>
							))}
						{/* Echo Artists End */}
					</div>
					{/* <!-- ****** Artists Area End ****** - */}

					{/* <!-- ****** Songs Area ****** - */}
					<h5>Songs</h5>
					<div className="hidden" onScroll={handleScroll}>
						{videosArray
							.slice(0, videoSlice)
							.map((videoArray, key) => (
								<span key={key}>
									{props.videos
										.filter((video) => video.id == videoArray.key)
										.map((video, key) => (
											<span key={key}
												className="card m-1 pb-2"
												style={{
													borderRadius: "0px",
													display: "inline-block",
													textAlign: "center"
												}}>
												<div className="thumbnail">
													<Link to={`/video-show/${video.id}`}>
														<Img src={video.thumbnail}
															width="160em"
															height="90em" />
													</Link>
												</div>
												<h6 className="m-0 pt-2 px-1"
													style={{
														width: "150px",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "clip"
													}}>{video.name}
												</h6>
												<h6 className="mt-0 mx-1 mb-2 py-0 px-1">
													<small>{video.username}</small>
													<small className="ml-1">{video.ft}</small>
												</h6>
												{!video.hasBoughtVideo ?
													video.inCart ?
														<button className="btn btn-light mb-1 rounded-0"
															style={{ minWidth: '90px', height: '33px' }}
															onClick={() => onCartVideos(videoArray.key)}>
															<svg className='bi bi-cart3'
																width='1em'
																height='1em'
																viewBox='0 0 16 16'
																fill='currentColor'
																xmlns='http://www.w3.org/2000/svg'>
																<path fillRule='evenodd'
																	d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
															</svg>
														</button> :
														<button className="mysonar-btn mb-1"
															style={{ minWidth: '90px', height: '33px' }}
															onClick={() => onCartVideos(videoArray.key)}>
															<svg className='bi bi-cart3'
																width='1em'
																height='1em'
																viewBox='0 0 16 16'
																fill='currentColor'
																xmlns='http://www.w3.org/2000/svg'>
																<path fillRule='evenodd'
																	d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
															</svg>
														</button> : ""}
												<br />
												{!video.hasBoughtVideo &&
													<Button
														btnClass={'btn mysonar-btn green-btn'}
														btnText={'buy'}
														onClick={() => onBuyVideos(videoArray.key)} />}
											</span>
										))}
								</span>
							))}
					</div>
					{/* <!-- ****** Songs Area End ****** - */}

					{/* For mobile */}
					<div className="anti-hidden">
						{videosArray
							.slice(0, videoSlice)
							.map((videoArray, key) => (
								<div key={key}>
									{props.videos
										.filter((video) => video.id == videoArray.key)
										.map((video, key) => (
											<VideoMediaHorizontal
												key={key}
												onClick={() => props.setShow(0)}
												setShow={props.setShow}
												link={`/video-show/${video.id}`}
												thumbnail={video.thumbnail}
												name={video.name}
												username={video.username}
												ft={video.ft}
												hasBoughtVideo={!video.hasBoughtVideo}
												videoInCart={video.inCart}
												videoId={videoArray.key}
												onCartVideos={onCartVideos}
												onBuyVideos={onBuyVideos} />
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
