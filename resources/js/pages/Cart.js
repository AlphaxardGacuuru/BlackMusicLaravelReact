import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'
import VideoMediaHorizontal from '../components/VideoMediaHorizontal'
import AudioMediaHorizontal from '../components/AudioMediaHorizontal'

const Cart = (props) => {

	const [bottomMenu, setBottomMenu] = useState()
	const [receipt, setReceipt] = useState("menu-open")
	const [receiptVideos, setReceiptVideos] = useState([])
	const [receiptAudios, setReceiptAudios] = useState([])

	console.log(receiptVideos)

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

	// Function for buying videos
	const onPay = () => {
		axios.get('sanctum/csrf-cookie').then(() => {
			// axios.post(`${props.url}/api/kopokopo`)

			// Check payment after every 2s
			var intervalId = window.setInterval(() => {
				axios.post(`${props.url}/api/bought-videos`)
					.then((res) => {
						console.log(res.data.length)
						// If videos are bought stop checking
						if (res.data.length > 0) {
							setReceiptVideos(res.data)
							setBottomMenu()
							setReceipt("menu-open")
							clearInterval(intervalId)
							props.setMessage(res.data.length + " Videos bought")
							axios.get(`${props.url}/api/bought-videos`).then((res) => props.setBoughtVideos(res.data))
						}
						// Stop loop after 60s
						setTimeout(() => {
							clearInterval(intervalId)
							setBottomMenu()
						}, 60000)

					}).catch((err) => {
						const resErrors = err.response.data.errors
						var resError
						var newError = []
						for (resError in resErrors) {
							newError.push(resErrors[resError])
						}
						props.setErrors(newError)
					})
			}, 2000);
		});
	}

	return (
		<div>
			<div className="row">
				<div className="col-sm-12">
					<center><h1>Cart</h1></center>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-3">
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
											src={props.videos.find((video) => video.id == cartVideo.video_id) ?
												props.videos.find((video) => video.id == cartVideo.video_id).thumbnail.match(/http/) ?
													props.videos.find((video) => video.id == cartVideo.video_id).thumbnail :
													`storage/${props.videos.find((video) => video.id == cartVideo.video_id).thumbnail}` : ""}
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
										{props.videos.find((video) => video.id == cartVideo.video_id) &&
											props.videos.find((video) => video.id == cartVideo.video_id).name}
									</h6>
									<h6 className="mt-0 mr-1 ml-1 mb-2 pt-0 pr-1 pl-1 pb-0">
										<small>{props.videos.find((video) => video.id == cartVideo.video_id) &&
											props.videos.find((video) => video.id == cartVideo.video_id).username}</small>
									</h6>
									<h6 className="text-success">KES 200</h6>
									<button
										className="mysonar-btn mb-1 float-right"
										onClick={() => onCartVideos(props.videos.find((video) => video.id == cartVideo.video_id).id)}>
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
							<h4 className="text-success">Sub Total</h4>
						</div>
						<div className="p-2">
							<h4 className="text-success">{videoTotalCash}</h4>
						</div>
					</div>
					{/* Cart Videos End */}
				</div>
				<div className="col-sm-4">
					{/* Cart Audios */}
					<center><h3>Audios</h3></center>
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
							<h4 className="text-success">Sub Total</h4>
						</div>
						<div className="p-2">
							<h4 className="text-success">{audioTotalCash}</h4>
						</div>
					</div>
					{/* Cart Audios End */}
				</div>
				<div className="col-sm-3">
					<center>
						<h3>Total</h3>
						<hr />
						<h3 className="text-success"> KES {total}</h3>
						<br />
						{/* Checkout button*/}
						{(videoTotal + audioTotal) > 0 &&
							<Button
								btnClass="mysonar-btn mb-4"
								btnText="checkout"
								btnStyle={{ width: "80%" }}
								onClick={(e) => {
									e.preventDefault()
									setBottomMenu("menu-open")
									onPay()
								}} />}
					</center>
				</div>
				<div className="col-sm-1"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between border-bottom mb-3">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<a href="#">Payment</a>
						</div>

						{/* <!-- Close Icon --> */}
						<div className="closeIcon p-2 float-right text-dark"
							onClick={() => {
								setBottomMenu("")
								onPay()
							}}>
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

					<center>
						<h5>Lipa na Mpesa</h5>
						<h5>Buy Goods and Services</h5>
						<h5>Mpesa Till No:</h5>
						<h3 id='myInput' style={{ color: "green" }}>613289</h3>
						<h5 style={{ color: "green" }}>HAVI Lab Equipment</h5>
						<h5>Amount: KES <span style={{ color: "green" }}>{total}</span></h5>
						<h5>Ensure you pay with <b style={{ color: "dodgerblue" }}>{props.auth.phone}</b></h5>
						<br />

						<Button
							btnClass="mysonar-btn"
							btnStyle={{ width: "40%" }}
							btnText="copy till number"
							onClick={() => {
								navigator.clipboard.writeText(613289)
								props.setMessage("Till number copied")
							}} />
						<br />
						<br />

						<div id="sonar-load" className="mt-3 mb-3"></div>
					</center>

					{/* {videoTotal > 0 && <h5 className="">Videos {videoTotal}</h5>}
					{audioTotal > 0 && <h5 className="mb-2">Audios {audioTotal}</h5>}

					<h4 className="text-success mb-2">Total KES {total}</h4>
					<h5 className="text-success">Mpesa (STK Push) <span>{props.auth.phone}</span></h5>
					<br />

					<Button
						btnClass="mysonar-btn green-btn"
						btnText="pay"
						btnStyle={{ width: "80%" }}
						onClick={onPay} /> */}

					<br />
					<br />
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}

			{/* Sliding Receipt Bottom Nav */}
			<div className={receipt}>
				<div className="bottomMenu" style={{ height: "50%" }}>
					<div className="d-flex align-items-center justify-content-between border-bottom mb-3">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<a href="#">Receipt</a>
						</div>

						{/* <!-- Close Icon --> */}
						<div className="closeIcon p-2 float-right text-dark"
							onClick={() => setReceipt("")}>
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

					<div className="px-2 pb-4" style={{ height: "100%", overflowY: "scroll", textAlign: "left" }}>
						<center><h3 className="text-success">Congratulations!</h3></center>
						{/* Cart Videos */}
						<center><h4>Videos</h4></center>
						{receiptVideos.map((receiptVideo, key) => (
							<VideoMediaHorizontal
								key={key}
								onClick={() => props.setShow(0)}
								setShow={props.setShow}
								link={
									`/video-show/${props.videos.find((video) => video.id == receiptVideo) &&
									props.videos.find((video) => video.id == receiptVideo).id}`
								}
								thumbnail={
									props.videos.find((video) => video.id == receiptVideo) ?
										props.videos.find((video) => video.id == receiptVideo).thumbnail.match(/http/) ?
											props.videos.find((video) => video.id == receiptVideo).thumbnail :
											`storage/${props.videos.find((video) => video.id == receiptVideo).thumbnail}` :
										""
								}
								name={
									props.videos.find((video) => video.id == receiptVideo) &&
									props.videos.find((video) => video.id == receiptVideo).name
								}
								username={
									props.videos.find((video) => video.id == receiptVideo) &&
									props.videos.find((video) => video.id == receiptVideo).username
								}
								ft={
									props.videos.find((video) => video.id == receiptVideo) &&
									props.videos.find((video) => video.id == receiptVideo).ft
								}
								videoInCart={false}
								hasBoughtVideo={false}
								videoId={
									props.videos.find((video) => video.id == receiptVideo) &&
									props.videos.find((video) => video.id == receiptVideo).id
								} />
						))}
						{/* Cart Videos End */}

						{/* Cart Audios */}
						<center><h4 className="mt-5">Audios</h4></center>
						{receiptAudios.map((receiptAudio, key) => (
							<AudioMediaHorizontal
								key={key}
								setShow={props.setShow}
								link={
									`/audio-show/${props.audios.find((audio) => audio.id == receiptAudio) &&
									props.audios.find((audio) => audio.id == receiptAudio).id}`
								}
								thumbnail={
									`/storage/${props.audios.find((audio) => audio.id == receiptAudio) &&
									props.audios.find((audio) => audio.id == receiptAudio).thumbnail}`
								}
								name={
									props.audios.find((audio) => audio.id == receiptAudio) &&
									props.audios.find((audio) => audio.id == receiptAudio).name
								}
								username={
									props.audios.find((audio) => audio.id == receiptAudio) &&
									props.audios.find((audio) => audio.id == receiptAudio).username
								}
								ft={
									props.audios.find((audio) => audio.id == receiptAudio) &&
									props.audios.find((audio) => audio.id == receiptAudio).ft
								}
								hasBoughtAudio={false}
								audioInCart={false}
								audioId={
									props.audios.find((audio) => audio.id == receiptAudio) &&
									props.audios.find((audio) => audio.id == receiptAudio).id
								} />
						))}
						<br />
						<br />
					</div>
				</div>
			</div>
			{/* Sliding Receipt Bottom Nav end */}
		</div>
	)
}

export default Cart
