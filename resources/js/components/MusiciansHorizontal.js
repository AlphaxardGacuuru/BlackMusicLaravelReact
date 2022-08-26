import React from 'react'
import { Link } from 'react-router-dom'

import Img from '../components/Img'
import Button from '../components/Button'

import CheckSVG from '../svgs/CheckSVG'

const MusiciansHorizontal = (props) => {
	return (
		<div className='d-flex justify-content-between'>
			<div className='p-2'>
				<Link to={`/profile/${props.user.username}`}>
					<Img
						src={props.user.pp}
						imgClass="rounded-circle"
						width="30px"
						height="30px"
						alt="user" />
					<b className="ml-2">{props.user.name}</b>
					<small><i>{props.user.username}</i></small>
				</Link>
			</div>
			<div className="p-2">

				{/* Check whether user has bought at least one song from user */}
				{/* Check whether user has followed user and display appropriate button */}
				{props.user.hasBought1 || props.auth.username == "@blackmusic" ?
					props.user.hasFollowed ?
						<button
							className={'btn float-right rounded-0 text-light'}
							style={{ backgroundColor: "#232323" }}
							onClick={() => props.onFollow(props.user.username)}>
							Followed
							<CheckSVG />
						</button>
						: <Button btnClass={'mysonar-btn white-btn float-right'}
							onClick={() => props.onFollow(props.user.username)}
							btnText={'follow'} />
					: <Button btnClass={'mysonar-btn white-btn float-right'}
						onClick={() =>
							props.setErrors([`You must have bought atleast one song by ${props.user.username}`])}
						btnText={'follow'} />}
			</div>
		</div>
	)
}

export default MusiciansHorizontal