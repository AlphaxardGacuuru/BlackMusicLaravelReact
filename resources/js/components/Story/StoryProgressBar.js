import { useEffect, useState } from "react"

const StoryProgressBar = (props) => {
	const [percent, setPercent] = useState("0%")

	/*
	 * Intersection Observer API
	 */

	var t
	var time = 0
	var index = 0

	// Set options
	let options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.9,
	}

	useEffect(() => {
		setTimeout(() => {
			let observer = new IntersectionObserver(callback, options)

			const storyEl = document.getElementById(props.story.id)

			observer.observe(storyEl)
		}, 500)

		return () => clearInterval(t)
	}, [])

	/*
	 * Intersection Observer API Callback function */
	let callback = (entries, observer) => {
		if (entries != "undefined") {
			entries.forEach((entry) => {
				// Start or Clear progress bar
				if (entry.isIntersecting) {
					time = 0
					props.setSegment(0)
					handleTimer()
				} else {
					// Use t instead of timer to prevent rerendering
					clearInterval(t)
					setPercent("0%")
				}
			})
		}
	}

	/*
	 * Handle Timer */
	const handleTimer = () => {
		t = setInterval(() => {
			// Stop incrementing after 5s (50 because its deciseconds)
			if (time < 55) {
				handleProgressBar()
			} else {
				// Go to next story segment
				const length = props.story.media.length
				const length2 = length - 1

				if (props.segment < length2 && length > 1) {
					props.setSegment(props.segment + 1)
					time = 0
				} else {
					scrollToNextStory()
				}
			}
		}, 100)

		props.setTimer(t)
	}

	/*
	 * Function for incrementing progress bar */
	const handleProgressBar = () => {
		// Increment time by 1
		time++
		// Get percentage
		var per = (time * 100) / 50
		// Format percentage for style
		per = per + "%"
		// Set percent for showing on bar
		setPercent(per)

		if (time > 30) {
			props.setSendSeenAt(true)
		}
	}

	/*
	 * Function for scrolling to next story */
	const scrollToNextStory = () => {
		clearInterval(t)

		// Get index of current story in array
		index = props.stories.indexOf(props.story)
		// Increment to get the next story if there are still some
		if (index < props.stories.length - 1) {
			index++
		}
		// Get ID of the story
		var nextIndex = props.stories[index].id
		// Get the Element of the story
		var storyEl = document.getElementById(nextIndex)
		// Get left offset of the element inorder to know how far to scroll
		var left = storyEl.offsetLeft
		// Scroll to next story element
		props.storyScroller.current.scrollTo({
			top: 0,
			left: left,
			behavior: "smooth",
		})
	}

	useEffect(() => {
		setTimeout(() => props.setHandleTimer(() => handleTimer), 500)
	}, [])

	return (
		<div className="d-flex">
			{/* Track */}
			{props.story.media.map((story, key) => (
				<div key={key} className="w-100 pt-2 mx-2">
					<div className="progress rounded-0" style={{ height: "2px" }}>
						<div
							className="progress-bar bg-warning"
							style={{ width: props.segment == key ? percent : 0 }}></div>
					</div>
				</div>
			))}
			{/* Track End */}
		</div>
	)
}

export default StoryProgressBar
