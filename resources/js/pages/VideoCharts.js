import React, { useState, useEffect, Suspense } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'
import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'

const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))

const VideoCharts = (props) => {

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
			const bottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - document.body.offsetHeight / 16)

			if (bottom) {
				setVideoSlice(videoSlice + 8)
			}
		};
	}

	// Random array for dummy loading elements
	const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	return (
		<>
			<div className="d-flex mt-2">
				<div className=""
					style={{
						width: "100%",
						height: window.innerHeight * 0.75,
						overflow: "hidden",
					}}>
					<Img src="/storage/img/Ad1.jpg" width="100%" />
				</div>
				<div className="hidden"
					style={{
						width: "100%",
						height: window.innerHeight * 0.75,
						overflow: "hidden"
					}}>
					<Img src="/storage/img/PSX_20220206_210037.jpg" width="100%" />
				</div>
				<div className="hidden"
					style={{
						width: "100%",
						height: window.innerHeight * 0.75,
						overflow: "hidden"
					}}>
					<Img src="/storage/img/PSX_20220206_205615.jpg" width="100%" />
				</div>
				<div className="hidden"
					style={{
						width: "100%",
						height: window.innerHeight * 0.75,
						overflow: "hidden"
					}}>
					<Img src="/storage/img/PSX_20220206_205133.jpg" width="100%" />
				</div>
				{/* Overlay gradient */}
				<div className="mt-2" style={{
					position: "absolute",
					zIndex: "1",
					top: 0,
					right: 0,
					left: 0,
					bottom: 0,
					height: window.innerHeight * 0.85,
					backgroundImage: "linear-gradient(to bottom, rgba(35,35,35,1), rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,1))"
				}}>
					{/* <div
						className="d-flex justify-content-between"
						style={{
							position: "absolute",
							zIndex: "1",
							right: 0,
							left: 0,
							bottom: 50
						}}>
						<div className="p-2">
							<h3>Kenya's best</h3>
						</div>
						<div className="p-2">
							<Button
								btnClass="mysonar-btn"
								btnStyle={{ backgroundColor: "transparent" }}
								btnText="Button" />
						</div>
					</div> */}
				</div>
			</div>
			<br />

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
						{/* Loading animation */}
						{dummyArray
							.filter(() => props.users.length < 1)
							.map((item, key) => (
								<span key={key} style={{ padding: "5px" }}>
									<span key={key} className="m-0 p-0">
										<center>
											<div className="avatar-thumbnail" style={{ borderRadius: "50%" }}>
												<div
													className="bg-dark text-light gradient"
													style={{ width: "150px", height: "150px" }}>
												</div>
											</div>
											<h6 className="mt-2 mb-0 gradient"
												style={{
													width: "100px",
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "clip",
													color: "#232323"
												}}>
												user.name
											</h6>
											<h6 className="gradient"
												style={{
													width: "100px",
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "clip",
													color: "#232323"
												}}>
												user.username
											</h6>
										</center>
									</span>
								</span>
							))}

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
													<div className="avatar-thumbnail" style={{ borderRadius: "50%" }}>
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
						{/* Loading Video items */}
						{dummyArray
							.filter(() => props.videos.length < 1)
							.map((item, key) => (
								<span key={key}>
									<span
										className="m-1 pb-2"
										style={{
											borderRadius: "0px",
											display: "inline-block",
											textAlign: "center",
											color: "#232323"
										}}>
										<div className="thumbnail">
											<div className="bg-light gradient" style={{ width: "160em", height: "90em" }}></div>
										</div>
										<h6 className="m-0 pt-2 px-1 gradient w-75"
											style={{
												width: "150px",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip",
												color: "#232323"
											}}>
											video
										</h6>
										<h6 className="mt-0 mx-1 mb-2 px-1 py-0 gradient w-50" style={{ color: "#232323" }}>username</h6>
										<button
											className="btn mb-1 rounded-0"
											style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
										</button>
										<br />
										<button
											className="btn mb-1 rounded-0"
											style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
										</button>
									</span>
								</span>
							))}

						{/* Real Video items */}
						{videosArray
							.slice(0, videoSlice)
							.map((videoArray, key) => (
								<span key={key}>
									{props.videos
										.filter((video) => video.id == videoArray.key && video.username != "@blackmusic")
										.map((video, key) => (
											<span key={key}
												className="m-1 pb-2"
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
														<button className="btn text-light mb-1 rounded-0"
															style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}
															onClick={() => props.onCartVideos(videoArray.key)}>
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
														<button className="mysonar-btn white-btn mb-1"
															style={{ minWidth: '90px', height: '33px' }}
															onClick={() => props.onCartVideos(videoArray.key)}>
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
												{!video.hasBoughtVideo ?
													!video.inCart &&
													<Button
														btnClass={'btn mysonar-btn green-btn btn-2'}
														btnText={'buy'}
														onClick={() => onBuyVideos(videoArray.key)} /> : ""}
											</span>
										))}
								</span>
							))}
					</div>
					{/* <!-- ****** Songs Area End ****** - */}

					{/* For mobile */}
					<div className="anti-hidden">
						{/* Loading Video items */}
						{dummyArray
							.filter(() => props.videos.length < 1)
							.map((item, key) => (
								<div key={key} className="d-flex p-2 border-bottom">
									<div className="thumbnail gradient">
										<div className="w-25 h-25"></div>
									</div>
									<div className="ml-2 mr-auto flex-grow-1">
										<h6 className="mb-0 bg-light text-light gradient"
											style={{
												width: "8em",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											props.name
										</h6>
										<h6 className="mb-3 bg-light text-light gradient"
											style={{
												width: "8em",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											<small>props.username</small>
											<small className="ml-1">props.ft</small>
										</h6>
										<button
											className="btn btn-light mb-1 rounded-0"
											style={{ minWidth: '40px', height: '33px' }}>
										</button>
										<button
											className="btn btn-light mb-1 rounded-0 float-right"
											style={{ minWidth: '90px', height: '33px' }}>
										</button>
									</div>
								</div>
							))}

						{/* Real Video items */}
						{videosArray
							.slice(0, videoSlice)
							.map((videoArray, key) => (
								<div key={key}>
									{props.videos
										.filter((video) => video.id == videoArray.key && video.username != "@blackmusic")
										.map((video, key) => (
											<Suspense key={key} fallback={<LoadingVideoMediaHorizontal />}>
												<VideoMediaHorizontal
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
													onCartVideos={props.onCartVideos}
													onBuyVideos={onBuyVideos} />
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
