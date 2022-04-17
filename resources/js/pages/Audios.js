import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import Button from '../components/Button'

const Audios = (props) => {

	return (
		<div className="sonar-call-to-action-area section-padding-0-100">
			{/* <!-- ***** Call to Action Area Start ***** - */}
			<div className="backEnd-content">
				<h2 style={{ color: "rgba(255, 255, 255, 0.1)" }}>Studio</h2>
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
						<tbody className="border border-0">
							<tr className="border-top border-dark">
								<th className="border-top-0"><h5>Audios</h5></th>
								<th className="border-top-0">
									<h5>{props.audios.filter((audio) => audio.username == props.auth.username).length}</h5>
								</th>
							</tr>
						</tbody>
						<tbody className="border border-0">
							<tr className="border-top border-dark">
								<th className="border-top border-dark"><h5>Audio Albums</h5></th>
								<th className="border-top border-dark"><h5>{props.audioAlbums
									.filter((audioAlbum) => audioAlbum.username == props.auth.username).length - 1}</h5>
								</th>
							</tr>
						</tbody>
						<tbody className="border border-0">
							<tr className="border-top border-dark">
								<td className="border-top border-dark"><h5>Downloads</h5></td>
								<td className="border-top border-dark"><h5>{props.boughtAudios
									.filter((boughtAudio) => boughtAudio.artist == props.auth.username).length}</h5>
								</td>
							</tr>
						</tbody>
						<tbody className="border border-0">
							<tr className="border-top border-dark">
								<td className="border-top border-dark"><h5>Revenue</h5></td>
								<td className="border-top border-dark"><h5 className="text-success">
									KES
									<span className="text-success"> {props.boughtAudios
										.filter((boughtAudio) => boughtAudio.artist == props.auth.username)
										.length * 5}</span>
								</h5>
								</td>
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
										{audioAlbum.name != "Singles" ?
											<Link to={`/audio-album-edit/${audioAlbum.id}`}>
												<Img src={`/storage/${audioAlbum.cover}`}
													width="auto"
													height="100"
													alt={"album cover"} />
											</Link> :
											<Img
												src={`/storage/${audioAlbum.cover}`}
												width="auto"
												height="100"
												alt={"album cover"} />}
									</div>
									<div className="p-2">
										<small>Audio Album</small>
										<h1>{audioAlbum.name}</h1>
										<h6>{audioAlbum.created_at}</h6>
									</div>
								</div>
								<br />
								<table className="table table-responsive table-hover">
									<tbody className="border border-0">
										<tr className="border-top border-dark">
											<th className="border-top border-dark"><h5>Thumbnail</h5></th>
											<th className="border-top border-dark"><h5>Audio Name</h5></th>
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
									{props.audios
										.filter((audio) => audio.album_id == audioAlbum.id)
										.map((albumItem, key) => (
											<tbody key={key} className="border border-0">
												<tr className="border-top border-dark">
													<td className="border-top border-dark">
														<Link to={`/audio-show/${albumItem.id}`}>
															<Img
																src={`storage/${albumItem.thumbnail}`}
																width="auto"
																height="50px"
																alt={"thumbnail"} />
														</Link>
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
													<td className="border-top border-dark text-success"
														style={{ color: "rgba(220, 220, 220, 1) " }}>
														KES <span className="text-success">{albumItem.downloads * 5}</span>
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{audioAlbum.likes}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{audioAlbum.released}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														{audioAlbum.created_at}
													</td>
													<td className="border-top border-dark" style={{ color: "rgba(220, 220, 220, 1) " }}>
														<Link to={`/audio-edit/${albumItem.id}`}>
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

export default Audios
