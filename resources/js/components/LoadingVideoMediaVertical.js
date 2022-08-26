import React from 'react'

const VerticalMediaVertical = () => {
	return (
		<span className="pt-0 px-0 pb-2">
			<div className="thumbnail">
				<div className="gradient" style={{ width: "160em", height: "90em" }}></div>
			</div>
			<h6 className="m-0 mt-1 pt-2 px-1 gradient w-75"
				style={{
					width: "150px",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "clip",
					color: "#232323"
				}}>
				video
			</h6>
			<h6
				className="mt-1 mx-1 mb-2 px-1 py-0 gradient w-50"
				style={{ color: "#232323" }}>
				username
			</h6>
			<button
				className="btn mb-1 rounded-0"
				style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
			</button>
			<br />
			<button
				className="btn mb-1 rounded-0"
				style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
			</button>
		</span>
	)
}

export default VerticalMediaVertical