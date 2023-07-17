import { useState, Suspense, useEffect } from "react"
// import Axios from "axios"
// import Echo from "Echo"

import VideoMedia from "@/components/Video/VideoMedia"
import AudioMedia from "@/components/Audio/AudioMedia"
import Btn from "@/components/Core/Btn"
import CloseSVG from "@/svgs/CloseSVG"

const Cart = (props) => {
	const [messages, setMessages] = useState([])
	const [cartVideos, setCartVideos] = useState([])
	const [cartAudios, setCartAudios] = useState([])
	const [bottomMenu, setBottomMenu] = useState("")
	const [receipt, setReceipt] = useState("")
	const [receiptVideos, setReceiptVideos] = useState([])
	const [receiptAudios, setReceiptAudios] = useState([])

	// Calculate totals
	const videoTotal = cartVideos.length
	const videoTotalCash = cartVideos.length * 20
	const audioTotal = cartAudios.length
	const audioTotalCash = cartAudios.length * 10
	const total = videoTotalCash + audioTotalCash

	useEffect(() => {
		Echo.private(`kopokopo-received`).listen("KopokopoCreatedEvent", (e) => {
			setMessages(["Payment received"])
			buyVideos()
			buyAudios()
		})

		props.get("cart-videos", setCartVideos)
		props.get("cart-audios", setCartAudios)
	}, [])

	// Send STKPush
	const STKPush = (amount) => {
		Axios.post(`/api/stk-push`, { amount: amount })
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err, true))
	}

	// Buy Videos
	const buyVideos = () => {
		// Try and buy videos if any are in cart
		cartVideos.length > 0 &&
			Axios.post(`/api/bought-videos`)
				.then((res) => {
					// If videos are bought stop checking
					setReceiptVideos(res.data.data)
					setBottomMenu()
					setReceipt("menu-open")
					// Show message
					var message = `${res.data.data.length} Video${
						res.data.data.length > 1 ? "s" : ""
					} bought`
					setMessages([...messages, message])
					// Update state
					props.get("cart-videos", setCartVideos)
				})
				.catch((err) => props.getErrors(err))
	}

	// Buy Audios
	const buyAudios = () => {
		// Try and buy audios if any are in cart
		cartAudios.length > 0 &&
			Axios.post(`/api/bought-audios`)
				.then((res) => {
					setReceiptAudios(res.data.data)
					setBottomMenu()
					setReceipt("menu-open")
					var message = `${res.data.data.length} Audio${
						res.data.data.length > 1 ? "s" : ""
					} bought`
					setMessages([...messages, message])
					// Update states
					props.get("cart-audios", setCartAudios, "cartAudios")
				})
				.catch((err) => props.getErrors(err))
	}

	return (
		<div>
			<div className="row">
				{messages.map((message, key) => (
					<center key={key}>
						<h6
							id="snackbar-up"
							style={{ cursor: "pointer" }}
							className="show"
							onClick={() => setMessages([])}>
							<div>{message}</div>
						</h6>
					</center>
				))}
				<div className="col-sm-12">
					<center>
						<h1>Cart</h1>
					</center>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-3">
					<div className="mb-4">
						<center>
							{/* Cart Videos */}
							{cartVideos.length > 0 && (
								<>
									<h3 className="pt-4 pb-2 border-bottom border-dark">
										Videos
									</h3>
									<hr />
								</>
							)}
							{cartVideos.map((cartVideo, key) => (
								<VideoMedia
									{...props}
									key={key}
									video={cartVideo}
									setCartVideos={setCartVideos}
								/>
							))}
							{cartVideos.length > 0 && (
								<div className="d-flex justify-content-between border-top border-dark">
									<div className="p-2">
										<h4 className="text-success">Sub Total</h4>
									</div>
									<div className="p-2">
										<h4 className="text-success">{videoTotalCash}</h4>
									</div>
								</div>
							)}
							{/* Cart Videos End */}
						</center>
					</div>
				</div>
				<div className="col-sm-4">
					<div className="mb-4">
						{/* Cart Audios */}
						{cartAudios.length > 0 && (
							<>
								<center>
									<h3 className="pt-4 pb-2 border-bottom border-dark">
										Audios
									</h3>
								</center>
								<hr />
							</>
						)}
						{cartAudios.map((cartAudio, key) => (
							<AudioMedia
								{...props}
								key={key}
								audio={cartAudio}
								setCartAudios={setCartAudios}
							/>
						))}
						{cartAudios.length > 0 && (
							<div className="d-flex justify-content-between border-top border-dark">
								<div className="p-2">
									<h4 className="text-success">Sub Total</h4>
								</div>
								<div className="p-2">
									<h4 className="text-success">{audioTotalCash}</h4>
								</div>
							</div>
						)}
						{/* Cart Audios End */}
					</div>
				</div>
				<div className="col-sm-3">
					<div className="mb-4">
						<center>
							<h3 className="pt-4 pb-2 border-bottom border-dark">Total</h3>
							<hr />
							<h3 className="text-success"> KES {total}</h3>
							<h5 className="text-success">
								Your account balance: KES {props.auth.balance}
							</h5>
							<br />

							{/* {{-- Collapse --}} */}
							{videoTotal + audioTotal > 0 && (
								<>
									<button
										className="mysonar-btn white-btn"
										style={{ width: "80%" }}
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#collapseExample"
										aria-expanded="false"
										aria-controls="collapseExample">
										next
									</button>
									<div className="collapse" id="collapseExample">
										<div className="">
											<br />
											<h5>
												Once you click the button below a pop up will appear on
												your phone asking you to pay
											</h5>
											<h4 className="text-success">KES {total}</h4>
											<h5>to</h5>
											<h4 style={{ color: "dodgerblue" }}>Kopokopo</h4>
											<br />

											{/* Checkout button */}
											<Btn
												btnClass="mysonar-btn green-btn btn-2 mb-4"
												btnText="pay with mpesa"
												btnStyle={{ width: "80%" }}
												onClick={(e) => {
													e.preventDefault()
													setBottomMenu("menu-open")
													// onPay()
													STKPush(total)
												}}
											/>
										</div>
									</div>
								</>
							)}
							{/* {{-- Collapse End --}} */}
							<br />
							<br />

							{/* Receipt button */}
							{receiptVideos.length + receiptAudios.length > 0 && (
								<Btn
									btnClass="mysonar-btn mb-4"
									btnText="receipt"
									btnStyle={{ width: "80%" }}
									onClick={(e) => {
										e.preventDefault()
										setReceipt("menu-open")
									}}
								/>
							)}
						</center>
					</div>
				</div>
				<div className="col-sm-1"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between mb-3">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<a href="#">Payment</a>
						</div>

						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right fs-6"
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					<center>
						<h5>
							Request was sent to{" "}
							<span style={{ color: "dodgerblue" }}>{props.auth.phone}</span>
						</h5>
						<br />

						<h6>Checking payment</h6>
						<div id="sonar-load" className="mt-4 mb-4"></div>
					</center>

					<br />
					<br />
				</div>
			</div>
			{/* Sliding Bottom Nav  end */}

			{/* Sliding Receipt Bottom Nav */}
			<div className={receipt}>
				<div className="commentMenu" style={{ height: "50%" }}>
					<div className="d-flex align-items-center justify-content-between mb-3">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<a href="#">Receipt</a>
						</div>

						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right fs-6"
							onClick={() => setReceipt("")}>
							<CloseSVG />
						</div>
					</div>

					<div
						className="px-2 pb-4"
						style={{
							height: "100%",
							overflowY: "scroll",
							textAlign: "left",
						}}>
						<center>
							<h4 className="text-success">Congratulations</h4>
							<h5 className="text-success">Purchase successful!</h5>
						</center>
						{/* Cart Videos */}
						{receiptVideos.length > 0 && (
							<center>
								<h4>Videos</h4>
							</center>
						)}
						<center>
							{receiptVideos.map((receiptVideo, key) => (
								<VideoMedia {...props} key={key} video={receiptVideo} />
							))}
						</center>
						{/* Cart Videos End */}

						{/* Cart Audios */}
						{receiptAudios.length > 0 && (
							<center>
								<h4 className="mt-4">Audios</h4>
							</center>
						)}
						{receiptAudios.map((receiptAudio, key) => (
							<AudioMedia {...props} key={key} audio={receiptAudio} />
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
