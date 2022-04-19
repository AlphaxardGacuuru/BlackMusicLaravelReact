import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import Img from '../components/Img'
import Button from '../components/Button'
import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'

import CloseSVG from '../svgs/CloseSVG'
import OptionsSVG from '../svgs/OptionsSVG'
import CommentSVG from '../svgs/CommentSVG'
import HeartSVG from '../svgs/HeartSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'

const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))

const Index = (props) => {

	axios.defaults.baseURL = props.url

	const [videoSlice, setVideoSlice] = useState(10)
	const [bottomMenu, setBottomMenu] = useState("")
	const [userToUnfollow, setUserToUnfollow] = useState()
	const [postToEdit, setPostToEdit] = useState()

	var editLink = useRef(null)
	var deleteLink = useRef(null)
	var unfollowLink = useRef(null)

	const history = useHistory()

	useEffect(() => {
		//Fetch Posts
		axios.get(`/api/posts`)
			.then((res) => {
				props.setPosts(res.data)
				props.setLocalStorage("posts", res.data)
			}).catch(() => props.setErrors(['Failed to fetch posts']))
	}, [])

	// Buy function
	const onBuyVideos = (video) => {
		props.onCartVideos(video)
		setTimeout(() => history.push('/cart'), 1000)
	}

	// Function for liking posts
	const onPostLike = (post) => {
		// Show like
		const newPosts = props.posts
			.filter((item) => {
				// Get the exact post and change like status
				if (item.id == post) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new posts
		props.setPosts(newPosts)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/post-likes`, {
				post: post
			}).then((res) => {
				props.setMessage(res.data)
				// Update posts
				axios.get(`${props.url}/api/posts`)
					.then((res) => props.setPosts(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				props.setErrors(newError)
			})
		})
	}

	// Function for deleting posts
	const onDeletePost = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/posts/${id}`).then((res) => {
				props.setMessage(res.data)
				// Update posts
				axios.get(`${props.url}/api/posts`)
					.then((res) => props.setPosts(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				props.setErrors(newError)
			})
		})
	}

	// Function for voting in poll
	const onPoll = (post, parameter) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/polls`, {
				post: post,
				parameter: parameter
			}).then((res) => {
				props.setMessage(res.data)
				// Update posts
				axios.get(`${props.url}/api/posts`)
					.then((res) => props.setPosts(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				props.setErrors(newError)
			})
		})
	}

	// Function for loading more artists
	const handleScroll = (e) => {
		const bottom = e.target.scrollLeft >= (e.target.scrollWidth - (e.target.scrollWidth / 3));

		if (bottom) {
			setVideoSlice(videoSlice + 10)
		}
	}

	// Random array for dummy loading elements
	const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	var checkLocation = true

	if (props.show != 0) {
		checkLocation = location.pathname.match(/audio-show/)
	}

	return (
		<>
			{/* Post button */}
			{props.auth.account_type == 'musician' &&
				<Link to="post-create" id="floatBtn" className={`${!checkLocation && "mb-5"}`}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						className="bi bi-pen"
						viewBox="0 0 16 16">
						<path
							d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
					</svg>
				</Link>}

			{/* Chat button */}
			<Link to="/chat" id="chatFloatBtn" className={`${!checkLocation && "mb-5"}`}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="currentColor"
					className="bi bi-chat-right-text"
					viewBox="0 0 16 16">
					<path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
					<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
				</svg>
			</Link>

			{/* <!-- Profile info area --> */}
			<div className="row p-0">
				<div className="col-sm-1 hidden"></div>
				<div className="col-sm-3 hidden">
					<div className="d-flex">
						<div className="p-2">
							<div className="avatar-thumbnail-sm" style={{ borderRadius: "50%" }}>
								<Link to={"/profile/" + props.auth.username}>
									<Img src={props.auth.pp}
										width="100px"
										height="100px"
										alt="avatar" />
								</Link>
							</div>
						</div>
						<div className="p-2 flex-grow-1">
							<h5 className="m-0 p-0"
								style={{
									width: "160px",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip"
								}}>
								{props.auth.name}
							</h5>
							<h6 className="m-0 p-0"
								style={{
									width: "140px",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip"
								}}>
								<small>{props.auth.username}</small>
							</h6>
							<span style={{ color: "gold" }} className="pr-1">
								<svg className="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
								</svg>
								<small className="ml-1" style={{ color: "inherit" }}>{props.auth.decos}</small>
							</span>
						</div>
					</div>
					<div className="d-flex">
						<div className="p-2 flex-fill">
							<h6>Posts</h6>
							<span style={{ color: "rgba(220, 220, 220, 1)" }}>{props.auth.posts}</span>
							<br />
						</div>
						<div className="p-2 flex-fill">
							<h6>Fans</h6>
							<span style={{ color: "rgba(220, 220, 220, 1)" }}>{props.auth.fans}</span>
							<br />
						</div>
					</div>
					{/* <!-- Profile info area End --> */}

					<br />

					{/* <!-- Musicians suggestions area --> */}
					<div>
						<div className="p-2">
							<h2>Musicians to follow</h2>
						</div>
						{/* Slice to limit to 10 */}

						{/* Loading Musician items */}
						{dummyArray
							.filter(() => props.users.length < 1)
							.map((item, key) => (
								<div key={key} className='media p-2'>
									<div className='media-left'>
										<div className="rounded-circle" style={{ width: "30px", height: "30px" }}></div>
									</div>
									<div className='media-body'>
										<b className="bg-light gradient" style={{ color: "#232323" }}>namename</b>
										<small className="bg-light text-light gradient">
											<i style={{ color: "#232323" }}>usernameusename</i>
										</small>
										<button className="btn float-right rounded-0 text-light"
											style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}></button>
									</div>
								</div>
							))}

						{/* Musicians */}
						{props.users
							.filter((user) => user.account_type == "musician" &&
								user.username != props.auth.username &&
								user.username != "@blackmusic")
							.slice(0, 10)
							.map((user, key) => (
								<div key={key} className='d-flex justify-content-between'>
									<div className='p-2'>
										<Link to={`/profile/${user.username}`}>
											<Img
												src={user.pp}
												imgClass="rounded-circle"
												width="30px"
												height="30px"
												alt="user" />
											<b className="ml-2">{user.name}</b>
											<small><i>{user.username}</i></small>
										</Link>
									</div>
									<div className="p-2">

										{/* Check whether user has bought at least one song from user */}
										{/* Check whether user has followed user and display appropriate button */}
										{user.hasBought1 || props.auth.username == "@blackmusic" ?
											user.hasFollowed ?
												<button
													className={'btn float-right rounded-0 text-light'}
													style={{ backgroundColor: "#232323" }}
													onClick={() => props.onFollow(user.username)}>
													Followed
													<svg className='bi bi-check' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
														<path fillRule='evenodd'
															d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z' />
													</svg>
												</button>
												: <Button btnClass={'mysonar-btn white-btn float-right'}
													onClick={() => props.onFollow(user.username)}
													btnText={'follow'} />
											: <Button btnClass={'mysonar-btn white-btn float-right'}
												onClick={() =>
													props.setErrors([`You must have bought atleast one song by ${user.username}`])}
												btnText={'follow'} />}
									</div>
								</div>
							))}
					</div>
				</div>
				{/* <!-- Musician suggestion area end --> */}

				<div className="col-sm-4">
					{/* <!-- ****** Songs Area ****** --> */}
					<div className="p-2">
						<h5>Songs for you</h5>
						<div className="hidden-scroll" onScroll={handleScroll}>
							{/* Loading Video items */}
							{dummyArray
								.filter(() => props.videos.length < 1)
								.map((item, key) => (
									<span key={key} className="pt-0 px-0 pb-2">
										<div className="thumbnail">
											<div className="gradient" style={{ width: "160em", height: "90em" }}></div>
										</div>
										<h6 className="m-0 pt-2 px-1 gradient w-75"
											style={{
												width: "150px",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip",
												color: "#232323"
											}}>
											video
										</h6>
										<h6
											className="mt-0 mx-1 mb-2 px-1 py-0 gradient w-50"
											style={{ color: "#232323" }}>
											username
										</h6>
										<button
											className="btn mb-1 rounded-0"
											style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
										</button>
										<br />
										<button
											className="btn mb-1 rounded-0"
											style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
										</button>
									</span>
								))}

							{/* Real Video items */}
							{props.videos
								.filter((video) => !video.hasBoughtVideo)
								.slice(0, videoSlice)
								.map((video, index) => (
									<span key={index} className="mx-1 pt-0 px-0 pb-2">
										<div className="thumbnail">
											<Link to={`/video-show/${video.id}`}>
												<Img src={video.thumbnail.match(/http/) ?
													video.thumbnail :
													`storage/${video.thumbnail}`}
													width="160em"
													height="90em" />
											</Link>
										</div>
										<Link to={`/video-show/${video.id}`}>
											<h6 className="m-0 pt-2 px-1"
												style={{
													width: "150px",
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "clip"
												}}>
												{video.name}
											</h6>
											<h6 className="mt-0 mx-1 mb-2 px-1 py-0">
												<small>{video.username} {video.ft}</small>
											</h6>
										</Link>
										{video.inCart ?
											<button
												className="btn mb-1 rounded-0 text-light"
												style={{
													minWidth: '90px',
													height: '33px',
													backgroundColor: "#232323"
												}}
												onClick={() => props.onCartVideos(video.id)}>
												<svg className='bi bi-cart3'
													width='1em'
													height='1em'
													viewBox='0 0 16 16'
													fill='currentColor'
													xmlns='http://www.w3.org/2000/svg'>
													<path fillRule='evenodd'
														d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
												</svg>
											</button> :
											<>
												<button
													className="mysonar-btn white-btn mb-1"
													style={{ minWidth: '90px', height: '33px' }}
													onClick={() => props.onCartVideos(video.id)}>
													<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
														fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
														<path fillRule='evenodd'
															d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
													</svg>
												</button>
												<br />
												<Button
													btnClass={'btn mysonar-btn green-btn btn-2'}
													btnText={'KES 20'}
													onClick={() => onBuyVideos(video.id)} />
											</>}
									</span>
								))}
							<br />
							<br />
						</div>
					</div>
					{/* <!-- ****** Songs Area End ****** --> */}

					{/* <!-- Posts area --> */}
					<div className="m-0 p-0">
						{/* Loading Post items */}
						{dummyArray
							.filter(() => props.posts.length < 1)
							.map((item, key) => (
								<div key={key} className='media p-2'>
									<div className='media-left'>
										<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}></div>
									</div>
									<div className='media-body'>
										<h6 className="media-heading m-0"
											style={{
												width: "100%",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											<b className="gradient" style={{ color: "#232323" }}>post.name</b>
											<small className="gradient" style={{ color: "#232323" }}>post.username</small>
											<span className="ml-1 gradient" style={{ color: "#232323" }}>
												<svg className="bi bi-circle"
													width="1em"
													height="1em"
													viewBox="0 0 16 16"
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd"
														d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
												</svg>
												<small className="ml-1" style={{ color: "#232323" }}>post.decos</small>
											</span>
											<small>
												<i className="float-right mr-1 gradient" style={{ color: "#232323" }}>post.created_at</i>
											</small>
										</h6>
										<p className="my-2 gradient" style={{ color: "#232323" }}>post.text</p>

										{/* Post likes */}
										<a href="#" className="gradient" style={{ color: "#232323" }}>
											<svg xmlns='http://www.w3.org/2000/svg'
												width='1.2em'
												height='1.2em'
												fill='currentColor'
												className='bi bi-heart-fill'
												viewBox='0 0 16 16'>
												<path fillRule='evenodd'
													d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
											</svg>
											<small className="ml-1" style={{ color: "#232323" }}>po</small>
										</a>

										{/* Post comments */}
										<span className="gradient" style={{ color: "#232323" }}>
											<svg className="bi bi-chat ml-5"
												width="1.2em"
												height="1.2em"
												viewBox="0 0 16 16"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
											</svg>
											<small className="ml-1" style={{ color: "#232323" }}>post.comments</small>
										</span>
									</div>
								</div>
							))}

						{/* Posts */}
						{props.posts
							.filter((post) => post.hasFollowed)
							.map((post, index) => (
								<div key={index} className="d-flex">
									<div className="p-1">
										<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
											<Link to={`/profile/${post.username}`}>
												<Img src={post.pp}
													width="40px"
													height="40px"
													alt={'avatar'} />
											</Link>
										</div>
									</div>
									<div className="p-1 flex-grow-1">
										<h6 className="m-0"
											style={{
												width: "100%",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											<b>{post.name}</b>
											<small>{post.username}</small>
											<span className="ml-1" style={{ color: "gold" }}>
												<svg className="bi bi-circle"
													width="1em"
													height="1em"
													viewBox="0 0 16 16"
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg">
													<path fillRule="evenodd"
														d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
												</svg>
												<small className="ml-1" style={{ color: "inherit" }}>{post.decos}</small>
											</span>
											<small>
												<i className="float-right text-secondary mr-1">{post.created_at}</i>
											</small>
										</h6>
										<p className="mb-0">{post.text}</p>

										{/* Show media */}
										<div className="mb-1" style={{ overflow: "hidden" }}>
											{post.media &&
												<Img
													src={`storage/${post.media}`}
													width="100%"
													height="auto"
													alt={'post-media'} />}
										</div>

										{/* Show poll */}
										{post.parameter_1 ?
											post.isWithin24Hrs ?
												post.hasVoted1 ?
													<Button
														btnClass={"mysonar-btn poll-btn btn-2 mb-1"}
														btnText={post.parameter_1}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_1)} />
													: <Button
														btnClass={"mysonar-btn poll-btn white-btn mb-1"}
														btnText={post.parameter_1}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_1)} />
												: post.hasVoted1 ?
													<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage1}%`,
																backgroundColor: "#232323"
															}}>
															{post.parameter_1}
														</div>
													</div>
													: <div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage1}%`,
																backgroundColor: "grey"
															}}>
															{post.parameter_1}
														</div>
													</div>
											: ""}

										{post.parameter_2 ?
											post.isWithin24Hrs ?
												post.hasVoted2 ?
													<Button
														btnClass={"mysonar-btn poll-btn mb-1 btn-2"}
														btnText={post.parameter_2}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_2)} />
													: <Button
														btnClass={"mysonar-btn poll-btn white-btn mb-1"}
														btnText={post.parameter_2}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_2)} />
												: post.hasVoted2 ?
													<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage2}%`,
																backgroundColor: "#232323"
															}}>
															{post.parameter_2}
														</div>
													</div>
													: <div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage2}%`,
																backgroundColor: "grey"
															}}>
															{post.parameter_2}
														</div>
													</div>
											: ""}

										{post.parameter_3 ?
											post.isWithin24Hrs ?
												post.hasVoted3 ?
													<Button
														btnClass={"mysonar-btn poll-btn mb-1 btn-2"}
														btnText={post.parameter_3}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_3)} />
													: <Button
														btnClass={"mysonar-btn poll-btn white-btn mb-1"}
														btnText={post.parameter_3}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_3)} />
												: post.hasVoted3 ?
													<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage3}%`,
																backgroundColor: "#232323"
															}}>
															{post.parameter_3}
														</div>
													</div>
													: <div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage3}%`,
																backgroundColor: "grey"
															}}>
															{post.parameter_3}
														</div>
													</div>
											: ""}

										{post.parameter_4 ?
											post.isWithin24Hrs ?
												post.hasVoted4 ?
													<Button
														btnClass={"mysonar-btn poll-btn mb-1 btn-2"}
														btnText={post.parameter_4}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_4)} />
													: <Button
														btnClass={"mysonar-btn poll-btn white-btn mb-1"}
														btnText={post.parameter_4}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_4)} />
												: post.hasVoted4 ?
													<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage4}%`,
																backgroundColor: "#232323"
															}}>
															{post.parameter_4}
														</div>
													</div>
													: <div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage4}%`,
																backgroundColor: "grey"
															}}>
															{post.parameter_4}
														</div>
													</div>
											: ""}

										{post.parameter_5 ?
											post.isWithin24Hrs ?
												post.hasVoted5 ?
													<Button
														btnClass={"mysonar-btn poll-btn mb-1 btn-2"}
														btnText={post.parameter_5}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_5)} />
													: <Button
														btnClass={"mysonar-btn poll-btn white-btn mb-1"}
														btnText={post.parameter_5}
														btnStyle={{ width: "100%" }}
														onClick={() => onPoll(post.id, post.parameter_5)} />
												: post.hasVoted5 ?
													<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage5}%`,
																backgroundColor: "#232323"
															}}>
															{post.parameter_5}
														</div>
													</div> :
													<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
														<div className='progress-bar'
															style={{
																width: `${post.percentage5}%`,
																backgroundColor: "grey"
															}}>
															{post.parameter_5}
														</div>
													</div>
											: ""}

										{/* Total votes */}
										{post.parameter_1 ?
											post.username == props.auth.username || !post.isWithin24Hrs ?
												<small style={{ color: "grey" }}>
													<i>Total votes: {post.totalVotes}</i>
													<br />
												</small> : ""
											: ""}

										{/* Post likes */}
										{post.hasLiked ?
											<a href="#"
												style={{ color: "#fb3958" }}
												onClick={(e) => {
													e.preventDefault()
													onPostLike(post.id)
												}}>
												<span style={{ color: "inherit", fontSize: "1.2em" }}><HeartFilledSVG /></span>
												<small className="ml-1" style={{ color: "inherit" }}>{post.likes}</small>
											</a> :
											<a
												href="#"
												style={{ color: "rgba(220, 220, 220, 1)" }}
												onClick={(e) => {
													e.preventDefault()
													onPostLike(post.id)
												}}>
												<span style={{ color: "inherit", fontSize: "1.2em" }}><HeartSVG /></span>
												<small className="ml-1" style={{ color: "inherit" }}>{post.likes}</small>
											</a>}

										{/* Post comments */}
										<Link to={"post-show/" + post.id} style={{ color: "rgba(220, 220, 220, 1)" }}>
											<span className="ml-5" style={{ fontSize: "1.2em" }}><CommentSVG /></span>
											<small className="ml-1" style={{ color: "inherit" }}>{post.comments}</small>
										</Link>

										{/* <!-- Default dropup button --> */}
										<div className="float-right">
											<a
												href="#"
												className="text-secondary"
												onClick={() => {
													if (post.username != props.auth.username &&
														post.username != "@blackmusic") {
														setBottomMenu("menu-open")
														setUserToUnfollow(post.username)
														// Show and Hide elements
														unfollowLink.current.className = "d-block"
														deleteLink.current.className = "d-none"
														editLink.current.className = "d-none"
													} else {
														setBottomMenu("menu-open")
														setPostToEdit(post.id)
														// Show and Hide elements
														editLink.current.className = "d-block"
														deleteLink.current.className = "d-block"
														unfollowLink.current.className = "d-none"
													}
												}}>
												<OptionsSVG />
											</a>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
				{/* <!-- Posts area end --> */}

				{/* <!-- Song suggestion area --> */}
				<div className="col-sm-3 hidden">
					<div className="p-2">
						<h5>Songs to watch</h5>
					</div>
					<div className=" m-0 p-0">
						{/* Loading Video items */}
						{dummyArray
							.filter(() => props.videos.length < 1)
							.map((item, key) => (
								<div key={key} className="d-flex p-2 border-bottom">
									<div className="thumbnail gradient">
										<div className="w-25 h-25"></div>
									</div>
									<div className="ml-2 mr-auto flex-grow-1">
										<h6 className="mb-0 gradient"
											style={{
												width: "8em",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip",
												color: "#232323"
											}}>
											props.name
										</h6>
										<h6 className="mb-3 gradient"
											style={{
												width: "8em",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											<small style={{ color: "#232323" }}>props.username</small>
											<small className="ml-1" style={{ color: "#232323" }}>props.ft</small>
										</h6>
										<button
											className="btn mb-1 rounded-0"
											style={{ minWidth: '40px', height: '33px', backgroundColor: "#232323" }}>
										</button>
										<button
											className="btn mb-1 rounded-0 float-right"
											style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
										</button>
									</div>
								</div>
							))}

						{/* Real Video items */}
						{props.videos
							.filter((video) => !video.hasBoughtVideo)
							.slice(0, 10)
							.map((video, index) => (
								<Suspense key={index} fallback={<LoadingVideoMediaHorizontal />}>
									<VideoMediaHorizontal
										onClick={() => props.setShow(0)}
										setShow={props.setShow}
										link={`/video-show/${video.id}`}
										thumbnail={video.thumbnail}
										name={video.name}
										username={video.username}
										ft={video.ft}
										hasBoughtVideo={!video.hasBoughtVideo}
										videoInCart={video.inCart}
										videoId={video.id}
										onCartVideos={props.onCartVideos}
										onBuyVideos={onBuyVideos} />
								</Suspense>
							))}
					</div>
				</div>
				{/* <!-- End of Song Suggestion Area --> */}

				<div className="col-sm-1"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "0.5em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>
					<div
						ref={unfollowLink}
						onClick={() => {
							setBottomMenu("")
							props.onFollow(userToUnfollow)
						}}>
						<h6 className="pb-2">Unfollow {userToUnfollow}</h6>
					</div>
					<Link
					to={`/post-edit/${postToEdit}`}
						ref={editLink}
						onClick={() => setBottomMenu("")}>
						<h6 className="pb-2">Edit post</h6>
					</Link>
					<div
						ref={deleteLink}
						onClick={() => {
							setBottomMenu("")
							onDeletePost(postToEdit)
						}}>
						<h6 className="pb-2">Delete post</h6>
					</div>
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</>
	)
}

export default Index