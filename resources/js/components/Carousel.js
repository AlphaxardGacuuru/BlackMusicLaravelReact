import React, { useEffect, useRef } from 'react'

import Img from '../components/Img'

const Carousel = () => {

	const banner = useRef()

	useEffect(() => {
		// Set interval for changing images
		const bannerImages = [
			"/storage/img/Ad1.jpg",
			"/storage/img/PSX_20220206_210037.jpg",
			"/storage/img/PSX_20220206_205615.jpg",
			"/storage/img/PSX_20220206_205133.jpg"
		]

		var index = 0
		const bannerSwitch = setInterval(() => {
			banner.current.src = bannerImages[index++ % bannerImages.length]
		}, 3000);

		return () => clearInterval(bannerSwitch)

	}, [])
	
	return (
		<div className="d-flex mt-2">
			{/* For small screens */}
			<div className="anti-hidden"
				style={{
					width: "100%",
					height: window.innerHeight * 0.75,
					overflow: "hidden",
				}}>
				<img
					ref={banner}
					src="/storage/img/Ad1.jpg"
					width="100%"
					loading="lazy"
					alt="Banner" />
			</div>
			<div className="hidden"
				style={{
					width: "100%",
					height: window.innerHeight * 0.75,
					overflow: "hidden",
				}}>
				<Img src="/storage/img/Ad1.jpg"
					width="100%" />
			</div>
			<div className="hidden"
				style={{
					width: "100%",
					height: window.innerHeight * 0.75,
					overflow: "hidden"
				}}>
				<Img src="/storage/img/PSX_20220206_210037.jpg" width="100%" />
			</div>
			<div className="hidden"
				style={{
					width: "100%",
					height: window.innerHeight * 0.75,
					overflow: "hidden"
				}}>
				<Img src="/storage/img/PSX_20220206_205615.jpg" width="100%" />
			</div>
			<div className="hidden"
				style={{
					width: "100%",
					height: window.innerHeight * 0.75,
					overflow: "hidden"
				}}>
				<Img src="/storage/img/PSX_20220206_205133.jpg" width="100%" />
			</div>
			{/* <div className="mt-2" style={{
					position: "absolute",
					zIndex: "1",
					top: 180,
					right: 0,
					left: 1250,
					bottom: 0,
					height: "200px",
					width: "200px"
				}}>
					<Img
						src="/storage/img/musical-note-black-gold-512.png"
						width="100%"
						style={{
							borderRadius: "50%",
							// boxShadow: "0 10px 20px 0 rgba(255,215,0,0.9)"
							boxShadow: "0 10px 20px 0 rgba(0,0,0,0.9)"
						}} />
				</div> */}
			{/* Overlay gradient */}
			<div className="mt-2" style={{
				position: "absolute",
				zIndex: "1",
				top: 0,
				right: 0,
				left: 0,
				bottom: 0,
				height: window.innerHeight * 0.85,
				backgroundImage: "linear-gradient(to bottom, rgba(35,35,35,1), rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,1))"
			}}>
				{/* <div
						className="d-flex justify-content-between"
						style={{
							position: "absolute",
							zIndex: "1",
							right: 0,
							left: 0,
							bottom: 50
						}}>
						<div className="p-2">
							<h3>Kenya's best</h3>
						</div>
						<div className="p-2">
							<Button
								btnClass="mysonar-btn"
								btnStyle={{ backgroundColor: "transparent" }}
								btnText="Button" />
						</div>
					</div> */}
			</div>
		</div>
	)
}

export default Carousel