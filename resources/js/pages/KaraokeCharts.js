import React, { useState, useEffect, Suspense } from 'react'
import { Link } from 'react-router-dom'

import Carousel from '../components/Carousel'
import LoadingKaraokeMedia from '../components/LoadingKaraokeMedia'

const KaraokeMedia = React.lazy(() => import('../components/KaraokeMedia'))

import PlusSVG from '../svgs/PlusSVG'

const KaraokeCharts = (props) => {

	const [karaokes, setKaraokes] = useState([])
	const [karaokeAudio, setKaraokeAudio] = useState([])
	const [week, setWeek] = useState(0)
	const weeks = [0, 1, 2, 3, 4, 5]

	axios.defaults.baseURL = props.url

	useEffect(() => {
		// Fetch Karaokes
		axios.get(`/api/karaokes`)
			.then((res) => setKaraokes(res.data))
			.catch(() => props.setErrors(["Failed to fetch karaokes"]))

		// Fetch Karaoke Audio
		axios.get(`/api/karaoke-audios/1`)
			.then((res) => setKaraokeAudio(res.data))
			.catch(() => props.setErrors(["Failed to fetch karaoke audio"]))
	}, [])

	var checkLocation = true

	if (props.show != 0) {
		checkLocation = location.pathname.match(/audio-show/)
	}

	// Dummy data for array
	var dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	return (
		<>
			<Link
				to={`karaoke-create/${karaokeAudio.audio_id}`}
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
					{/* Karaoke Items */}
					<div className="d-flex justify-content-around flex-wrap">
						{/* Loading Karaoke Media */}
						{dummyArray
							.filter(() => karaokes.length < 1)
							.map((item, key) => (<LoadingKaraokeMedia key={key} />))}
						{/* Loading Karaoke Media End */}

						{karaokes
							.map((karaoke, key) => (
								<Suspense key={key} fallback={<LoadingKaraokeMedia />}>
									<KaraokeMedia
										key={key}
										setShow={props.setShow}
										link={`/karaoke-show/${karaoke.id}`}
										src={`/storage/${karaoke.karaoke}`}
										name={karaoke.name}
										username={karaoke.username} />
								</Suspense>
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