import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'
import VideoMediaHorizontal from '../components/VideoMediaHorizontal'
import AudioMediaHorizontal from '../components/AudioMediaHorizontal'
import axios from 'axios'

const Cart = (props) => {

	const [bottomMenu, setBottomMenu] = useState()
	const [receipt, setReceipt] = useState()
	const [receiptVideos, setReceiptVideos] = useState([])
	const [receiptAudios, setReceiptAudios] = useState([])

	// Calculate totals
	const videoTotal = props.cartVideos.length
	const videoTotalCash = props.cartVideos.length * 200
	const audioTotal = props.cartAudios.length
	const audioTotalCash = props.cartAudios.length * 100
	const total = videoTotalCash + audioTotalCash

	// Send STKPush
	const STKPush = (amount) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.put(`${props.url}/api/kopokopo/${amount}`)
				.then((res) => props.setMessage(res.data))
				.catch((err) => {
					const resErrors = err.response.data.errors
					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					newError.push(err.response.data.message)
					props.setErrors(newError)
				})
		})
	}

	// Function for buying videos
	const onPay = () => {
		axios.get('sanctum/csrf-cookie').then(() => {
			// Check payment after every 2s
			var intervalId = window.setInterval(() => {
				// Try and buy videos
				axios.post(`${props.url}/api/bought-videos`)
					.then((res) => {
						// If videos are bought stop checking
						if (res.data.length > 0) {
							setReceiptVideos(res.data)
							setBottomMenu()
							setReceipt("menu-open")
							clearInterval(intervalId)
							// Show message
							var message
							// Proper grammar for message
							if (res.data.length > 1) {
								message = res.data.length + " Videos bought"
							} else {
								message = res.data.length + " Video bought"
							}
							props.setMessage(message)
							// Update Bought Videos
							axios.get(`${props.url}/api/bought-videos`)
								.then((res) => props.setBoughtVideos(res.data))
							// Update Videos
							axios.get(`${props.url}/api/videos`)
								.then((res) => props.setVideos(res.data))
							// Update Cart Videos
							axios.get(`${props.url}/api/cart-videos`)
								.then((res) => props.setCartVideos(res.data))
							// Update Videos Albums
							axios.get(`${props.url}/api/video-albums`)
								.then((res) => props.setVideoAlbums(res.data))
						}
						// Stop loop after 30s
						setTimeout(() => {
							clearInterval(intervalId)
							setBottomMenu()
						}, 30000)

					}).catch((err) => {
						console.log(err.response.data.message)
						const resErrors = err.response.data.errors
						var resError
						var newError = []
						for (resError in resErrors) {
							newError.push(resErrors[resError])
						}
						props.setErrors(newError)
					})

				// Try and buy audios
				axios.post(`${props.url}/api/bought-audios`)
					.then((res) => {
						// If videos are bought stop checking
						if (res.data.length > 0) {
							setReceiptAudios(res.data)
							setBottomMenu()
							setReceipt("menu-open")
							clearInterval(intervalId)
							// Show message after 10 seconds
							setTimeout(() => {
								var message
								// Proper grammar for message
								if (res.data.length > 1) {
									message = res.data.length + " Audios bought"
								} else {
									message = res.data.length + " Audio bought"
								}
								props.setMessage(message)
							}, 10000)
							// Update Bought Audio
							axios.get(`${props.url}/api/bought-audios`)
								.then((res) => props.setBoughtAudios(res.data))
							// Update Audios
							axios.get(`${props.url}/api/audios`)
								.then((res) => props.setAudios(res.data))
							// Update Cart Audios
							axios.get(`${props.url}/api/cart-audios`)
								.then((res) => props.setCartAudios(res.data))
							// Update Audio Albums
							axios.get(`${props.url}/api/audio-albums`)
								.then((res) => props.setAudioAlbums(res.data))
						}
						// Stop loop after 30s
						setTimeout(() => {
							clearInterval(intervalId)
							setBottomMenu()
						}, 30000)
					}).catch((err) => {
						console.log(err.response.data.message)
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
					<div className="border border-dark mb-4">
						{/* Cart Videos */}
						{props.cartVideos.length > 0 &&
							<>
								<center><h3 className="pt-4">Videos</h3></center>
								<hr />
							</>}
						{props.cartVideos.map((cartVideo, key) => (
							<div key={key} className="d-flex p-2 border-bottom border-dark">
								<div className="thumbnail">
									<Link to={`/video-show/${cartVideo.video_id}`}>
										<Img src={cartVideo.thumbnail}
											width="160em"
											height="90em" />
									</Link>
								</div>
								<div className="ml-2 mr-auto flex-grow-1">
									<h6 className="mb-0"
										style={{
											width: "150px",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip"
										}}>
										{cartVideo.name}
									</h6>
									<h6>
										<small>{cartVideo.artist} {cartVideo.ft}</small>
									</h6>
									<h6 className="text-success">KES 200</h6>
									<button
										className="mysonar-btn white-btn mb-1 float-right"
										onClick={() => props.onCartVideos(cartVideo.video_id)}>
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
						{props.cartVideos.length > 0 &&
							<div className="d-flex justify-content-between">
								<div className="p-2">
									<h4 className="text-success">Sub Total</h4>
								</div>
								<div className="p-2">
									<h4 className="text-success">{videoTotalCash}</h4>
								</div>
							</div>}
						{/* Cart Videos End */}
					</div>
				</div>
				<div className="col-sm-4">
					<div className="border border-dark mb-4">
						{/* Cart Audios */}
						{props.cartAudios.length > 0 &&
							<>
								<center><h3 className="pt-4">Audios</h3></center>
								<hr />
							</>}
						{props.cartAudios
							.map((cartAudio, key) => (
								<div key={key} className="d-flex p-2 border-bottom border-dark">
									<div
										className="thumbnail"
										style={{ width: "50px", height: "50px" }}>
										<Link to={`/audio-show/${cartAudio.audio_id}`}>
											<Img src={cartAudio.thumbnail}
												width="100%"
												height="50px" />
										</Link>
									</div>
									<div className="ml-2 mr-auto">
										<h6 className="mb-0 pb-0"
											style={{
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											{cartAudio.name}
										</h6>
										<h6 className="mt-0 pt-0">
											<small>{cartAudio.username}</small>
										</h6>
										<h6 className="text-success">KES 100</h6>
									</div>
									<div className="ml-2">
										<button
											className="mysonar-btn white-btn mb-1 float-right"
											onClick={() => props.onCartAudios(cartAudio.audio_id)}>
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
						{props.cartAudios.length > 0 &&
							<div className="d-flex justify-content-between">
								<div className="p-2">
									<h4 className="text-success">Sub Total</h4>
								</div>
								<div className="p-2">
									<h4 className="text-success">{audioTotalCash}</h4>
								</div>
							</div>}
						{/* Cart Audios End */}
					</div>
				</div>
				<div className="col-sm-3">
					<div className="border border-dark mb-4">
						<center>
							<h3 className="pt-4">Total</h3>
							<hr />
							<h3 className="text-success"> KES {total}</h3>
							<h5 className="text-success">Your account balance: KES {props.auth.balance}</h5>
							<br />

							{/* {{-- Collapse --}} */}
							{(videoTotal + audioTotal) > 0 &&
								<>
									<button
										className="mysonar-btn white-btn"
										style={{ width: "80%" }}
										type="button"
										data-toggle="collapse"
										data-target="#collapseExample"
										aria-expanded="false"
										aria-controls="collapseExample">
										next
									</button>
									<div className="collapse" id="collapseExample">
										<div className="">
											<br />
											<h5>Once you click the button below a pop up will appear on your phone asking you to pay</h5>
											<h4 style={{ color: "#1e824c" }}>KES {total}</h4>
											<h5>to</h5>
											<h4 style={{ color: "dodgerblue" }}>Kopokopo</h4>
											<br />

											{/* Checkout button */}
											<Button
												btnClass="mysonar-btn green-btn btn-2 mb-4"
												btnText="pay with mpesa"
												btnStyle={{ width: "80%" }}
												onClick={(e) => {
													e.preventDefault()
													setBottomMenu("menu-open")
													onPay()
													STKPush(total)
												}} />
										</div>
									</div>
								</>}
							{/* {{-- Collapse End --}} */}
							<br />
							<br />

							{/* Receipt button */}
							{(receiptVideos.length + receiptAudios.length) > 0 &&
								<Button btnClass="mysonar-btn mb-4"
									btnText="receipt"
									btnStyle={{ width: "80%" }}
									onClick={(e) => {
										e.preventDefault()
										setReceipt("menu-open")
									}} />}
						</center>
					</div>
				</div>
				<div className="col-sm-1"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between border-bottom border-dark mb-3">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<a href="#">Payment</a>
						</div>

						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							onClick={() => {
								setBottomMenu("")
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
						<h5>Request was sent to <span style={{ color: "dodgerblue" }}>{props.auth.phone}</span></h5>
						<br />

						<h6>Checking payment</h6>
						<div id="sonar-load" className="mt-4 mb-4"></div>
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
					<div className="d-flex align-items-center justify-content-between border-bottom border-dark mb-3">
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
						<center><h4 className="text-success">Congratulations. Purchase successful!</h4></center>
						{/* Cart Videos */}
						{receiptVideos.length > 0 &&
							<center><h4>Videos</h4></center>}
						{receiptVideos
							.map((receiptVideo, key) => (
								<VideoMediaHorizontal
									key={key}
									onClick={() => props.setShow(0)}
									setShow={props.setShow}
									link={`/video-show/${receiptVideo.id}`}
									thumbnail={receiptVideo.thumbnail}
									name={receiptVideo.name}
									username={receiptVideo.username}
									ft={receiptVideo.ft}
									videoInCart={false}
									hasBoughtVideo={false}
									videoId={receiptVideo.id} />
							))}
						{/* Cart Videos End */}

						{/* Cart Audios */}
						{receiptAudios.length > 0 &&
							<center><h4 className="mt-4">Audios</h4></center>}
						{receiptAudios
							.map((receiptAudio, key) => (
								<AudioMediaHorizontal
									key={key}
									setShow={props.setShow}
									link={`/audio-show/${receiptAudio.id}`}
									thumbnail={`/storage/${receiptAudio.thumbnail}`}
									name={receiptAudio.name}
									username={receiptAudio.username}
									ft={receiptAudio.ft}
									hasBoughtAudio={false}
									audioInCart={false}
									audioId={receiptAudio.id} />
							))}
						<br />
						<br />
					</div>
				</div>
			</div>
			{/* Sliding Receipt Bottom Nav end */}
		</div >
	)
}

export default Cart
