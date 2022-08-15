import React, { useState, useEffect, useRef } from 'react'

import Karaoke from '../components/Karaoke'

const KaraokeShow = (props) => {

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
								karaoke={karaoke}
								karaokes={props.karaokes}
								setKaraokes={props.setKaraokes}
							/>
						))}
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default KaraokeShow