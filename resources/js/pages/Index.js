import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Img from '../components/Img'
import Button from '../components/Button'
import axios from 'axios'
import { some } from 'lodash'

const Index = (props) => {
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

	// Function for adding video to cart
	const onCartVideos = (video) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-videos`, {
				video: video
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/cart-videos`).then((res) => props.setCartVideos(res.data))
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

	// Function for liking posts
	const onPostLike = (post) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/post-likes`, {
				post: post
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/post-likes`).then((res) => props.setPostLikes(res.data))
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

	const onDeletePost = (id) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.delete(`${props.url}/api/posts/${id}`).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/posts`).then((res) => props.setPosts(res.data))
			}).catch((err) => {
				console.log(err)
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
		<>
			{/* Post button */}
			{props.auth.account_type == 'musician' &&
				<Link to="post-create" id="floatBtn">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pen"
						viewBox="0 0 16 16">
						<path
							d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
					</svg>
				</Link>}

			<br className="hidden" />

			{/* <!-- Profile info area --> */}
			<div className="row">
				<div className="col-sm-1 hidden"></div>
				<div className="col-sm-3 hidden">
					<div className="d-flex border">
						<div className="p-2">
							<div className="avatar-thumbnail-sm" style={{ borderRadius: "50%" }}>
								<Link to={"/users/" + props.auth.username}>
									<Img src={'/storage/' + props.auth.pp} width="100px" height="100px" alt="avatar" />
								</Link>
							</div>
						</div>
						<div className="p-2 flex-grow-1">
							<h5 className="m-0 p-0"
								style={{ width: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
								{props.auth.name}
							</h5>
							<h6 className="m-0 p-0"
								style={{ width: "140px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
								<small>{props.auth.username}</small>
							</h6>
							<span style={{ color: "gold" }} className="pr-1">
								<svg className="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
								</svg>
							</span>
							<span style={{ fontSize: "10px" }}>
								{props.decos.filter((deco) => {
									return deco.username == props.auth.username
								}).length}
							</span>
						</div>
					</div>
					<div className="d-flex border-bottom border-left border-right">
						<div className="p-2 flex-fill">
							<h6>Posts</h6>
							{props.posts.filter((post) => {
								return post.username == props.auth.username
							}).length}
							<br />
						</div>
						<div className="p-2 flex-fill" style={{ color: "purple" }}>
							<Link to='/fans'>
								<h6>Fans</h6>
								{props.follows.filter((follow) => {
									return follow.followed == props.auth.username
								}).length - 1}
								<br />
							</Link>
						</div>
					</div>
					{/* <!-- Profile info area End --> */}

					<br />

					{/* <!-- Musician suggestions area --> */}
					<div className="border">
						<div className="p-2 border-bottom">
							<h2>Musicians to follow</h2>
						</div>
						{props.users.filter((musician) => {
							return musician.account_type == 'musician' && musician.username != '@blackmusic'
						}).slice(0, 10).map((musician, index) => (
							<div key={index} className='media p-2 border-bottom'>
								<div className='media-left'>
									<Link to='/home/{musician.username}'>
										<Img src={'/storage/profile-pics/male_avatar.png'} width="30px" height="30px" alt="musician" />
									</Link>
								</div>
								<div className='media-body'>
									<b>{musician.name}</b>
									<small><i>{musician.username}</i></small>

									{/* Check whether user has bought at least one song  from musician */}
									{/* Check whether user has followed musician and display appropriate button */}
									{props.boughtVideos.find((boughtVideo) => {
										return boughtVideo.username == props.auth.username && boughtVideo.artist == musician.username
									}) ? props.follows.find((follow) => {
										return follow.followed == musician.username && follow.username == props.auth.username
									}) ? <button className={'btn btn-light float-right rounded-0'}
										onClick={() => onFollow(musician.username)}>
										Followed
											<svg className='bi bi-check' width='1.5em' height='1.5em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
											<path fill-rule='evenodd'
												d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z' />
										</svg>
									</button>
										: <Button btnClass={'mysonar-btn float-right'}
											onClick={() => onFollow(musician.username)}
											btnText={'follow'} />
										: <Button btnClass={'mysonar-btn float-right'}
											onClick={() =>
												props.setErrors([`You must have bought atleast one song by ${musician.username}`])}
											btnText={'follow'} />}
								</div>
							</div>
						))}
					</div>
				</div>
				{/* <!-- Musician suggestion area end --> */}

				<div className="col-sm-4">
					{/* <!-- ****** Songs Area ****** --> */}
					<div className="p-2 border">
						<h5>Songs for you</h5>
						<div className="hidden-scroll">
							{props.videos.filter((video) => !props.boughtVideos.some((boughtVideo) => boughtVideo.video_id == video.id && boughtVideo.username == props.auth.username)).map((video, index) => (
								<span key={index} className="card pt-0 pl-0 pr-0 pb-2" style={{ borderRadius: "10px" }}>
									<div className="thumbnail"
										style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
										<a href='/video-charts/{video.id}'>
											<Img src={video.thumbnail} width="160em" height="90em" />
										</a>
									</div>
									<h6 className="m-0 pt-2 pr-1 pl-1"
										style={{ width: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
										{video.name}
									</h6>
									<h6 className="mt-0 mr-1 ml-1 mb-0 pt-0 pr-1 pl-1 pb-0">
										<small>{video.username}</small>
									</h6>
									<h6>
										<small className="mt-0 mr-1 ml-1 mb-0 pt-0 pr-1 pl-1 pb-0">10 Downloads</small>
									</h6>
									{props.cartVideos.find((cartVideo) => {
										return cartVideo.video_id == video.id && cartVideo.username == props.auth.username
									}) ? <button className="btn btn-light mb-1 rounded-0" style={{ minWidth: '90px', height: '33px' }}
										onClick={() => onCartVideos(video.id)}>
										<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
											fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
											<path fillRule='evenodd'
												d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
										</svg>
									</button>
										: <button className="mysonar-btn mb-1" style={{ minWidth: '90px', height: '33px' }}
											onClick={() => onCartVideos(video.id)}>
											<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16'
												fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
												<path fillRule='evenodd'
													d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
											</svg>
										</button>}
									<br />
									<Button btnClass={'btn mysonar-btn green-btn'} btnText={'buy'} />
								</span>
							))}
							<br />
							<br />
						</div>
					</div>
					{/* <!-- ****** Songs Area End ****** --> */}

					{/* <!-- Posts area --> */}
					{props.posts.filter((post) => {
						return props.follows.some((follow) => follow.followed == post.username && follow.username == props.auth.username)
					}).map((post, index) => (
						<div key={index} className='media p-2 border-bottom'>
							<div className='media-left'>
								<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
									<a href='/home/{post.username}'>
										<Img src={`/storage/${props.users.find((user) => user.username == post.username).pp}`}
											width="40px" height="40px" alt={'avatar'} />
									</a>
								</div>
							</div>
							<div className='media-body'>
								<h6 className="media-heading m-0"
									style={{ width: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
									<b>{props.users.find((user) => user.username == post.username).name}</b>
									<small>{post.username} </small>
									<span style={{ color: "gold" }}>
										<svg className="bi bi-circle" width="1em" height="1em" viewBox="0 0 16 16"
											fill="currentColor" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd"
												d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										</svg>
									</span>
									<span style={{ fontSize: "10px" }}> {props.decos.filter((deco) => {
										return deco.username == post.username
									}).length}</span>
									<small>
										<i className="float-right mr-1">{post.created_at}</i>
									</small>
								</h6>
								<p className="mb-0">{post.text}</p>
								{/* Show media */}
								<div className="mb-1" style={{
									borderTopLeftRadius: "10px", borderTopRightRadius: "10px",
									borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px", overflow: "hidden"
								}}>
									{post.media && <Img src={`/storage/${post.media}`} alt={'post-media'} width="100%" height="auto" />}
								</div>
								{props.postLikes.find((postLike) => {
									return postLike.post_id == post.id && postLike.username == props.auth.username
								}) ? <a href="#" style={{ color: "#cc3300" }} onClick={(e) => {
									e.preventDefault()
									onPostLike(post.id)
								}}>
									<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
										className='bi bi-heart-fill' viewBox='0 0 16 16'>
										<path fillRule='evenodd'
											d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
									</svg>
								</a>
									: <a href='#' onClick={(e) => {
										e.preventDefault()
										onPostLike(post.id)
									}}>
										<svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' fill='currentColor'
											className='bi bi-heart' viewBox='0 0 16 16'>
											<path
												d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
										</svg>
									</a>}
								<small> {props.postLikes.filter((postLike) => postLike.post_id == post.id).length}</small>
								<Link to={"post-comments/" + post.id}>
									<svg className="bi bi-chat ml-5" width="1.2em" height="1.2em" viewBox="0 0 16 16"
										fill="currentColor" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd"
											d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
									</svg>
									<small> {props.postComments.filter((postComment) => {
										return postComment.post_id == post.id
									}).length}
									</small>
								</Link>
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
										{post.username !== props.auth.username ?
											post.username !== "@blackmusic" &&
											<a href="#" className="dropdown-item" onClick={(e) => {
												e.preventDefault()
												onFollow(post.username)
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
					))
					}
				</div>
				{/* <!-- Posts area end --> */}

				{/* <!-- Song suggestion area --> */}
				<div className="col-sm-3 hidden">
					<div className="p-2 border-bottom border">
						<h5>Songs to watch</h5>
					</div>
					{props.videos.slice(0, 10).map((video, index) => (
						<div key={index} className="media p-2 border-bottom border-right border-left">
							<div className="media-left thumbnail">
								<a href='/video-charts/{video.id}'>
									<Img src={video.thumbnail} width="160em" height="90em" />
								</a>
							</div>
							<div className="media-body ml-2">
								<h6 className="m-0"
									style={{ width: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
									{video.name}
								</h6>
								<h6 className="m-0">
									<small>{video.username}</small>
								</h6>
								<h6>
									<small className="m-0">0 Downloads</small>
								</h6>
								<a href='#' style={{ color: "#000" }}>
									<button className='btn btn-light mb-1' style={{ minWidth: "40px", height: "33px" }}>
										<svg className='bi bi-cart3' width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor'
											xmlns='http://www.w3.org/2000/svg'>
											<path fillRule='evenodd'
												d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
										</svg>
									</button>
								</a>
								<a href='#' style={{ color: "#000" }}>
									<Button btnClass={'btn mysonar-btn green-btn float-right'} btnText={'buy'} />
								</a>
							</div>
						</div>
					))
					}
				</div>
				{/* <!-- End of Song Suggestion Area --> */}

				<div className="col-sm-1"></div>
			</div>
		</>
	)
}

export default Index
