import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../lib/axios";
import ssrAxios from "../lib/ssrAxios";

import Btn from "../components/Core/Btn";
import Img from "../components/Core/Img";
import ImageSVG from "../svgs/ImageSVG";

const VideoAlbumEdit = props => {
    const router = useRouter();

    let { id } = router.query;

    // Declare states
    const [formData, setFormData] = useState();
    const [name, setName] = useState("");
    const [released, setReleased] = useState("");
    const [preview, setPreview] = useState();
    const [cover, setCover] = useState("");
    const [btnLoading, setBtnLoading] = useState();

    // Assign id to element
    const mediaInput = React.useRef(null);

    useEffect(() => {
        // Declare new FormData object for form data
        setFormData(new FormData());
    }, []);

    // Fire when image is choosen
    var onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            var img = event.target.files[0];
            setCover(img);
            setPreview(URL.createObjectURL(img));
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        // Show loader for button
        setBtnLoading(true);

        // Add form data to FormData object
        formData.append("name", name);
        formData.append("released", released);
        cover && formData.append("cover", cover);
        formData.append("_method", "put");

        // Send data to PostsController
        // Get csrf cookie from Laravel inorder to send a POST request
        axios
            .post(`/api/video-albums/${id}`, formData)
            .then(res => {
                props.setMessages([res.data.message]);
                setPreview();
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
                                <h2>Edit Video Album</h2>
                                <div className="d-flex text-start">
                                    <div className="p-2">
                                        <Img
                                            src={props.album.cover}
                                            width="10em"
                                            height="10em"
                                            alt="album cover"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <h1 className="my-0">
                                            {props.album.name}
                                        </h1>
                                        <h6 className="my-0">
                                            {props.album.released}
                                        </h6>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <form onSubmit={onSubmit}>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Name"
                                            onChange={e =>
                                                setName(e.target.value)
                                            }
                                        />
                                        <br />
                                        <br />

                                        <label className="text-light">
                                            Released
                                        </label>
                                        <input
                                            type="date"
                                            name="released"
                                            className="form-control"
                                            placeholder="Released"
                                            onChange={e =>
                                                setReleased(e.target.value)
                                            }
                                        />
                                        <br />
                                        <br />

                                        <label className="text-light">
                                            Upload Album Cover
                                        </label>
                                        <div
                                            className="mb-2"
                                            style={{ overflow: "hidden" }}
                                        >
                                            <img
                                                src={preview}
                                                width="100%"
                                                height="auto"
                                            />
                                        </div>

                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            style={{ display: "none" }}
                                            ref={mediaInput}
                                            onChange={onImageChange}
                                        />

                                        <div
                                            className="p-2"
                                            style={{
                                                backgroundColor: "#232323",
                                                color: "white",
                                                cursor: "pointer"
                                            }}
                                            onClick={() =>
                                                mediaInput.current.click()
                                            }
                                        >
                                            <ImageSVG />
                                        </div>
                                        <br />
                                        <br />

                                        <Btn
                                            type="submit"
                                            btnText="edit album"
                                            loading={btnLoading}
                                        />
                                        <br />
                                        <br />

                                        <Link href="/video">
                                            <a className="btn sonar-btn btn-2">
                                                studio
                                            </a>
                                        </Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// This gets called on every request
export async function getServerSideProps(context) {
    const { id } = context.query;

    var album;

    // Fetch Post Comments
    await ssrAxios
        .get(`/api/video-albums/${id}`)
        .then(res => (album = res.data.data));

    // Pass data to the page via props
    return { props: { album } };
}

export default VideoAlbumEdit;
