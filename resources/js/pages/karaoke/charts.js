import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import Carousel from "@/components/Core/Carousel"
import LoadingKaraokeMedia from "@/components/Karaoke/LoadingKaraokeMedia"
import KaraokeMedia from "@/components/Karaoke/KaraokeMedia"

import PlusSVG from "@/svgs/PlusSVG"

const KaraokeCharts = (props) => {
	const router = useLocation()

	const [week, setWeek] = useState(0)
	const weeks = [0, 1, 2, 3, 4, 5]

	useEffect(() => {
		// Load more on page bottom
		window.onscroll = function(ev) {
			if (location.pathname.match(/karaoke-charts/)) {
				const bottom =
					window.innerHeight + window.scrollY >=
					document.body.offsetHeight - document.body.offsetHeight / 16

				if (bottom) {
					setVideoSlice(videoSlice + 8)
				}
			}
		}
	}, [])

	var checkLocation = true

	if (props.show != 0) {
		checkLocation = router.pathname.match(/audio-show/)
	}

	// Function for loading more artists
	const handleScroll = (e) => {
		const bottom =
			e.target.scrollLeft >= e.target.scrollWidth - e.target.scrollWidth / 3

		if (bottom) {
			setArtistSlice(artistSlice + 10)
		}
	}

	// Dummy data for array
	var dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	return (
		<>
			<Link
				to={`/karaoke/create`}
				id="chatFloatBtn"
				className={`${!checkLocation && "mb-5"}`}>
				<PlusSVG />
			</Link>

			{/* Carousel */}
			<Carousel />
			<br />

			{/* <!-- Scroll menu - */}
			<div id="chartsMenu" className="hidden-scroll mt-2">
				<span>
					<Link to="/karaoke/charts">
						<h3 className="active-scrollmenu">Karaoke</h3>
					</Link>
				</span>
				<span>
					<Link to="/video/charts">
						<h3>Videos</h3>
					</Link>
				</span>
				<span>
					<Link to="/audio/charts">
						<h3>Audios</h3>
					</Link>
				</span>
			</div>

			{/* Week */}
			<div id="chartsMenu" className="hidden-scroll m-0">
				{weeks.map((weekItem, key) => (
					<span key={key}>
						<a
							href="#"
							onClick={(e) => {
								e.preventDefault()
								setWeek(weekItem++)
							}}>
							<h5
								className={week == weekItem ? "active-scrollmenu m-0" : "m-0"}>
								{weekItem == 0
									? "This Week"
									: weekItem == 1
									? "Last week"
									: weekItem + " weeks ago"}
							</h5>
						</a>
					</span>
				))}
			</div>
			{/* Week End */}

			<div className="row">
				<div className="col-sm-12">
					{/* Karaoke Items */}
					<div
						className="d-flex flex-wrap justify-content-center"
						onScroll={handleScroll}>
						{/* Loading Karaoke Media */}
						{dummyArray
							.filter(() => props.karaokes.length < 1)
							.map((item, key) => (
								<LoadingKaraokeMedia key={key} />
							))}
						{/* Loading Karaoke Media End */}

						{props.karaokes.map((karaoke, key) => (
							<KaraokeMedia
								{...props}
								key={key}
								setShow={props.setShow}
								karaoke={karaoke}
							/>
						))}
					</div>
					{/* Karaoke Items End */}
				</div>
			</div>
		</>
	)
}

export default KaraokeCharts
