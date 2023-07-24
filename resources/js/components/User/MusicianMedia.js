import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import Axios from "axios"

import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"

import CheckSVG from "@/svgs/CheckSVG"

const MusiciansMedia = (props) => {
	const [hasFollowed, setHasFollowed] = useState(props.user.hasFollowed)

	useEffect(() => {
		// Set new cart with data with auth
		setHasFollowed(props.user.hasFollowed)
	}, [props.user])

	/*
	 * Function for Following user */
	const onFollow = (props) => {
		// Change state
		setHasFollowed(!hasFollowed)

		Axios.post(`/api/follows`, { musician: props.user.username })
			.then((res) => {
				props.setMessages([res.data.message])
				// Update artists
				props.get("artists", props.setArtists, "artists")
				// Update posts
				props.get("posts", props.setPosts, "posts")
			})
			.catch((err) => props.getErrors(err, true))
	}

	return (
		<div className="d-flex">
			<div className="p-2">
				<Link to={`/profile/show/${props.user.username}`}>
					<Img
						src={props.user.avatar}
						className="rounded-circle"
						width="30px"
						height="30px"
						alt="user"
						loading="lazy"
					/>
				</Link>
			</div>
			<div
				className="p-2"
				style={{ width: "50%" }}>
				<Link to={`/profile/show/${props.user.username}`}>
					<div
						style={{
							// width: "50%",
							// whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip",
						}}>
						<b className="ml-2">{props.user.name}</b>
						<small>
							<i>{props.user.username}</i>
						</small>
					</div>
				</Link>
			</div>
			<div className="p-2 text-end flex-grow-1">
				{/* Check whether user has bought at least one song from user */}
				{/* Check whether user has followed user and display appropriate button */}
				{props.user.hasBought1 || props.auth?.username == "@blackmusic" ? (
					hasFollowed ? (
						<Btn
							btnClass="mysonar-btn btn-2"
							btnStyle={{ lineHeight: "20px" }}
							onClick={() => {
								setHasFollowed(!hasFollowed)
								onFollow(props, props.user.username)
							}}
							btnText={
								<span>
									Followed
									<span
										className="fs-6"
										style={{ lineHeight: "10px" }}>
										<CheckSVG />
									</span>
								</span>
							}
						/>
					) : (
						<Btn
							btnClass="mysonar-btn white-btn float-right"
							onClick={() => {
								setHasFollowed(!hasFollowed)
								onFollow(props, props.user.username)
							}}
							btnText="follow"
						/>
					)
				) : (
					<Btn
						btnClass={"mysonar-btn white-btn float-right"}
						onClick={() =>
							props.setErrors([
								`You must have bought atleast one song by ${props.user.username}`,
							])
						}
						btnText="follow"
					/>
				)}
			</div>
		</div>
	)
}

export default MusiciansMedia
