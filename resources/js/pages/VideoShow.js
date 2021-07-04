import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
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

	// Arrays for dates
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
				<div className="resp-container">
					<iframe className='resp-iframe'
						width='880px'
						height='495px'
						src={`${showVideo.video}/?autoplay=1`}
						frameBorder='0'
						allow='accelerometer; encrypted-media; gyroscope; picture-in-picture; allowfullscreen'>
					</iframe>
				</div >
				<div className="p-2 border-bottom">
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
					<br />
					<br />
				</div>
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

				{/* <!-- Read more section --> */}
				<div className="p-2">
					{/* <!-- single accordian area --> */}
					<div className="panel single-accordion">
						<h6>
							<a role="button" className="collapsed" aria-expanded="true" aria-controls="collapseTwo"
								data-parent="#accordion" data-toggle="collapse" href="#collapseTwo">read more
								<span className="accor-open"><i className="fa fa-plus" aria-hidden="true"></i></span>
								<span className="accor-close"><i className="fa fa-minus" aria-hidden="true"></i></span>
							</a>
						</h6>
						<div id="collapseTwo" className="accordion-content collapse">
							<br />
							<h6> $show description</h6>
						</div>
					</div>
				</div>

				{/* <!-- Comment Form ---> */}
				<div className='media p-2 border-bottom'>
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
				{/* <!-- End of Comment Form --> */}

				{/* <!-- Comment Section --> */}
				{props.videoComments.filter((comment) => comment.post_id == id).map((comment, index) => (
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
							<h6
								className="media-heading m-0"
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
								return commentLike.comment_id == comment.id && commentLike.username == props.auth.username
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
							<small> {props.videoCommentLikes.filter((commentLike) => commentLike.comment_id == comment.id).length}</small>

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
				))}
			</div>
			{/* <!-- End of Comment Section --> */}

			{/* -- Up next area -- */}
			<div className="col-sm-3">
			</div>

			{/* <!-- Song suggestion area --> */}
			<div className="col-sm-3 hidden"></div>
			{/* <!-- Song suggestion area end --> */}
			<div className="col-sm-1"></div>
		</div>
	)
}

export default VideoShow
