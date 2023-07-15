import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "@/lib/axios";

import Btn from "@/components/Core/Btn";
import Img from "@/components/Core/Img";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform,
    FilePondPluginFileValidateSize
);

const AudioEdit = props => {
    let { id } = useParams();

    // List of Genres
    const genres = [
        "All",
        "Afro",
        "Benga",
        "Blues",
        "Boomba",
        "Country",
        "Cultural",
        "EDM",
        "Genge",
        "Gospel",
        "Hiphop",
        "Jazz",
        "Music of Kenya",
        "Pop",
        "R&B",
        "Rock",
        "Sesube",
        "Taarab"
    ];

    // Declare states
    const [formData, setFormData] = useState();
    const [name, setName] = useState("");
    const [ft, setFt] = useState("");
    const [audioAlbumId, setAudioAlbumId] = useState("");
    const [genre, setGenre] = useState("");
    const [released, setReleased] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [audio, setAudio] = useState("");
    const [btnLoading, setBtnLoading] = useState();

    // Get Artist's Audio Albums
    const [artistAudioAlbums, setArtistAudioAlbums] = useState(
        props.getLocalStorage("artistAudioAlbums")
    );

    useEffect(() => {
        props.get(
            `artist/audio-albums/${props.auth?.username}`,
            setArtistAudioAlbums,
            "artistAudioAlbums",
            false
        );

        // Declare new FormData object for form data
        setFormData(new FormData());
    }, [props.auth]);

    const onSubmit = e => {
        e.preventDefault();

        // Show loader for button
        setBtnLoading(true);

        // Add form data to FormData object
        formData.append("name", name);
        formData.append("ft", ft);
        formData.append("audio_album_id", audioAlbumId);
        formData.append("genre", genre);
        formData.append("released", released);
        formData.append("description", description);
        formData.append("audio", audio);
        formData.append("thumbnail", thumbnail);
        formData.append("_method", "put");

        // Send data to AudiosController
        // Get csrf cookie from Laravel inorder to send a POST request
        axios.get("sanctum/csrf-cookie").then(() => {
            axios
                .post(`/api/audios/${id}`, formData)
                .then(res => {
                    props.setMessages([res.data.message]);
                    // Update Audios
                    props.get("audios", props.setAudios, "audios");
                    // Remove loader for button
                    setBtnLoading(false);
                })
                .catch(err => {
                    // Remove loader for button
                    setBtnLoading(false);
                    props.getErrors(err);
                });
        });
    };

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
                    <h2 style={{ color: "rgba(255, 255, 255, 0.1)" }}>
                        Studio
                    </h2>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="contact-form text-center call-to-action-content wow fadeInUp"
                                data-wow-delay="0.5s"
                            >
                                <h2>Edit Audio</h2>
                                {props.audio && (
                                    <div className="d-flex text-start">
                                        <div className="thumbnail">
                                            <Img
                                                src={props.audio.thumbnail}
                                                width="10em"
                                                height="10em"
                                            />
                                        </div>
                                        <div className="px-2">
                                            <h1 className="my-0">
                                                {props.audio.name}
                                            </h1>
                                            <h6 className="my-0">
                                                <small>
                                                    {props.audio.username}
                                                </small>
                                                <small className="ms-1">
                                                    {props.audio.ft}
                                                </small>
                                            </h6>
                                            <small className="float-start">
                                                {props.audio.released}
                                            </small>
                                        </div>
                                    </div>
                                )}
                                <br />
                                <div className="form-group">
                                    <form onSubmit={onSubmit}>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder={props.audio?.name}
                                            onChange={e =>
                                                setName(e.target.value)
                                            }
                                        />
                                        <br />
                                        <br />

                                        <label
                                            htmlFor=""
                                            className="text-light"
                                        >
                                            Featuring Artist
                                            <b className="text-danger">
                                                {" "}
                                                (MUST HAVE AN ACCOUNT!)
                                            </b>
                                        </label>
                                        <input
                                            type="text"
                                            name="ft"
                                            className="form-control"
                                            placeholder={props.audio?.ft}
                                            onChange={e =>
                                                setFt(e.target.value)
                                            }
                                        />
                                        <br />
                                        <br />

                                        <select
                                            name="album"
                                            className="form-control"
                                            onChange={e =>
                                                setAudioAlbumId(e.target.value)
                                            }
                                        >
                                            {artistAudioAlbums.map(
                                                (audioAlbum, key) => (
                                                    <option
                                                        key={key}
                                                        value={audioAlbum.id}
                                                        className="bg-dark text-light"
                                                        selected={
                                                            props.audio
                                                                ?.audioAlbumId ==
                                                            audioAlbum.id
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {audioAlbum.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <br />
                                        <br />

                                        <select
                                            name="genre"
                                            className="form-control"
                                            placeholder="Select audio genre"
                                            onChange={e => {
                                                setGenre(e.target.value);
                                            }}
                                        >
                                            {genres.map((genre, key) => (
                                                <option
                                                    key={key}
                                                    value={genre}
                                                    className="bg-dark text-light"
                                                    selected={
                                                        genre ==
                                                        props.audio?.genre
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {genre}
                                                </option>
                                            ))}
                                        </select>
                                        <br />
                                        <br />

                                        <label className="text-light">
                                            Released
                                        </label>

                                        <input
                                            type="date"
                                            name="released"
                                            className="form-control"
                                            style={{ colorScheme: "dark" }}
                                            placeholder={props.audio?.released}
                                            onChange={e =>
                                                setReleased(e.target.value)
                                            }
                                        />
                                        <br />
                                        <br />

                                        <textarea
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            placeholder={
                                                props.audio?.description
                                            }
                                            cols="30"
                                            rows="10"
                                            onChange={e =>
                                                setDescription(e.target.value)
                                            }
                                        ></textarea>
                                        <br />
                                        <br />

                                        <label className="text-light">
                                            Upload Audio Thumbnail
                                        </label>
                                        <br />
                                        <br />

                                        <FilePond
                                            name="filepond-thumbnail"
                                            labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
                                            imageCropAspectRatio="16:9"
                                            acceptedFileTypes={["image/*"]}
                                            stylePanelAspectRatio="16:9"
                                            allowRevert={false}
                                            server={{
                                                url: `${props.url}/api/filepond`,
                                                process: {
                                                    url: `/audio-thumbnail/${props.audio?.id}`,
                                                    onerror: err =>
                                                        console.log(
                                                            err.response.data
                                                        )
                                                },
                                                revert: {
                                                    url: `/audio-thumbnail/${thumbnail.substr(
                                                        17
                                                    )}`,
                                                    onload: res =>
                                                        props.setMessages([res])
                                                }
                                            }}
                                        />
                                        <br />
                                        <br />

                                        <label className="text-light">
                                            Upload Audio
                                        </label>
                                        <h6 className="text-primary">
                                            If the audio is too large you can
                                            upload it to Youtube for
                                            compression, download it, delete it,
                                            then upload it here.
                                        </h6>
                                        <br />

                                        <FilePond
                                            name="filepond-audio"
                                            labelIdle='Drag & Drop your Audio or <span class="filepond--label-action text-dark"> Browse </span>'
                                            acceptedFileTypes={["audio/*"]}
                                            stylePanelAspectRatio="16:9"
                                            maxFileSize="200000000"
                                            allowRevert={false}
                                            server={{
                                                url: `${props.url}/api/filepond`,
                                                process: {
                                                    url: `/audio/${props.audio?.id}`,
                                                    onerror: err =>
                                                        console.log(
                                                            err.response.data
                                                        )
                                                },
                                                revert: {
                                                    url: `/audio/${audio}`,
                                                    onload: res => {
                                                        props.setMessages([
                                                            res
                                                        ]);
                                                    }
                                                }
                                            }}
                                        />
                                        <br />
                                        <br />

                                        <Btn
                                            btnText="edit audio"
                                            loading={btnLoading}
                                        />
                                    </form>
                                    <br />
                                    <Link to="/audio">
                                        <a className="btn sonar-btn btn-2">
                                            studio
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioEdit;
