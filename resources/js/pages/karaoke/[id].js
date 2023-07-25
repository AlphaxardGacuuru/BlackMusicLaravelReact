import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Karaoke from "@/components/Karaoke/Karaoke"

const KaraokeShow = (props) => {
	let { id } = useParams()

	const [karaokes, setKaraokes] = useState([])

	useEffect(() => {
		props.get("karaokes", setKaraokes)

		// Scroll Karaoke to current one
		var karaokeEl = document.getElementById(id)

		karaokeEl && karaokeEl.scrollIntoView()
	}, [])

	return (
		<div className="row p-0">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="karaokes">
					{karaokes.map((karaoke, key) => (
						<Karaoke
							{...props}
							id={karaoke.id}
							key={key}
							karaoke={karaoke}
							karaokes={karaokes}
							setKaraokes={setKaraokes}
						/>
					))}
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default KaraokeShow
