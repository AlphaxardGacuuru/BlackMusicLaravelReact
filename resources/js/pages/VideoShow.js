import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useState } from 'react'
import Img from '../components/Img'
import Button from '../components/Button'
import axios from 'axios'

const VideoShow = (props) => {

	let { show } = useParams();

	// Get video to show
	if (props.videos.find((video) => video.id == show)) {
		var showVideo = props.videos.find((video) => video.id == show)
	} else {
		var showVideo = []
	}

	// Get artist of video to show 
	if (props.users.find((user) => user.username == showVideo.username)) {
		var showArtist = props.users.find((user) => user.username == showVideo.username)
	} else {
		var showArtist = []
	}

	const [text, setText] = useState("")
	const [tabClass, setTabClass] = useState("comments")

	// Arrays for dates
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// Function for liking video
	const onVideoLike = () => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/video-likes`, {
				video: show
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/video-likes`).then((res) => props.setVideoLikes(res.data))
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

	// Function for following musicians
	const onFollow = (musician) => {
		axios.get('/sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/follows`, {
				musician: musician
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/follows`).then((res) => props.setFollows(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		});
	}

	// Function for posting comment
	const onComment = (e) => {
		e.preventDefault()

		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/video-comments`, {
				video: show,
				text: text
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/video-comments`).then((res) => props.setVideoComments(res.data))
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

		setText("")
	}

	// Function for liking posts
	const onCommentLike = (comment) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/video-comment-likes`, {
				comment: comment
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/video-comment-likes`).then((res) => props.setVideoCommentLikes(res.data))
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

	// Function for deleting comments
	const onDeleteComment = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/video-comments/${id}`).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/video-comments`).then((res) => props.setVideoComments(res.data))
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
		<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-7">
				<br className="hidden" />
				<div className="resp-container">
					{props.boughtVideos.some((boughtVideo) => {
						return boughtVideo.id == showVideo.id &&
							boughtVideo.username == props.auth.username ||
							props.auth.username == "@blackmusic" ||
							props.auth.username == showVideo.username
					}) ?
						<iframe className='resp-iframe'
							width='880px'
							height='495px'
							src={`${showVideo.video}/?autoplay=1`}
							frameBorder='0'
							allow='accelerometer'
							encrypted-media="true"
							gyroscope="true"
							picture-in-picture="true"
							allowFullScreen>
						</iframe> :
						<iframe className='resp-iframe'
							width='880px'
							height='495px'
							src={`${showVideo.video}?autoplay=1&end=10&controls=0`}
							frameBorder='0'
							allow='accelerometer'
							encrypted-media="true"
							gyroscope="true"
							picture-in-picture="true"
							allowFullScreen>
						</iframe>}
				</div >
				<div className="d-flex flex-row">
					<div className="p-2 mr-auto">
						<h6 className="m-0 p-0"
							style={{
								width: "200px",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "clip"
							}}>
							<small>Song name {showVideo.name}</small>
						</h6>
						<small>Album</small> <span>{showVideo.album}</span><br />
						<small>Genre</small> <span>{showVideo.genre}</span><br />
						<small>Posted</small> <span>
							{new Date(showVideo.created_at).getDay()}
							{" " + months[new Date(showVideo.created_at).getMonth()]}
							{" " + new Date(showVideo.created_at).getFullYear()}
						</span>
					</div>

					{/* Video likes */}
					<div className="p-2 mr-2">
						{props.videoLikes.find((videoLike) => {
							return videoLike.video_id == show &&
								videoLike.username == props.auth.username
						}) ? <a href="#" style={{ color: "#cc3300" }}
							onClick={(e) => {
								e.preventDefault()
								onVideoLike()
							}}>
							<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
								className='bi bi-heart-fill' viewBox='0 0 16 16'>
								<path fillRule='evenodd'
									d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
							</svg>

							<small> {props.videoLikes.filter((videoLike) => videoLike.video_id == show).length}
							</small>
						</a>
							: <a href='#' onClick={(e) => {
								e.preventDefault()
								onVideoLike()
							}}>
								<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
									className='bi bi-heart' viewBox='0 0 16 16'>
									<path
										d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
								</svg>

								<small> {props.videoLikes.filter((videoLike) => videoLike.video_id == show).length}
								</small>
							</a>}
					</div>

					{/* Share button */}
					<div className="p-2">
						<a href={`whatsapp://send?text=https://music.black.co.ke/video-show/${show}`}>
							<svg className='bi bi-reply' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'>
								<path fillRule='evenodd'
									d='M9.502 5.013a.144.144 0 0 0-.202.134V6.3a.5.5 0 0 1-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 0 1 1.921-.306 7.403 7.403 0 0 1 .798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 0 1 .45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 0 1 .042-.028.147.147 0 0 0 0-.252.494.494 0 0 1-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 0 0-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 0 1-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.667z' />
							</svg>
							<b> SHARE</b>
						</a>
					</div>
				</div>
				{/* Video Area End */}

				{/* <!-- Read more section --> */}
				<div className="p-2 border-bottom">
					<button
						href="#collapseExample"
						className="mysonar-btn"
						data-toggle="collapse"
						aria-expanded="false"
						aria-controls="collapseExample">
						Read more
					</button>
					<div className="collapse" id="collapseExample">
						<div className="card card-body">
							{showVideo.description}
						</div>
					</div>
				</div>

				{/* Artist Area */}
				<div className="p-2 border-bottom">
					<div className='media'>
						<div className='media-left'>
							<Link to={`/profile/${showArtist.username}`}>
								<Img src={"/storage/" + showArtist.pp} width={"40px"} height={"40px"} />
							</Link>
						</div>
						<div className='media-body'>
							<h6 className="m-0 p-0"
								style={{
									width: "140px",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip"
								}}>
								<small>{showArtist.name} {showArtist.username}</small>
							</h6>
							<span style={{
								color: "gold",
								paddingTop: "10px"
							}}
								className='fa fa-circle-o'>
							</span>
							<small>{props.decos.filter((deco) => deco.username == showArtist.username).length}</small>
							<span style={{ fontSize: "1rem" }}>&#x2022;</span>
							<small> {props.follows.filter((follow) => follow.username == showArtist.username).length} fans</small>

							{/* Check whether user has bought at least one song from musician */}
							{/* Check whether user has followed musician and display appropriate button */}
							{props.boughtVideos.find((boughtVideo) => {
								return boughtVideo.username == props.auth.username &&
									boughtVideo.artist == showArtist.username
							}) || props.auth.username == "@blackmusic" ? props.follows.find((follow) => {
								return follow.followed == showArtist.username && follow.username == props.auth.username
							}) ? <button className={'btn btn-light float-right rounded-0'}
								onClick={() => onFollow(showArtist.username)}>
								Followed
								<svg className='bi bi-check' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
									<path fillRule='evenodd'
										d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z' />
								</svg>
							</button>
								: <Button btnClass={'mysonar-btn float-right'}
									onClick={() => onFollow(showArtist.username)}
									btnText={'follow'} />
								: <Button btnClass={'mysonar-btn float-right'}
									onClick={() =>
										props.setErrors([`You must have bought atleast one song by ${showArtist.username}`])}
									btnText={'follow'} />}
						</div>
					</div>
				</div>
				{/* Artist Area End */}

				<br />

				{/* Tab for Comment and Up Next */}
				<div className="d-flex">
					<div className="p-2 flex-fill anti-hidden">
						<h6 className={tabClass == "comments" ? "active-scrollmenu" : "p-2"}
							onClick={() => setTabClass("comments")}>
							<center>Comments</center>
						</h6>
					</div>
					<div className="p-2 flex-fill anti-hidden">
						<h6 className={tabClass == "recommended" ? "active-scrollmenu" : "p-1"}
							onClick={() => setTabClass("recommended")}>
							<center>Recommended</center>
						</h6>
					</div>
				</div>

				{/* <!-- Comment Form ---> */}
				<div className={tabClass == "comments" ? "" : "hidden"}>
					{props.boughtVideos.find((boughtVideo) => {
						return boughtVideo.username == props.auth.username &&
							boughtVideo.artist == showArtist.username &&
							boughtVideo.video_id == show
					}) && <div className='media p-2 border-bottom'>
							<div className="media-left">
								<Img src={"/storage/" + props.auth.pp} width={"40px"} height={"40px"} />
							</div>
							<div className="media-body contact-form">
								<form onSubmit={onComment}>
									<input
										type="text"
										className="form-control"
										placeholder="Add a comment"
										value={text}
										onChange={(e) => setText(e.target.value)} />
									<br />
									<Button
										type="submit"
										btnClass={"mysonar-btn float-right"}
										btnText={"Comment"} />
								</form>
							</div>
						</div>
					}
					{/* <!-- End of Comment Form --> */}

					{/* <!-- Comment Section --> */}
					{props.videoComments
						.filter((comment) => comment.video_id == show)
						.map((comment, index) => (
							<div key={index} className='media p-2 border-bottom'>
								<div className='media-left'>
									<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
										<Link to={`/home/${comment.username}`}>
											<Img src={`/storage/${props.users.find((user) => user.username == comment.username).pp}`}
												width="40px" height="40px" />
										</Link>
									</div>
								</div>
								<div className='media-body'>
									<h6 className="media-heading m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
										<b>{props.users.find((user) => user.username == comment.username).name}</b>
										<small>{comment.username} </small>
										<span style={{ color: "gold" }}>
											<svg className="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16"
												fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
											</svg>
										</span>
										<span style={{ fontSize: "10px" }}> {props.decos.filter((deco) => {
											return deco.username == comment.username
										}).length}</span>
										<small>
											<i className="float-right mr-1">{new Date(comment.created_at).toDateString()}</i>
										</small>
									</h6>
									<p className="mb-0">{comment.text}</p>

									{/* Comment likes */}
									{props.videoCommentLikes.find((commentLike) => {
										return commentLike.comment_id == comment.id &&
											commentLike.username == props.auth.username
									}) ? <a href="#" style={{ color: "#cc3300" }} onClick={(e) => {
										e.preventDefault()
										onCommentLike(comment.id)
									}}>
										<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
											className='bi bi-heart-fill' viewBox='0 0 16 16'>
											<path fillRule='evenodd'
												d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
										</svg>
									</a>
										: <a href='#' onClick={(e) => {
											e.preventDefault()
											onCommentLike(comment.id)
										}}>
											<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
												className='bi bi-heart' viewBox='0 0 16 16'>
												<path
													d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
											</svg>
										</a>}
									<small> {props.videoCommentLikes.filter((commentLike) => commentLike.comment_id == comment.id).length}
									</small>

									{/* <!-- Default dropup button --> */}
									<div className="dropup float-right">
										<a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false">
											<svg className="bi bi-three-dots-vertical" width="1em" height="1em" viewBox="0 0 16 16"
												fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
											</svg>
										</a>
										<div className="dropdown-menu dropdown-menu-right p-0" style={{ borderRadius: "0" }}>
											{comment.username == props.auth.username &&
												<a href='#' className="dropdown-item" onClick={(e) => {
													e.preventDefault();
													onDeleteComment(comment.id)
												}}>
													<h6>Delete comment</h6>
												</a>}
										</div>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</div>
			{/* <!-- End of Comment Section --> */}

			{/* -- Up next area -- */}
			<div className={tabClass == "recommended" ? "" : "col-sm-3 hidden"}>
				<br className="hidden" />
				<div className="p-2">
					<h5>Up next</h5>
				</div>
				{!props.boughtVideos.some((boughtVideo) => {
					return boughtVideo.username == props.auth.username
				}) &&
					<center>
						<h6 style={{ color: "grey" }}>You haven't bought any videos</h6>
					</center>}

				{props.boughtVideos
					.filter((boughtVideo) => boughtVideo.username == props.auth.username &&
						boughtVideo.video_id != show)
					.map((boughtVideo, key) => (
						<div key={key}
							className="media p-2 border-bottom">
							<div className="media-left thumbnail">
								<Link to={`/video-show/${boughtVideo.video_id}`}>
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
				{/* <!-- End of Up next Area --> */}

				<div className="p-2 mt-5">
					<h5>Songs to watch</h5>
				</div>
				{props.videos
					.filter((video) => !props.boughtVideos
						.some((boughtVideo) =>
							boughtVideo.video_id == video.id &&
							boughtVideo.username == props.auth.username
						) && video.username != props.auth.username && video.id != show)
					.slice(0, 10)
					.map((video, index) => (
						<div key={index}
							className="media p-2 border-bottom">
							<div className="media-left thumbnail">
								<Link to={`/video-show/${video.id}`}>
									<Img src={video.thumbnail} width="160em" height="90em" />
								</Link>
							</div>
							<div className="media-body ml-2">
								<h6
									className="m-0 pt-2 pr-1 pl-1"
									style={{
										width: "150px",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>
									{video.name}
								</h6>
								<h6 className="mt-0 mr-1 ml-1 mb-2 pt-0 pr-1 pl-1 pb-0">
									<small>{video.username}</small>
								</h6>
								{props.cartVideos
									.find((cartVideo) => {
										return cartVideo.video_id == video.id &&
											cartVideo.username == props.auth.username
									}) ? <button
										className="btn btn-light mb-1 rounded-0"
										style={{ minWidth: '40px', height: '33px' }}
										onClick={() => onCartVideos(video.id)}>
									<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
										fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
										<path fillRule='evenodd'
											d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
									</svg>
								</button>
									: <button
										className="mysonar-btn mb-1"
										style={{ minWidth: '40px', height: '33px' }}
										onClick={() => onCartVideos(video.id)}>
										<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
											fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
											<path fillRule='evenodd'
												d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
										</svg>
									</button>}
								<Button
									btnClass={'btn mysonar-btn green-btn float-right'}
									btnText={'buy'}
									onClick={() => onBuyVideos(video.id)} />
							</div>
						</div>
					))}
			</div>
			<div className="col-sm-1"></div>
		</div >
	)
}

export default VideoShow
