import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

const MyRoute = ({ path, page }) => {
	return <Route path={path} exact render={(props) => page} />
}

export default MyRoute
