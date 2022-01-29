import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
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

const VideoCreate = (props) => {

	// Declare states
	const [video, setVideo] = useState("")
	const [name, setName] = useState("")
	const [ft, setFt] = useState("")
	const [album, setAlbum] = useState()
	const [genre, setGenre] = useState()
	const [released, setReleased] = useState()
	const [description, setDescription] = useState()
	const [thumbnail, setThumbnail] = useState("")
	const [files, setFiles] = useState([]);

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]');

	// Get history for page location
	const history = useHistory()

	// Declare new FormData object for form data
	const formData = new FormData();

	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		formData.append("video", video);
		formData.append("thumbnail", thumbnail);
		formData.append("name", name);
		formData.append("ft", ft);
		formData.append("album", album);
		formData.append("genre", genre);
		formData.append("released", released);
		formData.append("description", description);
		formData.append("files", files);

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get('sanctum/csrf-cookie').then(() => {
			axios.post(`${props.url}/api/videos`, formData)
				.then((res) => {
					props.setMessage(res.data)
					// Update Videos
					axios.get(`${props.url}/api/videos`)
						.then((res) => props.setVideos(res.data))
					setTimeout(() => history.push('/videos'), 1000)
				}).catch(err => {
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

	const onPatch = () => axios.post(`${props.url}/api/videos/filepond/video`)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err.data))

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
					<h2>Studio</h2>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="contact-form text-center call-to-action-content wow fadeInUp" data-wow-delay="0.5s">
								<h2>Upload your video</h2>
								<h5>It's free</h5>
								<br />
								<div className="form-group">
									<form onSubmit={onSubmit}>
										<input
											type="text"
											name="name"
											className="form-control"
											placeholder="Video name"
											required={true}
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
											required={true}
											onChange={(e) => { setAlbum(e.target.value) }}>
											<option defaultValue value="">Select Album</option>
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
											required={true}
											onChange={(e) => { setGenre(e.target.value) }}>
											<option defaultValue value="">Select Genre</option>
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
											onChange={(e) => { setDescription(e.target.value) }}>
										</textarea>

										<label>Upload Video Thumbnail</label>

										<FilePond
											name="filepond-thumbnail"
											labelIdle='Drag & Drop your Image or <span class="filepond--label-action"> Browse </span>'
											imageCropAspectRatio="16:9"
											acceptedFileTypes={['image/*']}
											stylePanelAspectRatio="16:9"
											allowRevert={true}
											server={{
												url: `${props.url}/api`,
												process: {
													url: "/videos",
													headers: { 'X-CSRF-TOKEN': token.content },
													onload: res => setThumbnail(res),
													onerror: (err) => console.log(err.response.data)
												},
												revert: {
													url: `/videos/${thumbnail.substr(17)}`,
													headers: { 'X-CSRF-TOKEN': token.content },
													onload: res => props.setMessage(res),
												},
											}} />
										<br />
										<br />

										<label>Upload Video</label>
										<h6 className="text-primary">If the video is too large you can upload it to Youtube for compression, download it, delete it, then upload it here.</h6>
										<br />

										<FilePond
											name="filepond-video"
											labelIdle='Drag & Drop your Video or <span class="filepond--label-action"> Browse </span>'
											acceptedFileTypes={['video/*']}
											stylePanelAspectRatio="16:9"
											maxFileSize="200000000"
											allowRevert={true}
											server={{
												url: `${props.url}/api`,
												process: {
													url: "/videos",
													headers: { 'X-CSRF-TOKEN': token.content },
													onload: res => setVideo(res),
													onerror: (err) => console.log(err.response.data)
												},
												revert: {
													url: `/${video}`,
													headers: { 'X-CSRF-TOKEN': token.content },
													onload: res => {
														props.setMessage(res)
													},
												},
											}} />
										<br />
										<br />

										{/* {{-- Collapse --}} */}
										<button
											className="sonar-btn"
											type="button"
											data-toggle="collapse"
											data-target="#collapseExample"
											aria-expanded="false"
											aria-controls="collapseExample">
											next
										</button>
										<div className="collapse" id="collapseExample">
											<div className="">
												<br />
												<h3>Before you upload</h3>
												<h6>By uploading you agree that you <b>own</b> this song.</h6>
												<h6>Videos are sold at
													<b style={{ color: "green" }}> KES 200</b>, Black Music takes
													<b style={{ color: "green" }}> 50% (KES 100)</b> and the musician takes
													<b style={{ color: "green" }}> 50% (KES 100)</b>.</h6>
												<h6>You will be paid
													<b> weekly</b>, via Mpesa to
													<b style={{ color: "dodgerblue" }}> {props.auth.phone}</b>.
												</h6>
												<br />
												<Button btnText="upload video" />
											</div>
										</div>
										{/* {{-- Collapse End --}} */}
									</form>
									<br />
									<br />

									<button type="reset" className="sonar-btn">reset</button>
									<br />
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

export default VideoCreate
