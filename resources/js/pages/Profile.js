import React, { useState, Suspense } from 'react'
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios'

import Img from '../components/Img'
import Button from '../components/Button'
import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'
import LoadingAudioMediaHorizontal from '../components/LoadingAudioMediaHorizontal'

import CheckSVG from '../svgs/CheckSVG';
import DecoSVG from '../svgs/DecoSVG';
import LoadingPostMedia from '../components/LoadingPostMedia';
import PostMedia from '../components/PostMedia';
import PostOptions from '../components/PostOptions';

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
	const [editLink, setEditLink] = useState()
	const [deleteLink, setDeleteLink] = useState()
	const [unfollowLink, setUnfollowLink] = useState()

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

	// Function for deleting posts
	const onDeletePost = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/posts/${id}`).then((res) => {
				props.setMessages([res.data])
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

			{/* Tabs for Videos, Posts and Audios */}
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
			{/* Tabs for Videos, Posts and Audios End */}

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
												{...props}
												video={video}
												onBuyVideos={onBuyVideos}
												onClick={() => props.setShow(0)} />
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
						.map((post, key) => (
							<Suspense key={key} fallback={<LoadingPostMedia />}>
								<PostMedia
									{...props}
									post={post}
									setBottomMenu={setBottomMenu}
									setUserToUnfollow={setUserToUnfollow}
									setPostToEdit={setPostToEdit}
									setEditLink={setEditLink}
									setDeleteLink={setDeleteLink}
									onDeletePost={onDeletePost}
									setUnfollowLink={setUnfollowLink} />
							</Suspense>
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
									.map((audio, key) => (
										<Suspense key={audio.id} fallback={<LoadingAudioMediaHorizontal />}>
											<AudioMediaHorizontal
												{...props}
												audio={audio}
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
			<PostOptions
				{...props}
				bottomMenu={bottomMenu}
				setBottomMenu={setBottomMenu}
				unfollowLink={unfollowLink}
				userToUnfollow={userToUnfollow}
				editLink={editLink}
				postToEdit={postToEdit}
				deleteLink={deleteLink}
				onDeletePost={onDeletePost} />
			{/* Sliding Bottom Nav end */}
		</>
	)
}

export default Profile
