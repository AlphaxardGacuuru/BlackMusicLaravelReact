import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import Carousel from '../components/Carousel'

import PlusSVG from '../svgs/PlusSVG'

const KaraokeCharts = (props) => {

	const [karaokes, setKaraokes] = useState([])
	const [week, setWeek] = useState(0)
	const weeks = [0, 1, 2, 3, 4, 5]

	axios.defaults.baseURL = props.url

	useEffect(() => {
		// Fetch Karaokes
		axios.get(`/api/karaokes`)
			.then((res) => {
				setKaraokes(res.data)
				// props.setLocalStorage("videos", res.data)
			}).catch(() => props.setErrors(["Failed to fetch karaokes"]))
	}, [])

	// Random array for dummy loading elements
	const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	var checkLocation = true

	if (props.show != 0) {
		checkLocation = location.pathname.match(/audio-show/)
	}

	return (
		<>
			<Link
				to="karaoke-create/15"
				id="chatFloatBtn"
				className={`${!checkLocation && "mb-5"}`}>
				<PlusSVG />
			</Link>

			<Carousel />
			<br />

			{/* <!-- Scroll menu - */}
			<div id="chartsMenu" className="hidden-scroll mt-2">
				<span>
					<Link to="/karaoke-charts">
						<h3 className="active-scrollmenu">Karaoke</h3>
					</Link>
				</span>
				<span>
					<Link to="/video-charts">
						<h3>Videos</h3>
					</Link>
				</span>
				<span>
					<Link to="/audio-charts">
						<h3>Audios</h3>
					</Link>
				</span>
			</div>

			{/* Week */}
			<div id="chartsMenu" className="hidden-scroll m-0">
				{weeks.map((weekItem, key) => (
					<span key={key}>
						<a href="#" onClick={(e) => {
							e.preventDefault()
							setWeek(weekItem++)
						}}>
							<h5 className={week == weekItem ?
								"active-scrollmenu m-0" :
								"m-0"}>
								{weekItem == 0 ?
									"This Week" :
									weekItem == 1 ?
										"Last week" :
										weekItem + " weeks ago"}
							</h5>
						</a>
					</span>
				))}
			</div>
			{/* Week End */}

			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4">
					<div className="d-flex justify-content-around flex-wrap">
						{/* Loading Karaoke items */}
						{dummyArray
							.filter(() => karaokes.length < 1)
							.map((karaoke, key) => (
								<div key={key}
									className="m-1"
									style={{
										borderRadius: "0px",
										textAlign: "center",
										color: "#232323",
										width: "45%"
									}}>
									<div className="karaoke-thumbnail bg-light gradient w-100">
										<div className="bg-light gradient" style={{ width: "100%" }}></div>
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
								</div>
							))}
					</div>
					{/* Loading Karaoke Items End */}

					{/* Karaoke Items */}
					<div className="d-flex justify-content-around flex-wrap">
						{/* Loading Karaoke items */}
						{karaokes
							.map((karaoke, key) => (
								<div key={key}
									className="m-1"
									style={{
										borderRadius: "0px",
										textAlign: "center",
										width: "47%"
									}}
									onClick={() => props.setShow(0)}>
									<div className="w-100">
										<Link to={`karaoke-show`}>
											<video
												src={`/storage/${karaoke.karaoke}`}
												width="100%"
												preload="none"
												autoPlay
												muted
												loop
												playsInline>
											</video>
										</Link>
									</div>
									<h6 className="m-0 pt-2 px-1"
										style={{
											width: "150px",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
										}}>
										{karaoke.name}
									</h6>
									<h6 className="mt-0 mx-1 mb-2 px-1 py-0">{karaoke.username}</h6>
								</div>
							))}
					</div>
					{/* Karaoke Items End */}
				</div>
				<div className="col-sm-4"></div>
			</div>
		</>
	)
}

export default KaraokeCharts