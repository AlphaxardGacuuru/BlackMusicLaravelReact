import React from 'react'
import { Link } from 'react-router-dom'

const AuthLinks = (props) => {
	return (
		<>
			<Link className="display-4" to="#" onClick={() => props.setLogin(true)}>Login</Link>
			{/* <Link className="display-4" to="/register/Name/Email/Avatar">Register</Link> */}
		</>
	)
}

export default AuthLinks