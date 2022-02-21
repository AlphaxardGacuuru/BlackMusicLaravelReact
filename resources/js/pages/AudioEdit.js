import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Button from '../components/Button'
import Img from '../components/Img'

const AudioEdit = (props) => {

	let { id } = useParams();

	// Get Audio Album info
	const editAudio = props.audios.find((audio) => audio.id == id)

	// Declare states
	const [name, setName] = useState("")
	const [ft, setFt] = useState("")
	const [album, setAlbum] = useState("")
	const [genre, setGenre] = useState("")
	const [released, setReleased] = useState("")
	const [description, setDescription] = useState("")
	const [preview, setPreview] = useState()
	const [thumbnail, setThumbnail] = useState()

	// Assign id to element
	const mediaInput = React.useRef(null)

	// Fire when image is choosen
	var onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			var img = event.target.files[0];
			setThumbnail(img)
			setPreview(URL.createObjectURL(img))
		}
	};

	// Declare new FormData object for form data
	const formData = new FormData();

	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		formData.append("thumbnail", thumbnail);
		formData.append("name", name);
		formData.append("ft", ft);
		formData.append("album", album);
		formData.append("genre", genre);
		formData.append("released", released);
		formData.append("description", description);
		formData.append("_method", 'put');

		// Send data to AudiosController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/audios/${id}`, formData)
				.then((res) => {
					props.setMessage(res.data)
					axios.get(`${props.url}/api/audios`).then((res) => props.setAudios(res.data))
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
					<h2 style={{ color: "rgba(255, 255, 255, 0.1)" }}>Studio</h2>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="contact-form text-center call-to-action-content wow fadeInUp" data-wow-delay="0.5s">
								<h2>Edit Audio</h2>
								{editAudio &&
									<div className="d-flex p-2">
										<div
											className="thumbnail"
											style={{
												width: "50px",
												height: "50px"
											}}>
											<Img src={`/storage/${editAudio.thumbnail}`}
												width="100%"
												height="50px" />
										</div>
										<div className="mr-auto pl-2">
											<h6
												className="mb-0 pb-0"
												style={{
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "clip"
												}}>
												{editAudio.name}
											</h6>
											<h6 className="pl-2 mt-0 pt-0">
												<small>{editAudio.username}</small>
												<small className="ml-1">{editAudio.ft}</small>
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
											placeholder="Audio name"
											onChange={(e) => { setName(e.target.value) }} />
										<br />
										<br />

										<label htmlFor="" className="text-light">
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
											<option value defaultValue>Select Album</option>
											<option value="">Single</option>
											{props.audioAlbums
												.filter((audioAlbum) => audioAlbum.username == props.auth.username)
												.map((audioAlbum, key) => (
													<option
														key={key}
														value={audioAlbum.id}
														className="bg-dark text-light">
														{audioAlbum.name}
													</option>
												))}
										</select>
										<br />
										<br />

										<select
											name='genre'
											className='form-control'
											placeholder='Select audio genre'
											onChange={(e) => { setGenre(e.target.value) }}>
											<option defaultValue>Select Genre</option>
											<option value="Afro" className="bg-dark text-light">Afro</option>
											<option value="Benga" className="bg-dark text-light">Benga</option>
											<option value="Blues" className="bg-dark text-light">Blues</option>
											<option value="Boomba" className="bg-dark text-light">Boomba</option>
											<option value="Country" className="bg-dark text-light">Country</option>
											<option value="Cultural" className="bg-dark text-light">Cultural</option>
											<option value="EDM" className="bg-dark text-light">EDM</option>
											<option value="Genge" className="bg-dark text-light">Genge</option>
											<option value="Gospel" className="bg-dark text-light">Gospel</option>
											<option value="Hiphop" className="bg-dark text-light">Hiphop</option>
											<option value="Jazz" className="bg-dark text-light">Jazz</option>
											<option value="Music of Kenya" className="bg-dark text-light">Music of Kenya</option>
											<option value="Pop" className="bg-dark text-light">Pop</option>
											<option value="R&B" className="bg-dark text-light">R&B</option>
											<option value="Rock" className="bg-dark text-light">Rock</option>
											<option value="Sesube" className="bg-dark text-light">Sesube</option>
											<option value="Taarab" className="bg-dark text-light">Taarab</option>
										</select>
										<br />
										<br />

										<label className="text-light">Released</label>

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
											onChange={(e) => { setDescription(e.target.value) }}>
										</textarea>

										<label className="text-light">Upload Audio Thumbnail</label>
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

										<button type="reset" className="sonar-btn">reset</button>
										<br />
										<br />

										<Button btnText="edit audio" />
									</form>
									<br />
									<Link to="/audios" className="btn sonar-btn btn-2">studio</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AudioEdit
