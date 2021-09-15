import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import Button from '../components/Button'

const Cart = (props) => {

	const [bottomMenu, setBottomMenu] = useState()

	// Calculate totals
	const videoTotal = props.cartVideos.filter((cartVideo) => cartVideo.username == props.auth.username).length
	const videoTotalCash = props.cartVideos.filter((cartVideo) => cartVideo.username == props.auth.username).length * 200
	const audioTotal = props.cartAudios.filter((cartAudio) => cartAudio.username == props.auth.username).length
	const audioTotalCash = props.cartAudios.filter((cartAudio) => cartAudio.username == props.auth.username).length * 100
	const total = videoTotalCash + audioTotalCash

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

	// Function for adding audio to cart
	const onCartAudios = (audio) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/cart-audios`, {
				audio: audio
			}).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/cart-audios`).then((res) => props.setCartAudios(res.data))
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

	const onPay = () => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.get(`${props.url}/api/kopokopo`, {
				amount: total,
			}).then((res) => {
				props.setMessage(res.data)
			}).catch((err) => {
				props.setErrors(['Failed'])
			})
		});
	}

	return (
		<div>
			<div className="row">
				<div className="col-sm-4"></div>
				<div className="col-sm-4">
					<center><h1>Cart</h1></center>
					{/* Cart Videos */}
					<center><h3>Videos</h3></center>
					<hr />
					{props.cartVideos
						.filter((cartVideo) => cartVideo.username == props.auth.username)
						.map((cartVideo, key) => (
							<div key={key}
								className="media p-2 border-bottom">
								<div className="media-left thumbnail">
									<Link to={`/video-show/${cartVideo.video_id}`}>
										<Img
											src={props.videos
												.find((video) => video.id == cartVideo.video_id).thumbnail.match(/http/) ?
												props.videos.find((video) => video.id == cartVideo.video_id).thumbnail :
												`storage/${props.videos.find((video) => video.id == cartVideo.video_id).thumbnail}`}
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
										{props.videos.find((video) => video.id == cartVideo.video_id).name}
									</h6>
									<h6 className="mt-0 mr-1 ml-1 mb-2 pt-0 pr-1 pl-1 pb-0">
										<small>{props.videos.find((video) => video.id == cartVideo.video_id).username}</small>
									</h6>
									<h6 className="text-success">KES 200</h6>
									<button
										className="mysonar-btn mb-1 float-right"
										onClick={() => onCartVideos(
											props.videos
												.find((video) => video.id == cartVideo.video_id).id)}>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
											<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
											<path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
										</svg>
									</button>
								</div>
							</div>
						))}
					<div className="d-flex justify-content-between">
						<div className="p-2">
							<h4 className="text-success"><b>Sub Total</b></h4>
						</div>
						<div className="p-2">
							<h4 className="text-success">
								<b>{videoTotalCash}</b>
							</h4>
						</div>
					</div>
					{/* Cart Videos End */}

					{/* Cart Audios */}
					<center><h3 className="mt-5">Audios</h3></center>
					<hr />
					{props.cartAudios
						.filter((cartAudio) => cartAudio.username == props.auth.username)
						.map((cartAudio, key) => (
							<div key={key} className="d-flex p-2 border-bottom">
								<div className="thumbnail" style={{ width: "50px", height: "50px" }}>
									<Link to={`/audio-show/${cartAudio.audio_id}`}>
										<Img
											src={`/storage/${props.audios.find((audio) => audio.id == cartAudio.audio_id) &&
												props.audios.find((audio) => audio.id == cartAudio.audio_id).thumbnail}`}
											width="100%"
											height="50px" />
									</Link>
								</div>
								<div className="ml-2 mr-auto">
									<h6
										className="mb-0 pb-0"
										style={{
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
										{props.audios.find((audio) => audio.id == cartAudio.audio_id) &&
											props.audios.find((audio) => audio.id == cartAudio.audio_id).name}
									</h6>
									<h6 className="mt-0 pt-0">
										<small>{cartAudio.username}</small>
									</h6>
									<h6 className="text-success">KES 100</h6>
								</div>
								<div className="ml-2">
									<button
										className="mysonar-btn mb-1 float-right"
										onClick={() => onCartAudios(props.audios.find((audio) => audio.id == cartAudio.audio_id).id)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-trash"
											viewBox="0 0 16 16">
											<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
											<path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
										</svg>
									</button>
								</div>
							</div>
						))}
					<div className="d-flex justify-content-between">
						<div className="p-2">
							<h4 className="text-success"><b>Sub Total</b></h4>
						</div>
						<div className="p-2">
							<h4 className="text-success">
								<b>{audioTotalCash}</b>
							</h4>
						</div>
					</div>
					{/* Cart Audios End */}

					{/* Checkout button*/}
					{(videoTotal + audioTotal) > 0 &&
						<Button
							btnClass="mysonar-btn mt-5 mb-4"
							btnText="checkout"
							btnStyle={{ width: "100%" }}
							onClick={(e) => {
								e.preventDefault()
								setBottomMenu("menu-open")
							}} />}

				</div>
				<div className="col-sm-4"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<Link to="/">Payment</Link>
						</div>

						{/* <!-- Close Icon --> */}
						<div className="closeIcon p-2 float-right" onClick={() => setBottomMenu("")}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								fill="currentColor"
								className="bi bi-x"
								viewBox="0 0 16 16">
								<path
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</div>
					</div>

					{/* <center> */}
					<h5 className="text-white">Videos {videoTotal}</h5>
					<h5 className="text-white mb-2">Audios {audioTotal}</h5>
					<hr style={{ borderBottom: "1px solid grey" }} />

					<h3 className="text-success mb-2">Total KES {total}</h3>
					<hr style={{ borderBottom: "1px solid grey" }} />

					<h5 className="text-success">Mpesa (STK Push) <span>{props.auth.phone}</span></h5>
					<hr style={{ borderBottom: "1px solid grey" }} />

					<Button
						btnClass="mysonar-btn green-btn"
						btnText="pay"
						btnStyle={{ width: "80%" }}
						onClick={onPay} />
					{/* </center> */}
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}
		</div>
	)
}

export default Cart
