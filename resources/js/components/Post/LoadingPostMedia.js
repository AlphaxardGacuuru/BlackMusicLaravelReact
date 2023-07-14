const LoadingPostMedia = () => {
	return (
		<div className="d-flex mb-3">
			<div className="p-2">
				<div className="gradient rounded-circle"
					style={{
						width: "3.5em",
						height: "3.5em"
					}}>
				</div>
			</div>
			<div className="flex-grow-1 p-2">
				<div className="p-1 flex-grow-1">
					<h6 className="loading-text gradient w-100"
						style={{ color: "#232323" }}>
						video
					</h6>
				</div>
				<p className="my-2 loading-text gradient w-100 h-50" style={{ color: "#232323" }}>post.text</p>

				<h6 className="loading-text gradient w-50 mt-3"
					style={{ color: "#232323" }}>
					content
				</h6>
			</div>
		</div>
	)
}

export default LoadingPostMedia