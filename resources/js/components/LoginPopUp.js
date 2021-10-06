import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
	GithubLoginButton,
	GoogleLoginButton,
	FacebookLoginButton,
	TwitterLoginButton
} from "react-social-login-buttons";
import axios from 'axios';

const LoginPopUp = () => {

	const onSocial = (website) => {
		window.location.href = `${url}/api/login/${website}`
	}
	
	return (
		<div className="menu-open">
			<div className="bottomMenu">
				<div className="d-flex align-items-center justify-content-between">
					{/* <!-- Logo Area --> */}
					<div className="logo-area p-2">
						<a href="#">Login</a>
					</div>
				</div>
				<div className="p-2">
					{/* <GithubLoginButton className="mt-2 rounded-0" onClick={() => onSocial("github")} /> */}
					<GoogleLoginButton className="mt-2 rounded-0" onClick={() => onSocial("google")} />
					<FacebookLoginButton className="mt-2 rounded-0" onClick={() => onSocial("facebook")} />
					<TwitterLoginButton className="mt-2 rounded-0" onClick={() => onSocial("twitter")} />
				</div>
			</div>
		</div>
	)
}

export default LoginPopUp
