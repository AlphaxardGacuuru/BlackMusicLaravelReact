import React from 'react'

const Messages = ({ message, errors }) => {

	return (
		<center>
			<h6
				id="snackbar"
				className={errors.length > 0 || message.length > 0 ? 'show' : ''}>
				{/* Message Toast */}
				{message &&
					<div className="bg-success p-2">{message}</div>}
				{/* Error Toast */}
				{errors.map((error, index) => (
					<div
						key={index}
						className="p-2 mt-2"
						style={{ backgroundColor: "#232323" }}>
						{error}
					</div>
				))}
			</h6>
		</center>
	)
}

export default Messages