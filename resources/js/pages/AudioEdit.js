import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

import Button from '../components/Button'
import Img from '../components/Img'

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
	const [thumbnail, setThumbnail] = useState("")
	const [audio, setAudio] = useState()
	const [btnLoading, setBtnLoading] = useState()

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]');

	// Declare new FormData object for form data
	const formData = new FormData();

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader for button
		setBtnLoading(true)

		// Add form data to FormData object
		formData.append("name", name);
		formData.append("ft", ft);
		formData.append("album", album);
		formData.append("genre", genre);
		formData.append("released", released);
		formData.append("description", description);
		formData.append("thumbnail", thumbnail);
		formData.append("audio", audio);
		formData.append("_method", 'put');

		// Send data to AudiosController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/audios/${id}`, formData)
				.then((res) => {
					props.setMessages([res.data])
					// Update Audios
					axios.get(`${props.url}/api/audios`)
						.then((res) => props.setAudios(res.data))
					// Remove loader for button
					setBtnLoading(false)
				}).catch(err => {
					// Remove loader for button
					setBtnLoading(false)
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
										<br />
										<br />

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

										<Button btnText="edit audio" loading={btnLoading} />
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
