import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Img from '../components/Img'
import Button from '../components/Button'

const VideoCharts = (props) => {

	const history = useHistory()

	const [chart, setChart] = useState(0)
	const [genre, setGenre] = useState(0)

	const charts = ["Newly Released", "Trending", "Top Downloaded", "Top Loved"]
	const genres = ["All", "Afro", "Benga", "Blues", "Boomba", "Country", "Cultural", "EDM", "Genge", "Gospel", "Hiphop", "Jazz", "Music of Kenya", "Pop", "R&B", "Rock", "Sesube", "Taarab"]

	// Set class for chart link
	const onChart = (key) => {
		setChart(key)
	}

	// Set class for genre link
	const onGenre = (key) => {
		setGenre(key)
	}

	// Function for adding video to cart
	const onCartVideos = (video) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-videos`, {
				video: video
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/cart-videos`).then((res) => props.setCartVideos(res.data))
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
				axios.get(`${props.url}/api/cart-videos`).then((res) => props.setCartVideos(res.data))
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
					{props.videos
						.slice(0, 3)
						.map((video, key) => (
							<div key={key} className={`carousel-item ${key == 0 && 'active'}`} style={{ overflow: "hidden;" }}>
								<Img imgClass={"d-block w-100"} src={video.thumbnail} />
								<div className="carousel-caption d-none d-md-block">
									<h5 style={{ color: "gold" }}>{video.name}</h5>
									<p style={{ color: "gold" }} >{video.username}</p>
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
					<a href="#">
						<h3 className="active-scrollmenu">Video</h3>
					</a>
				</span>
				<span>
					<a href="/audio-charts/newlyReleased/All">
						<h3>Audios</h3>
					</a>
				</span>
			</div>

			{/* List of Charts */}
			<div id="chartsMenu" className="hidden-scroll" style={{ margin: "10px 0 0 0" }}>
				{charts.map((chartItem, key) => (
					<span key={key}>
						<a href="#" onClick={(e) => {
							e.preventDefault()
							onChart(key)
						}}>
							<h5 className={chart == key ? "active-scrollmenu" : ""}>{chartItem}</h5>
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
							onGenre(key)
						}}>
							<h6 className={genre == key && "active-scrollmenu"}>{genreItem}</h6>
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
						{/*  Trending  */}
						{/*  Echo Artists according to most songs sold in one week  */}
						{/*  Fetch Artists End  */}
						{/*  Echo Artists  */}
						{props.users
							.filter((user) => user.account_type == "musician")
							.map((musician, key) => (
								<span key={key} className="pt-0 pl-0 pr-0 pb-2" style={{ borderRadius: "10px" }}>
									<center>
										<div className="card avatar-thumbnail" style={{ borderRadius: "50%" }}>
											<a href='/home/$musicianusername'>
												<Img src={`/storage/${musician.pp}`} width='150px' height='150px' />
											</a>
										</div>
										<h6 className="mt-2"
											style={{
												width: "100px",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											{musician.name}
										</h6>
										<h6 h6 style={{
											width: "100px",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
											<small>{musician.username}</small>
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
					<div className="hidden">
						{props.videos
							.filter((video) => !props.boughtVideos
								.some((boughtVideo) =>
									boughtVideo.video_id == video.id &&
									boughtVideo.username == props.auth.username
								)).map((video, key) => (
									<span key={key} className="card m-1 pb-2"
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
											<Link to={`/video-charts/${video.id}`}>
												<Img src={video.thumbnail} width="160em" height="90em" />
											</Link>
										</div>
										<h6 className="m-0 pt-2 pr-1 pl-1"
											style={{
												width: "150px",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											{video.name}
										</h6>
										<h6 className="mt-0 mr-1 ml-1 mb-2 pt-0 pr-1 pl-1 pb-0">
											<small>{video.username} {video.ft}</small>
										</h6>
										{props.cartVideos
											.find((cartVideo) => {
												return cartVideo.video_id == video.id &&
													cartVideo.username == props.auth.username
											}) ? <button
												className="btn btn-light mb-1 rounded-0"
												style={{ minWidth: '90px', height: '33px' }}
												onClick={() => onCartVideos(video.id)}>
											<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
												fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
												<path fillRule='evenodd'
													d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
											</svg>
										</button>
											: <button
												className="mysonar-btn mb-1"
												style={{ minWidth: '90px', height: '33px' }}
												onClick={() => onCartVideos(video.id)}>
												<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
													fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
													<path fillRule='evenodd'
														d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
												</svg>
											</button>}
										<br />
										<Button
											btnClass={'btn mysonar-btn green-btn'}
											btnText={'buy'}
											onClick={() => onBuyVideos(video.id)} />
									</span>
								))}
					</div>
					{/* <!-- ****** Songs Area End ****** - */}

					{/* For mobile */}
					<div className="anti-hidden">
						{props.videos
							.filter((video) => !props.boughtVideos
								.some((boughtVideo) =>
									boughtVideo.video_id == video.id &&
									boughtVideo.username == props.auth.username
								))
							.slice(0, 10)
							.map((video, index) => (
								<div key={index}
									className="media p-2 border-bottom">
									<div className="media-left thumbnail">
										<Link to='/video-charts/{video.id}'>
											<Img src={video.thumbnail} width="160em" height="90em" />
										</Link>
									</div>
									<div className="media-body ml-2">
										<h6
											className="m-0 pt-2 pr-1 pl-1"
											style={{
												width: "150px",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											{video.name}
										</h6>
										<h6 className="mt-0 mr-1 ml-1 mb-2 pt-0 pr-1 pl-1 pb-0">
											<small>{video.username}</small>
										</h6>
										{props.cartVideos
											.find((cartVideo) => {
												return cartVideo.video_id == video.id &&
													cartVideo.username == props.auth.username
											}) ? <button
												className="btn btn-light mb-1 rounded-0"
												style={{ minWidth: '40px', height: '33px' }}
												onClick={() => onCartVideos(video.id)}>
											<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
												fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
												<path fillRule='evenodd'
													d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
											</svg>
										</button>
											: <button
												className="mysonar-btn mb-1"
												style={{ minWidth: '40px', height: '33px' }}
												onClick={() => onCartVideos(video.id)}>
												<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
													fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
													<path fillRule='evenodd'
														d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
												</svg>
											</button>}
										<Button
											btnClass={'btn mysonar-btn green-btn float-right'}
											btnText={'buy'}
											onClick={() => onBuyVideos(video.id)} />
									</div>
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
