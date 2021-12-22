import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

import Button from '../components/Button'
import Img from '../components/Img'

import Picker from 'emoji-picker-react';

const SocialMediaInput = (props) => {

	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState()

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
							style={{ border: "none", outline: "none" }}
							placeholder={props.placeholder}
							row="10"
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
				</div>
				<br />
				{showEmojiPicker &&
					<Picker
						onEmojiClick={onEmojiClick}
						preload="true"
						pickerStyle={{ float: "right", width: "100%" }} />}
			</center>
	)
}

export default SocialMediaInput