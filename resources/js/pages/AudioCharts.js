import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Img from '../components/Img'
import Button from '../components/Button'
import AudioMediaHorizontal from '../components/AudioMediaHorizontal'

const AudioCharts = (props) => {

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

	// Function for adding audio to cart
	const onCartAudios = (audio) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-audios`, {
				audio: audio
			}).then((res) => {
				props.setMessage(res.data)
				// Update Audios
				axios.get(`${props.url}/api/audios`)
					.then((res) => props.setAudios(res.data))
				// Update Cart Audios
				axios.get(`${props.url}/api/cart-audios`)
					.then((res) => props.setCartAudios(res.data))
				// Update Audio Albums
				axios.get(`${props.url}/api/audio-albums`)
					.then((res) => props.setAudioAlbums(res.data))
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

	// Function for buying audio to cart
	const onBuyAudios = (audio) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-audios`, {
				audio: audio
			}).then((res) => {
				props.setMessage(res.data)
				// Update Audios
				axios.get(`${props.url}/api/audios`)
					.then((res) => props.setAudios(res.data))
				// Update Cart Audios
				axios.get(`${props.url}/api/cart-audios`)
					.then((res) => props.setCartAudios(res.data))
				// Update Audio Albums
				axios.get(`${props.url}/api/audio-albums`)
					.then((res) => props.setAudioAlbums(res.data))
				history.push('/cart')
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
		if (location.pathname.match(/audio-charts/)) {
			const bottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - document.body.offsetHeight / 16)

			if (bottom) {
				setAudioSlice(audioSlice + 8)
			}
		};
	}

	return (
		<>
			{/* Carousel */}
			<div id="carouselExampleIndicators" className="carousel slide hidden" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					{/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
				</ol>
				<div className="carousel-inner">
					{/* {props.audios
						.slice(0, 3)
						.map((audio, key) => (
							<div key={key} className={`carousel-item ${key == 0 && 'active'}`} style={{ overflow: "hidden" }}>
								<Img
									imgClass={"d-block w-100"}
									src={`/storage/${audio.thumbnail}`}
									height="auto"
									width="100%" />
								<div className="carousel-caption d-none d-md-block">
									<h5 style={{ color: "white" }}>{audio.name}</h5>
									<p style={{ color: "white" }} >{audio.username}</p>
								</div>
							</div>
						))} */}
					<div className="carousel-item active">
						<Img
							imgClass={"d-inline w-25"}
							src="/storage/img/slide1.jpg"
							width="25%" />
						<Img
							imgClass={"d-inline w-25"}
							src="/storage/img/slide2.jpg"
							width="25%" />
						<Img
							imgClass={"d-inline w-25"}
							src="/storage/img/slide3.jpg"
							width="25%" />
						<Img
							imgClass={"d-inline w-25"}
							src="/storage/img/slide4.jpg"
							width="25%" />
					</div>
					<div className="carousel-item">
						<Img
							imgClass={"d-inline w-25"}
							src="/storage/img/1.jpg" />
						<Img
							imgClass={"d-inline w-25"}
							src="/storage/img/2.jpg" />
						<Img
							imgClass={"d-inline w-25"}
							src="/storage/img/3.jpg" />
						<Img
							imgClass={"d-inline w-25"}
							src="/storage/img/4.jpg" />
					</div>
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

			{/* Carousel Mobile */}
			<div id="carouselExampleIndicators" className="carousel slide anti-hidden" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				</ol>
				<div className="carousel-inner">
					{/* {props.audios
						.slice(0, 3)
						.map((audio, key) => (
							<div key={key} className={`carousel-item ${key == 0 && 'active'}`} style={{ overflow: "hidden" }}>
								<Img
									imgClass={"d-block w-100"}
									src={`/storage/${audio.thumbnail}`}
									height="auto"
									width="100%" />
								<div className="carousel-caption d-none d-md-block">
									<h5 style={{ color: "white" }}>{audio.name}</h5>
									<p style={{ color: "white" }} >{audio.username}</p>
								</div>
							</div>
						))} */}
					<div className="carousel-item active">
						<Img
							imgClass="d-inline w-100"
							src="/storage/img/slide1.jpg" />
					</div>
					<div className="carousel-item">
						<Img
							imgClass="d-inline w-100"
							src="/storage/img/slide2.jpg" />
					</div>
					<div className="carousel-item">
						<Img
							imgClass="d-inline w-100"
							src="/storage/img/slide3.jpg" />
					</div>
					<div className="carousel-item">
						<Img
							imgClass="d-inline w-100"
							src="/storage/img/slide4.jpg" />
					</div>
					<div className="carousel-item">
						<Img
							imgClass="d-inline w-100"
							src="/storage/img/1.jpg" />
					</div>
					<div className="carousel-item">
						<Img
							imgClass="d-inline w-100"
							src="/storage/img/2.jpg" />
					</div>
					<div className="carousel-item">
						<Img
							imgClass="d-inline w-100"
							src="/storage/img/3.jpg" />
					</div>
					<div className="carousel-item">
						<Img
							imgClass="d-inline w-100"
							src="/storage/img/4.jpg" />
					</div>
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
			{/*  Carousel Mobile End  */}

			{/* <!-- Scroll menu - */}
			<div id="chartsMenu" className="hidden-scroll mt-2">
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
							<h5 className={chart == chartItem ? "active-scrollmenu m-0" : "m-0"}>{chartItem}</h5>
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
														<small>{user.username}</small>
													</h6>
												</center>
											</span>
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
					{audiosArray
						.slice(0, audioSlice)
						.map((audioArray, key) => (
							<div key={key}>
								{props.audios
									.filter((audio) => audio.id == audioArray.key && audio.username != "@blackmusic")
									.map((audio, key) => (
										<AudioMediaHorizontal
											key={key}
											setShow={props.setShow}
											link={`/audio-show/${audio.id}`}
											thumbnail={`/storage/${audio.thumbnail}`}
											name={audio.name}
											username={audio.username}
											ft={audio.ft}
											hasBoughtAudio={!audio.hasBoughtAudio}
											audioInCart={audio.inCart}
											audioId={audio.id}
											onCartAudios={onCartAudios}
											onBuyAudios={onBuyAudios} />
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
