import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Bottomnav = (props) => {
	const location = useLocation()

	return (
		<div className="row m-0 p-0">
			<br />
			<br />
			<div className="col-sm-12 m-0 p-0">
				<div className="bottomNav menu-content-area header-social-area">
					<div className="container-fluid menu-area d-flex justify-content-between">
						<Link to="/" style={{ textAlign: "center", fontSize: "10px", fontWeight: "100", color: location.pathname == "/" ? "gold" : "white" }}>
							<span style={{ fontSize: "20px", margin: "0" }} className="nav-link">
								<svg className="bi bi-house" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
									<path fillRule="evenodd"
										d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
								</svg>
							</span>
						</Link>
						<Link to="/videocharts" style={{ textAlign: "center", fontSize: "10px", fontWeight: "100", color: location.pathname == "/videocharts" ? "gold" : "white" }}>
							<span style={{ fontSize: "20px" }} className="nav-link">
								<svg className="bi bi-compass" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M8 15.016a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zm0 1a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" />
									<path
										d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1zm.94 6.44l4.95-2.83-2.83 4.95-4.95 2.83 2.83-4.95z" />
								</svg>
							</span>
						</Link>
						<Link to="/search" style={{ color: "white", textAlign: "center", fontSize: "10px", fontWeight: "100", color: location.pathname == "/search" ? "gold" : "white" }}>
							<span style={{ fontSize: "20px" }} className="nav-link">
								<svg className="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
									<path fillRule="evenodd"
										d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
								</svg>
							</span>
						</Link>
						<Link to="/cart" style={{ textAlign: "center", fontSize: "10px", fontWeight: "100", color: location.pathname == "/cart" ? "gold" : "white" }}>
							<span style={{ fontSize: "20px" }} className="nav-link">
								<svg className="bi bi-cart3" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
								</svg>
							</span>
							<span className="badge badge-danger rounded-circle"
								style={{
									fontSize: "12px",
									position: "absolute",
									right: "8em",
									top: "0.5em",
									border: "solid #232323"
								}}>
								{props.cartVideos.filter((cartVideo) => cartVideo.username == props.auth.username).length}
							</span>
						</Link>
						<Link to="/library"
							style={{ textAlign: "center", fontSize: "10px", fontWeight: "100", color: location.pathname == "/library" ? "gold" : "white" }}>
							<span style={{ fontSize: "20px" }} className="nav-link">
								<svg className="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd"
										d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
								</svg>
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Bottomnav
