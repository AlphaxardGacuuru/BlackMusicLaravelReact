import React from 'react'
import { Link } from 'react-router-dom'

const AuthLinks = () => {
	return (
		<>
			<Link className="display-4" to="/login">Login</Link>
			<Link className="display-4" to="/register">Register</Link>
		</>
	)
}

export default AuthLinks