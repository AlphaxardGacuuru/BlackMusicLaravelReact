import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Button from '../components/Button'
import Img from '../components/Img'

const VideoEdit = (props) => {

	let { id } = useParams();

	// Get Audio Album info
	const editVideo = props.videos.find((video) => video.id == id)

	// Declare states
	const [name, setName] = useState("")
	const [ft, setFt] = useState("")
	const [album, setAlbum] = useState("")
	const [genre, setGenre] = useState("")
	const [released, setReleased] = useState("")
	const [description, setDescription] = useState("")

	// Declare new FormData object for form data
	const formData = new FormData();

	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		formData.append("name", name);
		formData.append("ft", ft);
		formData.append("album", album);
		formData.append("genre", genre);
		formData.append("released", released);
		formData.append("description", description);
		formData.append("_method", 'put');

		// Send data to VideosController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/videos/${id}`, formData)
				.then((res) => {
					props.setMessage(res.data)
					axios.get(`${props.url}/api/videos`).then((res) => props.setVideos(res.data))
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
			{/* <!-- Preloader Start --> */}
			<div id="preloader">
				<div className="preload-content">
					<div id="sonar-load"></div>
				</div>
			</div>
			{/* <!-- Preloader End --> */}

			{/* <!-- Grids --> */}
			<div className="grids d-flex justify-content-between">
				<div className="grid1"></div>
				<div className="grid2"></div>
				<div className="grid3"></div>
				<div className="grid4"></div>
				<div className="grid5"></div>
				<div className="grid6"></div>
				<div className="grid7"></div>
				<div className="grid8"></div>
				<div className="grid9"></div>
			</div>

			{/* <!-- ***** Call to Action Area Start ***** --> */}
			<div className="sonar-call-to-action-area section-padding-0-100">
				<div className="backEnd-content">
					<h2>Studio</h2>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="contact-form text-center call-to-action-content wow fadeInUp" data-wow-delay="0.5s">
								<h2>Edit Video</h2>
								{editVideo &&
									<div className="d-flex p-2">
										<div className="thumbnail">
											<Img
												src={editVideo.thumbnail}
												width="160em"
												height="90em" />
										</div>
										<div className="ml-1">
											<h6 className="m-0 pr-1"
												style={{
													width: "150px",
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "clip"
												}}>
												{editVideo.name}
											</h6>
											<h6 className="mt-0 mb-2 pt-0 pr-1 pb-0">
												<small>{editVideo.username}</small>
												<small className="ml-1">{editVideo.ft}</small>
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
											placeholder="Video name"
											onChange={(e) => { setName(e.target.value) }} />
										<br />
										<br />

										<label htmlFor="">
											Featuring Artist
											<b className="text-danger"> (MUST HAVE AN ACCOUNT!)</b>
										</label>
										<input
											type="text"
											name="ft"
											className="form-control"
											placeholder="Featuring Artist e.g. @JohnDoe"
											onChange={(e) => { setFt(e.target.value) }} />
										<br />
										<br />

										<select
											name='album'
											className='form-control'
											onChange={(e) => { setAlbum(e.target.value) }}>
											{props.videoAlbums
												.filter((videoAlbum) => videoAlbum.username == props.auth.username)
												.map((videoAlbum, key) => (
													<option key={key} value={videoAlbum.id}>{videoAlbum.name}</option>
												))}
										</select>
										<br />
										<br />

										<select
											name='genre'
											className='form-control'
											placeholder='Select video genre'
											onChange={(e) => { setGenre(e.target.value) }}>
											<option value="Afro">Afro</option>
											<option value="Benga">Benga</option>
											<option value="Blues">Blues</option>
											<option value="Boomba">Boomba</option>
											<option value="Country">Country</option>
											<option value="Cultural">Cultural</option>
											<option value="EDM">EDM</option>
											<option value="Genge">Genge</option>
											<option value="Gospel">Gospel</option>
											<option value="Hiphop">Hiphop</option>
											<option value="Jazz">Jazz</option>
											<option value="Music of Kenya">Music of Kenya</option>
											<option value="Pop">Pop</option>
											<option value="R&B">R&B</option>
											<option value="Rock">Rock</option>
											<option value="Sesube">Sesube</option>
											<option value="Taarab">Taarab</option>
										</select>
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

										<textarea
											type="text"
											name="description"
											className="form-control"
											placeholder="Say something about your song"
											cols="30"
											rows="10"
											onChange={(e) => { setDescription(e.target.value) }}></textarea>
										<br />
										<br />

										<button type="reset" className="sonar-btn">reset</button>
										<br />
										<br />
										<Button btnText="edit video" />
									</form>
									<br />
									<Link to="/videos" className="btn sonar-btn btn-2">studio</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}

export default VideoEdit
