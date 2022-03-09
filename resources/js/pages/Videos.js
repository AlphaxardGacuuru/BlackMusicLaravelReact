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
				// Update Users
				axios.get(`${props.url}/api/users`)
					.then((res) => props.setUsers(res.data))
				// Update Video Albums
				axios.get(`${props.url}/api/video-albums`)
					.then((res) => props.setVideoAlbums(res.data))
				// Update Audio Albums
				axios.get(`${props.url}/api/audio-albums`)
					.then((res) => props.setAudioAlbums(res.data))
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
				<h2 style={{ color: "rgba(255, 255, 255, 0.1)" }}>Studio</h2>
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
						<tbody className="border border-0">
							<tr className="border-top border-dark">
								<th className="border-top border-dark"><h5>Videos</h5></th>
								<th className="border-top border-dark">
									<h5>{props.videos
										.filter((video) => video.username == props.auth.username)
										.length}</h5>
								</th>
							</tr>
						</tbody>
						<tbody className="border border-0">
							<tr className="border-top border-dark">
								<th className="border-top border-dark"><h5>Video Albums</h5></th>
								<th className="border-top border-dark">
									<h5>
										{props.videoAlbums
											.filter((videoAlbum) => videoAlbum.username == props.auth.username)
											.length - 1}
									</h5>
								</th>
							</tr>
						</tbody>
						<tbody className="border border-0">
							<tr className="border-top border-dark">
								<td className="border-top border-dark"><h5>Downloads</h5></td>
								<td className="border-top border-dark">
									<h5>
										{props.boughtVideos
											.filter((boughtVideo) => boughtVideo.artist == props.auth.username)
											.length}
									</h5>
								</td>
							</tr>
						</tbody>
						<tbody className="border border-0">
							<tr className="border-top border-dark">
								<td className="border-top border-dark"><h5>Revenue</h5></td>
								<td className="border-top border-dark">
									<h5 className="text-success">
										KES
										<span className="ml-1 text-success">
											{props.boughtVideos
												.filter((boughtVideo) => boughtVideo.artist == props.auth.username)
												.length * 10}
										</span>
									</h5>
								</td>
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
										<Img
											src={`/storage/${videoAlbum.cover}`}
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
										<Link
											to={`/video-album-edit/${videoAlbum.id}`}
											className="btn mysonar-btn white-btn">edit</Link>
									</div>
								</div>
								<br />
								<table className="table table-responsive table-hover">
									<tbody className="border border-0">
										<tr className="border-top border-dark">
											<th className="border-top border-dark"><h5>Thumbnail</h5></th>
											<th className="border-top border-dark"><h5>Video Name</h5></th>
											<th className="border-top border-dark"><h5>ft</h5></th>
											<th className="border-top border-dark"><h5>Genre</h5></th>
											<th className="border-top border-dark"><h5>Description</h5></th>
											<th className="border-top border-dark"><h5>Downloads</h5></th>
											<th className="border-top border-dark"><h5 className="text-success">Revenue</h5></th>
											<th className="border-top border-dark"><h5>Likes</h5></th>
											<th className="border-top border-dark"><h5>Released</h5></th>
											<th className="border-top border-dark"><h5>Uploaded</h5></th>
											<th className="border-top border-dark"><h5></h5></th>
										</tr>
									</tbody>
									{props.videos
										.filter((video) => video.album_id == videoAlbum.id)
										.map((albumItem, key) => (
											<tbody key={key} className="border border-0">
												<tr className="border-top border-dark">
													<td className="border-top border-dark">
														<Img
															src={albumItem.thumbnail}
															width="160em"
															height="90em"
															alt={"thumbnail"} />
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{albumItem.name}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{albumItem.ft}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{albumItem.genre}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{albumItem.description}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{albumItem.downloads}
													</td>
													<td className="border-top border-dark text-success">
														KES <span className="text-success">{albumItem.downloads * 10}</span>
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{albumItem.likes}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{videoAlbum.released}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{albumItem.created_at}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														<Link to={`/video-edit/${albumItem.id}`}>
															<button className='mysonar-btn white-btn'>edit</button>
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

