import React from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'

const Videos = (props) => {

	// Check if user is musician
	var user = props.users.find((user) => user.username == props.auth.username)

	var main = "none"
	var button = "none"

	if (user) {
		if (user.account_type == "musician") {
			main = ""
			button = "none"
		} else {
			main = "none"
			button = ""
		}
	}

	// Become musician
	const onMusician = () => {
		// Set account type to musician
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/users/${props.auth.id}`, {
				account_type: "musician",
				_method: "put"
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/users`).then((res) => props.setUsers(res.data))
				axios.get(`${props.url}/api/video-albums`).then((res) => props.setVideoAlbums(res.data))
				axios.get(`${props.url}/api/audio-albums`).then((res) => props.setAudioAlbums(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		})
	}

	return (
		<div className="sonar-call-to-action-area section-padding-0-100">

			{/* Become musician button */}
			<center className="mt-5 pt-5" style={{ display: button }}>
				<Button btnText="become a musician" onClick={onMusician} />
			</center>

			{/* <!-- ***** Call to Action Area Start ***** - */}
			<div className="backEnd-content">
				<h2>Studio</h2>
			</div>
			<div className="row" style={{ display: main }}>
				<div className="col-sm-12">
					<center>
						<Link to="/audios" className="btn sonar-btn btn-2">go to audios</Link>
						<br />
						<br />
						<Link to="/video-create" className="btn sonar-btn">upload video</Link>
						<br />
						<br />
						<Link to="/video-album-create" className="btn sonar-btn">create video album</Link>
					</center>
				</div>
			</div>
			<br />
			<div className="row" style={{ display: main }}>
				<div className="col-sm-2">
					<h1>Stats</h1>
					<table className='table'>
						<tbody>
							<tr>
								<th className="border-top-0"><h5>Videos</h5></th>
								<th className="border-top-0">
									<h5>{props.videos.filter((video) => video.username == props.auth.username).length}</h5>
								</th>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<th><h5>Video Albums</h5></th>
								<th>
									<h5>
										{props.videoAlbums.filter((videoAlbum) => videoAlbum.username == props.auth.username).length}
									</h5>
								</th>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td className="border-right-0"><h5>Downloads</h5></td>
								<td>
									<h5>
										{props.boughtVideos.filter((boughtVideo) => boughtVideo.artist == props.auth.username).length}
									</h5>
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td><h6>Unpaid</h6></td>
								<td><h6></h6></td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td><h5>Revenue</h5></td>
								<td>
									<h5 style={{ color: "green" }}>
										KES
										<span className="ml-1">
											{props.boughtVideos
												.filter((boughtVideo) => boughtVideo.artist == props.auth.username)
												.length * 10}
										</span>
									</h5>
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td><h6>Unpaid</h6></td>
								<td><h6 style={{ color: "green" }}>KES</h6></td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="col-sm-9">
					{props.videoAlbums
						.filter((videoAlbum) => videoAlbum.username == props.auth.username)
						.map((videoAlbum, key) => (
							<div key={key}>
								<div className="d-flex">
									<div className="p-2">
										<Img src={`/storage/${videoAlbum.cover}`}
											width="auto"
											height="100"
											alt={"album cover"} />
									</div>
									<div className="p-2">
										<small>Video Album</small>
										<h1>{videoAlbum.name}</h1>
										<h6>{videoAlbum.created_at}</h6>
									</div>
									<div className="p-2">
										<Link to={`/video-album-edit/${videoAlbum.id}`} className="btn mysonar-btn">edit</Link>
									</div>
								</div>
								<br />
								<table className="table table-responsive table-hover">
									<tbody>
										<tr>
											<th><h5>Thumbnail</h5></th>
											<th><h5>Video Name</h5></th>
											<th><h5>ft</h5></th>
											<th><h5>Genre</h5></th>
											<th><h5>Description</h5></th>
											<th><h5>Downloads</h5></th>
											<th><h5 style={{ color: "green" }}>Revenue</h5></th>
											<th><h5>Likes</h5></th>
											<th><h5>Released</h5></th>
											<th><h5>Uploaded</h5></th>
											<th><h5></h5></th>
										</tr>
									</tbody>
									{props.videos
										.filter((video) => video.album == videoAlbum.id)
										.map((albumItem, key) => (
											<tbody key={key}>
												<tr>
													<td>
														<Img
															src={albumItem.thumbnail.match(/https/) ?
																albumItem.thumbnail :
																`storage/${albumItem.thumbnail}`}
															width="160em"
															height="90em"
															alt={"thumbnail"} />
													</td>
													<td>{albumItem.name}</td>
													<td>{albumItem.ft}</td>
													<td>{albumItem.genre}</td>
													<td>{albumItem.description}</td>
													<td>{albumItem.downloads}</td>
													<td style={{ color: "green" }}>
														KES <span>{props.boughtVideos.filter((boughtVideo) => {
															return boughtVideo.video_id == albumItem.id
														}).length * 10}
														</span>
													</td>
													<td>{albumItem.likes}</td>
													<td>{videoAlbum.released}</td>
													<td>{albumItem.created_at}</td>
													<td>
														<Link to={`/video-edit/${albumItem.id}`}>
															<button className='mysonar-btn'>edit</button>
														</Link>
													</td>
												</tr>
											</tbody>
										))}
								</table>
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

