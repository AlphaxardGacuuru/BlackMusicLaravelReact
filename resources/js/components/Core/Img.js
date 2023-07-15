import React from "react"

const Img = ({ src, width, height, imgClass, style, alt }) => {
	return (
		<div className="d-flex justify-content-center position-relative m-0 p-0"
			style={{ width: width, height: height }}>
			<img
				src={src}
				layout="fill"
				className={imgClass}
				style={style}
				alt={alt}
				loading="lazy" />
		</div>
	)
}

Img.defaultProps = {
	src: '/storage/img/musical-note.png',
	alt: 'image'
}

export default Img