import React from 'react'

const Button = ({ btnStyle, btnClass, btnText, onClick, loading }) => {
	return (
		<button
			style={btnStyle}
			className={btnClass}
			onClick={onClick}>
			{btnText}
			{loading &&
				<div className="spinner-border ml-2 my-auto"
					style={{
						borderTopWidth: "2px",
						borderBottomWidth: "2px",
						borderLeftWidth: "2px",
						width: "15px",
						height: "15px",
						color: "inherit"
					}}>
				</div>}
		</button>
	)
}

Button.defaultProps = {
	btnClass: 'sonar-btn',
	loading: false
}

export default Button