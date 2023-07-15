import React from "react"

const AudioPlayer = (props) => {
	return (
		<audio
			onTimeUpdate={(e) => {
				props.audioStates.updateProgress()
				props.audioStates.setCurrentTime(e.target.currentTime)
				props.setLocalStorage("show", {
					id: props.audioStates.show.id,
					time: props.audioStates.currentTime,
				})
			}}
			onCanPlay={(e) => props.audioStates.setDur(e.target.duration)}
			ref={props.audioStates.audioEl}
			type="audio/*"
			preload="true"
			// autoPlay={true}
			src={props.audioStates.audio?.audio}
		/>
	)
}

export default AudioPlayer
