import React from 'react'

const Messages = ({ message, errors }) => {

	return (
		<center>
			<h6 id="snackbar" className={errors.length > 0 || message.length > 0 ? 'show' : ''}>
				{message && <div className="bg-success p-2" style={{ borderRadius: "30px" }}>{message}</div>}
				{errors.map((error, index) => (
					<div key={index} className="bg-danger p-2 mt-2" style={{ borderRadius: "30px" }}>{error}</div>
				))}
			</h6>
		</center>
	)
}

export default Messages