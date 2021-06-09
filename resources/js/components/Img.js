import React from 'react'

const Img = ({ src, width, height, imgClass, alt }) => {
	return (
		<img src={src} width={width} height={height} className={imgClass} alt={alt} loading="lazy" />
	)
}

Img.defaultProps = {
	alt: 'image',
}

export default Img
