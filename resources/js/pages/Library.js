import React from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'

const Library = (props) => {
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<br className="hidden" />
				<center><h1>Library</h1></center>
				<hr />

				{props.boughtVideos
					.filter((boughtVideo) => boughtVideo.username == props.auth.username)
					.map((boughtVideo, key) => (
						<div key={key}
							className="media p-2 border-bottom">
							<div className="media-left thumbnail">
								<Link to='/video-charts/{video.id}'>
									<Img src={props.videos
										.find((video) => video.id == boughtVideo.video_id)
										.thumbnail}
										width="160em"
										height="90em" />
								</Link>
							</div>
							<div className="media-body ml-2">
								<h6 className="m-0 pt-2 pr-1 pl-1"
									style={{
										width: "150px",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>
									{props.videos
										.find((video) => video.id == boughtVideo.video_id)
										.name}
								</h6>
								<h6 className="mt-0 mr-1 ml-1 mb-2 pt-0 pr-1 pl-1 pb-0">
									<small>{props.videos
										.find((video) => video.id == boughtVideo.video_id)
										.username}</small>
								</h6>
							</div>
						</div>
					))}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Library
