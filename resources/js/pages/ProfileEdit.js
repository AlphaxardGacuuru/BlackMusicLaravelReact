import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import Img from '../components/Img'
import Button from '../components/Button'

const ProfileEdit = (props) => {

	// Declare states
	const [name, setName] = useState("")
	const [bio, setBio] = useState("")
	const [media, setMedia] = useState()
	const [preview, setPreview] = useState()

	// Assign id to element
	const mediaInput = React.useRef(null)

	// Declare new FormData object for form data
	const formData = new FormData();

	// Fire when image is choosen
	var onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			var img = event.target.files[0];
			setMedia(img)
			setPreview(URL.createObjectURL(img))
		}
	};

	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		name && formData.append("name", name);
		bio && formData.append("bio", bio);
		// If media has been selected then append the file to FormData object
		media && formData.append("profile-pic", media);
		formData.append("_method", 'put');

		// Send data to UsersController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/users/${props.auth.id}`, formData).then((res) => {
				props.setMessage(res.data)
				axios.get(`${props.url}/api/home`).then((res) => props.setAuth(res.data))
				setName("")
				setBio("")
			}).catch(err => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				props.setErrors(newError)
			})
		})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{/* {{-- Profile Pic Form --}} */}
				<br />
				<div className="contact-form form-group">
					<center>
						<h1>EDIT PROFILE</h1>
						<br />
						<div className="avatar-container border">
							<Img imgClass="avatar hover-img" src={`/storage/${props.auth.pp}`} />
							<div className="overlay">
								<Button
									btnText={"edit"}
									btnClass={"edit-button mysonar-btn"}
									onClick={() => mediaInput.current.click()} />
							</div>
						</div>

						<img
							src={preview}
							width="100%"
							height="auto" />

						<form onSubmit={onSubmit}>

							<input
								type="file"
								name="profile-pic"
								className="form-control"
								style={{ display: "none" }}
								ref={mediaInput}
								onChange={onImageChange} />

							<label htmlFor="" className="float-left">Name</label>
							<input
								type="text"
								name="name"
								className="form-control"
								placeholder={props.auth.name}
								value={name}
								onChange={(e) => { setName(e.target.value) }} />

							<br />
							<label htmlFor="" className="float-left">Bio</label>
							<input
								type="text"
								name="bio"
								className="form-control"
								placeholder={props.auth.bio}
								value={bio}
								onChange={(e) => { setBio(e.target.value) }} />

							<br />

							<button
								type="reset"
								className="sonar-btn mr-2">reset</button>

							<br className="anti-hidden" />
							<br className="anti-hidden" />

							<Button
								type="submit"
								btnText={"save changes"} />

						</form>
						<br />
					</center>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default ProfileEdit