import React from "react"
import { HashRouter as Router, Route } from "react-router-dom"

const R = ({ p, c }) => {
	return <Route path={p} exact render={() => c} />
}

export default R
