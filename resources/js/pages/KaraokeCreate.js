import React, { useState, useRef } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Ticker from 'react-ticker'

import Img from '../components/Img'
import Button from '../components/Button'

import CloseSVG from '../svgs/CloseSVG'
import FlashSVG from '../svgs/FlashSVG'
import FlashFilledSVG from '../svgs/FlashFilledSVG'
import LoopSVG from '../svgs/LoopSVG'
import TimerSVG from '../svgs/TimerSVG'
import RecordSVG from '../svgs/RecordSVG'
import RecordFilledSVG from '../svgs/RecordFilledSVG'
import UploadBoxSVG from '../svgs/UploadBoxSVG'
import MusicNoteSVG from '../svgs/MusicNoteSVG'
import ImageSVG from '../svgs/ImageSVG'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateSize
);

const KaraokeCreate = (props) => {

	// Get params
	const { audio } = useParams()

	// ID for video element
	const video = useRef(null)

	// Id for rotating record
	const spiningRecord = useRef()

	// Declare states
	const [flash, setFlash] = useState("flash")
	const [camera, setCamera] = useState("user")
	const [timer, setTimer] = useState()
	const [record, setRecord] = useState()
	const [bottomMenu, setBottomMenu] = useState()

	const [karaoke, setKaraoke] = useState("")
	const [description, setDescription] = useState()
	const [loadingBtn, setLoadingBtn] = useState()

	const [showForm, setShowForm] = useState()

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]');

	// Get history for page location
	const history = useHistory()

	// Declare new FormData object for form data
	const formData = new FormData();

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader for button
		setLoadingBtn(true)

		// Add form data to FormData object
		formData.append("audio", audio);
		formData.append("karaoke", karaoke);
		formData.append("description", description);

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/karaokes`, formData)
				.then((res) => {
					props.setMessages([res.data])
					// Update Karaokes
					axios.get(`${props.url}/api/karaokes`)
						.then((res) => setKaraoke(res.data))
					// Remove loader for button
					setLoadingBtn(false)
					// Redirect to Karaoke Charts
					setTimeout(() => history.push("/karaoke-charts"), 500)
				}).catch(err => {
					// Remove loader for button
					setLoadingBtn(false)
					const resErrors = err.response.data.errors
					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					// Get other errors
					// newError.push(err.response.data.message)
					props.setErrors(newError)
				})
		})
	}

	// Older browsers might not implement mediaDevices at all, so we set an empty object first
	if (navigator.mediaDevices === undefined) {
		navigator.mediaDevices = {};
	}

	// Some browsers partially implement mediaDevices. We can't just assign an object
	// with getUserMedia as it would overwrite existing properties.
	// Here, we will just add the getUserMedia property if it's missing.
	if (navigator.mediaDevices.getUserMedia === undefined) {
		navigator.mediaDevices.getUserMedia = (constraints) => {

			// First get ahold of the legacy getUserMedia, if present
			const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

			// Some browsers just don't implement it - return a rejected promise with an error
			// to keep a consistent interface
			if (!getUserMedia) {
				return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
			}

			// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
			return new Promise(function (resolve, reject) {
				getUserMedia.call(navigator, constraints, resolve, reject);
			});
		}
	}

	const constraints = {
		audio: false,
		video: {
			facingMode: { exact: camera },
			// width: { min: 1280, ideal: 1920, max: 2560 },
			// height: { min: 720, ideal: 1080, max: 1440 },
			frameRate: { min: 24 }
		}
	}

	let imageCapture;

	// Get Video stream
	navigator.mediaDevices.getUserMedia(constraints)
		.then((stream) => {
			// Older browsers may not have srcObject
			if ("srcObject" in video.current) {
				/* use the stream */
				video.current.srcObject = stream;
			} else {
				// Avoid using this in new browsers, as it is going away.
				video.current.src = window.URL.createObjectURL(stream);
			}

			video.current.onloadedmetadata = (e) => {
				video.current.play();
			};

			const track = stream.getVideoTracks()[0];

			// For Flash
			//Create image capture object and get camera capabilities
			imageCapture = new ImageCapture(track)

			return imageCapture.getPhotoCapabilities();
		}).then((photoCapabilities) => {

			// Check if camera has a torch
			if (photoCapabilities.fillLightMode) {
				// auto, off, or flash
				setFlash(photoCapabilities.fillLightMode)
			}

		}).catch(function (err) {
			console.log(err.name + ": " + err.message);
		});

	// Start Recording
	const startRecord = () => {
		// Stop Spining Record
		spiningRecord.current.style.animationPlayState = "paused"
		setRecord(true)
	}

	// Stop Recording
	const stopRecord = () => {
		// Start Spining Record
		spiningRecord.current.style.animationPlayState = "running"
		setRecord(false)
	}

	return (
		<>
			<div className="row p-0">
				<div className="col-sm-4"></div>
				<div
					className="col-sm-4"
					style={{
						width: window.innerWidth,
						height: window.innerHeight,
						overflow: "hidden"
					}}>
					<video ref={video} className="karaoke-video-upload"></video>
					{/* Floating Video Info Top */}
					<div className="w-100" style={{ position: "absolute", top: 0 }}>
						<div className="d-flex justify-content-between">
							{/* Close Icon */}
							<div className="p-2">
								<Link to="/karaoke-charts" style={{ fontSize: "1.5em" }}>
									<CloseSVG />
								</Link>
							</div>
							<div className="p-2">
								{/* Vertical Content */}
								<div className="d-flex flex-column mb-2">
									{/* Flash Light */}
									<div className="ml-auto mr-3">
										<center>
											<span style={{ fontSize: "1.8em" }}>
												{flash == "off" ? <FlashSVG /> : <FlashFilledSVG />}
												<h6>{flash}</h6>
											</span>
										</center>
									</div>
									{/* Flip Camera */}
									<div className="ml-auto mr-3">
										<center>
											<span
												style={{ fontSize: "2.3em" }}
												onClick={() => setCamera(camera == "user" ? "environment" : "user")}>
												<LoopSVG />
											</span>
											<h6>Flip</h6>
										</center>
									</div>
									{/* Timer  */}
									<div className="ml-auto mr-3">
										<center>
											<span
												style={{ fontSize: "2em" }}
												onClick={() => setTimer(3)}>
												<TimerSVG />
											</span>
											<h6>Timer</h6>
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
							<div className="ml-3 p-2 align-self-end">
								<center>
									<span
										style={{ fontSize: "2em" }}
										onClick={() => setBottomMenu("menu-open")}>
										<UploadBoxSVG />
									</span>
									<h6>Upload</h6>
								</center>
							</div>
							<div className="p-2" onClick={record ? stopRecord : startRecord}>
								<center>
									{record ?
										<span style={{ fontSize: "4em", color: "#fb3958" }}>
											<RecordFilledSVG />
										</span> :
										<span style={{ fontSize: "4em" }}>
											<RecordSVG />
										</span>}
									<h6 style={{ color: record ? "#fb3958" : "#fff" }}>Record</h6>
								</center>
							</div>
							<div className="mr-3 p-2 align-self-end">
								<center>
									<span style={{ fontSize: "2em", color: "#FFD700" }}>
										<ImageSVG />
									</span>
									<h6 style={{ color: "#FFD700" }}>Filters</h6>
								</center>
							</div>
						</div>
						{/* Audio Name */}
						<div className="d-flex py-2">
							<div
								className="mr-2"
								style={{ fontSize: "1.5em", color: "#FFD700" }}>
								<MusicNoteSVG />
							</div>
							<div className="flex-grow-1 align-self-center">
								<Ticker mode="smooth">
									{({ index }) => (
										<span style={{ color: "#FFD700" }}>
											Kenyan Shrap Gang Type Beat Supreme
										</span>
									)}
								</Ticker>
							</div>
							<div
								ref={spiningRecord}
								className="rotate-record mx-2">
								<Link to={`/audio-show/`}>
									<Img
										width="50px"
										height="50px"
										alt="current audio" />
								</Link>
							</div>
						</div>
						{/* Horizontal Content End */}
					</div>
					{/* Floating Video Info End */}
				</div>
				<div className="col-sm-4"></div>
			</div >

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu} >
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between" style={{ height: "3em" }}>
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

					{!showForm &&
						<div>
							<FilePond
								name="filepond-karaoke"
								labelIdle='Drag & Drop your Video or <span class="filepond--label-action text-dark"> Browse </span>'
								acceptedFileTypes={['video/*']}
								stylePanelAspectRatio="16:9"
								maxFileSize="200000000"
								allowRevert={true}
								server={{
									url: `${props.url}/api`,
									process: {
										url: "/karaokes",
										headers: { 'X-CSRF-TOKEN': token.content },
										onload: res => setKaraoke(res),
										onerror: (err) => console.log(err.response.data)
									},
									revert: {
										url: `/${karaoke}`,
										headers: { 'X-CSRF-TOKEN': token.content },
										onload: res => {
											props.setMessages([res])
										},
									},
								}} />

							{karaoke &&
								<Button
									btnClass="mysonar-btn mb-4"
									btnText="next"
									onClick={() => setShowForm(true)} />}
						</div>}

					{/* Karaoke Form */}
					{showForm &&
						<div className="contact-form text-center call-to-action-content wow fadeInUp" data-wow-delay="0.5s">
							<div className="form-group">
								<form onSubmit={onSubmit}>
									<input
										type="text"
										name="description"
										className="form-control"
										placeholder="Karaoke description"
										required={true}
										onChange={(e) => { setDescription(e.target.value) }} />
									<br />

									<Button
										btnClass="mysonar-btn"
										btnText="upload video"
										loading={loadingBtn} />
								</form>
							</div>
						</div>}
					{/* Karaoke Form End */}

				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</>
	)
}

export default KaraokeCreate