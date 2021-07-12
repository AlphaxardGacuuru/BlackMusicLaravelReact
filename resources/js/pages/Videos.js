import React from 'react'

const Videos = () => {
	return (
		<div className="sonar-call-to-action-area section-padding-0-100">
			{/* <!-- ***** Call to Action Area Start ***** - */}
			<div className="backEnd-content">
				<h2>Studio</h2>
			</div>
			<div className="row">
				<div className="col-sm-12">
					<center>
						<a href="/audios" className="btn sonar-btn">go to audios</a>
						<br />
						<br />
						<a href="/videos/create" className="btn sonar-btn">upload video</a>
						<br />
						<br />
						<a href="/video-albums/create" className="btn sonar-btn">create video album</a>
					</center>
				</div>
			</div>
			<br />
			<div className="row">
				<div className="col-sm-2">
					<h1>Stats</h1>
					<table className='table'>
						<tr>
							<th className="border-top-0">
								<h5>Videos</h5>
							</th>
							<th className="border-top-0">
								<h5>$videoscount</h5>
							</th>
						</tr>
						<tr>
							<th>
								<h5>Video Albums</h5>
							</th>
							<th>
								<h5>$videoAlbumscount</h5>
							</th>
						</tr>
						<tr>
							<td className="border-right-0">
								<h5>Downloads</h5>
							</td>
							<td>
								<h5>$downloads</h5>
							</td>
						</tr>
						<tr>
							<td>
								<h6>Unpaid</h6>
							</td>
							<td>
								$payoutSum = $payouts / 10;
								$thisWeekDown = $downloads - $payoutSum;
								$totalRevenue = $payoutSum * 10;
								$thisWeekRev = $totalRevenue - $payoutSum * 10;
								<h6>$thisWeekDown</h6>
							</td>
						</tr>
						<tr>
							<td>
								<h5>Revenue</h5>
							</td>
							<td>
								<h5 style={{ color: "green" }}>KES $totalRevenue</h5>
							</td>
						</tr>
						<tr>
							<td>
								<h6>Unpaid</h6>
							</td>
							<td>
								<h6 style={{ color: "green" }}>KES $thisWeekRev</h6>
							</td>
						</tr>
					</table>
				</div>

				<div className="col-sm-9">
					<h1>Singles</h1>
					<br />
					<table className="table table-responsive table-hover">
						<tr>
							<th>
								<h5>Thumbnail</h5>
							</th>
							<th>
								<h5>Video Name</h5>
							</th>
							<th>
								<h5>Artist</h5>
							</th>
							<th>
								<h5>ft</h5>
							</th>
							<th>
								<h5>Album</h5>
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
						<tr>
							<td><a href='/charts/$videosSingleid'>
								<img src="$videosSinglethumbnail" width="160em" height="90em"
									alt="thumbnail" />
							</a>
							</td>
							<td>$videosSinglename</td>
							<td>$videosSingleusername</td>
							<td>$videosSingleft</td>
							<td>$videosSinglealbum</td>
							<td>$videosSinglegenre</td>
							<td>$videosSingledescription</td>
							<td>$videosSinglebought_videoscount</td>
							<td style={{ color: "green" }}>KES $videosSinglebought_videoscount * 10</td>
							<td>$videosSinglevideo_likescount</td>
							<td>date("d F Y", strtotime($videosSinglereleased))
							</td>
							<td>date("d F Y", strtotime($videosSinglecreated_at))
							</td>
							<td><a href='/videos/$videosSingleid/edit'>
								<button className='mysonar-btn'>edit</button>
							</a>
							</td>
						</tr>
					</table>
					<br />
					<br />
					<div className="media">
						<div className="media-left">
							<a href="/video-albums/$videoAlbumid/edit">
								<img src="/storage/$videoAlbumcover" width="auto" height="100"
									alt="album cover" />
							</a>
						</div>
						<div className="media-body p-2">
							<small>Video Album</small>
							<h1>$videoAlbumname</h1>
							<h6>date("F Y", strtotime($videoAlbumreleased))</h6>
						</div>
					</div>
					<br />
					<table className="table table-hover">
						<tr>
							<th>
								<h5>Thumbnail</h5>
							</th>
							<th>
								<h5>Video Name</h5>
							</th>
							<th>
								<h5>Artist</h5>
							</th>
							<th>
								<h5>ft</h5>
							</th>
							<th>
								<h5>Album</h5>
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
						<tr>
							<td><a href='/charts/$albumItemid'>
								<img src="$albumItemthumbnail" width="160em" height="90em"
									alt="thumbnail" />
							</a>
							</td>
							<td>$albumItemname</td>
							<td>$albumItemusername</td>
							<td>$albumItemft</td>
							<td>$albumItemalbum</td>
							<td>$albumItemgenre</td>
							<td>$albumItemdescription</td>
							<td>$albumItembought_videoscount</td>
							<td style={{ color: "green" }}>KES $albumItembought_videoscount * 10
							</td>
							<td>$albumItemvideo_likescount</td>
							<td>date("d F Y", strtotime($albumItemreleased))
							</td>
							<td>date("d F Y", strtotime($albumItemcreated_at))
							</td>
							<td><a href='/videos/$albumItemid/edit'>
								<button className='mysonar-btn'>edit</button>
							</a>
							</td>
						</tr>
					</table>
				</div>
				<div className="col-sm-1"></div>
			</div>
		</div>
	)
}

export default Videos

