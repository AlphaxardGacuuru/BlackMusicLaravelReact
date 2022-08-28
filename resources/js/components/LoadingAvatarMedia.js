import React from 'react'

const LoadingAvatar = () => {
	return (
		<span style={{ padding: "5px" }}>
			<span className="m-0 p-0">
				<center>
					<div className="avatar-thumbnail" style={{ borderRadius: "50%" }}>
						<div
							className="bg-dark text-light gradient"
							style={{ width: "150px", height: "150px" }}>
						</div>
					</div>
					<h6 className="mt-2 mb-0 gradient"
						style={{
							width: "100px",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip",
							color: "#232323"
						}}>
						user.name
					</h6>
					<h6 className="gradient mt-1"
						style={{
							width: "100px",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "clip",
							color: "#232323"
						}}>
						user.username
					</h6>
				</center>
			</span>
		</span>
	)
}

export default LoadingAvatar