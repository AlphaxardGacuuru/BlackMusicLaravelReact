import React from 'react'

const Messages = ({ message, errors }) => {
	return (
		<h6 id="snackbar" className={errors.length > 0 || message.length > 0 ? 'show' : ''}>
			{message && <div className="bg-success p-2" style={{ borderRadius: "30px" }}>{message}</div>}
			{errors.map((error, index) => (
				<div key={index} className="bg-danger p-2" style={{ borderRadius: "30px" }}>{error}</div>
			))}
		</h6>
	)
}

export default Messages