import React, { useState, useEffect } from "react"
// import Axios from "axios"
import { Link } from "react-router-dom"

import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"

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
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
)

const Edit = (props) => {
	// Declare states
	const [formData, setFormData] = useState()
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const [bio, setBio] = useState("")
	const [withdrawal, setWithdrawal] = useState("")
	const [btnLoading, setBtnLoading] = useState()
	const [token, setToken] = useState()

	useEffect(() => {
		// Get csrf token
		Axios.get("sanctum/csrf-cookie").then((res) => {
			var headers = res.config.headers
			setToken(Object.values(headers)[2])
		})

		// Declare new FormData object for form data
		setFormData(new FormData())
	}, [])

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader for button
		setBtnLoading(true)

		// Add form data to FormData object
		name && formData.append("name", name)
		phone && formData.append("phone", phone)
		bio && formData.append("bio", bio)
		withdrawal && formData.append("withdrawal", withdrawal)
		formData.append("_method", "put")

		// Send data to UsersController
		Axios.post(`/api/users/${props.auth?.id}`, formData)
			.then((res) => {
				props.setMessages([res.data.message])
				// Update Posts
				props.get("posts", props.setPosts, "posts")
				// Update Auth
				props.get("auth", props.setAuth, "auth")
				// Update Users
				props.get("users", props.setUsers, "users")
				setName("")
				setPhone("")
				setBio("")
				setWithdrawal("")
				// Remove loader for button
				setBtnLoading(false)
			})
			.catch((err) => {
				// Remove loader for button
				setBtnLoading(false)
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				{/* {{-- Profile Pic Form --}} */}
				<br />
				<div className="mycontact-form form-group">
					<center>
						<h1>EDIT PROFILE</h1>
						<br />
						<label
							htmlFor=""
							className="text-light">
							Profile Pic
						</label>
						<div className="avatar-container">
							<FilePond
								name="filepond-avatar"
								labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
								stylePanelLayout="compact circle"
								imageCropAspectRatio="1:1"
								acceptedFileTypes={["image/*"]}
								stylePanelAspectRatio="1:1"
								allowRevert={false}
								server={{
									url: `${props.url}/api/filepond`,
									headers: { "X-CSRF-TOKEN": token },
									process: {
										url: `/avatar/${props.auth?.id}`,
										onload: (res) => {
											props.setMessages(["Account updated"])
											// Update Auth
											props.get("auth", props.setAuth, "auth")
										},
										onerror: (err) => console.log(err.response),
									},
								}}
							/>
						</div>

						<form onSubmit={onSubmit}>
							{/* Name */}
							<label
								htmlFor=""
								className="float-start text-light">
								Name
							</label>
							<input
								type="text"
								name="name"
								className="my-form"
								placeholder={props.auth?.name}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							{/* Name End */}
							<br />

							{/* Email */}
							<label
								htmlFor=""
								className="float-start text-light">
								Email
							</label>
							<input
								type="text"
								name="email"
								className="my-form"
								placeholder={props.auth?.email}
							/>
							{/* Email End */}
							<br />

							{/* Phone */}
							<label
								htmlFor=""
								className="float-start text-light">
								Phone
							</label>
							<input
								type="text"
								name="phone"
								className="my-form"
								placeholder={props.auth?.phone}
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
							{/* Phone End */}
							<br />

							{/* Bio */}
							<label
								htmlFor=""
								className="float-start text-light">
								Bio
							</label>
							<input
								type="text"
								name="bio"
								className="my-form"
								placeholder={props.auth?.bio}
								value={bio}
								onChange={(e) => setBio(e.target.value)}
							/>
							{/* Bio End */}
							<br />

							{/* Cash Withdrawal */}
							<label
								htmlFor=""
								className="float-start text-light">
								Cash Withdrawal
							</label>
							<br />
							<br />
							<h6>
								By setting your minimum cash withdrawal to less than{" "}
								<b className="mx-1 text-success"> KES 1000</b>
								you will incur additional withdrawal charges of{" "}
								<b className="mx-1 text-success"> KES 50</b>
								from our provider.
							</h6>
							<input
								type="number"
								name="withdrawal"
								className="my-form"
								placeholder={`KES ${props.auth?.withdrawal}`}
								value={withdrawal}
								onChange={(e) => setWithdrawal(e.target.value)}
							/>
							{/* Cash Withdrawal End */}
							<br />
							<br />

							<Btn
								type="submit"
								btnClass="sonar-btn white-btn"
								btnText="save changes"
								loading={btnLoading}
							/>
						</form>
						<br />

						<Link
							to={`/profile/show/${props.auth?.username}`}
							className="btn sonar-btn btn-2">
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

export default Edit
