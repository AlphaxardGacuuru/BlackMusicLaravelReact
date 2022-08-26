import React from 'react'

const LoadingMusiciansHorizontal = () => {
	return (
		<div className='media p-2'>
			<div className='media-left'>
				<div className="rounded-circle" style={{ width: "30px", height: "30px" }}></div>
			</div>
			<div className='media-body'>
				<b className="bg-light gradient" style={{ color: "#232323" }}>namename</b>
				<small className="bg-light text-light gradient ml-1">
					<i style={{ color: "#232323" }}>usernameusename</i>
				</small>
				<button className="btn float-right rounded-0 text-light"
					style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}></button>
			</div>
		</div>
	)
}

export default LoadingMusiciansHorizontal