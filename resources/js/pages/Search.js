import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Img from '../components/Img'
import VideoMediaHorizontal from '../components/VideoMediaHorizontal'
import AudioMediaHorizontal from '../components/AudioMediaHorizontal'

const Search = (props) => {

	axios.defaults.baseURL = props.url

	const history = useHistory()
	const [searchHistory, setSearchHistory] = useState(props.getLocalStorage("searchHistory"))

	// Fetch Search History
	useEffect(() => {
		axios.get(`/api/search`)
			.then((res) => {
				setSearchHistory(res.data)
				props.setLocalStorage("searchHistory", res.data)
			})
			.catch(() => props.setErrors(['Failed to fetch search history']))
	}, [])

	var userResults = props.users
		.filter((user) => {
			return user.username != props.auth.username &&
				user.username != "@blackmusic" &&
				user.account_type == "musician" &&
				user.username.match(props.search)
		})

	var videoResults = props.videos
		.filter((video) => video.name.match(props.search) &&
			video.username != props.auth.username)

	var audioResults = props.audios
		.filter((audio) => audio.name.match(props.search) &&
			audio.username != props.auth.username)

	var audioAlbumResults = props.audioAlbums
		.filter((audioAlbum) => {
			return audioAlbum.name != "Singles" &&
				audioAlbum.name.match(props.search) &&
				audioAlbum.username != props.auth.username
		})

	var videoAlbumResults = props.videoAlbums
		.filter((videoAlbum) => {
			return videoAlbum.name != "Singles" &&
				videoAlbum.name.match(props.search) &&
				videoAlbum.username != props.auth.username
		})

	// Function for buying video to cart
	const onBuyVideos = (video) => {
		props.onCartVideos(video)
		setTimeout(() => history.push('/cart'), 1000)
	}

	// Function for buying audio to cart
	const onBuyAudios = (audio) => {
		props.onCartAudios(audio)
		setTimeout(() => history.push('/cart'), 1000)
	}

	// Save search
	const onSearch = (keyword) => {
		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`/api/search`, { keyword: keyword })
				.then((res) => props.setMessages(res.data))
		})
	}

	// Delete search item
	const onDeleteSearch = (id) => {
		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.delete(`/api/search/${id}`)
				.then((res) => {
					// Update search
					axios.get(`/api/search`)
						.then((res) => setSearchHistory(res.data))
				})
		});
	}

	return (
		<>
			<div className="row">
				<div className="col-sm-2"></div>
				<div className="col-sm-8">
					{/* <!-- For mobile --> */}
					{/* <!-- ***** Header Area Start ***** --> */}
					<header style={{ backgroundColor: "#232323" }} className="header-area anti-hidden">
						<div className="container-fluid p-0">
							<div className="row">
								<div className="col-12 p-0">
									{/* <!-- Contact form --> */}
									<div className="contact-form">
										<input
											ref={props.searchInput}
											className="form-control"
											placeholder="Search songs and artists"
											style={{ color: "white", width: "100%" }}
											onChange={(e) => {
												var regex = new RegExp(e.target.value, 'gi');
												props.setSearch(regex)
											}} />
									</div>
								</div>
							</div>
						</div>
					</header>
					<br className="anti-hidden" />

					{userResults.length == 0 &&
						videoResults.length == 0 &&
						audioResults.length == 0 &&
						videoAlbumResults.length == 0 &&
						audioAlbumResults.length == 0 &&
						searchHistory.map((search, key) => (
							<div key={key} className="d-flex justify-content-between border-bottom border-dark">
								<div className="p-2">
									<span>{search.keyword}</span>
								</div>
								<div className="p-2">
									<span onClick={() => onDeleteSearch(search.id)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="30"
											height="30"
											fill="currentColor"
											className="bi bi-x"
											viewBox="0 0 16 16">
											<path
												d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
										</svg>
									</span>
								</div>
							</div>
						))}

					{/* <!-- ****** Artists Area Start ****** --> */}
					{userResults.length > 0 && <h4>Artists</h4>}
					<div className="hidden-scroll">
						{/*  Echo Artists  */}
						{userResults.map((artist, key) => (
							<span
								key={key}
								className="pt-0 px-0 pb-2"
								style={{ borderRadius: "10px" }}
								onClick={() => onSearch(artist.username)}>
								<center>
									<div className="avatar-thumbnail" style={{ borderRadius: "50%" }}>
										<Link to={"/profile/" + artist.username}>
											<Img src={artist.pp}
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
										{artist.name}
									</h6>
									<h6 style={{
										width: "100px",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>
										<small>{artist.username}</small>
									</h6>
								</center>
							</span>
						))}
						{/* Echo Artists End */}
					</div>
					{/* <!-- ****** Artists Area End ****** - */}
				</div>
				<div className="col-sm-2"></div>
			</div>

			<div className="row">
				<div className="col-sm-3"></div>
				<div className="col-sm-3">
					{/* Videos */}
					{videoResults.length > 0 &&
						<div className="p-2 border-bottom">
							<h4>Videos</h4>
						</div>}
					{videoResults
						.slice(0, 5)
						.map((video, key) => (
							<div key={key} onClick={() => onSearch(video.name)}>
								<VideoMediaHorizontal
									key={key}
									onClick={() => props.setShow(0)}
									setShow={props.setShow}
									link={`/video-show/${video.id}`}
									thumbnail={video.thumbnail}
									name={video.name}
									username={video.username}
									ft={video.ft}
									videoInCart={video.inCart}
									hasBoughtVideo={!video.hasBoughtVideo}
									videoId={video.id}
									onCartVideos={props.onCartVideos}
									onBuyVideos={onBuyVideos} />
							</div>
						))}
					{/* Videos End */}
				</div>

				<div className="col-sm-3">
					{/* Audios */}
					{audioResults.length > 0 &&
						<div className="p-2 mt-2 border-bottom">
							<h4>Audios</h4>
						</div>}
					{audioResults
						.slice(0, 5)
						.map((audio, key) => (
							<div key={key} onClick={() => onSearch(audio.name)}>
								<AudioMediaHorizontal
									key={key}
									setShow={props.setShow}
									setLocalStorage={props.setLocalStorage}
									link={`/audio-show/${audio.id}`}
									thumbnail={`/storage/${audio.thumbnail}`}
									name={audio.name}
									username={audio.username}
									ft={audio.ft}
									hasBoughtAudio={!props.hasBought}
									audioInCart={audio.inCart}
									audioId={audio.id}
									onCartAudios={props.onCartAudios}
									onBuyAudios={onBuyAudios} />
							</div>
						))}
					{/* Audios End */}
				</div>
				<div className="col-sm-3"></div>
			</div>

			<div className="row">
				<div className="col-sm-3"></div>
				<div className="col-sm-3">
					{videoAlbumResults.lenth > 0 &&
						<div className="p-2 mt-5 mb-3 border-bottom">
							<h4>Video Albums</h4>
						</div>}
					{/* Video Albums */}
					{videoAlbumResults.map((videoAlbum, key) => (
						<div key={key} className="mb-3" onClick={() => onSearch(videoAlbum.name)}>
							<div className="media">
								<div className="media-left">
									<Img src={`/storage/${videoAlbum.cover}`}
										width="auto"
										height="100"
										alt={"album cover"} />
								</div>
								<div className="media-body p-2">
									<small>Video Album</small>
									<h1>{videoAlbum.name}</h1>
									<h6>{videoAlbum.created_at}</h6>
								</div>
							</div>
						</div>
					))}
					{/* Videos Albums End */}
				</div>
				<div className="col-sm-3">
					{audioAlbumResults.length > 0 &&
						<div className="p-2 mt-5 mb-3 border-bottom">
							<h4>Audio Albums</h4>
						</div>}
					{/* Audio Albums */}
					{audioAlbumResults.map((audioAlbum, key) => (
						<div key={key} className="mb-3" onClick={() => onSearch(audioAlbum.name)}>
							<div className="media">
								<div className="media-left">
									<Img src={`/storage/${audioAlbum.cover}`}
										width="auto"
										height="100"
										alt={"album cover"} />
								</div>
								<div className="media-body p-2">
									<small>Audio Album</small>
									<h1>{audioAlbum.name}</h1>
									<h6>{audioAlbum.create_at}</h6>
								</div>
							</div>
						</div>
					))}
					{/* Audio Albums End */}
				</div>
				<div className="col-sm-3"></div>
			</div>
		</>
	)
}

export default Search
