import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
	GoogleLoginButton,
	FacebookLoginButton,
	TwitterLoginButton
} from "react-social-login-buttons";
import axios from 'axios';

const LoginPopUp = (props) => {

	const onSocial = (website) => {
		window.location.href = `${props.url}/api/login/${website}`
	}

	return (
		<>
			<div id="preloader">
				<div className="preload-content">
					{/* <div id="sonar-load"></div> */}
				</div>
			</div>
			<div className="menu-open">
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						{/* <!-- Logo Area --> */}
						<div className="logo-area p-2">
							<a href="#">Login</a>
						</div>
					</div>
					<div className="p-2">
						<GoogleLoginButton className="mt-2 rounded-0" onClick={() => onSocial("google")} />
						<FacebookLoginButton className="mt-2 rounded-0" onClick={() => onSocial("facebook")} />
						<TwitterLoginButton className="mt-2 rounded-0" onClick={() => onSocial("twitter")} />
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginPopUp
