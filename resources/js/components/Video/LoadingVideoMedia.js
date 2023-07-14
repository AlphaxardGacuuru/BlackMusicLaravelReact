const LoadingVideoMedia = () => {
	return (
		<span className="mx-2 pt-0 px-0 pb-2">
			<div className="video-thumbnail">
				<div className="gradient"
					style={{
						width: "320em",
						height: "180em"
					}}>
				</div>
			</div>
			<div className="d-flex">
				<div className="p-1">
					<div className="gradient rounded-circle"
						style={{
							width: "3em",
							height: "3em"
						}}>
					</div>
				</div>
				<div className="p-1 flex-grow-1">
					<h6 className="loading-text gradient w-75"
						style={{ width: "150px", color: "#232323" }}>
						video
					</h6>
					<h6
						className="loading-text gradient w-50"
						style={{ color: "#232323" }}>
						username
					</h6>
				</div>
			</div>
		</span>
	)
}

export default LoadingVideoMedia