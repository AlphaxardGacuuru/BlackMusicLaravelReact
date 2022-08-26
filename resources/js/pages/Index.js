import React, { useState, Suspense } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import Img from '../components/Img'
import LoadingVideoMediaHorizontal from '../components/LoadingVideoMediaHorizontal'
import LoadingMusiciansHorizontal from '../components/LoadingMusiciansHorizontal'
import LoadingVideoMediaVertical from '../components/LoadingVideoMediaVertical'
import LoadingPostsMedia from '../components/LoadingPostsMedia'

const MusiciansHorizontal = React.lazy(() => import('../components/MusiciansHorizontal'))
const VideoMediaVertical = React.lazy(() => import('../components/VideoMediaVertical'))
const VideoMediaHorizontal = React.lazy(() => import('../components/VideoMediaHorizontal'))
const PostsMedia = React.lazy(() => import('../components/PostsMedia'))

import CloseSVG from '../svgs/CloseSVG'
import PenSVG from '../svgs/PenSVG'
import ChatSVG from '../svgs/ChatSVG'
import DecoSVG from '../svgs/DecoSVG'

const Index = (props) => {

	axios.defaults.baseURL = props.url

	const [videoSlice, setVideoSlice] = useState(10)
	const [bottomMenu, setBottomMenu] = useState("")
	const [userToUnfollow, setUserToUnfollow] = useState()
	const [postToEdit, setPostToEdit] = useState()
	const [editLink, setEditLink] = useState()
	const [deleteLink, setDeleteLink] = useState()
	const [unfollowLink, setUnfollowLink] = useState()

	const history = useHistory()

	// Buy function
	const onBuyVideos = (video) => {
		props.onCartVideos(video)
		setTimeout(() => history.push('/cart'), 1000)
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
				<Link
					to="post-create"
					id="floatBtn"
					className={`${!checkLocation && "mb-5"}`}>
					<PenSVG />
				</Link>}

			{/* Chat button */}
			<Link
				to="/chat"
				id="chatFloatBtn"
				className={`${!checkLocation && "mb-5"}`}>
				<ChatSVG />
			</Link>

			{/* <!-- Profile info area --> */}
			<div className="row">
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
								<DecoSVG />
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
							.map((item, key) => (<LoadingMusiciansHorizontal key={key} />))}

						{/* Musicians */}
						{props.users
							.filter((user) => user.account_type == "musician" &&
								user.username != props.auth.username &&
								user.username != "@blackmusic")
							.slice(0, 10)
							.map((user, key) => (
								<Suspense key={key} fallback={<LoadingMusiciansHorizontal />}>
									<MusiciansHorizontal {...props} user={user} />
								</Suspense>
							))}
					</div>
				</div>
				{/* <!-- Musician suggestion area end --> */}

				{/* <!-- ****** Songs Area ****** --> */}
				<div className="col-sm-4">
					<div className="p-2">
						<h5>Songs for you</h5>
						<div className="hidden-scroll" onScroll={handleScroll}>
							{/* Loading Video items */}
							{dummyArray
								.filter(() => props.videos.length < 1)
								.map((item, key) => (<LoadingVideoMediaVertical key={key} />))}

							{/* Real Video items */}
							{props.videos
								.filter((video) => !video.hasBoughtVideo)
								.slice(0, videoSlice)
								.map((video, key) => (
									<Suspense key={key} fallback={<LoadingVideoMediaVertical />}>
										<VideoMediaVertical {...props} video={video} />
									</Suspense>
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
							.map((item, key) => (<LoadingPostsMedia key={key} />))}

						{/* Posts */}
						{props.posts
							.filter((post) => post.hasFollowed)
							.map((post, key) => (
								<Suspense key={key} fallback={<LoadingPostsMedia />}>
									<PostsMedia
										{...props}
										post={post}
										setBottomMenu={setBottomMenu}
										setUserToUnfollow={setUserToUnfollow}
										setPostToEdit={setPostToEdit}
										setEditLink={setEditLink}
										setDeleteLink={setDeleteLink}
										setUnfollowLink={setUnfollowLink} />
								</Suspense>
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
							.map((item, key) => (<LoadingVideoMediaHorizontal key={key} />))}

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
					<div
						className="d-flex align-items-center justify-content-between border-bottom border-dark mb-3"
						style={{ height: "3em" }}>
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "1em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{unfollowLink &&
						<div
							onClick={() => {
								setBottomMenu("")
								props.onFollow(userToUnfollow)
							}}>
							<h6 className="pb-2">Unfollow {userToUnfollow}</h6>
						</div>}
					{editLink &&
						<Link
							to={`/post-edit/${postToEdit}`}
							onClick={() => setBottomMenu("")}>
							<h6 className="pb-2">Edit post</h6>
						</Link>}
					{deleteLink &&
						<div
							onClick={() => {
								setBottomMenu("")
								onDeletePost(postToEdit)
							}}>
							<h6 className="pb-2">Delete post</h6>
						</div>}
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</>
	)
}

export default Index