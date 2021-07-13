import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'

const Videos = (props) => {

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
						<Link to="/audios" className="btn sonar-btn">go to audios</Link>
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
			<div className="row">
				<div className="col-sm-2">
					<h1>Stats</h1>
					<table className='table'>
						<tbody>
							<tr>
								<th className="border-top-0">
									<h5>Videos</h5>
								</th>
								<th className="border-top-0">
									<h5>{props.videos.filter((video) => video.username == props.auth.username).length}</h5>
								</th>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<th>
									<h5>Video Albums</h5>
								</th>
								<th>
									<h5>{props.videoAlbums.filter((videoAlbum) => videoAlbum.username == props.auth.username).length}</h5>
								</th>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td className="border-right-0">
									<h5>Downloads</h5>
								</td>
								<td>
									<h5>{props.boughtVideos.filter((boughtVideo) => boughtVideo.artist == props.auth.username).length}</h5>
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>
									<h6>Unpaid</h6>
								</td>
								<td>
									<h6></h6>
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>
									<h5>Revenue</h5>
								</td>
								<td>
									<h5 style={{ color: "green" }}>
										KES
										<span> {props.boughtVideos.filter((boughtVideo) => {
											return boughtVideo.artist == props.auth.username
										}).length * 10}</span>
									</h5>
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>
									<h6>Unpaid</h6>
								</td>
								<td>
									<h6 style={{ color: "green" }}>KES</h6>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="col-sm-9">
					<h1>Singles</h1>
					<br />
					<table className="table table-responsive table-hover">
						<tbody>
							<tr>
								<th>
									<h5>Thumbnail</h5>
								</th>
								<th>
									<h5>Video Name</h5>
								</th>
								<th>
									<h5>ft</h5>
								</th>
								<th>
									<h5>Genre</h5>
								</th>
								<th>
									<h5>Description</h5>
								</th>
								<th>
									<h5>Downloads</h5>
								</th>
								<th>
									<h5 style={{ color: "green" }}>Revenue</h5>
								</th>
								<th>
									<h5>Likes</h5>
								</th>
								<th>
									<h5>Released</h5>
								</th>
								<th>
									<h5>Uploaded</h5>
								</th>
								<th>
									<h5></h5>
								</th>
							</tr>
						</tbody>
						{props.videos.filter((video) => {
							return video.username == props.auth.username
						}).map((video, key) => (
							<tbody key={key}>
								<tr>
									<td>
										<Link to={`/video-show/${video.id}`}>
											<Img
												src={video.thumbnail}
												width="160em"
												height="90em" />
										</Link>
									</td>
									<td>{video.name}</td>
									<td>{video.ft}</td>
									<td>{video.genre}</td>
									<td>{video.description}</td>
									<td>
										{props.boughtVideos.filter((boughtVideo) => {
											return boughtVideo.video_id == video.id
										}).length}
									</td>
									<td style={{ color: "green" }}>
										KES <span>{props.boughtVideos.filter((boughtVideo) => {
											return boughtVideo.video_id == video.id
										}).length * 10}
										</span>
									</td>
									<td>
										{props.videoLikes.filter((videoLike) => {
											return videoLike.video_id == video.id
										}).length
										}</td>
									<td>{video.released}</td>
									<td>
										{new Date(video.created_at).getDay()}
										{" " + months[new Date(video.created_at).getMonth()]}
										{" " + new Date(video.created_at).getFullYear()}
									</td>
									<td>
										<Link to={`/videos-edit/${video.id}`}>
											<button className='mysonar-btn'>edit</button>
										</Link>
									</td>
								</tr>
							</tbody>
						))}
					</table>
					<br />
					<br />
					{props.videoAlbums
						.filter((videoAlbum) => videoAlbum.username == props.auth.username)
						.map((videoAlbum, key) => (
							<div key={key}>
								<div className="media">
									<div className="media-left">
										<Link to={`/video-albums/${videoAlbum.id}`}>
											<Img src={`/storage/${videoAlbum.cover}`}
												width="auto"
												height="100"
												alt={"album cover"} />
										</Link>
									</div>
									<div className="media-body p-2">
										<small>Video Album</small>
										<h1>{videoAlbum.name}</h1>
										<h6>
											{new Date(videoAlbum.created_at).getDay()}
											{" " + months[new Date(videoAlbum.created_at).getMonth()]}
											{" " + new Date(videoAlbum.created_at).getFullYear()}
										</h6>
									</div>
								</div>
								<br />
								<table className="table table-hover">
									<tbody>
										<tr>
											<th>
												<h5>Thumbnail</h5>
											</th>
											<th>
												<h5>Video Name</h5>
											</th>
											<th>
												<h5>ft</h5>
											</th>
											<th>
												<h5>Genre</h5>
											</th>
											<th>
												<h5>Description</h5>
											</th>
											<th>
												<h5>Downloads</h5>
											</th>
											<th>
												<h5 style={{ color: "green" }}>Revenue</h5>
											</th>
											<th>
												<h5>Likes</h5>
											</th>
											<th>
												<h5>Released</h5>
											</th>
											<th>
												<h5>Uploaded</h5>
											</th>
											<th>
												<h5></h5>
											</th>
										</tr>
									</tbody>
									{props.videos
										.filter((video) => video.album == videoAlbum.id)
										.map((albumItem, key) => (
											<tbody key={key}>
												<tr>
													<td>
														<Link to={`/video-show/${albumItem.id}`}>
															<Img src={albumItem.thumbnail}
																width="160em"
																height="90em"
																alt={"thumbnail"} />
														</Link>
													</td>
													<td>{albumItem.name}</td>
													<td>{albumItem.ft}</td>
													<td>{albumItem.genre}</td>
													<td>{albumItem.description}</td>
													<td>
														{props.boughtVideos.filter((boughtVideo) => {
															return boughtVideo.video_id == albumItem.id
														}).length}
													</td>
													<td style={{ color: "green" }}>
														KES <span>{props.boughtVideos.filter((boughtVideo) => {
															return boughtVideo.video_id == albumItem.id
														}).length * 10}
														</span>
													</td>
													<td>
														{props.videoLikes.filter((videoLike) => {
															return videoLike.video_id == albumItem.id
														}).length
														}</td>
													<td>{albumItem.released}</td>
													<td>
														{new Date(albumItem.created_at).getDay()}
														{" " + months[new Date(albumItem.created_at).getMonth()]}
														{" " + new Date(albumItem.created_at).getFullYear()}
													</td>
													<td>
														<Link to={`/videos-edit/${albumItem.id}`}>
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
		</div >
	)
}

export default Videos

