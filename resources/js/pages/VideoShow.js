import React from 'react'
import { Link, useParams } from "react-router-dom";
import Img from '../components/Img'
import Button from '../components/Button'
import axios from 'axios'

const VideoShow = () => {

	let { video } = useParams();
	console.log(video)

	return (
		<div>
			
		</div>
	)
}

export default VideoShow
