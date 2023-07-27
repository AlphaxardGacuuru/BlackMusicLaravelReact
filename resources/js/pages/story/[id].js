import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import Story from "@/components/Story/Story"

const StoryShow = (props) => {
	let { id } = useParams()

	const storyScroller = useRef()

	useEffect(() => {
		props.get("stories", props.setStories, "stories")

		// Scroll Karaoke to current one
		var storyEl = document.getElementById(id)

		storyEl.scrollIntoView({ behavior: "smooth", block: "center" })
	}, [])

	return (
		<div className="row p-0">
			<div className="col-sm-4"></div>
			<div className="col-sm-4 m-0 p-0">
				<div
					ref={storyScroller}
					className="hidden-scroll m-0 p-0"
					style={{ scrollSnapType: "x mandatory" }}>
					{props.stories.map((story, key) => (
						<Story
							{...props}
							key={key}
							story={story}
							stories={props.stories}
							storyScroller={storyScroller}
						/>
					))}
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default StoryShow
