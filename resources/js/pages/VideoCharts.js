import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import Button from '../components/Button'
import { useState, useEffect } from 'react'

const VideoCharts = () => {
	const [auth, setAuth] = useState([])
	const [users, setUsers] = useState([])
	const [videos, setVideos] = useState([])

	useEffect(() => {
		// For Auth
		const getAuth = async () => {
			const authFromServer = await fetchAuth()
			setAuth(authFromServer)
		}

		getAuth()

		// For Users
		const getUsers = async () => {
			const usersFromServer = await fetchUsers()
			setUsers(usersFromServer)
		}

		getUsers()

		// For Videos
		const getVideos = async () => {
			const videosFromServer = await fetchVideos()
			setVideos(videosFromServer)
		}

		getVideos()
	}, [])

	//Fetch Auth
	const fetchAuth = async () => {
		const res = await fetch(`http://localhost:8000/home`)
		const data = res.json()

		return data
	}

	//Fetch Users
	const fetchUsers = async () => {
		const res = await fetch(`http://localhost:8000/users`)
		const data = res.json()

		return data
	}

	//Fetch Videos
	const fetchVideos = async () => {
		const res = await fetch(`http://localhost:8000/videos`)
		const data = res.json()

		return data
	}

	return (
		<div>
			{/* Carousel */}
			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				</ol>
				<div className="carousel-inner">
					<div className="carousel-item active" style={{ overflow: "hidden;" }}>
						<img className="d-block w-100" src="/storage/img/headphones/jpg" alt={"Thumbnail"} />
						<div className="carousel-caption d-none d-md-block">
							<h5 style={{ color: "gold" }}>name</h5>
							<p style={{ color: "gold" }} >username</p>
						</div>
					</div>
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
			<div div id="chartsMenu" className="hidden-scroll" style={{ margin: "10px 0 0 0" }}>
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
			<div id="chartsMenu" className="hidden-scroll" style={{ margin: "10px 0 0 0" }}>
				<span>
					<a href="/video-charts/newlyReleased/All">
						<h5>Newly Released</h5>
					</a>
				</span>
				<span>
					<a href="/video-charts/trending/All">
						<h5>Trending</h5>
					</a>
				</span>
				<span>
					<a href="/video-charts/topDownloaded/All">
						<h5>Top Downloaded</h5>
					</a>
				</span>
				<span>
					<a href="/video-charts/topLoved/All">
						<h5>Top Loved</h5>
					</a>
				</span>
			</div>

			<div id="video-chartsMenu" className="hidden-scroll" style={{ margin: "0 0 0 0" }}>
				<span>
					<a href="/video-charts/$chart/All">
						<h6>All</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Afro">
						<h6>Afro</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Benga">
						<h6>Benga</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Blues">
						<h6>Blues</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Boomba">
						<h6 $BoombaClass>Boomba</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Country">
						<h6 $CountryClass>Country</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Cultural">
						<h6 $CulturalClass>Cultural</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/EDM">
						<h6 $EDMClass>EDM</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Genge">
						<h6 $GengeClass>Genge</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Gospel">
						<h6 $GospelClass>Gospel</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Hiphop">
						<h6 $HiphopClass>Hiphop</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Jazz">
						<h6 $JazzClass>Jazz</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/MoK">
						<h6 $MoKClass>Music of Kenya</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Pop">
						<h6 $PopClass>Pop</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/RandB">
						<h6 $RandBClass>R&B</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Rock">
						<h6 $RockClass>Rock</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Sesube">
						<h6 $SesubeClass>Sesube</h6>
					</a>
				</span>
				<span>
					<a href="/video-charts/$chart/Taarab">
						<h6 $TaarabClass>Taarab</h6>
					</a>
				</span>
			</div>
			{/* <!-- End of scroll menu - */}

			{/* <!-- Chart Area - */}
			<div className="row hidden">
				<div className="col-sm-12">

					{/* <!-- ****** Artists Area Start ****** - */}
					<h5>Artists</h5>
					<div className="hidden-scroll">
						{/*  Trending  */}
						{/*  Echo Artists according to most songs sold in one week  */}
						{/*  Fetch Artists End  */}
						{/*  Echo Artists  */}
						<span className="pt-0 pl-0 pr-0 pb-2" style={{ borderRadius: "10px" }}>
							<center>
								<div className="card avatar-thumbnail" style={{ borderRadius: "50%" }}>
									<a href='/home/$musicianusername'>
										<img src="/storage/$musicianpp" width='150px' height='150px' alt='' />
									</a>
								</div>
								<h6 style={{ width: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
									name
                        		</h6>
								<h6 h6 style={{ width: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
									<small>$musician username</small>
								</h6>
							</center>
						</span>

						{/* <!-- The actual snackbar for following message - */}
						<div id='checker'>You must have bought atleast 1 song by that Musician</div>
						{/* Echo Artists End */}
					</div>
					{/* <!-- ****** Artists Area End ****** - */}
					<br />

					{/* <!-- ****** Songs Area ****** - */}
					<h5>Songs</h5>
					<div>
						<span className="card m-1 pb-2"
							style={{ borderRadius: "10px", display: "inlineBlock", textAlign: "center" }}>
							<div className="thumbnail" style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
								<a href='/video-charts/ $videoid '>
									<img src=' $videothumbnail ' width="160em" height="90em" />
								</a>
							</div>
							<h6 className="m-0 p-0"
								style={{ width: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
								$video name</h6>
							<h6 className="m-0 p-0">
								<small> $video username  $video ft</small>
							</h6>
							<h6>
								<small className="m-0 p-0">
									$video bought_videos  Downloads
                                </small>
							</h6>
						</span>
					</div>
					{/* <!-- ****** Songs Area End ****** - */}
					{/* <!-- End of Chart Area - */}
				</div>
			</div>

			{/* For mobile */}
			<div className="row anti-hidden">
				<div className="col-sm-12">
					<div className="p-2">
						<h5>Artists</h5>
						<div className="hidden-scroll border-bottom">
							<span className="pt-0 pl-0 pr-0 pb-2" style={{ borderRadius: "10px" }}>
								<center>
									<div className="card avatar-thumbnail" style={{ borderRadius: "50%" }}>
										<a href='/home/ $musicianusername '>
											<img src="/storage/ $musicianpp " width='150px' height='150px' alt='' />
										</a>
									</div>
									<h6 className="p-0 m-0"
										style={{ width: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
										name
                            		</h6>
									<h6 className="p-0 mt-0 mr-0 ml-0" style={{ width: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
										<small> $musician username</small>
									</h6>
								</center>
							</span>

							{/* <!-- The actual snackbar for following message - */}
							<div id='checker'>You must have bought atleast 1 song by that Musician</div>
							<br />
							<br />
						</div>
						{/* Artists Area end */}

						{/* Songs area start */}
						<div className="media p-2 border-bottom">
							<div className="media-left thumbnail">
								<a href='/video-charts/ $videoid '>
									<img src=' $videothumbnail ' width="160em" height="90em" />
								</a>
							</div>
							<div className="media-body ml-2">
								<h6 className="m-0"
									style={{ width: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
									$video name</h6>
								<h6 className="m-0">
									<small> $video username  $video ft</small>
								</h6>
								<h6>
									<small className="m-0">
										$video bought_videos  count Downloads
                                    </small>
								</h6>
								<a href='#' style={{ color: "#000" }}>
									$cart
                                </a>
								<a href='#' style={{ color: "#000" }}>
									$bbtn
                                </a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoCharts
