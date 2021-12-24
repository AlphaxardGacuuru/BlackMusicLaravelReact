import React, { useState } from 'react'
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

const SocialMediaInput = (props) => {

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]');

	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [showFilepond, setShowFilepond] = useState(false)

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
		props.setText(props.text + emojiObject.emoji)
	};

	return (
		<center>
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
					<input
						name='post-text'
						className='form-control'
						style={{ border: "none", outline: "none", height: "50px" }}
						placeholder={props.placeholder}
						value={props.text}
						onChange={(e) => props.setText(e.target.value)} />
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
				{props.showImage &&
					<div
						className="p-2"
						onClick={() => setShowFilepond(!showFilepond)}>
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
				<div className="p-2">
					<Button
						btnClass="mysonar-btn-round"
						btnStyle={{ borderRadius: "50%", minWidth: "33px", paddingRight: "2px" }}
						btnText={<span className="p-2">
							<svg style={{ transform: "rotate(45deg)" }}
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
			<br />

			{showEmojiPicker &&
				<Picker
					onEmojiClick={onEmojiClick}
					preload="true"
					pickerStyle={{ float: "right", width: "100%" }} />}

			{showFilepond &&
				<center className="mt-2">
					<h5>Add Image</h5>
					<FilePond
						name="filepond-media"
						labelIdle='Drag & Drop your Image or <span class="filepond--label-action"> Browse </span>'
						acceptedFileTypes={['image/*']}
						stylePanelAspectRatio="16:9"
						allowRevert={true}
						server={{
							url: `${props.url}/api`,
							process: {
								url: props.urlTo,
								headers: { 'X-CSRF-TOKEN': token.content },
								onload: res => props.setMedia(res),
							},
							revert: {
								url: `${props.urlTo}/${props.media.substr(11)}`,
								headers: { 'X-CSRF-TOKEN': token.content },
								onload: res => props.setMessage(res),
							},
						}} />
				</center>}
		</center>
	)
}

SocialMediaInput.defaultProps = {
	urlTo: '/',
}

export default SocialMediaInput