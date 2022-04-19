import React, { useState, Suspense } from 'react'
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios'

import Img from '../components/Img'
import Button from '../components/Button'

import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'
import LoadingAudioMediaHorizontal from '../components/LoadingAudioMediaHorizontal'

const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))
const AudioMediaHorizontal = React.lazy(() => import('../components/AudioMediaHorizontal'))

const Profile = (props) => {

	axios.defaults.baseURL = props.url

	let { username } = useParams();

	let history = useHistory()

	const [tabClass, setTabClass] = useState("videos")

	useEffect(() => {
		//Fetch Posts
		axios.get(`/api/posts`)
			.then((res) => {
				props.setPosts(res.data)
				props.setLocalStorage("posts", res.data)
			}).catch(() => props.setErrors(['Failed to fetch posts']))
	}, [])

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
									<svg className='bi bi-check'
										width='1.5em'
										height='1.5em'
										viewBox='0 0 16 16'
										fill='currentColor'
										xmlns='http://www.w3.org/2000/svg'>
										<path fillRule='evenodd'
											d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z' />
									</svg>
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
							<svg className="bi bi-circle"
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd"
									d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
							</svg>
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
											<svg className="bi bi-circle"
												width="1em"
												height="1em"
												viewBox="0 0 16 16"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
											</svg>
											<small className="ml-1">{post.decos}</small>
										</span>
										<small>
											<i className="float-right mr-1 text-secondary">{post.created_at}</i>
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
											<svg xmlns='http://www.w3.org/2000/svg'
												width='1.2em'
												height='1.2em'
												fill='currentColor'
												className='bi bi-heart-fill'
												viewBox='0 0 16 16'>
												<path fillRule='evenodd'
													d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
											</svg>
											<small className="ml-1" style={{ color: "inherit" }}>{post.likes}</small>
										</a> :
										<a href="#" onClick={(e) => {
											e.preventDefault()
											onPostLike(post.id)
										}}>
											<svg xmlns='http://www.w3.org/2000/svg'
												width='1.2em'
												height='1.2em'
												fill='currentColor'
												className='bi bi-heart'
												viewBox='0 0 16 16'>
												<path
													d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
											</svg>
											<small className="ml-1" style={{ color: "inherit" }}>{post.likes}</small>
										</a>}

									{/* Post comments */}
									<Link to={"post-show/" + post.id}>
										<svg className="bi bi-chat ml-5"
											width="1.2em"
											height="1.2em"
											viewBox="0 0 16 16"
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
										</svg>
										<small className="ml-1">{post.comments}</small>
									</Link>

									{/* <!-- Default dropup button --> */}
									<div className="dropup float-right">
										<a href="#"
											role="button"
											id="dropdownMenuLink"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false">
											<svg className="bi bi-three-dots-vertical"
												width="1em"
												height="1em"
												viewBox="0 0 16 16"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd"
													d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
											</svg>
										</a>
										<div className="dropdown-menu dropdown-menu-right" style={{ borderRadius: "0" }}>
											{post.username != props.auth.id ?
												post.username != 29 &&
												<a href="#" className="dropdown-item" onClick={(e) => {
													e.preventDefault()
													props.onFollow(post.username)
												}}>
													<h6>Unfollow</h6>
												</a>
												: <a href='#' className="dropdown-item" onClick={(e) => {
													e.preventDefault();
													onDeletePost(post.id)
												}}>
													<h6>Delete post</h6>
												</a>}
										</div>
									</div>
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
		</>
	)
}

export default Profile
