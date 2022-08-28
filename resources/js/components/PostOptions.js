import React from 'react'
import { Link } from 'react-router-dom'
import CloseSVG from '../svgs/CloseSVG'

const PostOptions = (props) => {
	return (
		<div className={props.bottomMenu} >
			<div className="bottomMenu">
				<div
					className="d-flex align-items-center justify-content-between border-bottom border-dark mb-3"
					style={{ height: "3em" }}>
					<div></div>
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon p-2 float-right"
						style={{ fontSize: "1em" }}
						onClick={() => props.setBottomMenu("")}>
						<CloseSVG />
					</div>
				</div>

				{props.unfollowLink &&
					<div
						onClick={() => {
							props.setBottomMenu("")
							props.onFollow(props.userToUnfollow)
						}}>
						<h6 className="pb-2">Unfollow {props.userToUnfollow}</h6>
					</div>}
				{props.editLink &&
					<Link
						to={`/post-edit/${props.postToEdit}`}
						onClick={() => props.setBottomMenu("")}>
						<h6 className="pb-2">Edit post</h6>
					</Link>}
				{props.deleteLink &&
					<div
						onClick={() => {
							props.setBottomMenu("")
							props.onDeletePost(props.postToEdit)
						}}>
						<h6 className="pb-2">Delete post</h6>
					</div>}
				{props.commentDeleteLink &&
					<div
						onClick={() => {
							props.setBottomMenu("")
							props.onDeleteComment(props.commentToEdit)
						}}>
						<h6 className="pb-2">Delete comment</h6>
					</div>}
			</div>
		</div>
	)
}

export default PostOptions