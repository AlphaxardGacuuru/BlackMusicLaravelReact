import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'
import AudioMediaHorizontal from '../components/AudioMediaHorizontal'

const AudioCharts = (props) => {

	const history = useHistory()

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
				axios.get(`${props.url}/api/cart-audios`).then((res) => props.setCartAudios(res.data))
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
				axios.get(`${props.url}/api/cart-audios`).then((res) => props.setCartAudios(res.data))
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
	const onArtistSlice = () => {
		setArtistSlice(artistSlice + 10)
	}

	// Function for loading more audios
	const onAudioSlice = () => {
		setAudioSlice(audioSlice + 8)
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
					{props.audios
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
			<div id="audio-chartsMenu" className="hidden-scroll m-0">
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
					<div className="hidden-scroll">
						{/*  Echo Artists  */}
						{artistsArray.filter((artist) => artist.key != props.auth.username && artist.key != "@blackmusic")
							.slice(0, artistSlice)
							.map((artistArray, key) => (
								<span key={key} className="pt-0 pl-0 pr-0 pb-2" style={{ borderRadius: "10px" }}>
									<center>
										<div className="card avatar-thumbnail" style={{ borderRadius: "50%" }}>
											<Link to={"/profile/" + artistArray.key}>
												<Img src={`/storage/${props.users
													.find((user) => user.username == artistArray.key) &&
													props.users.find((user) => user.username == artistArray.key).pp}`}
													width='150px'
													height='150px' />
											</Link>
										</div>
										<h6 className="mt-2"
											style={{
												width: "100px",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											{props.users.find((user) => user.username == artistArray.key) &&
												props.users.find((user) => user.username == artistArray.key).name}
										</h6>
										<h6 style={{
											width: "100px",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
											<small>
												{artistArray.key}
											</small>
										</h6>
									</center>
								</span>
							))}

						{/* Load More button */}
						<span>
							<center>
								<div
									className="card avatar-thumbnail ml-3"
									style={{ borderRadius: "50%", width: "50px", height: "50px" }}
									onClick={onArtistSlice}>
									<Img src={'/storage/img/musical-note.png'} />
								</div>
								<br />
								<br />
								<br />
								<br />
							</center>
						</span>
						{/* Load More button End */}
						
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
					{audiosArray.slice(0, audioSlice).map((audioArray, key) => (
						<AudioMediaHorizontal
							key={key}
							setShow={props.setShow}
							link={`/audio-show/${audioArray.key}`}
							thumbnail={
								props.audios.find((audio) => audio.id == audioArray.key).thumbnail.match(/https/) ?
									props.audios.find((audio) => audio.id == audioArray.key).thumbnail :
									`storage/${props.audios.find((audio) => audio.id == audioArray.key).thumbnail}`
							}
							name={props.audios.find((audio) => audio.id == audioArray.key).name}
							username={props.audios.find((audio) => audio.id == audioArray.key).username}
							ft={props.audios.find((audio) => audio.id == audioArray.key).ft}
							hasBoughtAudio={
								!props.boughtAudios
									.some((boughtAudio) => {
										return boughtAudio.audio_id == audioArray.key &&
											boughtAudio.username == props.auth.username
									})
							}
							audioInCart={
								props.cartAudios
									.some((cartAudio) => {
										return cartAudio.audio_id == audioArray.key &&
											cartAudio.username == props.auth.username
									})
							}
							audioId={audioArray.key}
							onCartAudios={onCartAudios}
							onBuyAudios={onBuyAudios} />
					))}

					{/* Load More button */}
					<center className="my-4">
						<Button btnClass="mysonar-btn" btnText="load more" onClick={onAudioSlice} />
					</center>
					{/* Load More button End */}

					{/* <!-- ****** Songs Area End ****** - */}
				</div>
				<div className="col-sm-1"></div>
			</div>
		</>
	)
}

export default AudioCharts
