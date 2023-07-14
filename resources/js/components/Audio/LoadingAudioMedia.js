const LoadingAudioMedia = () => {
	return (
		<div className="d-flex p-2">
			<div
				className="audio-thumbnail gradient"
				style={{
					width: "50px",
					height: "50px"
				}}>
			</div>
			<div className="p-1 flex-grow-1">
				<h6 className="loading-text gradient w-75"
					style={{ width: "150px", color: "#232323" }}>
					audio
				</h6>
				<h6
					className="loading-text gradient w-50"
					style={{ color: "#232323" }}>
					username
				</h6>
			</div>
			<div>
				<button
					className="gradient btn mb-1 rounded-0 float-start"
					style={{ minWidth: '40px', height: '33px', backgroundColor: "#232323" }}>
				</button>
				<button
					className="gradient btn mb-1 rounded-0 float-start ms-2"
					style={{ minWidth: '90px', height: '33px', backgroundColor: "#232323" }}>
				</button>
			</div>
		</div>
	)
}

export default LoadingAudioMedia