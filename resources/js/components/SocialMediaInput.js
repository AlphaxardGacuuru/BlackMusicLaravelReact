import React, { useState, useEffect, useRef } from 'react'

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

const SocialMediaInput = (props) => {

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]');

	// const [chosenEmoji, setChosenEmoji] = useState(null);
	const [doNotShowMentionPicker, setDoNotShowMentionPicker] = useState(true)
	const [display2, setDisplay2] = useState("none")
	const [display3, setDisplay3] = useState("none")
	const [display4, setDisplay4] = useState("none")
	const [display5, setDisplay5] = useState("none")

	const onEmojiClick = (event, emojiObject) => {
		// setChosenEmoji(emojiObject);
		props.setText(props.text + emojiObject.emoji)
	};

	// Show error on space in username
	useEffect(() => {
		props.text.indexOf("@") > -1 &&
			props.setShowMentionPicker(true)
	}, [props.text])

	// Add username to text
	const addMention = (mention) => {
		var textUsername = "@" + props.text.split("@")[1]
		var mentionToAdd = props.text.replace(textUsername, mention)
		props.setText(mentionToAdd)
		props.setShowMentionPicker(false)
		setDoNotShowMentionPicker(false)
	}

	return (
		<center style={{ backgroundColor: "#232323" }}>
			<div
				className="d-flex pt-2 border-bottom border-dark"
				style={{ backgroundColor: "#232323" }}>
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
						className='form-control m-0 p-2'
						style={{
							border: "none",
							outline: "none",
							height: "50px",
							resize: "none"
						}}
						placeholder={props.placeholder}
						value={props.text}
						row="1"
						onChange={(e) => props.setText(e.target.value)}>
					</textarea>
				</div>
				{/* Emoji icon */}
				<div className="pt-2 px-1">
					<span
						className="text-light"
						style={{ cursor: "pointer" }}
						onClick={() => {
							props.setShowEmojiPicker(!props.showEmojiPicker)
							props.setShowImagePicker(true && false)
							props.setShowPollPicker(true && false)
						}}>
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
				{props.showImage &&
					<div
						className="pt-2 px-1 text-light"
						onClick={() => {
							props.setShowImagePicker(!props.showImagePicker)
							props.setShowEmojiPicker(true && false)
							props.setShowPollPicker(true && false)
							if (props.showImage || props.showPollPicker) {
								props.setMedia("")
								props.setPara1()
								props.setPara2()
								props.setPara3()
								props.setPara4()
								props.setPara5()
							}
						}}>
						<span style={{ cursor: "pointer" }}>
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
					</div>}
				{/* Poll icon */}
				{props.showPoll &&
					<div
						className="pt-2 px-1 text-white"
						onClick={() => {
							props.setShowPollPicker(!props.showPollPicker)
							props.setShowEmojiPicker(true && false)
							props.setShowImagePicker(true && false)
							if (props.showImage || props.showPollPicker) {
								props.setMedia("")
								props.setPara1()
								props.setPara2()
								props.setPara3()
								props.setPara4()
								props.setPara5()
							}
						}}>
						<span style={{ cursor: "pointer" }}>
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
					</div>}
				{/* Button */}
				<div className="p-1">
					<Button
						type="submit"
						btnClass="mysonar-btn-round"
						btnStyle={{
							borderRadius: "50%",
							minWidth: "33px",
							paddingRight: "2px"
						}}
						btnText={
							<span className="p-2">
								<svg
									style={{ transform: "rotate(45deg)" }}
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-send-fill"
									viewBox="0 0 16 16">
									<path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
								</svg>
							</span>} />
				</div>
			</div>

			{/* Show Emoji Picker */}
			{props.showEmojiPicker &&
				<div>
					<Picker
						onEmojiClick={onEmojiClick}
						preload="true"
						pickerStyle={{ width: "95%", borderRadius: "0px", margin: "10px" }} />
					<br />
				</div>}

			{/* Show Filepond */}
			{props.showImagePicker &&
				<div>
					<FilePond
						name="filepond-media"
						className="m-2"
						labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
						acceptedFileTypes={['image/*']}
						allowRevert={true}
						server={{
							url: `${props.url}/api`,
							process: {
								url: props.urlTo,
								headers: { 'X-CSRF-TOKEN': token.content },
								onload: res => props.setMedia(res),
							},
							revert: {
								url: props.urlToDelete,
								headers: { 'X-CSRF-TOKEN': token.content },
								onload: res => props.setMessages(res),
							},
						}} />
					<br />
				</div>}

			{/* Show Mention Picker */}
			{props.showMentionPicker && doNotShowMentionPicker ?
				<div>
					<div className="card rounded-0" style={{ maxHeight: "200px", overflowY: "scroll" }}>
						{props.users
							.filter((user) => {
								var regex = new RegExp(props.text.split("@")[1], 'gi')

								return user.username != props.auth.username &&
									user.username != "@blackmusic" &&
									user.account_type == "musician" &&
									user.username.match(regex)
							}).map((user, key) => (
								<div
									key={key}
									className="d-flex"
									onClick={() => addMention(user.username)}>
									<div className="p-2">
										<Img
											src={user.pp}
											imgClass="rounded-circle"
											width="30px"
											height="30px" />
									</div>
									<div className="py-2 px-0">
										<h6
											className="m-0"
											style={{
												width: "100%",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "clip"
											}}>
											<b>{user.name}</b>
											<small>{user.username}</small>
										</h6>
									</div>
								</div>
							))}
					</div>
					<br />
				</div> : ""}

			{/* Show Polls */}
			{props.showPollPicker &&
				<center>
					<h5 className="mt-2">Add Poll</h5>
					{/* Poll inputs */}
					<input
						type='text'
						className='form-control border-dark'
						placeholder="Parameter 1"
						onChange={(e) => {
							setDisplay2("inline")
							props.setPara1(e.target.value)
						}} />
					<input
						type='text'
						style={{ display: display2 }}
						className='form-control border-dark'
						placeholder='Parameter 2'
						onChange={(e) => {
							setDisplay3("inline")
							props.setPara2(e.target.value)
						}} />
					<input
						type='text'
						style={{ display: display3 }}
						className='form-control border-dark'
						placeholder='Parameter 3'
						onChange={(e) => {
							setDisplay4("inline")
							props.setPara3(e.target.value)
						}} />
					<input
						type='text'
						style={{ display: display4 }}
						className='form-control border-dark'
						placeholder='Parameter 4'
						onChange={(e) => {
							setDisplay5("inline")
							props.setPara4(e.target.value)
						}} />
					<input
						type='text'
						style={{ display: display5 }}
						className='form-control border-dark'
						placeholder='Parameter 5'
						onChange={(e) => props.setPara5(e.target.value)} />
				</center>}
		</center>
	)
}

SocialMediaInput.defaultProps = {
	urlTo: '/',
	urlToDelete: '/',
}

export default SocialMediaInput