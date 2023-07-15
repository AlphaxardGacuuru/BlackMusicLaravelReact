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

const VideoEdit = props => {
    console.log(props);

    let { id } = useParams();

    // Get Artist's Video Albums
    const [artistVideoAlbums, setArtistVideoAlbums] = useState(
        props.getLocalStorage("artistVideoAlbums")
    );

    useEffect(() => {
        // Get Artist Video Albums
        props.get(
            `artist/video-albums/${props.auth?.username}`,
            setArtistVideoAlbums,
            "artistVideoAlbums",
            false
        );
    }, [props.auth]);

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
    const [videoAlbumId, setVideoAlbumId] = useState("");
    const [genre, setGenre] = useState("");
    const [released, setReleased] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [video, setVideo] = useState("");
    const [btnLoading, setBtnLoading] = useState();

    useEffect(() => {
        // Declare new FormData object for form data
        setFormData(new FormData());
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        // Show loader for button
        setBtnLoading(true);

        // Add form data to FormData object
        formData.append("name", name);
        formData.append("ft", ft);
        formData.append("video_album_id", videoAlbumId);
        formData.append("genre", genre);
        formData.append("released", released);
        formData.append("description", description);
        formData.append("video", video);
        formData.append("thumbnail", thumbnail);
        formData.append("_method", "put");

        // Send data to VideosController
        // Get csrf cookie from Laravel inorder to send a POST request
        axios
            .post(`${props.url}/api/videos/${id}`, formData)
            .then(res => {
                props.setMessages([res.data.message]);
                // Update Videos
                props.get("videos", props.setVideos, "videos");
                // Remove loader for button
                setBtnLoading(false);
            })
            .catch(err => {
                // Remove loader for button
                setBtnLoading(false);
                props.getErrors(err);
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
                                <h2>Edit Video</h2>
                                <div className="d-flex text-start">
                                    <div className="thumbnail">
                                        <Img
                                            src={props.video?.thumbnail}
                                            width="8em"
                                            height="4em"
                                        />
                                    </div>
                                    <div className="px-2">
                                        <h1 className="my-0">
                                            {props.video.name}
                                        </h1>
                                        <h6 className="my-0">
                                            <small>
                                                {props.video.username}
                                            </small>
                                            <small className="ml-1">
                                                {props.video.ft}
                                            </small>
                                        </h6>
                                        <small className="ml-1">
                                            {props.video.released}
                                        </small>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <form onSubmit={onSubmit}>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder={props.video?.name}
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
                                            placeholder={props.video?.ft}
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
                                                setVideoAlbumId(e.target.value)
                                            }
                                        >
                                            {artistVideoAlbums.map(
                                                (videoAlbum, key) => (
                                                    <option
                                                        key={key}
                                                        value={videoAlbum.id}
                                                        className="bg-dark text-light"
                                                        selected={
                                                            props.video
                                                                ?.videoAlbumId ==
                                                            videoAlbum.id
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        {videoAlbum.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <br />
                                        <br />

                                        <select
                                            name="genre"
                                            className="form-control"
                                            placeholder="Select video genre"
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
                                                        props.video?.genre
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
                                            placeholder={props.video?.released}
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
                                                props.video?.description
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
                                            Upload Video Thumbnail
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
                                                    url: `/video-thumbnail/${props.video?.id}`,
                                                    onerror: err =>
                                                        console.log(
                                                            err.response.data
                                                        )
                                                },
                                                revert: {
                                                    url: `/video-thumbnail/${thumbnail.substr(
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
                                            Upload Video
                                        </label>
                                        <h6 className="text-primary">
                                            If the video is too large you can
                                            upload it to Youtube for
                                            compression, download it, delete it,
                                            then upload it here.
                                        </h6>
                                        <br />

                                        <FilePond
                                            name="filepond-video"
                                            labelIdle='Drag & Drop your Video or <span class="filepond--label-action text-dark"> Browse </span>'
                                            acceptedFileTypes={["video/*"]}
                                            stylePanelAspectRatio="16:9"
                                            maxFileSize="200000000"
                                            allowRevert={false}
                                            server={{
                                                url: `${props.url}/api/filepond`,
                                                process: {
                                                    url: `/video/${props.video?.id}`,
                                                    onerror: err =>
                                                        console.log(
                                                            err.response.data
                                                        )
                                                },
                                                revert: {
                                                    url: `/video/${video}`,
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
                                            btnText="edit video"
                                            loading={btnLoading}
                                        />
                                    </form>
                                    <br />
                                    <Link to="/video"
									 className="btn sonar-btn btn-2">
                                            studio
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

export default VideoEdit;
