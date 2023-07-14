import { useState, useEffect } from "react"
import axios from "@/lib/axios"

import CommentMedia from "@/components/Core/CommentMedia"

import CloseSVG from "@/svgs/CloseSVG"
import SocialMediaInput from "../Core/SocialMediaInput"

const KaraokeCommentSection = (props) => {
	const [karaokeComments, setKaraokeComments] = useState([])
	const [deletedIds, setDeletedIds] = useState([])

	useEffect(() => {
		// Fetch Karaoke Comments
		props.get(`karaoke-comments/${props.karaoke.id}`, setKaraokeComments)
	}, [])

	// Function for liking comments
	const onCommentLike = (comment) => {
		// Add like to database
		axios
			.post(`/api/karaoke-comment-likes`, { comment: comment })
			.then((res) => {
				props.setMessages([res.data.message])
				// Update karaoke comments
				props.get("karaoke-comments", setKaraokeComments)
			})
			.catch((err) => props.getErrors(err))
	}

	// Function for deleting comments
	const onDeleteComment = (id) => {
		// Remove comment
		setDeletedIds([...deletedIds, id])

		axios
			.delete(`/api/karaoke-comments/${id}`)
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.showComments}>
			<div className="commentMenu">
				<div
					className="d-flex align-items-center justify-content-between border-bottom border-dark"
					style={{ height: "3em" }}>
					<div className="dropdown-header p-2 text-white">
						<h5>Comments</h5>
					</div>
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon p-2 float-end"
						style={{ fontSize: "1em" }}
						onClick={() => props.setShowComments("")}>
						<CloseSVG />
					</div>
				</div>

				{/* Comment Form */}
				<SocialMediaInput
					{...props}
					id={props.karaoke.id}
					placeholder="Add a comment"
					showImage={false}
					showPoll={false}
					urlTo="karaoke-comments"
					stateToUpdate={() => {
						props.get(
							`karaoke-comments/${props.karaoke.id}`,
							setKaraokeComments
						)
					}}
					editing={false}
				/>

				{/* Karaoke Comments */}
				<div className="m-0 p-0">
					<div style={{ maxHeight: "60vh", overflowY: "scroll" }}>
						{/* Get Notifications */}

						{/* <!-- Comment Section --> */}
						{karaokeComments.filter(
							(comment) => comment.karaoke_id == props.karaoke.id
						).length > 0 ? (
							karaokeComments
								.filter(
									(comment) =>
										comment.karaoke_id == props.karaoke.id &&
										!deletedIds.includes(comment.id)
								)
								.map((comment, key) => (
									<CommentMedia
										{...props}
										key={key}
										comment={comment}
										onCommentLike={onCommentLike}
										onDeleteComment={onDeleteComment}
									/>
								))
						) : (
							<center className="my-3">
								<h6 style={{ color: "grey" }}>No comments to show</h6>
							</center>
						)}
					</div>
					{/* Karaoke Comments End */}
				</div>
			</div>
		</div>
	)
}

export default KaraokeCommentSection
