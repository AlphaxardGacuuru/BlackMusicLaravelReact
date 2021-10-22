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
		var chartList = props.chartVideos
	} else if (chart == "Trending") {
		var chartList = props.chartBoughtVideos
	} else if (chart == "Top Downloaded") {
		var chartList = props.chartBoughtVideos
	} else {
		var chartList = props.chartVideoLikes
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

			return props.chartVideos.find((video) => video.id == item.video_id).genre == genre
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
			var getId = props.chartVideos.find((item) => item.id == video.video_id).username
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
				axios.get(`${props.url}/api/videos`).then((res) => props.setChartCartVideos(res.data.cartVideos))
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
				axios.get(`${props.url}/api/videos`).then((res) => props.setChartCartVideos(res.data.cartVideos))
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
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				</ol>
				<div className="carousel-inner">
					{props.chartVideos
						.slice(0, 3)
						.map((video, key) => (
							<div key={key} className={`carousel-item ${key == 0 && 'active'}`} style={{ overflow: "hidden" }}>
								<Img imgClass={"d-block w-100"} src={video.thumbnail} />
								<div className="carousel-caption d-none d-md-block">
									<h5 style={{ color: "white" }}>{video.name}</h5>
									<p style={{ color: "white" }} >{video.username}</p>
								</div>
							</div>
						))}
				</div>
				<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>
			{/*  Carousel End  */}

			{/* <!-- Scroll menu - */}
			<div id="chartsMenu" className="hidden-scroll" style={{ margin: "10px 0 0 0" }}>
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
			<div id="chartsMenu" className="hidden-scroll" style={{ margin: "10px 0 0 0" }}>
				{charts.map((chartItem, key) => (
					<span key={key}>
						<a href="#" onClick={(e) => {
							e.preventDefault()
							onChart(chartItem)
						}}>
							<h5 className={chart == chartItem ? "active-scrollmenu" : ""}>{chartItem}</h5>
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
							<h6 className={genre == genreItem ? "active-scrollmenu" : ""}>{genreItem}</h6>
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
						{artistsArray.filter((artist) => artist.key != props.auth.username && artist.key != "@blackmusic")
							.slice(0, artistSlice)
							.map((artistArray, key) => (
								<span key={key} className="pt-0 pl-0 pr-0 pb-2" style={{ borderRadius: "10px" }}>
									<center>
										<div className="card avatar-thumbnail" style={{ borderRadius: "50%" }}>
											<Link to={"/profile/" + artistArray.key}>
												<Img src={
													`/storage/${props.videoChartUsers.find((user) => artistArray.key == user.username) &&
													props.videoChartUsers.find((user) => artistArray.key == user.username).pp}`
												}
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
											{props.videoChartUsers.find((user) => user.username == artistArray.key) &&
												props.videoChartUsers.find((user) => user.username == artistArray.key).name}
										</h6>
										<h6 style={{
											width: "100px",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
											{artistArray.key}
										</h6>
									</center>
								</span>
							))}
						{/* Echo Artists End */}
					</div>
					{/* <!-- ****** Artists Area End ****** - */}
					<br />

					{/* <!-- ****** Songs Area ****** - */}
					<h5>Songs</h5>
					<div className="hidden" onScroll={handleScroll}>
						{videosArray.slice(0, videoSlice).map((videoArray, key) => (
							<span key={key}
								className="card m-1 pb-2"
								style={{
									borderRadius: "10px",
									display: "inline-block",
									textAlign: "center"
								}}>
								<div className="thumbnail"
									style={{
										borderTopLeftRadius: "10px",
										borderTopRightRadius: "10px"
									}}>
									<Link to={`/video-show/${videoArray.key}`}>
										<Img
											src={props.chartVideos
												.find((video) => video.id == videoArray.key).thumbnail.match(/https/) ?
												props.chartVideos.find((video) => video.id == videoArray.key).thumbnail :
												`storage/${props.chartVideos.find((video) => video.id == videoArray.key).thumbnail}`}
											width="160em"
											height="90em" />
									</Link>
								</div>
								<h6 className="m-0 pt-2 pr-1 pl-1"
									style={{
										width: "150px",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>{props.chartVideos.find((video) => {
										return video.id == videoArray.key
									}).name}
								</h6>
								<h6 className="mt-0 mr-1 ml-1 mb-2 pt-0 pr-1 pl-1 pb-0">
									<small>
										{props.chartVideos.find((video) => {
											return video.id == videoArray.key
										}).username}
									</small>
									<small className="ml-1">
										{props.chartVideos.find((video) => {
											return video.id == videoArray.key
										}).ft}
									</small>
								</h6>
								{!props.chartBoughtVideos
									.some((boughtVideo) => {
										return boughtVideo.video_id == videoArray.key &&
											boughtVideo.username == props.auth.username
									}) ?
									props.chartCartVideos
										.find((cartVideo) => {
											return cartVideo.video_id == videoArray.key &&
												cartVideo.username == props.auth.username
										}) ? <button
											className="btn btn-light mb-1 rounded-0"
											style={{ minWidth: '90px', height: '33px' }}
											onClick={() => onCartVideos(videoArray.key)}>
										<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
											fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
											<path fillRule='evenodd'
												d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
										</svg>
									</button>
										: <button
											className="mysonar-btn mb-1"
											style={{ minWidth: '90px', height: '33px' }}
											onClick={() => onCartVideos(videoArray.key)}>
											<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
												fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
												<path fillRule='evenodd'
													d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
											</svg>
										</button> : ""}
								<br />
								{!props.chartBoughtVideos
									.some((boughtVideo) => {
										return boughtVideo.video_id == videoArray.key &&
											boughtVideo.username == props.auth.username
									}) &&
									<Button
										btnClass={'btn mysonar-btn green-btn'}
										btnText={'buy'}
										onClick={() => onBuyVideos(videoArray.key)} />}
							</span>
						))}
					</div>
					{/* <!-- ****** Songs Area End ****** - */}

					{/* For mobile */}
					<div className="anti-hidden">
						{videosArray.slice(0, videoSlice).map((videoArray, key) => (
							<VideoMediaHorizontal
								key={key}
								onClick={() => props.setShow(0)}
								setShow={props.setShow}
								link={`/video-show/${videoArray.key}`}
								thumbnail={
									props.chartVideos.find((video) => video.id == videoArray.key).thumbnail.match(/https/) ?
										props.chartVideos.find((video) => video.id == videoArray.key).thumbnail :
										`storage/${props.chartVideos.find((video) => video.id == videoArray.key).thumbnail}`
								}
								name={props.chartVideos.find((video) => video.id == videoArray.key).name}
								username={props.chartVideos.find((video) => video.id == videoArray.key).username}
								ft={props.chartVideos.find((video) => video.id == videoArray.key).ft}
								hasBoughtVideo={
									!props.chartBoughtVideos
										.some((boughtVideo) => {
											return boughtVideo.video_id == videoArray.key &&
												boughtVideo.username == props.auth.username
										})
								}
								videoInCart={
									props.chartCartVideos
										.some((cartVideo) => {
											return cartVideo.video_id == videoArray.key &&
												cartVideo.username == props.auth.username
										})
								}
								videoId={videoArray.key}
								onCartVideos={onCartVideos}
								onBuyVideos={onBuyVideos} />
						))}

						{/* <!-- End of Chart Area - */}
					</div>
				</div>
			</div>
		</>
	)
}

export default VideoCharts
