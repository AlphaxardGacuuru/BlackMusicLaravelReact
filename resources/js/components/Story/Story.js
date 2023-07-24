import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import Axios from "axios"

import Img from "@/components/Core/Img"

import CloseSVG from "@/svgs/CloseSVG"
import StoryProgressBar from "./StoryProgressBar"

const Story = (props) => {
	const router = useHistory()

	const [timer, setTimer] = useState()
	const [sendSeenAt, setSendSeenAt] = useState()
	const [hasMuted, setHasMuted] = useState(props.story.hasMuted)
	const [segment, setSegment] = useState(0)
	const [freeze, setFreeze] = useState(true)
	const [handleTimer, setHandleTimer] = useState()

	/*
	 * Mark story as seen */
	useEffect(() => {
		if (sendSeenAt) {
			Axios.post(`/api/stories/seen/${props.story.id}`)
		}
	}, [sendSeenAt])

	/*
	 * Mute stories from user */
	const onMute = () => {
		// Change state
		setHasMuted(!hasMuted)

		Axios.post(`/api/stories/mute/${props.story.username}`, {
			_method: "PUT",
		})
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err, true))
	}

	/*
	 * Freeze and Unfreeze story */
	const onFreeze = () => {
		setFreeze(!freeze)

		if (freeze) {
			setTimer(timer)
			clearInterval(timer)
		} else {
			handleTimer()
		}
	}

	/*
	 * Delete story */
	const onDelete = () => {
		Axios.delete(`/api/stories/${props.story.id}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Redirect to home page
				router.push("/")
			})
			.catch((err) => props.getErrors(err))
	}

	console.log("render")
	return (
		<span
			id={props.story.id}
			className="single-story">
			<div
				style={{ height: "100vh", width: "auto" }}
				onClick={onFreeze}>
				{Object.keys(props.story.media[segment]) == "image" ? (
					<Img
						src={`/storage/${props.story.media[segment]["image"]}`}
						layout="fill"
					/>
				) : (
					<video
						width="495px"
						height="880px"
						controls={false}
						controlsList="nodownload"
						autoPlay>
						<source
							src={`/storage/${props.story.media[segment]["video"]}`}
							type="video/mp4"
						/>
					</video>
				)}
			</div>

			{/* Floating Video Info Top */}
			<div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
				<StoryProgressBar
					story={props.story}
					stories={props.stories}
					storyScroller={props.storyScroller}
					setSendSeenAt={setSendSeenAt}
					setTimer={setTimer}
					segment={segment}
					setSegment={setSegment}
					setHandleTimer={setHandleTimer}
				/>
				<div className="d-flex justify-content-between">
					{/* Close Icon */}
					<div className="">
						<Link
							to="/"
							style={{ fontSize: "1.5em" }}>
							<CloseSVG />
						</Link>
					</div>
					{/* Close Icon End */}
					{/* Name */}
					<div className="px-2">
						<h6
							className="m-0 pt-2 px-1"
							style={{
								width: "15em",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "clip",
							}}>
							{props.story.name}
						</h6>
						<h6>
							<small>{props.story.username}</small>
						</h6>
					</div>
					{/* Name End */}
					{/* Options */}
					{/* Avatar */}
					<div
						className="py-2 me-3"
						style={{ minWidth: "40px" }}>
						<div className="dropdown-center">
							<a
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={(e) => {
									e.preventDefault()
									onFreeze()
								}}>
								<Img
									src={props.story.avatar}
									className="rounded-circle"
									width="40px"
									height="40px"
									alt="user"
									loading="lazy"
								/>
							</a>
							{/* Avatar End */}
							{/* View Profile */}
							<div
								style={{ backgroundColor: "#232323" }}
								className="dropdown-menu rounded-0 m-0 p-0">
								<Link
									to={`/profile/show/${props.story.username}`}
									className="pt-2 dropdown-item border-bottom border-dark">
									<h6>View profile</h6>
								</Link>
								{/* View Profile End */}
								{/* Message */}
								{props.story.username != props.auth?.username && (
									<Link
										href={`/chat/${props.story.username}`}
										className="dropdown-item border-bottom border-dark">
										<h6>Message</h6>
									</Link>
								)}
								{/* Message End */}
								{/* Mute */}
								{props.story.username != props.auth?.username && (
									<a
										href="#"
										className="dropdown-item border-bottom border-dark"
										onClick={onMute}>
										<h6>{hasMuted ? "Unmute" : "Mute"}</h6>
									</a>
								)}
								{/* Mute End */}
								{/* Delete */}
								{props.story.username == props.auth?.username && (
									<a
										href="#"
										className="dropdown-item border-bottom border-dark"
										onClick={onDelete}>
										<h6>Delete</h6>
									</a>
								)}
								{/* Delete End */}
							</div>
						</div>
					</div>
					{/* Options End */}
				</div>
				{/* Click fields */}
				<div className="d-flex justify-content-between">
					<div
						className="p-3"
						style={{ minHeight: "90vh" }}
						onClick={() => {
							// setSegment(segment - 1)
							console.log("2 segment is " + segment)
						}}>
						<span className="invisible">left</span>
					</div>
					<div
						className="p-3"
						style={{ minHeight: "90vh" }}
						onClick={onFreeze}>
						<span className="invisible">center center</span>
					</div>
					<div
						className="p-3"
						style={{ minHeight: "90vh" }}
						onClick={() => {
							// setSegment(segment + 1)
							console.log("3 segment is " + segment)
						}}>
						<span className="invisible">right</span>
					</div>
				</div>
				{/* Click fields End */}
			</div>
			{/* Floating Video Info Top End */}
		</span>
	)
}

export default Story
