import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Link, useParams, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios';

import Img from '../components/Img'
import Button from '../components/Button'
import LoadingAudioMediaHorizontal from '../components/LoadingAudioMediaHorizontal'

import OptionsSVG from '../svgs/OptionsSVG';
import CloseSVG from '../svgs/CloseSVG';
import ShuffleSVG from '../svgs/ShuffleSVG';
import PreviousSVG from '../svgs/PreviousSVG';
import PauseSVG from '../svgs/PauseSVG';
import PlaySVG from '../svgs/PlaySVG';
import NextSVG from '../svgs/NextSVG';
import LoopSVG from '../svgs/LoopSVG';
import VolumeSVG from '../svgs/VolumeSVG';
import ShareSVG from '../svgs/ShareSVG';
import CartSVG from '../svgs/CartSVG';
import HeartFilledSVG from '../svgs/HeartFilledSVG'
import HeartSVG from '../svgs/HeartSVG'
import DecoSVG from '../svgs/DecoSVG'

const AudioMediaHorizontal = React.lazy(() => import('../components/AudioMediaHorizontal'))
const SocialMediaInput = React.lazy(() => import('../components/SocialMediaInput'))

const AudioShow = (props) => {

	axios.defaults.baseURL = props.url

	let { show } = useParams()
	let { referer } = useParams()
	let history = useHistory()
	const location = useLocation()

	// Set State
	const [text, setText] = useState("")
	const [tabClass, setTabClass] = useState("comments")
	const [audioComments, setAudioComments] = useState(props.getLocalStorage("audioComments"))
	const [bottomMenu, setBottomMenu] = useState("")
	const [postToEdit, setPostToEdit] = useState()

	var deleteLink = useRef(null)

	// Fetch Audio Comments
	useEffect(() => {

		// Set states
		setTimeout(() => {
			props.setPlaceholder("Add a comment")
			props.setText("")
			props.setId(show)
			props.setShowImage(false)
			props.setShowPoll(false)
			props.setShowEmojiPicker(false)
			props.setShowImagePicker(false)
			props.setShowPollPicker(false)
			props.setUrlTo("/audio-comments")
			props.setUrlToDelete(`/audio-comments/${props.media.substr(11)}`)
			props.setStateToUpdate(() => setAudioComments)
			props.setEditing(false)
		}, 1000)

		axios.get('/api/audio-comments')
			.then((res) => {
				setAudioComments(res.data)
				props.setLocalStorage("audioComments", res.data)
			}).catch(() => props.setErrors(["Failed to fetch audio comments"]))
	}, [])

	// Function for liking audio
	const onAudioLike = () => {
		// Show like
		const newAudios = props.audios
			.filter((item) => {
				// Get the exact audio and change like status
				if (item.id == show) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new audios
		props.setAudios(newAudios)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/audio-likes`, {
				audio: show
			}).then((res) => {
				props.setMessage(res.data)
				// Update audios
				axios.get(`${props.url}/api/audios`)
					.then((res) => props.setAudios(res.data))
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

	// Function for liking posts
	const onCommentLike = (comment) => {
		// Show like
		const newAudioComments = audioComments
			.filter((item) => {
				// Get the exact audio and change like status
				if (item.id == comment) {
					item.hasLiked = !item.hasLiked
				}
				return true
			})
		// Set new audios
		setAudioComments(newAudioComments)

		// Add like to database
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/audio-comment-likes`, {
				comment: comment
			}).then((res) => {
				props.setMessage(res.data)
				// Update audio comments
				axios.get(`${props.url}/api/audio-comments`)
					.then((res) => setAudioComments(res.data))
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
			axios.delete(`${props.url}/api/audio-comments/${id}`).then((res) => {
				props.setMessage(res.data)
				// Update audio comments
				axios.get(`${props.url}/api/audio-comments`)
					.then((res) => setAudioComments(res.data))
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

	// Function for buying audio to cart
	const onBuyAudios = (audio) => {
		props.onCartAudios(audio)
		setTimeout(() => history.push('/cart'), 1000)
	}

	// Function for downloading audio
	const onDownload = () => {
		window.open(`${props.url}/api/audios/${props.showAudio.id}`)
		props.setMessage(`Downloading ${props.showAudio.name}`)
	}

	// Web Share API for share button
	// Share must be triggered by "user activation"
	const onShare = () => {
		// Define share data
		const shareData = {
			title: props.showAudio.name,
			text: `Check out ${props.showAudio.name} on Black Music\n`,
			url: `https://music.black.co.ke/#/audio-show/${show}/${props.auth.username}`
		}
		// Check if data is shareble
		navigator.canShare(shareData) &&
			navigator.share(shareData)
	}

	const onGuestBuy = () => {
		props.setLogin(true)
		sessionStorage.setItem("referer", referer)
		sessionStorage.setItem("page", location.pathname)
	}

	return (
		<>
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-7">
					{/* Audio Image */}
					<div
						className="ml-2 mr-2"
						style={{
							overflow: "hidden",
							width: "auto",
							maxHeight: "495px",
						}}>
						<center>
							{props.audioLoader ?
								<div id="sonar-load" className="mt-5 mb-5"></div> :
								<Img
									src={`/storage/${props.showAudio.thumbnail}`}
									width="100%"
									height="auto"
									alt="music-cover" />}
						</center>
					</div>

					{/* <!-- Progress Container --> */}
					<div
						ref={props.audioContainer}
						className="progress ml-2 mr-2 mt-4 bg-dark"
						style={{ height: "5px" }}
						onClick={props.setProgress}>
						<div
							ref={props.audioProgress}
							className="progress-bar"
							style={{
								background: "#FFD700",
								height: "5px",
								width: props.progressPercent
							}}>
						</div>
					</div>
					{/* Progress Container End */}

					{/* Audio Controls */}
					<div className="d-flex justify-content-between" style={{ color: "rgba(220,220,220,1)" }}>
						{/* Timer */}
						<div style={{ cursor: "pointer" }} className="p-2">{props.fmtMSS(props.currentTime)}</div>
						{/* Shuffle Button */}
						<div
							style={{
								cursor: "pointer",
								color: props.shuffle && "#FFD700"
							}}
							className="p-2"
							onClick={() => {
								props.setShuffle(props.shuffle ? false : true)
								props.setLoop(props.loop && false)
							}}>
							<ShuffleSVG />
						</div>
						{/* Previous Button */}
						<div style={{ cursor: "pointer" }} className="p-2">
							<span onClick={props.prevSong}><PreviousSVG /></span>
						</div>
						{/* Pause/Play Button */}
						<div style={{ cursor: "pointer" }} className="p-2">
							<span onClick={props.playBtn ? props.pauseSong : props.playSong}>
								{props.playBtn ? <PauseSVG /> : <PlaySVG />}
							</span>
						</div>
						{/* Next Button */}
						<div style={{ cursor: "pointer" }} className="p-2">
							<span onClick={props.nextSong}><NextSVG /></span>
						</div>
						{/* Loop Button */}
						<div
							style={{
								cursor: "pointer",
								color: props.loop && "#FFD700"
							}}
							className="p-2"
							onClick={() => {
								props.setLoop(props.loop ? false : true)
								props.setShuffle(props.shuffle && false)
							}}>
							<LoopSVG />
						</div>
						<div style={{ cursor: "pointer" }} className="p-2">{props.fmtMSS(props.dur)}</div>
					</div>

					<div className="d-flex justify-content-end">
						{/* <!-- Volume Container --> */}
						<div style={{ cursor: "pointer", color: "rgba(220,220,220,1)" }} className="volume-show">
							<VolumeSVG />
						</div>
						<div
							ref={props.volumeContainer}
							className="progress volume-hide ml-2 mr-2 mt-2 float-right bg-dark"
							style={{
								height: "5px",
								width: "25%"
							}}
							onClick={props.onSetVolume}>
							<div
								ref={props.volumeProgress}
								className="progress-bar"
								style={{
									background: "#FFD700",
									height: "5px",
									width: Math.round(props.volume * 100)
								}}>
							</div>
						</div>
					</div>
					{/* Audio Controls End */}

					<div className="d-flex justify-content-between">
						{/* Audio likes */}
						<div className="p-2 mr-2">
							{props.showAudio.hasLiked ?
								<a href="#" style={{ color: "#fb3958" }}
									onClick={(e) => {
										e.preventDefault()
										onAudioLike()
									}}>
									<HeartFilledSVG />
									<small className="ml-1" style={{ color: "inherit" }}>{props.showAudio.likes}</small>
								</a> :
								<a
									href='#'
									style={{ color: "rgba(220,220,220,1)" }}
									onClick={(e) => {
										e.preventDefault()
										onAudioLike()
									}}>
									<HeartSVG />
									<small className="ml-1" style={{ color: "inherit" }}>{props.showAudio.likes}</small>
								</a>}
						</div>

						{/* Share button */}
						<div className="p-2 mr-2">
							<a
								href="#"
								style={{ color: "rgba(220,220,220,1)" }}
								onClick={(e) => {
									e.preventDefault()
									props.auth.username != "@guest" && onShare()
								}}>
								<ShareSVG />
								<span className="ml-1">SHARE</span>
							</a>
						</div>

						{/* Download/Buy button */}
						{props.showAudio.hasBoughtAudio ?
							// Ensure audio is downloadable
							!props.showAudio.audio.match(/https/) &&
							<div className="p-2">
								<Button
									btnClass="mysonar-btn white-btn"
									btnText="download"
									onClick={onDownload} />
							</div> :
							// Cart Button
							props.showAudio.inCart ?
								<div className="p-2">
									<button className="btn text-light mb-1 rounded-0"
										style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}
										onClick={() => props.onCartAudios(show)}>
										<CartSVG />
									</button>
								</div> :
								<div className="p-2">
									<Button
										btnClass={'btn mysonar-btn green-btn btn-2'}
										btnText={'KES 10'}
										onClick={() => {
											// If user is guest then redirect to Login
											props.auth.username == "@guest" ?
												onGuestBuy() :
												onBuyAudios(show)
										}} />
								</div>}
					</div>

					{/* Audio Info Area */}
					<div className="d-flex flex-row">
						<div className="p-2 mr-auto">
							<h6 className="m-0 p-0"
								style={{
									width: "200px",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "clip"
								}}>
								<small>Song name {props.showAudio.name}</small>
							</h6>
							<small>Album</small>
							<span className="ml-1">
								{props.showAudio.album}
							</span><br />
							<small>Genre</small>
							<span className="ml-1">{props.showAudio.genre}</span>
							<br />
							<small>Posted</small>
							<span className="ml-1">{props.showAudio.created_at}</span>
						</div>
					</div>

					{/* <!-- Read more section --> */}
					<div className="p-2 border-bottom border-dark">
						<button
							href="#collapseExample"
							className="mysonar-btn white-btn"
							data-toggle="collapse"
							aria-expanded="false"
							aria-controls="collapseExample">
							Read more
						</button>
						<div className="collapse" id="collapseExample">
							<div className="card card-body">
								{props.showAudio.description}
							</div>
						</div>
					</div>
					{/* Audio Info Area End */}

					{/* Artist Area */}
					<div className="p-2 border-bottom border-dark">
						<div className='media'>
							<div className='media-left'>
								<Link to={`/profile/${props.showArtist.username}`}>
									<Img
										src={props.showArtist.pp}
										imgClass="rounded-circle"
										width={"40px"}
										height={"40px"} />
								</Link>
							</div>
							<div className='media-body'>
								<h6 className="ml-1 mb-0 p-0"
									style={{
										width: "140px",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip"
									}}>
									<small>{props.showArtist.name}{props.showArtist.username}</small>
									<span className="ml-1" style={{ color: "gold" }}>
										<DecoSVG />
										<small className="ml-1">{props.showArtist.decos}</small>
									</span>
								</h6>
								<small className="ml-1">{props.showArtist.fans} fans</small>

								{/* Check whether user has bought at least one song from musician */}
								{/* Check whether user has followed musician and display appropriate button */}
								{props.showArtist.username != props.auth.username ?
									props.showArtist.hasBoughtAudio || props.auth.username == "@blackmusic" ?
										props.showArtist.hasFollowed ?
											<button
												className={'btn text-white float-right rounded-0'}
												style={{ backgroundColor: "#232323" }}
												onClick={() => props.onFollow(props.showArtist.username)}>
												Followed
												<CheckSVG />
											</button>
											: <Button btnClass={'mysonar-btn white-btn float-right'}
												onClick={() => props.onFollow(props.showArtist.username)}
												btnText={'follow'} />
										: <Button btnClass={'mysonar-btn white-btn float-right'}
											onClick={() =>
												props.setErrors([`You must have bought atleast one song by ${props.showArtist.username}`])}
											btnText={'follow'} /> : ""}
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
						{props.showAudio.username == props.auth.username ||
							props.auth.username == "@blackmusic" ||
							props.showAudio.hasBoughtAudio ?
							<form
								onSubmit={props.onSubmit}
								className="contact-form bg-white mb-2"
								autoComplete="off">
								<Suspense
									fallback={
										<center>
											<div id="sonar-load" className="mt-5 mb-5"></div>
										</center>
									}>
									<SocialMediaInput {...props} />
								</Suspense>
							</form> : ""}
						{/* <!-- End of Comment Form --> */}

						{/* <!-- Comment Section --> */}
						{props.showAudio.username == props.auth.username ||
							props.auth.username == "@blackmusic" ||
							props.showAudio.hasBoughtAudio ?
							audioComments
								.filter((comment) => comment.audio_id == show)
								.length > 0 ?
								audioComments
									.filter((comment) => comment.audio_id == show)
									.map((comment, index) => (
										<div key={index} className='media p-2'>
											<div className='media-left'>
												<div className="avatar-thumbnail-xs" style={{ borderRadius: "50%" }}>
													<Link to={`/profile/${comment.username}`}>
														<Img src={comment.pp}
															width="50px"
															height="50px" />
													</Link>
												</div>
											</div>
											<div className="media-body ml-2">
												<h6 className="media-heading m-0"
													style={{
														width: "100%",
														whiteSpace: "nowrap",
														overflow: "hidden",
														textOverflow: "clip"
													}}>
													<b>{comment.name}</b>
													<small>{comment.username}</small>
													<span className="ml-1" style={{ color: "gold" }}>
														<DecoSVG />
														<span className="ml-1" style={{ fontSize: "10px" }}>{comment.decos}</span>
													</span>
													<small>
														<b><i className="float-right mr-1 text-secondary">{comment.created_at}</i></b>
													</small>
												</h6>
												<p className="mb-0">{comment.text}</p>

												{/* Comment likes */}
												{comment.hasLiked ?
													<a href="#"
														style={{ color: "#fb3958" }}
														onClick={(e) => {
															e.preventDefault()
															onCommentLike(comment.id)
														}}>
														<HeartFilledSVG />
														<small className="ml-1" style={{ color: "inherit" }}>
															{comment.likes}
														</small>
													</a> :
													<a href='#' onClick={(e) => {
														e.preventDefault()
														onCommentLike(comment.id)
													}}>
														<HeartSVG />
														<small className="ml-1" style={{ color: "inherit" }}>{comment.likes}</small>
													</a>}

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
														className="dropdown-menu dropdown-menu-right p-0"
														style={{ borderRadius: "0", backgroundColor: "#232323" }}>
														{comment.username == props.auth.username &&
															<a
																href='#'
																className="dropdown-item"
																onClick={(e) => {
																	e.preventDefault();
																	onDeleteComment(comment.id)
																}}>
																<h6>Delete comment</h6>
															</a>}
													</div>
												</div>
												{/* For small screens */}
												<div className="float-right anti-hidden">
													<span
														className="text-secondary"
														onClick={() => {
															if (comment.username == props.auth.username) {
																setBottomMenu("menu-open")
																setPostToEdit(comment.id)
																// Show and Hide elements
																deleteLink.current.className = "d-block"
															}
														}}>
														<OptionsSVG />
													</span>
												</div>
											</div>
										</div>
									)) :
								<center className="my-3">
									<h6 style={{ color: "grey" }}>No comments to show</h6>
								</center> : ""}
					</div>
					{/* End of Comment Section */}
				</div>

				{/* -- Up next area -- */}
				<div className={tabClass == "recommended" ? "col-sm-3" : "col-sm-3 hidden"}>
					<div className="p-2 border-bottom border-dark">
						<h5>Up next</h5>
					</div>
					{!props.boughtAudios
						.some((boughtAudio) => boughtAudio.username == props.auth.username) &&
						<center>
							<h6 className="mt-4" style={{ color: "grey" }}>You haven't bought any audios</h6>
						</center>}

					{props.boughtAudios
						.filter((boughtAudio) => {
							return boughtAudio.username == props.auth.username &&
								boughtAudio.audio_id != props.show
						}).map((boughtAudio, key) => (
							<Suspense key={key} fallback={<LoadingAudioMediaHorizontal />}>
								<AudioMediaHorizontal
									key={key}
									setShow={props.setShow}
									setLocalStorage={props.setLocalStorage}
									link={`/audio-show/${boughtAudio.audio_id}`}
									thumbnail={`/storage/${boughtAudio.thumbnail}`}
									name={boughtAudio.name}
									username={boughtAudio.username}
									ft={boughtAudio.ft}
									audioId={boughtAudio.audio_id}
									showCartandBuyButton={false} />
							</Suspense>
						))}
					{/* <!-- End of Up next Area --> */}

					{/* Song Suggestion Area */}
					<div className="p-2 mt-5 border-bottom border-dark">
						<h5>Songs to watch</h5>
					</div>
					{props.audios
						.filter((audio) => {
							return !audio.hasBoughtAudio &&
								audio.username != props.auth.username &&
								audio.id != show
						}).slice(0, 10)
						.map((audio, key) => (
							<Suspense key={key} fallback={<LoadingAudioMediaHorizontal />}>
								<AudioMediaHorizontal
									key={key}
									setShow={props.setShow}
									setLocalStorage={props.setLocalStorage}
									link={`/audio-show/${audio.id}`}
									thumbnail={`/storage/${audio.thumbnail}`}
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
				{/* <!-- End of Song Suggestion Area --> */}
				<div className="1"></div>
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
						ref={deleteLink}
						onClick={() => {
							setBottomMenu("")
							onDeleteComment(postToEdit)
						}}>
						<h6 className="pb-2">Delete post</h6>
					</div>
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</>
	)
}

export default AudioShow
