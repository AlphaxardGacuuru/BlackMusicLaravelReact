import React from 'react'

import Button from '../components/Button'

const Polls = (props) => {

	// Function for voting in poll
	const onPoll = (post, parameter) => {
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`/api/polls`, {
				post: post,
				parameter: parameter
			}).then((res) => {
				props.setMessages([res.data])
				// Update posts
				axios.get(`/api/posts`)
					.then((res) => props.setPosts(res.data))
			}).catch((err) => {
				const resErrors = err.response.data.errors
				var resError
				var newError = []
				for (resError in resErrors) {
					newError.push(resErrors[resError])
				}
				// Get other errors
				newError.push(err.response.data.message)
				props.setErrors(newError)
			})
		})
	}
	return (
		<>
			{/* Show poll */}
			{props.post.parameter_1 ?
				props.post.isWithin24Hrs ?
					props.post.hasVoted1 ?
						<Button
							btnClass={"mysonar-btn poll-btn btn-2 mb-1"}
							btnText={props.post.parameter_1}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_1)} />
						: <Button
							btnClass={"mysonar-btn poll-btn white-btn mb-1"}
							btnText={props.post.parameter_1}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_1)} />
					: props.post.hasVoted1 ?
						<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage1}%`,
									backgroundColor: "#232323"
								}}>
								{props.post.parameter_1}
							</div>
						</div>
						: <div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage1}%`,
									backgroundColor: "grey"
								}}>
								{props.post.parameter_1}
							</div>
						</div>
				: ""}

			{props.post.parameter_2 ?
				props.post.isWithin24Hrs ?
					props.post.hasVoted2 ?
						<Button
							btnClass={"mysonar-btn poll-btn mb-1 btn-2"}
							btnText={props.post.parameter_2}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_2)} />
						: <Button
							btnClass={"mysonar-btn poll-btn white-btn mb-1"}
							btnText={props.post.parameter_2}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_2)} />
					: props.post.hasVoted2 ?
						<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage2}%`,
									backgroundColor: "#232323"
								}}>
								{props.post.parameter_2}
							</div>
						</div>
						: <div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage2}%`,
									backgroundColor: "grey"
								}}>
								{props.post.parameter_2}
							</div>
						</div>
				: ""}

			{props.post.parameter_3 ?
				props.post.isWithin24Hrs ?
					props.post.hasVoted3 ?
						<Button
							btnClass={"mysonar-btn poll-btn mb-1 btn-2"}
							btnText={props.post.parameter_3}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_3)} />
						: <Button
							btnClass={"mysonar-btn poll-btn white-btn mb-1"}
							btnText={props.post.parameter_3}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_3)} />
					: props.post.hasVoted3 ?
						<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage3}%`,
									backgroundColor: "#232323"
								}}>
								{props.post.parameter_3}
							</div>
						</div>
						: <div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage3}%`,
									backgroundColor: "grey"
								}}>
								{props.post.parameter_3}
							</div>
						</div>
				: ""}

			{props.post.parameter_4 ?
				props.post.isWithin24Hrs ?
					props.post.hasVoted4 ?
						<Button
							btnClass={"mysonar-btn poll-btn mb-1 btn-2"}
							btnText={props.post.parameter_4}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_4)} />
						: <Button
							btnClass={"mysonar-btn poll-btn white-btn mb-1"}
							btnText={props.post.parameter_4}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_4)} />
					: props.post.hasVoted4 ?
						<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage4}%`,
									backgroundColor: "#232323"
								}}>
								{props.post.parameter_4}
							</div>
						</div>
						: <div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage4}%`,
									backgroundColor: "grey"
								}}>
								{props.post.parameter_4}
							</div>
						</div>
				: ""}

			{props.post.parameter_5 ?
				props.post.isWithin24Hrs ?
					props.post.hasVoted5 ?
						<Button
							btnClass={"mysonar-btn poll-btn mb-1 btn-2"}
							btnText={props.post.parameter_5}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_5)} />
						: <Button
							btnClass={"mysonar-btn poll-btn white-btn mb-1"}
							btnText={props.post.parameter_5}
							btnStyle={{ width: "100%" }}
							onClick={() => onPoll(props.post.id, props.post.parameter_5)} />
					: props.post.hasVoted5 ?
						<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage5}%`,
									backgroundColor: "#232323"
								}}>
								{props.post.parameter_5}
							</div>
						</div> :
						<div className='progress rounded-0 mb-1' style={{ height: '33px' }}>
							<div className='progress-bar'
								style={{
									width: `${props.post.percentage5}%`,
									backgroundColor: "grey"
								}}>
								{props.post.parameter_5}
							</div>
						</div>
				: ""}

			{/* Total votes */}
			{props.post.parameter_1 ?
				props.post.username == props.auth.username || !props.post.isWithin24Hrs ?
					<small style={{ color: "grey" }}>
						<i>Total votes: {props.post.totalVotes}</i>
						<br />
					</small> : ""
				: ""}
		</>
	)
}

export default Polls