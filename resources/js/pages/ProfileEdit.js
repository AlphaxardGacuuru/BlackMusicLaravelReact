import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import Img from '../components/Img'
import Button from '../components/Button'

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
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Link } from 'react-router-dom';

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
);

const ProfileEdit = (props) => {

	// Declare states
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const [bio, setBio] = useState("")
	const [withdrawal, setWithdrawal] = useState("")

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]');

	// Declare new FormData object for form data
	const formData = new FormData();

	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		name && formData.append("name", name);
		phone && formData.append("phone", phone);
		bio && formData.append("bio", bio);
		withdrawal && formData.append("withdrawal", withdrawal);
		formData.append("_method", 'put');

		// Send data to UsersController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/users/${props.auth.id}`, formData)
				.then((res) => {
					props.setMessage(res.data)
					// Update auth details
					axios.get(`${props.url}/api/home`)
						.then((res) => props.setAuth(res.data))
					// Update Posts
					axios.get(`${props.url}/api/posts`)
						.then((res) => props.setPosts(res.data))
					// Update Posts comments
					axios.get(`${props.url}/api/post-comments`)
						.then((res) => props.setPostComments(res.data))
					// Update Video Comments
					axios.get(`${props.url}/api/video-comments`)
						.then((res) => props.setVideoComments(res.data))
					// Update Audio Comments
					axios.get(`${props.url}/api/audio-comments`)
						.then((res) => props.setAudioComments(res.data))
					setName("")
					setPhone("")
					setBio("")
					setWithdrawal("")
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
						<label htmlFor="">Profile Pic</label>
						<div className="avatar-container">
							<FilePond
								name="filepond-profile-pic"
								labelIdle='Drag & Drop your Image or <span class="filepond--label-action"> Browse </span>'
								stylePanelLayout="compact circle"
								imageCropAspectRatio="1:1"
								acceptedFileTypes={['image/*']}
								stylePanelAspectRatio="1:1"
								allowRevert={false}
								server={{
									url: `${props.url}/api`,
									process: {
										url: `/users`,
										headers: { 'X-CSRF-TOKEN': token.content },
										onload: (res) => {
											props.setMessage("Account updated")
											// Update auth
											axios.get(`${props.url}/api/home`)
												.then((res) => props.setAuth(res.data))
											// Update Users
											axios.get(`${props.url}/api/users`)
												.then((res) => props.setUsers(res.data))
										},
										onerror: (err) => console.log(err.response)
									}
								}} />
						</div>

						<form onSubmit={onSubmit}>
							<label htmlFor="" className="float-left">Name</label>
							<input
								type="text"
								name="name"
								className="form-control"
								placeholder={props.auth.name}
								value={name}
								onChange={(e) => { setName(e.target.value) }} />
							<br />

							<label htmlFor="" className="float-left">Phone</label>
							<input
								type="text"
								name="phone"
								className="form-control"
								placeholder={props.auth.phone}
								value={phone}
								onChange={(e) => { setPhone(e.target.value) }}
							/>
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

							<label htmlFor="" className="float-left">Cash Withdrawal</label>
							<br />
							<br />
							<h6>By setting your minimum cash withdrawal to less than <b className="mx-1 text-success"> KES 1000</b>
								you will incur additional withdrawal charges of <b className="mx-1 text-success"> KES 50</b>
								from our provider.
							</h6>
							<input
								type="number"
								name="withdrawal"
								className="form-control"
								placeholder={`KES ${props.auth.withdrawal}`}
								value={withdrawal}
								onChange={(e) => { setWithdrawal(e.target.value) }}
							/>
							<br />
							<br />

							<Button
								type="submit"
								btnText={"save changes"} />
						</form>
						<br />

						<Link to={`/profile/${props.auth.username}`} className="btn sonar-btn btn-2">
							back to profile
						</Link>

						<br />
					</center>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default ProfileEdit