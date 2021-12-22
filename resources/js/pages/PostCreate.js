import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

import Button from '../components/Button'
import Img from '../components/Img'

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

import Picker from 'emoji-picker-react';

const PostCreate = (props) => {

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]');

	// Declare states
	const [text, setText] = useState("")
	const [media, setMedia] = useState("")
	// const [preview, setPreview] = useState()
	const [para1, setPara1] = useState("")
	const [para2, setPara2] = useState("")
	const [para3, setPara3] = useState("")
	const [para4, setPara4] = useState("")
	const [para5, setPara5] = useState("")
	const [mediaStyle, setMediaStyle] = useState()
	const [pollStyle, setPollStyle] = useState()
	const [display1, setDisplay1] = useState("none")
	const [display2, setDisplay2] = useState("none")
	const [display3, setDisplay3] = useState("none")
	const [display4, setDisplay4] = useState("none")
	const [display5, setDisplay5] = useState("none")
	const [showEmojiPicker, setShowEmojiPicker] = useState()

	// Get history for page location
	const history = useHistory()

	// Assign id to element
	// const mediaInput = React.useRef(null)

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

	const [chosenEmoji, setChosenEmoji] = useState(null);

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
		setText(text + emojiObject.emoji)
	};

	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		formData.append("text", text);
		// If media has been selected then append the file to FormData object
		media && formData.append("media", media);
		formData.append("para1", para1);
		formData.append("para2", para2);
		formData.append("para3", para3);
		formData.append("para4", para4);
		formData.append("para5", para5);

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/posts`, formData).then((res) => {
				props.setMessage("Posted")
				axios.get(`${props.url}/api/posts`).then((res) => props.setPosts(res.data))
				setTimeout(() => history.push('/'), 1000)
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
				<div className="contact-form">
					<form action="POST" onSubmit={onSubmit} className='contact-form'>
						<div className="d-flex justify-content-between">
							{/* <!-- Close Icon --> */}
							<div className="">
								<Link to="/">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="40"
										height="40"
										fill="currentColor"
										className="bi bi-x"
										viewBox="0 0 16 16">
										<path
											d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
									</svg>
								</Link>
							</div>
							{/* Post button */}
							<div className="">
								<Button
									type="submit"
									btnClass={'mysonar-btn'}
									btnText={'post'} />
							</div>
						</div>
						<br />

						<div
							className="d-flex"
							style={{ borderBottom: "1px solid #c0c0c0" }}>
							{/* Profile pic */}
							<div className='p-2'>
								<Img
									src={props.auth.pp}
									imgClass={"rounded-circle"}
									width="25px"
									height="25px"
									alt="Avatar" />
							</div>
							{/* Input */}
							<div className="flex-grow-1">
								<textarea
									name='post-text'
									className='form-control'
									style={{ border: "none", outline: "none", resize: "none" }}
									placeholder="What's on your mind"
									row="10"
									value={text}
									onChange={(e) => setText(e.target.value)}>
								</textarea>
							</div>
							{/* Emoji icon */}
							<div className='p-2'>
								<span
									style={{ cursor: "pointer" }}
									onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										className="bi bi-emoji-smile"
										viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
									</svg>
								</span>
							</div>
							{/* Image icon */}
							<div
								className="p-2"
								style={{
									cursor: "pointer",
									display: mediaStyle
								}}>
								<span
									onClick={() => setPollStyle("none")}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										className="bi bi-image"
										viewBox="0 0 16 16">
										<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
										<path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
									</svg>
								</span>
							</div>
							{/* Poll icon */}
							<div
								className="p-2"
								style={{
									cursor: "pointer",
									display: pollStyle
								}}>
								<span
									onClick={() => {
										setDisplay1("inline")
										setMediaStyle("none")
									}}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										className="bi bi-bar-chart"
										viewBox="0 0 16 16">
										<path
											d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
									</svg>
								</span>
							</div>
						</div>
						<br />
						{showEmojiPicker &&
							<Picker
								onEmojiClick={onEmojiClick}
								preload="true"
								pickerStyle={{ float: "right", width: "100%" }} />}
						{/* <div
							className="mb-2"
							style={{
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
								borderBottomRightRadius: "10px",
								borderBottomLeftRadius: "10px",
								overflow: "hidden"
							}}>
							<img
								src={preview}
								width="100%"
								height="auto" />
						</div> */}

						{/* Hidden file input */}
						{/* <input
							type='file'
							id='post-media'
							style={{ display: 'none' }}
							ref={mediaInput}
							onChange={onImageChange} /> */}

						{/* <div className="d-flex text-center">
							<div className="p-2 flex-fill"
								style={{
									backgroundColor: "#232323",
									display: mediaStyle
								}}
								onClick={() => {
									// mediaInput.current.click()
									setPollStyle("none")
								}}>
								<span style={{ color: "white" }}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										className="bi bi-image" viewBox="0 0 16 16">
										<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
										<path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
									</svg>
								</span>
							</div>
							<div className="p-2 flex-fill"
								style={{
									backgroundColor: "#232323",
									display: pollStyle
								}}
								onClick={() => {
									setDisplay1("inline")
									setMediaStyle("none")
								}}>
								<span style={{ color: "white" }}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										className="bi bi-bar-chart"
										viewBox="0 0 16 16">
										<path
											d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
									</svg>
								</span>
							</div>
						</div> */}

						{/* Upload Image */}
						{pollStyle == "none" &&
							<center className="mt-2">
								<h5>Add Image</h5>
								<FilePond
									name="filepond-media"
									labelIdle='Drag & Drop your Image or <span class="filepond--label-action"> Browse </span>'
									imageCropAspectRatio="1:1"
									acceptedFileTypes={['image/*']}
									stylePanelAspectRatio="16:9"
									allowRevert={true}
									server={{
										url: `${props.url}/api`,
										process: {
											url: "/posts",
											headers: { 'X-CSRF-TOKEN': token.content },
											onload: res => {
												setMedia(res)
											},
										},
										revert: {
											url: `/posts/${media.substr(11)}`,
											headers: { 'X-CSRF-TOKEN': token.content },
											onload: res => {
												props.setMessage(res)
											},
										},
									}} />
							</center>}

						<center>
							<h5 style={{ display: display1 }}>Add Poll</h5>
							{/* Poll inputs */}
							<input
								type='text'
								style={{ display: display1 }}
								className='form-control'
								placeholder="Parameter 1"
								onChange={(e) => {
									setDisplay2("inline")
									setPara1(e.target.value)
								}} />
							<input
								type='text'
								style={{ display: display2 }}
								className='form-control'
								placeholder='Parameter 2'
								onChange={(e) => {
									setDisplay3("inline")
									setPara2(e.target.value)
								}} />
							<input
								type='text'
								style={{ display: display3 }}
								className='form-control'
								placeholder='Parameter 3'
								onChange={(e) => {
									setDisplay4("inline")
									setPara3(e.target.value)
								}} />
							<input
								type='text'
								style={{ display: display4 }}
								className='form-control'
								placeholder='Parameter 4'
								onChange={(e) => {
									setDisplay5("inline")
									setPara4(e.target.value)
								}} />
							<input
								type='text'
								style={{ display: display5 }}
								className='form-control'
								placeholder='Parameter 5'
								onChange={(e) => setPara5(e.target.value)} />
						</center>
					</form>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default PostCreate
