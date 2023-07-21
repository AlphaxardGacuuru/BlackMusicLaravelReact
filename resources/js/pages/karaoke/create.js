import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Ticker from "react-ticker"
// import Axios from "axios"

import Img from "@/components/Core/Img"
import Button from "@/components/Core/Btn"

import CloseSVG from "@/svgs/CloseSVG"
import FlashSVG from "@/svgs/FlashSVG"
import FlashFilledSVG from "@/svgs/FlashFilledSVG"
import LoopSVG from "@/svgs/LoopSVG"
import TimerSVG from "@/svgs/TimerSVG"
import RecordSVG from "@/svgs/RecordSVG"
import RecordFilledSVG from "@/svgs/RecordFilledSVG"
import StopFilledSVG from "@/svgs/StopFilledSVG"
import PlayFilledSVG from "@/svgs/PlayFilledSVG"
import PauseFilledSVG from "@/svgs/PauseFilledSVG"
import UploadBoxSVG from "@/svgs/UploadBoxSVG"
import MusicNoteSVG from "@/svgs/MusicNoteSVG"
import ImageSVG from "@/svgs/ImageSVG"

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateSize
)

const KaraokeCreate = (props) => {
	// Declare states
	const [innerWidth, setInnerWidth] = useState(100)
	const [innerHeight, setInnerHeight] = useState(100)
	const [flash, setFlash] = useState()
	const [camera, setCamera] = useState("user")
	const [timer, setTimer] = useState()
	const [upload, setUpload] = useState()
	const [filters, setFilters] = useState()
	const [filter, setFilter] = useState("none")
	const [bottomMenu, setBottomMenu] = useState()
	const [loadingBtn, setLoadingBtn] = useState()

	const [karaoke, setKaraoke] = useState("")
	const [description, setDescription] = useState()

	const [showForm, setShowForm] = useState()
	const [formData, setFormData] = useState()

	// ID for video element
	const video = useRef(null)

	// ID for rotating record
	const spiningRecord = useRef(null)

	// ID for Vertical Elements
	const flipCameraEl = useRef(null)
	const flipFlashEl = useRef(null)

	// ID for Horizontal Elements
	const uploadEl = useRef(null)
	const pauseRecordEl = useRef(null)
	const resumeRecordEl = useRef(null)

	// Record Button
	const startRecordEl = useRef(null)
	const stopRecordEl = useRef(null)

	const downloadButton = useRef(null)

	// Fetch Data
	useEffect(() => {
		// Define navigator
		setInnerWidth(window.innerWidth)
		setInnerHeight(window.innerHeight)

		// Declare new FormData object for form data
		setFormData(new FormData())

		// Remove recording button
		stopRecordEl.current.style.display = "none"
		resumeRecordEl.current.style.display = "none"
		pauseRecordEl.current.style.display = "none"
	}, [])

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader for button
		setLoadingBtn(true)

		// Add form data to FormData object
		formData.append("audio", props.karaokeAudio.id)
		formData.append("karaoke", karaoke)
		formData.append("description", description)

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		Axios.get("sanctum/csrf-cookie").then(() => {
			Axios.post(`${props.url}/api/karaokes`, formData)
				.then((res) => {
					props.setMessages([res.data.message])
					// Update Karaokes
					props.get("karaokes", setKaraoke)
					// Remove loader for button
					setLoadingBtn(false)
					// Redirect to Karaoke Charts
					setTimeout(() => (location.href = "/karaoke/charts"), 500)
				})
				.catch((err) => {
					// Remove loader for button
					setLoadingBtn(false)
					props.getErrors(err)
				})
		})
	}

	// Flip the camera
	const flipCamera = () => {
		if (camera == "user") {
			setCamera("environment")
			video.current.classList.remove("karaoke-video-upload")
		} else {
			setCamera("user")
			video.current.classList.add("karaoke-video-upload")
		}
	}

	useEffect(() => {
		/*
		*
		Video Source */
		// Older browsers might not implement mediaDevices at all, so we set an empty object first
		if (navigator.mediaDevices === undefined) {
			navigator.mediaDevices = {}
		}

		// Some browsers partially implement mediaDevices. We can't just assign an object
		// with getUserMedia as it would overwrite existing properties.
		// Here, we will just add the getUserMedia property if it's missing.
		if (navigator.mediaDevices.getUserMedia === undefined) {
			navigator.mediaDevices.getUserMedia = (constraints) => {
				// First get ahold of the legacy getUserMedia, if present
				const getUserMedia =
					navigator.webkitGetUserMedia || navigator.mozGetUserMedia

				// Some browsers just don't implement it - return a rejected promise with an error
				// to keep a consistent interface
				if (!getUserMedia) {
					return Promise.reject(
						new Error("getUserMedia is not implemented in this browser")
					)
				}

				// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
				return new Promise(function(resolve, reject) {
					getUserMedia.call(navigator, constraints, resolve, reject)
				})
			}
		}

		const constraints = {
			audio: false,
			video: {
				facingMode: { exact: camera },
			},
		}

		let chunks = []

		// Get Video stream
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then((stream) => {
				// Get Video Stream
				// Older browsers may not have srcObject
				if ("srcObject" in video.current) {
					/* use the stream */
					video.current.srcObject = stream
				} else {
					// Avoid using this in new browsers, as it is going away.
					video.current.src = window.URL.createObjectURL(stream)
				}

				video.current.onloadedmetadata = (e) => {
					video.current.play()
				}
				// Get Video Stream End

				const track = stream.getVideoTracks()[0]

				// For Camera Flip
				// Add Click to Start add Stop stream for Changes
				flipCameraEl.current.addEventListener("click", () => {
					track.stop()
					// track.start()
				})
				// For Camera Flip End

				// For Flash
				const imageCapture = new ImageCapture(track)

				imageCapture.getPhotoCapabilities().then(() => {
					track.applyConstraints({
						advanced: [{ torch: flash }],
					})
				})
				// For Flash End

				// For Recording
				const mediaRecorder = new MediaRecorder(stream)

				// visualize(stream);

				// Start Recording
				startRecordEl.current.addEventListener("click", () => {
					mediaRecorder.start()
					console.log(mediaRecorder.state)
					console.log("recorder started")
					// Start Spining Record
					spiningRecord.current.classList.add("rotate-record")
					startRecordEl.current.style.display = "none"
					stopRecordEl.current.style.display = "inline"
					pauseRecordEl.current.style.display = "inline"
					uploadEl.current.style.display = "none"
				})

				// Pause Recording
				pauseRecordEl.current.addEventListener("click", () => {
					mediaRecorder.pause()
					console.log(mediaRecorder.state)
					console.log("recorder paused")
					// Stop Spining Record
					spiningRecord.current.classList.remove("rotate-record")
					pauseRecordEl.current.style.display = "none"
					resumeRecordEl.current.style.display = "inline"
				})

				// Resume Recording
				resumeRecordEl.current.addEventListener("click", () => {
					mediaRecorder.resume()
					console.log(mediaRecorder.state)
					console.log("recorder resumed")
					// Start Spining Record
					spiningRecord.current.classList.add("rotate-record")
					resumeRecordEl.current.style.display = "none"
					pauseRecordEl.current.style.display = "inline"
				})

				// Stop recording
				stopRecordEl.current.addEventListener("click", () => {
					mediaRecorder.stop()
					console.log(mediaRecorder.state)
					console.log("recorder stopped")
					// Stop Spining Record
					spiningRecord.current.classList.remove("rotate-record")
					stopRecordEl.current.style.display = "none"
					startRecordEl.current.style.display = "inline"
					pauseRecordEl.current.style.display = "none"
					resumeRecordEl.current.style.display = "none"
					uploadEl.current.style.display = "inline"
				})

				mediaRecorder.onstop = (e) => {
					console.log("recorder stopped")
				}

				mediaRecorder.ondataavailable = (e) => {
					chunks.push(e.data)
					console.log(chunks)

					downloadButton.current.href = URL.createObjectURL(chunks[0])
					downloadButton.current.download = `RecordedVideo.webm`
					// downloadButton.current.click()

					console.log(
						`Successfully recorded ${chunks[0].size / 1000} Kbs of ${
							chunks[0].type
						} media.`
					)
				}
				// For Recording End
			})
			.catch((err) => {
				console.log(err.name + ": " + err.message)
			})
	}, [])

	const filterClasses = [
		"none",
		"blur",
		"brightness",
		"contrast",
		"grayscale",
		"huerotate",
		"invert",
		"opacity",
		"saturate",
		"sepia",
	]

	return (
		<>
			<div className="row p-0">
				<div className="col-sm-4"></div>
				<div
					className="col-sm-4"
					style={{
						width: innerWidth,
						height: innerHeight,
						overflow: "hidden",
					}}>
					<video
						ref={video}
						className={`karaoke-video-upload ${filter}`}></video>
					{/* Floating Video Info Top */}
					<div className="w-100" style={{ position: "absolute", top: 0 }}>
						<div className="d-flex justify-content-between">
							{/* Close Icon */}
							<div className="p-2">
								<Link to="/karaoke/charts" style={{ fontSize: "1.5em" }}>
									<CloseSVG />
								</Link>
							</div>
							<div className="p-2">
								{/* Vertical Content */}
								<div className="d-flex flex-column mb-2">
									{/* Flip Camera */}
									<div className="ms-auto me-3">
										<center>
											<span
												ref={flipCameraEl}
												style={{ fontSize: "2.3em" }}
												onClick={flipCamera}>
												<LoopSVG />
											</span>
											<h6>Flip</h6>
										</center>
									</div>
									{/* Timer  */}
									<div className="ms-auto me-3">
										<center>
											<span
												style={{ fontSize: "2em" }}
												onClick={() => setTimer(3)}>
												<TimerSVG />
											</span>
											<h6>Timer</h6>
										</center>
									</div>
									{/* Flash Light */}
									{camera == "environment" && (
										<div className="ms-auto me-3">
											<center>
												<span
													ref={flipFlashEl}
													style={{
														fontSize: "1.8em",
													}}
													onClick={() => setFlash(flash ? false : true)}>
													{flash ? <FlashFilledSVG /> : <FlashSVG />}
													<h6>Flash</h6>
												</span>
											</center>
										</div>
									)}
									{/* Download */}
									<div className="ms-auto me-3">
										<center>
											<a ref={downloadButton} className="button">
												{/* Download */}
											</a>
										</center>
									</div>
								</div>
								{/* Vertical Content End */}
							</div>
						</div>
					</div>
					{/* Floating Video Info Top End */}
					{/* Floating Video Info */}
					<div className="karaoke-overlay w-100">
						{/* Horizontal Content */}
						<div className="d-flex justify-content-between">
							<div className="ms-3 p-2 align-self-end">
								<center>
									<span
										ref={uploadEl}
										style={{ fontSize: "2em" }}
										onClick={() => {
											setBottomMenu("menu-open")
											setUpload(true)
											setFilters(false)
										}}>
										<UploadBoxSVG />
										<h6>Upload</h6>
									</span>
									<span ref={pauseRecordEl} style={{ fontSize: "2em" }}>
										<PauseFilledSVG />
										<h6>Pause</h6>
									</span>
									<span ref={resumeRecordEl} style={{ fontSize: "2em" }}>
										<PlayFilledSVG />
										<h6>Paused</h6>
									</span>
								</center>
							</div>
							<div className="p-2">
								<center>
									<span
										ref={stopRecordEl}
										style={{
											fontSize: "4em",
											color: "#fb3958",
										}}>
										<StopFilledSVG />
										<h6 style={{ color: "#fb3958" }}>Recording</h6>
									</span>
									<span ref={startRecordEl} style={{ fontSize: "4em" }}>
										<RecordSVG />
										<h6 style={{ color: "#fff" }}>Record</h6>
									</span>
								</center>
							</div>
							<div className="me-3 p-2 align-self-end">
								<center>
									<span
										style={{
											fontSize: "2em",
											color: "#FFD700",
										}}
										onClick={() => {
											setBottomMenu("menu-open")
											setFilters(true)
											setUpload(false)
										}}>
										<ImageSVG />
									</span>
									<h6 style={{ color: "#FFD700" }}>Filters</h6>
								</center>
							</div>
						</div>
						{/* Audio Name */}
						<div className="d-flex pb-2 pt-0 mx-2">
							<div
								className="me-2"
								style={{ fontSize: "1.5em", color: "#FFD700" }}>
								<MusicNoteSVG />
							</div>
							<div className="flex-grow-1 align-self-center">
								<Ticker mode="smooth">
									{({ index }) => (
										<span
											style={{
												color: "#FFD700",
												whiteSpace: "nowrap",
											}}>
											{`${props.karaokeAudio.name}`}
										</span>
									)}
								</Ticker>
							</div>
							<div ref={spiningRecord} className="mx-2">
								<Link to={`/audio-show/${props.karaokeAudio.audioId}`}>
									<a
										onClick={() => {
											props.setShow(props.karaokeAudio.audioId)
											props.setLocalStorage("show", {
												id: props.karaokeAudio.audioId,
												time: 0,
											})
										}}>
										<Img
											src={props.karaokeAudio.thumbnail}
											width="50px"
											height="50px"
											imgClass="rounded-circle"
											alt="current audio"
										/>
									</a>
								</Link>
							</div>
						</div>
						{/* Horizontal Content End */}
					</div>
					{/* Floating Video Info End */}
				</div>
				<div className="col-sm-4"></div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div
						className="d-flex align-items-center justify-content-between"
						style={{ height: "3em" }}>
						<div className="dropdown-header text-white">
							<h5 style={{ margin: "0px" }}>Upload</h5>
						</div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon p-2 float-right"
							style={{ fontSize: "1em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{/* Upload Input */}
					{!showForm && upload && (
						<div>
							<FilePond
								name="filepond-karaoke"
								labelIdle='Drag & Drop your Video or <span class="filepond--label-action text-dark"> Browse </span>'
								acceptedFileTypes={["video/*"]}
								stylePanelAspectRatio="16:9"
								maxFileSize="200000000"
								allowRevert={true}
								server={{
									url: `${props.url}/api`,
									process: {
										url: "/karaokes",
										onload: (res) => setKaraoke(res),
										onerror: (err) => console.log(err.response.data),
									},
									revert: {
										url: `/${karaoke}`,
										onload: (res) => {
											props.setMessages([res])
										},
									},
								}}
							/>

							{karaoke && (
								<Button
									btnClass="mysonar-btn mb-4"
									btnText="next"
									onClick={() => setShowForm(true)}
								/>
							)}
						</div>
					)}
					{/* Upload Input End */}

					{/* Karaoke Form */}
					{showForm && (
						<div
							className="contact-form text-center call-to-action-content wow fadeInUp"
							data-wow-delay="0.5s">
							<div className="form-group">
								<form onSubmit={onSubmit}>
									<input
										type="text"
										name="description"
										className="form-control"
										placeholder="Karaoke description"
										required={true}
										onChange={(e) => {
											setDescription(e.target.value)
										}}
									/>
									<br />

									<Button
										btnClass="mysonar-btn"
										btnText="upload video"
										loading={loadingBtn}
									/>
								</form>
							</div>
						</div>
					)}
					{/* Karaoke Form End */}

					{/* Filters */}
					<div className="hidden-scroll">
						{filters &&
							filterClasses.map((item, key) => (
								<span
									key={key}
									className={filter == item ? "active-filter" : ""}
									onClick={() => setFilter(item)}>
									<span className="m-0 p-0">
										<Img
											src="/storage/img/slide2.jpg"
											imgClass={item}
											width="40px"
											height="80px"
										/>
									</span>
									<h6 className="mt-1">{item}</h6>
								</span>
							))}
					</div>
					{/* Filters End */}
				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</>
	)
}

export default KaraokeCreate
