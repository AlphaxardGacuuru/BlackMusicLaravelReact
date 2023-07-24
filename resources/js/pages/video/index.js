import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import Axios from "axios"

import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"

const Videos = (props) => {
	const [main, setMain] = useState("none")
	const [button, setButton] = useState("none")
	const [loading, setLoading] = useState()

	// Get Artist's Video Albums
	const [artistVideoAlbums, setArtistVideoAlbums] = useState(
		props.getLocalStorage("artistVideoAlbums")
	)
	// Get Artist's Videos
	const [artistVideos, setVideos] = useState(
		props.getLocalStorage("artistVideos")
	)
	// Get Artist's Bought Videos
	const [artistBoughtVideos, setArtistBoughtVideos] = useState(
		props.getLocalStorage("artistBoughtVideos")
	)

	// Become musician
	const onMusician = () => {
		// Show loader
		setLoading(true)

		// Set account type to musician
		Axios.post(`/api/users/${props.auth?.id}`, {
			accountType: "musician",
			_method: "put",
		})
			.then((res) => {
				props.setMessages(["You're now a Musician"])
				// Update Auth
				props.get("auth", props.setAuth, "auth")
				// Update Video Albums
				props.get("video-albums", props.setVideoAlbums, "videoAlbums")
				// Update Users
				Axios.get(`/api/users`).then((res) => {
					setMain("")
					setButton("none")
					props.setUsers(res.data.data)
				})
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	useEffect(() => {
		// Check if user is musician
		if (props.auth?.accountType == "musician") {
			setMain("")
			setButton("none")
		} else {
			setMain("none")
			setButton("")
		}
	}, [])

	useEffect(() => {
		// Get Artist Video Albums
		props.get(
			`artist/video-albums/${props.auth?.username}`,
			setArtistVideoAlbums,
			"artistVideoAlbums",
			false
		)
		// Get Arist Videos
		props.get(
			`artist/videos/${props.auth?.username}`,
			setVideos,
			"artistVideos",
			false
		)
		// Get Artist Bought Videos
		props.get(
			`artist/bought-videos/${props.auth?.username}`,
			setArtistBoughtVideos,
			"artistBoughtVideos",
			false
		)
	}, [props.auth])

	// Get User's Videos
	const videos = artistVideos.length

	// Get User's Video Albums
	const videoAlbums = artistVideoAlbums.length - 1

	// Get User's Video Downloads
	const videoDownloads = artistBoughtVideos.length

	// Get User's Video Revenue
	const videoRevenue = videoDownloads * 5

	return (
		<div className="sonar-call-to-action-area section-padding-0-100">
			{/* Become musician button */}
			<center className="mt-5 pt-5" style={{ display: button }}>
				<Btn
					btnText="become a musician"
					btnClass="sonar-btn btn-2"
					loading={loading}
					onClick={onMusician}
				/>
			</center>
			{/* Become musician button End */}

			{/* Navigation */}
			<div className="backEnd-content">
				<h2 style={{ color: "rgba(255, 255, 255, 0.1)" }}>Studio</h2>
			</div>
			<div className="row" style={{ display: main }}>
				<div className="col-sm-12">
					<center>
						<h1 style={{ fontSize: "5em", fontWeight: "100" }}>Videos</h1>
						<br />
						<Link to="/audio" className="btn sonar-btn btn-2">
							go to audios
						</Link>
					</center>
				</div>
			</div>
			<div className="row" style={{ display: main }}>
				<div className="col-sm-4"></div>
				<div className="col-sm-2">
					<center>
						<Link to="/video/album/create" className="btn sonar-btn">
							create video album
						</Link>
					</center>
				</div>
				<div className="col-sm-2">
					<center>
						<Link to="/video/create" className="btn sonar-btn">
							upload video
						</Link>
					</center>
				</div>
				<div className="col-sm-4"></div>
			</div>
			{/* Navigation End */}

			<br />

			{/* Stats */}
			<div className="row" style={{ display: main }}>
				<div className="col-sm-2">
					<table className="table table-dark table-hover">
						<thead>
							<tr>
								<th colSpan="2" className="display-">
									Stats
								</th>
							</tr>
						</thead>
						<tbody className="table-group-divider">
							<tr>
								<td>Videos</td>
								<td>{videos}</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>Video Albums</td>
								<td>{videoAlbums}</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>Downloads</td>
								<td>{videoDownloads}</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>Revenue</td>
								<td className="text-success">
									KES
									<span className="ms-1 text-success">{videoRevenue}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				{/* Stats End */}

				<div className="col-sm-9">
					{/* Album */}
					{artistVideoAlbums.map((videoAlbum, key) => (
						<div key={key}>
							<div className="d-flex">
								<div className="p-2">
									{videoAlbum.name != "Singles" ? (
										<Link to={`/video/album/edit/${videoAlbum.id}`}>
											<Img
												src={videoAlbum.cover}
												width="100em"
												height="100em"
												alt="album cover"
											/>
										</Link>
									) : (
										<Img
											src={videoAlbum.cover}
											width="100em"
											height="100em"
											alt="album cover"
										/>
									)}
								</div>
								<div className="p-2">
									<small>Video Album</small>
									<h1 className="my-0">{videoAlbum.name}</h1>
									<h6>{videoAlbum.createdAt}</h6>
								</div>
							</div>
							<br />
							{/* Album End */}

							{/* Videos table */}
							<div className="table-responsive hidden-scroll">
								<table className="table table-dark table-hover">
									<tbody>
										<tr>
											<th>#</th>
											<th>Thumbnail</th>
											<th>Video Name</th>
											<th>ft</th>
											<th>Genre</th>
											<th>Description</th>
											<th>Downloads</th>
											<th className="text-success">Revenue</th>
											<th>Likes</th>
											<th>Released</th>
											<th>Uploaded</th>
											<th></th>
										</tr>
									</tbody>
									<tbody className="table-group-divider">
										{artistVideos
											.filter((video) => video.videoAlbumId == videoAlbum.id)
											.map((albumItem, key) => (
												<tr key={key}>
													<td></td>
													<td>
														<Link to={`/video/edit/${albumItem.id}`}>
															<Img
																src={albumItem.thumbnail}
																width="160px"
																height="90px"
																alt="thumbnail"
															/>
														</Link>
													</td>
													<td>{albumItem.name}</td>
													<td>{albumItem.ft}</td>
													<td>{albumItem.genre}</td>
													<td>{albumItem.description}</td>
													<td>{albumItem.downloads}</td>
													<td className="text-success">
														KES{" "}
														<span className="text-success">
															{albumItem.downloads * 10}
														</span>
													</td>
													<td>{albumItem.likes}</td>
													<td>{albumItem.released}</td>
													<td>{albumItem.createdAt}</td>
													<td>
														<Link to={`/video/edit/${albumItem.id}`}>
															<button className="mysonar-btn white-btn">
																edit
															</button>
														</Link>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
							{/* Videos table End */}
							<br />
							<br />
						</div>
					))}
				</div>
				<div className="col-sm-1"></div>
			</div>
		</div>
	)
}

export default Videos
