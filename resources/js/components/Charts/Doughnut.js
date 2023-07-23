import React, { useEffect, useRef } from "react"

const Doughnut = (props) => {
	const ctx = useRef()

	const config = {
		type: "doughnut",
		options: { cutout: "90%", radius: "100%" },
		data: {
			labels: props.labels,
			datasets: [
				{
					// label: "My First Dataset",
					data: props.data,
					backgroundColor: props.backgroundColor,
					borderColor: "#232323",
					borderWidth: 1,
					hoverOffset: 4,
				},
			],
		},
	}

	useEffect(() => {
		new Chart(ctx.current, config)
	}, [])

	return (
		<div
			className="p-2"
			style={{ width: "20em", height: "20em" }}>
			<canvas ref={ctx}></canvas>
		</div>
	)
}

export default Doughnut
