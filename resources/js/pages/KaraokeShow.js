import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'

import CloseSVG from '../svgs/CloseSVG'
import CommentSVG from '../svgs/CommentSVG'
import DecoSVG from '../svgs/DecoSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'
import HeartSVG from '../svgs/HeartSVG'
import ShareSVG from '../svgs/ShareSVG'
import MusicNoteSVG from '../svgs/MusicNoteSVG'

const KaraokeShow = () => {

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

	const videoItem = {
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
	}

	// ID for Video Description
	const videoDescription = useRef()

	// ID for Video Description text
	const showDescription = useRef()

	// Show More
	const showMore = () => {
		var d = videoDescription.current.style.display
		videoDescription.current.style.display = d == "none" ? "block" : "none"

		var t = showDescription.current.innerHTML
		showDescription.current.innerHTML = t == "show more" ? "show less" : "show more"
	}

	return (
		<div className="row p-0">
			<div className="col-sm-4"></div>
			<div
				className="col-sm-4"
				style={{
					width: window.innerWidth,
					height: window.innerHeight,
					overflow: "hidden"
				}}>
				<video
					src={videoItem.video}
					width="100%"
					loading="lazy"
					preload="none"
					autoPlay
					muted
					loop
					playsInline>
				</video>
				{/* Floating Video Info Top */}
				<div style={{ position: "absolute", top: 0 }}>
					<div className="d-flex">
						{/* Close Icon */}
						<div className="p-2">
							<Link to="/karaoke-charts" style={{ fontSize: "1.5em" }}>
								<CloseSVG />
							</Link>
						</div>
					</div>
				</div>
				{/* Floating Video Info Top End */}
				{/* Floating Video Info Bottom */}
				<div className="karaoke-overlay w-100">
					{/* Horizontal Content */}
					<div className="d-flex">
						<div className="p-1 flex-grow-1 align-self-end">
							<div className="m-1"
								style={{
									width: "100%",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip"
								}}>
								<b>{user.name}</b>
								<small>{user.username}</small>
								<span className="ml-1" style={{ color: "gold" }}>
									<DecoSVG />
									<small className="ml-1" style={{ color: "inherit" }}>{user.decos}</small>
								</span>
								<small><b><i className="text-secondary d-block">{videoItem.created_at}</i></b></small>
							</div>
							<p
								ref={videoDescription}
								className="m-0 mx-1 p-0"
								style={{ display: "none" }}>
								{videoItem.description}
							</p>
							<small>
								<b>
									<i
										ref={showDescription}
										className="text-secondary ml-1"
										onClick={showMore}>
										show more
									</i>
								</b>
							</small>
							<h6
								style={{
									width: "20em",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip",
									color: "#FFD700"
								}}>
								<span
									className="mr-2"
									style={{ fontSize: "1.5em", color: "inherit" }}>
									<MusicNoteSVG />
								</span>
								{videoItem.name}
							</h6>
						</div>
						<div className="p-2 align-self-end">
							{/* Vertical Content */}
							<div className="d-flex flex-column mb-2">
								{/* Avatar */}
								<div className="avatar-thumbnail-xs ml-auto mr-2 mb-3" style={{ borderRadius: "50%" }}>
									<center>
										<Link to={`/profile/${user.username}`}>
											<Img
												src={user.pp}
												width="50px"
												height="50px"
												alt={'avatar'} />
										</Link>
									</center>
								</div>
								{/* Karaoke Likes  */}
								<div className="ml-auto mr-2">
									<center>
										{videoItem.hasLiked ?
											<a href="#"
												style={{ color: "#fb3958" }}
												onClick={(e) => {
													e.preventDefault()
													// onPostLike(post.id)
												}}>
												<span style={{ color: "inherit", fontSize: "2em" }}><HeartFilledSVG /></span>
												<h6 style={{ color: "inherit" }}>{videoItem.likes}</h6>
											</a> :
											<a
												href="#"
												style={{ color: "rgba(220, 220, 220, 1)" }}
												onClick={(e) => {
													e.preventDefault()
													// onPostLike(post.id)
												}}>
												<span style={{ color: "inherit", fontSize: "2em" }}><HeartSVG /></span>
												<h6 style={{ color: "inherit" }}>{videoItem.likes}</h6>
											</a>}
									</center>
								</div>
								{/* Karaoke Comments */}
								<div className="ml-auto mr-2" style={{ color: "rgba(220, 220, 220, 1)" }}>
									<center>
										<span style={{ fontSize: "2em" }}><CommentSVG /></span>
										<h6 style={{ color: "inherit" }}>{videoItem.comments}</h6>
									</center>
								</div>
								{/* Share Karaoke */}
								<div className="ml-auto mr-2 mb-3">
									<center>
										<span
											style={{ fontSize: "2em", color: "rgba(220, 220, 220, 1)" }}
										// onClick={() => onShare(post)}
										>
											<ShareSVG />
										</span>
									</center>
								</div>
								{/* Current Audio */}
								<div className="ml-auto mr-2">
									<center>
										<div className="rotate-record">
											<Link to={`/audio-show/${videoItem.id}`}>
												<Img
													width="50px"
													height="50px"
													style={{ animation: "rotation 2s infinite linear" }}
													alt="current audio" />
											</Link>
										</div>
									</center>
								</div>
							</div>
							{/* Vertical Content End */}
						</div>
					</div>
					{/* Horizontal Content End */}
				</div>
				{/* Floating Video Info Bottom End */}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default KaraokeShow