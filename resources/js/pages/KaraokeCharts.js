import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import Carousel from '../components/Carousel'

import PlusSVG from '../svgs/PlusSVG'

const KaraokeCharts = (props) => {

	const user = {
		"id": 4,
		"name": "Black Music",
		"username": "@blackmusic",
		"account_type": "musician",
		"pp": "/storage/profile-pics/1CY5klslqGjjEnRQiGFw5yOz1z4TQM31Wnut4OFp.jpg",
		"bio": "Changing the music scene.",
		"withdrawal": "1000",
		"posts": 1,
		"following": 4,
		"fans": 154,
		"hasFollowed": true,
		"hasBought1": false,
		"decos": 0,
		"updated_at": "04 Jan 2022",
		"created_at": "30 Nov -0001"
	}

	const videoItem = [{
		"id": 91,
		"video": "storage/karaoke/e66dcdc190f3e041a04aec9443118d0c.mp4",
		"name": "Kenyan Shrap Gang Type Beat Supreme",
		"username": "@sammyking",
		"ft": "",
		"album_id": "15",
		"album": "Singles",
		"genre": "Hiphop",
		"thumbnail": "https://img.youtube.com/vi/EdKKYry-FwQ/hqdefault.jpg",
		"description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolor quas ipsum, iste quidem mollitia amet suscipit aut fuga eveniet distinctio minima alias maiores sunt soluta magnam possimus est aliquam.",
		"released": null,
		"hasLiked": true,
		"likes": 2,
		"inCart": true,
		"hasBoughtVideo": false,
		"downloads": 4,
		"comments": 5,
		"created_at": "08 May 2020"
	}, {
		"id": 91,
		"video": "storage/karaoke/e66dcdc190f3e041a04aec9443118d0c.mp4",
		"name": "Kenyan Shrap Gang Type Beat Supreme",
		"username": "@sammyking",
		"ft": "",
		"album_id": "15",
		"album": "Singles",
		"genre": "Hiphop",
		"thumbnail": "https://img.youtube.com/vi/EdKKYry-FwQ/hqdefault.jpg",
		"description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolor quas ipsum, iste quidem mollitia amet suscipit aut fuga eveniet distinctio minima alias maiores sunt soluta magnam possimus est aliquam.",
		"released": null,
		"hasLiked": true,
		"likes": 2,
		"inCart": true,
		"hasBoughtVideo": false,
		"downloads": 4,
		"comments": 5,
		"created_at": "08 May 2020"
	}]

	// Random array for dummy loading elements
	const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	return (
		<>
			<Link
				to="karaoke-create"
				id="chatFloatBtn">
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

			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4">
					<div className="d-flex justify-content-center flex-wrap">
						{/* Loading Video items */}
						{dummyArray
							.filter(() => props.videos.length < 1)
							.map((item, key) => (
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
					{/* Loading Video Items End */}

					{/* Karaoke Items */}
					<div className="d-flex justify-content-center flex-wrap">
						{/* Loading Video items */}
						{videoItem
							.map((item, key) => (
								<div key={key}
									className="m-1"
									style={{
										borderRadius: "0px",
										textAlign: "center",
										width: "45%"
									}}>
									<div className="w-100">
										<Link to="karaoke-show">
											<video
												src={item.video}
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
										{item.name}
									</h6>
									<h6 className="mt-0 mx-1 mb-2 px-1 py-0 w-50">{user.username}</h6>
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