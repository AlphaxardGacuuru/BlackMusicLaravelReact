import React from "react"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import BackSVG from "@/svgs/BackSVG"
import PhoneSVG from "../svgs/PhoneSVG"
import SMSSVG from "../svgs/SMSSVG"
import WhatsAppSVG from "../svgs/WhatsAppSVG"
import InstagramSVG from "../svgs/InstagramSVG"

const Download = (props) => {
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="d-flex justify-content-between mb-1">
					{/* <!-- Close Icon --> */}
					<div className="">
						<Link to="/">
							<BackSVG />
						</Link>
					</div>
				</div>

				<center>
					<h1>Download the App</h1>
					<h3>It's quick and easy</h3>
					<br />
					<br />

					<Img src="storage/img/home.jpg" width="50%" />
					<br />
					<br />
					<br />

					<button
						className="mysonar-btn white-btn"
						style={{
							display: props.downloadLink ? "inline" : "none",
						}}
						onClick={() => props.btnAdd.current.click()}>
						Download and Install 328Kb
					</button>
					<br />
					<br />
					<br />
					<br />

					<a href="tel:0700364446" className="display-2" title="Phone">
						<PhoneSVG />
					</a>
					<br />
					<br />

					<a href="sms:0700364446" className="display-2" title="SMS">
						<SMSSVG />
					</a>
					<br />
					<br />

					<a
						href="https://wa.me/+2540700364446"
						className="display-2"
						title="WhatsApp">
						<WhatsAppSVG />
					</a>
					<br />
					<br />

					<a
						href="https://www.instagram.com/officialblackkenya"
						className="display-2"
						title="Instagram">
						<InstagramSVG />
					</a>
					<br />
					<br />
					<br />
				</center>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Download
