import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"

const Audios = (props) => {
	// Get Artist's Audio Albums
	const [artistAudioAlbums, setArtistAudioAlbums] = useState(
		props.getLocalStorage("artistAudioAlbums")
	)
	// Get Artist's Audios
	const [artistAudios, setAudios] = useState(
		props.getLocalStorage("artistAudios")
	)
	// Get Artist's Bought Audios
	const [artistBoughtAudios, setArtistBoughtAudios] = useState(
		props.getLocalStorage("artistBoughtAudios")
	)

	useEffect(() => {
		props.get(
			`artist/audio-albums/${props.auth?.username}`,
			setArtistAudioAlbums,
			"artistAudioAlbums",
			false
		)
		props.get(
			`artist/audios/${props.auth?.username}`,
			setAudios,
			"artistAudios",
			false
		)
		props.get(
			`artist/bought-audios/${props.auth?.username}`,
			setArtistBoughtAudios,
			"artistBoughtAudios",
			false
		)
	}, [props.auth])

	// Get User's Audios
	const audios = artistAudios.length

	// Get User's Audio Albums
	const audioAlbums = artistAudioAlbums.length - 1

	// Get User's Audio Downloads
	const audioDownloads = artistBoughtAudios.length

	// Get User's Audio Revenue
	const audioRevenue = audioDownloads * 5

	return (
		<div className="sonar-call-to-action-area section-padding-0-100">
			{/* <!-- ***** Call to Action Area Start ***** - */}
			<div className="backEnd-content">
				<h2 style={{ color: "rgba(255, 255, 255, 0.1)" }}>Studio</h2>
			</div>
			<div className="row">
				<div className="col-sm-12">
					<center>
						<h1 style={{ fontSize: "5em", fontWeight: "100" }}>Audios</h1>
						<br />
						<Link
							to="/video"
							className="btn sonar-btn btn-2">
							go to videos
						</Link>
					</center>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-2 mb-3">
					<center>
						<Link
							to="/audio/album/create"
							className="btn sonar-btn btn-2">
							create audio album
						</Link>
					</center>
				</div>
				<div className="col-sm-2">
					<center>
						<Link
							to="/audio/create"
							className="btn sonar-btn btn-2">
							upload audio
						</Link>
					</center>
				</div>
				<div className="col-sm-4"></div>
			</div>
			<br />
			<div className="row">
				<div className="col-sm-2">
					{/* Stats */}
					<table>
						<thead>
							<tr>
								<th
									colSpan="2"
									className="display-6">
									Stats
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Audios</td>
								<td>{audios}</td>
							</tr>
							<tr>
								<td>Audio Albums</td>
								<td>{audioAlbums}</td>
							</tr>
							<tr>
								<td>Downloads</td>
								<td>{audioDownloads}</td>
							</tr>
							<tr>
								<td>Revenue</td>
								<td className="text-success">KES {audioRevenue}</td>
							</tr>
						</tbody>
					</table>
				</div>
				{/* Stats End */}

				{/* Album */}
				<div className="col-sm-9">
					{artistAudioAlbums.map((audioAlbum, key) => (
						<div key={key}>
							<div className="d-flex">
								<div className="p-2">
									{audioAlbum.name != "Singles" ? (
										<Link to={`/audio/album/edit/${audioAlbum.id}`}>
											<Img
												src={audioAlbum.cover}
												width="100em"
												height="100em"
												alt="album cover"
											/>
										</Link>
									) : (
										<Img
											src={audioAlbum.cover}
											width="100em"
											height="100em"
											alt="album cover"
										/>
									)}
								</div>
								<div className="p-2">
									<small>Audio Album</small>
									<h1>{audioAlbum.name}</h1>
									<h6>{audioAlbum.createdAt}</h6>
								</div>
							</div>
							<br />
							{/* Album End */}

							{/* Audios table */}
							<div className="hidden-scroll">
								<table>
									<thead>
										<tr>
											<th>#</th>
											<th>Thumbnail</th>
											<th>Audio Name</th>
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
									</thead>
									<tbody key={key}>
										{artistAudios
											.filter((audio) => audio.audioAlbumId == audioAlbum.id)
											.map((albumItem, key) => (
												<tr key={key}>
													<td></td>
													<td>
														<Link to={`/audio/show/${albumItem.id}`}>
															<Img
																src={albumItem.thumbnail}
																width="50px"
																height="50px"
																alt="thumbnail"
															/>
														</Link>
													</td>
													<td>{albumItem.name}</td>
													<td>{albumItem.ft}</td>
													<td>{albumItem.genre}</td>
													<td>{albumItem.description}</td>
													<td>{albumItem.downloads}</td>
													<td
														className="text-success"
														style={{
															color: "rgba(220, 220, 220, 1) ",
														}}>
														KES
														<span className="text-success">
															{albumItem.downloads * 5}
														</span>
													</td>
													<td>{audioAlbum.likes}</td>
													<td>{audioAlbum.released}</td>
													<td>{audioAlbum.createdAt}</td>
													<td>
														<Link
															to={`/audio/edit/${albumItem.id}`}
															className="btn mysonar-btn btn-2">
															edit
														</Link>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
							{/* Audios table End */}
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
