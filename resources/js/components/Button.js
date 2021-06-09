import React from 'react'

const Button = ({ btnClass, btnText, onClick }) => {
	return (
		<button className={btnClass} onClick={onClick}>{btnText}</button>
	)
}

Button.defaultProps = {
	btnClass: 'sonar-btn',
}

export default Button