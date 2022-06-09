import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

import Button from '../components/Button'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateSize
);

const AudioCreate = (props) => {

	// Declare states
	const [audio, setAudio] = useState()
	const [name, setName] = useState("")
	const [ft, setFt] = useState("")
	const [album, setAlbum] = useState("")
	const [genre, setGenre] = useState("")
	const [released, setReleased] = useState("")
	const [description, setDescription] = useState("")
	const [preview, setPreview] = useState()
	const [thumbnail, setThumbnail] = useState("")
	const [files, setFiles] = useState([])
	const [btnLoading, setBtnLoading] = useState()

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]');

	// Get history for page location
	const history = useHistory()

	// Assign id to element
	// const audioInput = React.useRef(null)
	// const mediaInput = React.useRef(null)

	// Fire when audio is choosen
	// var onAudioChange = event => {
	// 	if (event.target.files && event.target.files[0]) {
	// 		var aud = event.target.files[0];
	// 		setAudio(aud)
	// 	}
	// };

	// Fire when image is choosen
	// var onImageChange = event => {
	// 	if (event.target.files && event.target.files[0]) {
	// 		var img = event.target.files[0];
	// 		setThumbnail(img)
	// 		setPreview(URL.createObjectURL(img))
	// 	}
	// };

	// Declare new FormData object for form data
	const formData = new FormData();

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader for button
		setBtnLoading(true)

		// Add form data to FormData object
		formData.append("audio", audio);
		formData.append("thumbnail", thumbnail);
		formData.append("name", name);
		formData.append("ft", ft);
		formData.append("album", album);
		formData.append("genre", genre);
		formData.append("released", released);
		formData.append("description", description);
		formData.append("files", files);

		// Send data to AudiossController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/audios`, formData)
				.then((res) => {
					props.setMessages([res.data])
					// Update Audios
					axios.get(`${props.url}/api/audios`)
						.then((res) => props.setAudios(res.data))
					// Remove loader for button
					setBtnLoading(false)
					setTimeout(() => history.push('/audios'), 1000)
				}).catch((err) => {
					// Remove loader for button
					setBtnLoading(false)
					const resErrors = err.response.data.errors
					var resError
					var newError = []
					for (resError in resErrors) {
						newError.push(resErrors[resError])
					}
					// Get other errors
					// newError.push(err.response.data.message)
					console.log(err.response.data)
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
								<h2>Upload your audio</h2>
								<h5>It's free</h5>
								<br />
								<div className="form-group">
									<form onSubmit={onSubmit}>
										<input
											type="text"
											name="name"
											className="form-control"
											placeholder="Audio name"
											required={true}
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
											required={true}
											onChange={(e) => { setAlbum(e.target.value) }}>
											<option defaultValue value="">Select Album</option>
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
											required={true}
											onChange={(e) => { setGenre(e.target.value) }}>
											<option defaultValue value="" className="bg-dark text-light">Select Genre</option>
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
											required={true}
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
											required={true}
											onChange={(e) => { setDescription(e.target.value) }}></textarea>

										<label className="text-light">Upload Audio Thumbnail</label>
										{/* <div
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
										</div> */}

										{/* Hidden file input */}
										{/* <input
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
										<br /> */}

										<FilePond
											name="filepond-thumbnail"
											labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
											imageCropAspectRatio="1:1"
											acceptedFileTypes={['image/*']}
											stylePanelAspectRatio="16:9"
											allowRevert={true}
											server={{
												url: `${props.url}/api`,
												process: {
													url: "/audios",
													headers: { 'X-CSRF-TOKEN': token.content },
													onload: res => setThumbnail(res),
													onerror: (err) => console.log(err.response.data)
												},
												revert: {
													url: `/audios/${thumbnail.substr(17)}`,
													headers: { 'X-CSRF-TOKEN': token.content },
													onload: res => props.setMessages([res]),
												},
											}} />
										<br />
										<br />

										<label className="text-light">Upload Audio</label>

										{/* Hidden file input */}
										{/* <input
											type='file'
											style={{ display: 'none' }}
											ref={audioInput}
											onChange={onAudioChange} />

										<div
											className="p-2"
											style={{ backgroundColor: "#232323", color: "white" }}
											onClick={() => audioInput.current.click()}>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
												<path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
												<path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
											</svg>
										</div>
										<br />
										<br /> */}

										<FilePond
											name="filepond-audio"
											labelIdle='Drag & Drop your Audio or <span class="filepond--label-action text-dark"> Browse </span>'
											acceptedFileTypes={['audio/*']}
											allowRevert={true}
											maxFileSize="50000000"
											server={{
												url: `${props.url}/api`,
												process: {
													url: "/audios",
													headers: { 'X-CSRF-TOKEN': token.content },
													onload: res => {
														setAudio(res)
													},
												},
												revert: {
													url: `/${audio}`,
													headers: { 'X-CSRF-TOKEN': token.content },
													onload: res => {
														props.setMessages([res])
													},
												},
											}} />
										<br />
										<br />

										<button type="reset" className="sonar-btn">reset</button>
										<br />
										<br />

										{/* {{-- Collapse --}} */}
										<button className="sonar-btn" type="button" data-toggle="collapse" data-target="#collapseExample"
											aria-expanded="false" aria-controls="collapseExample">
											next
										</button>
										<div className="collapse" id="collapseExample">
											<div className="">
												<br />
												<h3>Before you upload</h3>
												<h6>By uploading you agree that you <b>own</b> this song.</h6>
												<h6>Audios are sold at
													<b style={{ color: "green" }}> KES 100</b>, Black Music takes
													<b style={{ color: "green" }}> 50% (KES 50)</b> and the musician takes
													<b style={{ color: "green" }}> 50% (KES 50)</b>.</h6>
												<h6>You will be paid
													<b> weekly</b>, via Mpesa to
													<b style={{ color: "dodgerblue" }}> {props.auth.phone}</b>.
												</h6>
												<br />
												<Button btnText="upload audio" loading={btnLoading} />
											</div>
										</div>
										{/* {{-- Collapse End --}} */}
									</form>
									<br />
									<Link to="/audios" className="btn sonar-btn btn-2">studio</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}

export default AudioCreate
