import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
// import Axios from "axios"

import Btn from "@/components/Core/Btn"

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateSize
)

const AudioCreate = (props) => {
	// Declare states
	// Get Artist's Audio Albums
	const [artistAudioAlbums, setArtistAudioAlbums] = useState(
		props.getLocalStorage("artistAudioAlbums")
	)
	const [formData, setFormData] = useState()
	const [audio, setAudio] = useState("")
	const [name, setName] = useState("")
	const [ft, setFt] = useState("")
	const [audioAlbumId, setAudioAlbumId] = useState()
	const [genre, setGenre] = useState("")
	const [released, setReleased] = useState("")
	const [description, setDescription] = useState("")
	const [thumbnail, setThumbnail] = useState("")
	const [files, setFiles] = useState([])
	const [loadingBtn, setLoadingBtn] = useState()

	// Get history for page location
	const router = useHistory()

	useEffect(() => {
		props.get(
			`artist/audio-albums/${props.auth?.username}`,
			setArtistAudioAlbums,
			"artistAudioAlbums",
			false
		)
		// Declare new FormData object for form data
		setFormData(new FormData())
	}, [])

	const onSubmit = (e) => {
		e.preventDefault()

		// Show loader for button
		setLoadingBtn(true)

		// Add form data to FormData object
		formData.append("audio", audio)
		formData.append("thumbnail", thumbnail)
		formData.append("name", name)
		formData.append("username", props.auth?.username)
		formData.append("ft", ft)
		formData.append("audio_album_id", audioAlbumId)
		formData.append("genre", genre)
		formData.append("released", released)
		formData.append("description", description)
		formData.append("files", files)

		// Send data to AudioController
		// Get csrf cookie from Laravel inorder to send a POST request
		Axios.post(`/api/audios`, formData)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
				setTimeout(() => router.push("/audio"), 500)
			})
			.catch((err) => {
				// Remove loader for button
				setLoadingBtn(false)
				props.getErrors(err)
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
							<div
								className="contact-form text-center call-to-action-content wow fadeInUp"
								data-wow-delay="0.5s">
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
											onChange={(e) => setName(e.target.value)}
										/>
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
											onChange={(e) => setFt(e.target.value)}
										/>
										<br />
										<br />

										<select
											name="album"
											className="form-control"
											required={true}
											onChange={(e) => setAudioAlbumId(e.target.value)}>
											<option defaultValue value="">
												Select Album
											</option>
											{artistAudioAlbums.map((audioAlbum, key) => (
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
											name="genre"
											className="form-control"
											placeholder="Select audio genre"
											required={true}
											onChange={(e) => setGenre(e.target.value)}>
											<option defaultValue value="">
												Select Genre
											</option>
											<option value="Afro" className="bg-dark text-light">
												Afro
											</option>
											<option value="Benga" className="bg-dark text-light">
												Benga
											</option>
											<option value="Blues" className="bg-dark text-light">
												Blues
											</option>
											<option value="Boomba" className="bg-dark text-light">
												Boomba
											</option>
											<option value="Country" className="bg-dark text-light">
												Country
											</option>
											<option value="Cultural" className="bg-dark text-light">
												Cultural
											</option>
											<option value="EDM" className="bg-dark text-light">
												EDM
											</option>
											<option value="Genge" className="bg-dark text-light">
												Genge
											</option>
											<option value="Gospel" className="bg-dark text-light">
												Gospel
											</option>
											<option value="Hiphop" className="bg-dark text-light">
												Hiphop
											</option>
											<option value="Jazz" className="bg-dark text-light">
												Jazz
											</option>
											<option
												value="Music of Kenya"
												className="bg-dark text-light">
												Music of Kenya
											</option>
											<option value="Pop" className="bg-dark text-light">
												Pop
											</option>
											<option value="R&B" className="bg-dark text-light">
												R&B
											</option>
											<option value="Rock" className="bg-dark text-light">
												Rock
											</option>
											<option value="Sesube" className="bg-dark text-light">
												Sesube
											</option>
											<option value="Taarab" className="bg-dark text-light">
												Taarab
											</option>
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
											onChange={(e) => setReleased(e.target.value)}
										/>
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
											onChange={(e) =>
												setDescription(e.target.value)
											}></textarea>

										<label className="text-light">Upload Audio Thumbnail</label>
										<br />
										<br />

										<FilePond
											name="filepond-thumbnail"
											labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
											imageCropAspectRatio="16:9"
											acceptedFileTypes={["image/*"]}
											stylePanelAspectRatio="16:9"
											allowRevert={true}
											server={{
												url: `${props.baseUrl}/api/filepond`,
												process: {
													url: "/audio-thumbnail",
													onload: (res) => setThumbnail(res),
													onerror: (err) => console.log(err.response.data),
												},
												revert: {
													url: `/audio-thumbnail/${thumbnail.substr(17)}`,
													onload: (res) => props.setMessages([res]),
												},
											}}
										/>
										<br />
										<br />

										<label className="text-light">Upload Audio</label>
										<h6 className="text-primary">
											If the audio is too large you can upload it to Youtube for
											compression, download it, delete it, then upload it here.
										</h6>
										<br />

										<FilePond
											name="filepond-audio"
											labelIdle='Drag & Drop your Audio or <span class="filepond--label-action text-dark"> Browse </span>'
											acceptedFileTypes={["audio/*"]}
											stylePanelAspectRatio="16:9"
											maxFileSize="200000000"
											allowRevert={true}
											server={{
												url: `${props.baseUrl}/api/filepond`,
												process: {
													url: "/audio",
													onload: (res) => setAudio(res),
													onerror: (err) => console.log(err.response.data),
												},
												revert: {
													url: `/audio/${audio.substr(7)}`,
													onload: (res) => {
														props.setMessages([res])
													},
												},
											}}
										/>
										<br />
										<br />

										{/* {{-- Collapse --}} */}
										<button
											className="sonar-btn"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseExample"
											aria-expanded="false"
											aria-controls="collapseExample">
											next
										</button>
										<div className="collapse" id="collapseExample">
											<div className="">
												<br />
												<h3>Before you upload</h3>
												<h6>
													By uploading you agree that you <b>own</b> this song.
												</h6>
												<h6>
													Audios are sold at
													<b
														style={{
															color: "green",
														}}>
														{" "}
														KES 10
													</b>
													, Black Music takes
													<b
														style={{
															color: "green",
														}}>
														{" "}
														50% (KES 5)
													</b>{" "}
													and the musician takes
													<b
														style={{
															color: "green",
														}}>
														{" "}
														50% (KES 5)
													</b>
													.
												</h6>
												<br />
												<Btn btnText="upload audio" loading={loadingBtn} />
											</div>
										</div>
										{/* {{-- Collapse End --}} */}
									</form>
									<br />
									<br />

									<Link to="/audio" className="btn sonar-btn btn-2">
										studio
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AudioCreate
