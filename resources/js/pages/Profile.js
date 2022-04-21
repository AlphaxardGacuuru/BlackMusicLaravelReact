import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios'

import Img from '../components/Img'
import Button from '../components/Button'
import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'
import LoadingAudioMediaHorizontal from '../components/LoadingAudioMediaHorizontal'

import CloseSVG from '../svgs/CloseSVG'
import OptionsSVG from '../svgs/OptionsSVG'
import CommentSVG from '../svgs/CommentSVG'
import HeartSVG from '../svgs/HeartSVG'
import HeartFilledSVG from '../svgs/HeartFilledSVG'
import CheckSVG from '../svgs/CheckSVG';
import DecoSVG from '../svgs/DecoSVG';

const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))
const AudioMediaHorizontal = React.lazy(() => import('../components/AudioMediaHorizontal'))

const Profile = (props) => {

	axios.defaults.baseURL = props.url

	let { username } = useParams();

	let history = useHistory()

	const [tabClass, setTabClass] = useState("videos")
	const [bottomMenu, setBottomMenu] = useState("")
	const [userToUnfollow, setUserToUnfollow] = useState()
	const [postToEdit, setPostToEdit] = useState()

	var editLink = useRef(null)
	var deleteLink = useRef(null)
	var unfollowLink = useRef(null)

	// Get profile info
	if (props.users.find((user) => user.username == username)) {
		var profile = props.users.find((user) => user.username == username)
	} else {
		var profile = []
	}

	// Function for buying video to cart
	const onBuyVideos = (video) => {
		props.onCartVideos(video)
		setTimeout(() => history.push('/cart'), 1000)
	}

	// Function for buying audio to cart
	const onBuyAudios = (audio) => {
		props.onCartAudios(audio)
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

	return (
		<>
			<div className="row p-0 m-0"
				style={{
					backgroundImage: "url('/storage/img/headphones.jpg')",
					backgroundPosition: "center",
					backgroundSize: "cover",
					position: "relative",
					height: "100%"
				}}>
				<div className="col-sm-12 p-0">
					<br />
					<br className="hidden" />
					<div>
						<div className="avatar-container"
							style={{
								marginTop: "100px",
								top: "70px",
								left: "10px",
							}}>
							{props.users
								.filter((user) => user.username == username)
								.map((profile, key) => (
									<Img
										key={key}
										style={{ position: "absolute", zIndex: "99" }}
										imgClass="avatar hover-img"
										src={profile.pp} />))}
						</div>
					</div>
				</div>
			</div>
			{/* <!-- End of Profile pic area --> */}

			{/* {{-- Profile Area --}} */}
			<div className="row border-bottom border-dark">
				<div className="col-sm-1"></div>
				<div className="col-sm-10">
					<br />
					<br />
					<br className="anti-hidden" />
					{/* Check whether user has bought at least one song from musician */}
					{/* Check whether user has followed musician and display appropriate button */}
					{profile.username == props.auth.username ?
						<Link to="/profile-edit">
							<button className="float-right mysonar-btn white-btn">edit profile</button>
						</Link>
						: profile.username != "@blackmusic" ?
							profile.hasFollowed ?
								<button className={'btn btn-light float-right rounded-0'}
									onClick={() => props.onFollow(username)}>
									Followed
									<CheckSVG />
								</button> :
								profile.hasBought1 ?
									<Button
										btnClass={'mysonar-btn white-btn float-right'}
										onClick={() => props.onFollow(username)}
										btnText={'follow'} />
									: <Button
										btnClass={'mysonar-btn white-btn float-right'}
										onClick={() => props.setErrors([`You must have bought atleast one song by ${username}`])}
										btnText={'follow'} /> : ""}
					<div>
						<h3>{profile.name}</h3>
						<h5>{profile.username}</h5>
						<span style={{ color: "gold" }} className="pr-1">
							<DecoSVG />
							<small className="ml-1">{profile.decos}</small>
						</span>
						<h6>{profile.bio}</h6>
					</div>
					<div className="d-flex flex-row">
						<div className="p-2">
							<span>Following</span>
							<br />
							<span>{profile.following}</span>
						</div>
						<div className="p-2">
							<span>Fans</span>
							<br />
							<span>{profile.fans}</span>
						</div>
					</div>
				</div>
				<div className="col-sm-1"></div>
			</div>
			{/* {{-- End of Profile Area --}} */}

			{/* Tabs for Audios, Posts and Videos */}
			<div className="d-flex">
				<div className="p-2 flex-fill anti-hidden">
					<h4 className={tabClass == "videos" ? "active-scrollmenu" : "p-1"}
						onClick={() => setTabClass("videos")}>
						<center>Videos</center>
					</h4>
				</div>
				<div className="p-2 flex-fill anti-hidden">
					<h4 className={tabClass == "posts" ? "active-scrollmenu" : "p-1"}
						onClick={() => setTabClass("posts")}>
						<center>Posts</center>
					</h4>
				</div>
				<div className="p-2 flex-fill anti-hidden">
					<h4 className={tabClass == "audios" ? "active-scrollmenu" : "p-1"}
						onClick={() => setTabClass("audios")}>
						<center>Audios</center>
					</h4>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-1"></div>
				<div className={tabClass == "videos" ? "col-sm-3" : "col-sm-3 hidden"}>
					<center className="hidden"><h4>Videos</h4></center>
					{props.videoAlbums
						.filter((videoAlbum) => videoAlbum.username == username).length == 0 &&
						<center className="mt-3">
							<h6 style={{ color: "grey" }}>{username} does not have any videos</h6>
						</center>}

					{/* Video Albums */}
					{props.videoAlbums
						.filter((videoAlbum) => videoAlbum.username == username)
						.map((videoAlbum, key) => (
							<div key={videoAlbum.id} className="mb-5">
								<div className="media">
									<div className="media-left">
										<Img src={`/storage/${videoAlbum.cover}`}
											width="auto"
											height="100"
											alt={"album cover"} />
									</div>
									<div className="media-body p-2">
										<small>Video Album</small>
										<h1>{videoAlbum.name}</h1>
										<h6>{videoAlbum.created_at}</h6>
									</div>
								</div>
								{props.videos
									.filter((video) => video.album_id == videoAlbum.id)
									.map((video, index) => (
										<Suspense key={video.id} fallback={<LoadingVideoMediaHorizontal />}>
											<VideoMediaHorizontal
												key={video.id}
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
						))}
					{/* Videos Albums End */}

				</div>
				<div className={tabClass == "posts" ? "col-sm-4" : "col-sm-4 hidden"}>
					<center className="hidden"><h4>Posts</h4></center>
					{props.posts
						.filter((post) => post.username == username).length == 0 &&
						<center>
							<h6 style={{ color: "grey" }}>{username} does not have any posts</h6>
						</center>}

					{/* <!-- Posts area --> */}
					{props.posts
						.filter((post) => post.username == username)
						.map((post, index) => (
							<div key={post.id} className='d-flex'>
								<div className='media-left'>
									<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
										<Link to={`/profile/${post.username}`}>
											<Img src={post.pp}
												width="40px"
												height="40px"
												alt={'avatar'} />
										</Link>
									</div>
								</div>
								<div className='p-2 flex-grow-1'>
									<h6 className="media-heading m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
										<b>{post.name}</b>
										<small>{post.username}</small>
										<span className="ml-1" style={{ color: "gold" }}>
											<DecoSVG />
											<small className="ml-1">{post.decos}</small>
										</span>
										<small>
											<b><i className="float-right mr-1 text-secondary">{post.created_at}</i></b>
										</small>
									</h6>
									<p className="mb-0">{post.text}</p>

									{/* Show media */}
									<div className="mb-1" style={{
										borderTopLeftRadius: "10px",
										borderTopRightRadius: "10px",
										borderBottomRightRadius: "10px",
										borderBottomLeftRadius: "10px",
										overflow: "hidden"
									}}>
										{post.media &&
											<Img
												src={`storage/${post.media}`}
												imgClass="rounded-circle"
												width="100%"
												height="auto"
												alt={'post-media'} />}
									</div>

									{/* Show poll */}
									{post.parameter_1 ?
										post.isWithin24Hrs ?
											post.hasVoted1 ?
												<Button
													btnClass={"mysonar-btn poll-btn mb-1 btn-2"}
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
														style={{ width: `${post.percentage4}%`, backgroundColor: "#232323" }}>
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
									{post.parameter_1 &&
										<small style={{ color: "grey" }}>
											<i>Total votes: {post.totalVotes}</i>
											<br />
										</small>}

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
										<a href="#" onClick={(e) => {
											e.preventDefault()
											onPostLike(post.id)
										}}>
											<span style={{ color: "inherit", fontSize: "1.2em" }}><HeartSVG /></span>
											<small className="ml-1" style={{ color: "inherit" }}>{post.likes}</small>
										</a>}

									{/* Post comments */}
									<Link to={"post-show/" + post.id} style={{ color: "rgba(220, 220, 220, 1)" }}>
										<span className="ml-5" style={{ fontSize: "1.2em" }}><CommentSVG /></span>
										<small className="ml-1">{post.comments}</small>
									</Link>

									{/* <!-- Default dropup button --> */}
									<div className="dropup float-right hidden">
										<a
											href="#"
											role="button"
											id="dropdownMenuLink"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false">
											<OptionsSVG />
										</a>
										<div
											className="dropdown-menu dropdown-menu-right"
											style={{ borderRadius: "0", backgroundColor: "#232323" }}>
											{post.username != props.auth.username ?
												post.username != "@blackmusic" &&
												<a
													href="#"
													className="dropdown-item"
													onClick={(e) => {
														e.preventDefault()
														props.onFollow(post.username)
													}}>
													<h6>
														{post.hasFollowed ?
															`Unfollow ${post.username}` :
															`Follow ${post.username}`}
													</h6>
												</a> :
												<span>
													<Link
														to={`/post-edit/${post.id}`}
														className="dropdown-item">
														<h6>Edit post</h6>
													</Link>
													<a
														href="#"
														className="dropdown-item"
														onClick={(e) => {
															e.preventDefault();
															onDeletePost(post.id)
														}}>
														<h6>Delete post</h6>
													</a>
												</span>}
										</div>
									</div>
									{/* For small screens */}
									<div className="float-right anti-hidden">
										<span
											className="text-secondary"
											onClick={() => {
												if (post.username != props.auth.username) {
													if (post.username != "@blackmusic") {
														setBottomMenu("menu-open")
														setUserToUnfollow(post.username)
														// Show and Hide elements
														unfollowLink.current.className = "d-block"
														deleteLink.current.className = "d-none"
														editLink.current.className = "d-none"
													}
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
										</span>
									</div>
									{/* Edited */}
									<small>
										<b><i className="d-block text-secondary my-2">{post.hasEdited && "Edited"}</i></b>
									</small>
								</div>
							</div>
						))}
				</div>
				{/* <!-- Posts area end --> */}
				<div className={tabClass == "audios" ? "col-sm-3" : "col-sm-3 hidden"}>
					<center className="hidden"><h4>Audios</h4></center>
					{props.audioAlbums
						.filter((audioAlbum) => audioAlbum.username == username).length == 0 &&
						<center className="mt-3">
							<h6 style={{ color: "grey" }}>{username} does not have any audios</h6>
						</center>}

					{/* Audio Albums */}
					{props.audioAlbums
						.filter((audioAlbum) => audioAlbum.username == username)
						.map((audioAlbum, key) => (
							<div key={audioAlbum.id} className="mb-5">
								<div className="media">
									<div className="media-left">
										<Img src={`storage/${audioAlbum.cover}`}
											width="auto"
											height="100"
											alt={"album cover"} />
									</div>
									<div className="media-body p-2">
										<small>Audio Album</small>
										<h1>{audioAlbum.name}</h1>
										<h6>{audioAlbum.created_at}</h6>
									</div>
								</div>
								{props.audios
									.filter((audio) => audio.album_id == audioAlbum.id)
									.map((audio, index) => (
										<Suspense key={audio.id} fallback={<LoadingAudioMediaHorizontal />}>
											<AudioMediaHorizontal
												key={audio.id}
												onClick={() => props.setShow(0)}
												setShow={props.setShow}
												setLocalStorage={props.setLocalStorage}
												link={`/audio-show/${audio.id}`}
												thumbnail={`storage/${audio.thumbnail}`}
												name={audio.name}
												username={audio.username}
												ft={audio.ft}
												hasBoughtAudio={!audio.hasBoughtAudio}
												audioInCart={audio.inCart}
												audioId={audio.id}
												onCartAudios={props.onCartAudios}
												onBuyAudios={onBuyAudios} />
										</Suspense>
									))}
							</div>
						))}
					{/* Audio Albums End */}
				</div>
				<div className="col-sm-1"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between" style={{ height: "3em" }}>
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "2em" }}
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
						<h6 className="pb-2">Unfollow/Follow {userToUnfollow}</h6>
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

export default Profile
