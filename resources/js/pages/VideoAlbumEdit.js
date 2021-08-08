import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Button from '../components/Button'
import Img from '../components/Img'

const VideoAlbumEdit = (props) => {

	let { id } = useParams();

	// Get Audio Album info
	const editAlbum = props.videoAlbums.find((videoAlbum) => videoAlbum.id == id)

	// Arrays for dates
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// Declare states
	const [name, setName] = useState("")
	const [released, setReleased] = useState("")
	const [preview, setPreview] = useState()
	const [cover, setCover] = useState()

	// Assign id to element
	const mediaInput = React.useRef(null)

	// Declare new FormData object for form data
	const formData = new FormData();

	// Fire when image is choosen
	var onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			var img = event.target.files[0];
			setCover(img)
			setPreview(URL.createObjectURL(img))
		}
	};

	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		formData.append("name", name);
		formData.append("released", released);
		cover && formData.append("cover", cover);
		formData.append("_method", 'put');

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/video-albums/${id}`, formData)
				.then((res) => {
					props.setMessage(res.data)
					axios.get(`${props.url}/api/video-albums`).then((res) => props.setVideoAlbums(res.data))
					setPreview()
				}).catch(err => {
					const resErrors = err.response.data.errors
					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					props.setErrors(newError)
				})
		})
	}

	return (
		<div>
			{/* < !--Preloader Start-- > */}
			<div id="preloader">
				<div className="preload-content">
					<div id="sonar-load"></div>
				</div>
			</div>
			{/* <!--Preloader End-- > */}

			{/* <!-- ***** Call to Action Area Start ***** --> */}
			<div className="sonar-call-to-action-area section-padding-0-100">
				<div className="backEnd-content">
					<h2>Studio</h2>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="contact-form text-center call-to-action-content wow fadeInUp" data-wow-delay="0.5s">
								<h2>Edit Video Album</h2>
								{editAlbum &&
									<div className="d-flex">
										<div className="p-2">
											<Img src={`/storage/${editAlbum.cover}`}
												width="auto"
												height="100"
												alt={"album cover"} />
										</div>
										<div className="p-2">
											<small>Video Album</small>
											<h1>{editAlbum.name}</h1>
											<h6>
												{new Date(editAlbum.created_at).getDay()}
												{" " + months[new Date(editAlbum.created_at).getMonth()]}
												{" " + new Date(editAlbum.created_at).getFullYear()}
											</h6>
										</div>
									</div>}
								<br />
								<div className="form-group">
									<form onSubmit={onSubmit}>

										<input
											type="text"
											name="name"
											className="form-control"
											placeholder="Name"
											onChange={(e) => { setName(e.target.value) }} />
										<br />
										<br />

										<label>Released</label>
										<input
											type="date"
											name="released"
											className="form-control"
											placeholder="Released"
											onChange={(e) => { setReleased(e.target.value) }} />
										<br />
										<br />

										<label>Upload Album Cover</label>
										<div
											className="mb-2"
											style={{
												borderTopLeftRadius: "10px",
												borderTopRightRadius: "10px",
												borderBottomRightRadius: "10px",
												borderBottomLeftRadius: "10px",
												overflow: "hidden"
											}}>

											<img
												src={preview}
												width="100%"
												height="auto" />
										</div>

										{/* Hidden file input */}
										<input
											type='file'
											style={{ display: 'none' }}
											ref={mediaInput}
											onChange={onImageChange} />

										<div
											className="p-2"
											style={{ backgroundColor: "#232323", color: "white" }}
											onClick={() => mediaInput.current.click()}>
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
												className="bi bi-image" viewBox="0 0 16 16">
												<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
												<path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
											</svg>
										</div>
										<br />
										<br />

										<Button type="submit" btnClass="sonar-btn" btnText="edit album" />
										<br />
										<br />

										<Link to="/videos" className="btn sonar-btn">studio</Link>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoAlbumEdit
