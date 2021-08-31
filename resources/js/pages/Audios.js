import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import Button from '../components/Button'

const Audios = (props) => {

	// Arrays for dates
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return (
		<div className="sonar-call-to-action-area section-padding-0-100">
			{/* <!-- ***** Call to Action Area Start ***** - */}
			<div className="backEnd-content">
				<h2>Studio</h2>
			</div>
			<div className="row">
				<div className="col-sm-12">
					<center>
						<Link to="/videos" className="btn sonar-btn btn-2">go to videos</Link>
						<br />
						<br />
						<Link to="/audio-create" className="btn sonar-btn">upload audio</Link>
						<br />
						<br />
						<Link to="/audio-album-create" className="btn sonar-btn">create audio album</Link>
					</center>
				</div>
			</div>
			<br />
			<div className="row">
				<div className="col-sm-2">
					<h1>Stats</h1>
					<table className='table'>
						<tbody>
							<tr>
								<th className="border-top-0"><h5>Audios</h5></th>
								<th className="border-top-0">
									<h5>{props.audios.filter((audio) => audio.username == props.auth.username).length}</h5>
								</th>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<th><h5>Audio Albums</h5></th>
								<th><h5>{props.audioAlbums
									.filter((audioAlbum) => audioAlbum.username == props.auth.username).length}</h5>
								</th>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td className="border-right-0"><h5>Downloads</h5></td>
								<td><h5>{props.boughtAudios
									.filter((boughtAudio) => boughtAudio.artist == props.auth.username).length}</h5>
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
								<td><h5 style={{ color: "green" }}>
									KES
									<span> {props.boughtAudios.filter((boughtAudio) => {
										return boughtAudio.artist == props.auth.username
									}).length * 10}</span>
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
					{props.audioAlbums
						.filter((audioAlbum) => audioAlbum.username == props.auth.username)
						.map((audioAlbum, key) => (
							<div key={key}>
								<div className="d-flex">
									<div className="p-2">
										<Img src={`/storage/${audioAlbum.cover}`}
											width="auto"
											height="100"
											alt={"album cover"} />
									</div>
									<div className="p-2">
										<small>Audio Album</small>
										<h1>{audioAlbum.name}</h1>
										<h6>
											{new Date(audioAlbum.created_at).getDate()}
											{" " + months[new Date(audioAlbum.created_at).getMonth()]}
											{" " + new Date(audioAlbum.created_at).getFullYear()}
										</h6>
									</div>
									<div className="p-2">
										<Link to={`/audio-album-edit/${audioAlbum.id}`} className="btn mysonar-btn">edit</Link>
									</div>
								</div>
								<br />
								<table className="table table-responsive table-hover">
									<tbody>
										<tr>
											<th><h5>Thumbnail</h5></th>
											<th><h5>Audio Name</h5></th>
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
									{props.audios
										.filter((audio) => audio.album == audioAlbum.id)
										.map((albumItem, key) => (
											<tbody key={key}>
												<tr>
													<td>
														<Link to={`/audio-show/${albumItem.id}`}>
															<Img
																src={`storage/${albumItem.thumbnail}`}
																width="100%"
																height="50px"
																alt={"thumbnail"} />
														</Link>
													</td>
													<td>{albumItem.name}</td>
													<td>{albumItem.ft}</td>
													<td>{albumItem.genre}</td>
													<td>{albumItem.description}</td>
													<td>
														{props.boughtAudios.filter((boughtAudio) => {
															return boughtAudio.video_id == albumItem.id
														}).length}
													</td>
													<td style={{ color: "green" }}>
														KES <span>{props.boughtAudios.filter((boughtAudio) => {
															return boughtAudio.video_id == albumItem.id
														}).length * 10}
														</span>
													</td>
													<td>
														{props.audioLikes.filter((audioLike) => {
															return audioLike.video_id == albumItem.id
														}).length}
													</td>
													<td>
														{new Date(albumItem.released).getDate()}
														{" " + months[new Date(albumItem.released).getMonth()]}
														{" " + new Date(albumItem.released).getFullYear()}
													</td>
													<td>
														{new Date(albumItem.created_at).getDate()}
														{" " + months[new Date(albumItem.created_at).getMonth()]}
														{" " + new Date(albumItem.created_at).getFullYear()}
													</td>
													<td>
														<Link to={`/audio-edit/${albumItem.id}`}>
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

export default Audios
