import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'

import CloseSVG from '../svgs/CloseSVG'
import FlashSVG from '../svgs/FlashSVG'
import LoopSVG from '../svgs/LoopSVG'
import TimerSVG from '../svgs/TimerSVG'
import RecordFilledSVG from '../svgs/RecordFilledSVG'
import UploadSVG from '../svgs/UploadSVG'
import MusicNoteSVG from '../svgs/MusicNoteSVG'

const KaraokeCreate = () => {

	// ID for video element
	const video = useRef(null)

	const [flash, setFlash] = useState()
	const [camera, setCamera] = useState("user")
	const [timer, setTimer] = useState()
	const [record, setRecord] = useState()

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
			width: { min: 1280, ideal: 1920, max: 2560 },
			height: { min: 720, ideal: 1080, max: 1440 },
			frameRate: { min: 24 }
		}
	}

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

			//Create image capture object and get camera capabilities
			const imageCapture = new ImageCapture(track)

			imageCapture.getPhotoCapabilities().then((capabilities) => {
				// Check if camera has a torch
				if (capabilities.fillLightMode) {
					// auto, off, or flash
					setFlash(capabilities.fillLightMode)
				}
			});

		}).catch(function (err) {
			console.log(err.name + ": " + err.message);
		});

	return (
		<div className="row p-0">
			<div className="col-sm-4"></div>
			<div
				className="col-sm-4"
				style={{
					width: window.innerWidth,
					height: window.innerHeight,
					overflow: "hidden"
				}}>
				<video ref={video}></video>
				{/* Floating Video Info Top */}
				<div className="w-100" style={{ position: "absolute", top: 0 }}>
					<div className="d-flex justify-content-between">
						{/* Close Icon */}
						<div className="p-2">
							<Link to="/karaoke-charts" style={{ fontSize: "1.5em" }}>
								<CloseSVG />
							</Link>
						</div>
						{/* Flash Light */}
						<div className="p-2 mr-1">
							<Link to="/" style={{ fontSize: "1.8em" }}>
								<FlashSVG />
								<h6>{flash}</h6>
							</Link>
						</div>
					</div>
				</div>
				{/* Floating Video Info Top End */}
				{/* Floating Video Info */}
				<div className="karaoke-overlay w-100">
					{/* Vertical Content */}
					<div className="d-flex flex-column mb-2">
						{/* Flip Camera */}
						<div className="ml-auto mr-2">
							<center>
								<span
									style={{ fontSize: "2.2em" }}
									onClick={() => {
										setCamera(camera == "user" ? "environment" : "user")
									}}>
									<LoopSVG />
								</span>
								<h6>Flip</h6>
							</center>
						</div>
						{/* Timer  */}
						<div className="ml-auto mr-2">
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
					{/* Horizontal Content */}
					<div className="d-flex justify-content-between">
						<div className="p-2 align-self-end">
							<center>
								<span style={{ fontSize: "2em" }}><UploadSVG /></span>
								<h6>Upload</h6>
							</center>
						</div>
						<div className="p-2">
							<center>
								<span style={{ fontSize: "4em", color: "#fb3958" }}><RecordFilledSVG /></span>
								<h6 style={{ color: "#fb3958" }}>Record</h6>
							</center>
						</div>
						<div className="p-2 align-self-end">
							<center>
								<div className="rotate-record">
									<Link to={`/audio-show/`}>
										<Img
											width="50px"
											height="50px"
											style={{ animation: "rotation 2s infinite linear" }}
											alt="current audio" />
									</Link>
								</div>
							</center>
						</div>
					</div>
					<h6
						className="ml-1"
						style={{
							width: "20em",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip",
							color: "#FFD700"
						}}>
						<span
							className="mr-2"
							style={{ fontSize: "1.5em", color: "inherit" }}>
							<MusicNoteSVG />
						</span>
						Kenyan Shrap Gang Type Beat Supreme
					</h6>
					{/* Horizontal Content End */}
				</div>
				{/* Floating Video Info End */}
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default KaraokeCreate