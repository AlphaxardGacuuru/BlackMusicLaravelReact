import React from 'react'

const Button = ({ btnStyle, btnClass, btnText, onClick }) => {
	return (
		<button style={btnStyle} className={btnClass} onClick={onClick}>{btnText}</button>
	)
}

Button.defaultProps = {
	btnClass: 'sonar-btn',
}

export default Button