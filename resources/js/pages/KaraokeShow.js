import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import Karaoke from '../components/Karaoke'

const KaraokeShow = (props) => {

	const { id } = useParams()

	const karaokeEl = document.getElementById(id)

	// Scroll Karaoke to current one
	karaokeEl && karaokeEl.scrollIntoView();

	return (
		<div className="row p-0">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="karaokes hidden-scroll">
					{props.karaokes
						.map((karaoke, key) => (
							<Karaoke
								{...props}
								key={key}
								id={karaoke.id}
								karaoke={karaoke}
								karaokes={props.karaokes}
								setKaraokes={props.setKaraokes} />
						))}
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default KaraokeShow