import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../lib/axios";
import dynamic from "next/dynamic";

import Button from "../components/Core/Btn";
import Img from "../components/Core/Img";

import EmojiSVG from "../svgs/EmojiSVG";
import ImageSVG from "../svgs/ImageSVG";
import PollSVG from "../svgs/PollSVG";

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

const SocialMediaInput = props => {
    const router = useRouter();

    const [text, setText] = useState(props.text ? props.text : "");
    const [media, setMedia] = useState("");
    const [storyMedia, setStoryMedia] = useState([]);
    const [para1, setPara1] = useState("");
    const [para2, setPara2] = useState("");
    const [para3, setPara3] = useState("");
    const [para4, setPara4] = useState("");
    const [para5, setPara5] = useState("");
    const [showMentionPicker, setShowMentionPicker] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [showStoryPicker, setShowStoryPicker] = useState(
        props.showStory ? true : false
    );
    const [showPollPicker, setShowPollPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState();

    const [doNotShowMentionPicker, setDoNotShowMentionPicker] = useState(true);
    const [display2, setDisplay2] = useState("none");
    const [display3, setDisplay3] = useState("none");
    const [display4, setDisplay4] = useState("none");
    const [display5, setDisplay5] = useState("none");

    const [revertUrl, setRevertUrl] = useState("stories/");

    /*
     * Set Revert Url for story */
    useEffect(() => generateRevertUrl(), [storyMedia]);

    // For multiple uploads
    const generateRevertUrl = () => {
        console.log("gen 1 " + storyMedia.length);
        if (storyMedia.length) {
            console.log("gen 2");
            // Get media
            var media = storyMedia;
            // Reverse array to always have to latest first
            media = media.reverse();
            // Parse string to JSON and get first element
            const parsed = JSON.parse(media[0]);
            // const parsed = media[0]
            // Get name of key
            const key = Object.keys(parsed);
            // Get value by key
            setRevertUrl(parsed[key]);
        }
    };

    const Picker = dynamic(
        () => {
            return import("emoji-picker-react");
        },
        { ssr: false }
    );

    // Show error on space in username
    useEffect(() => {
        text.indexOf("@") > -1 && setShowMentionPicker(true);
    }, [text]);

    const onEmojiClick = (event, emojiObject) => {
        setText(text + emojiObject.emoji);
    };

    // Add username to text
    const addMention = mention => {
        var textUsername = "@" + text.split("@")[1];
        var mentionToAdd = text.replace(textUsername, mention);
        setText(mentionToAdd);
        setShowMentionPicker(false);
        setDoNotShowMentionPicker(false);
    };

    useEffect(() => {
        // Declare new FormData object for form data
        setFormData(new FormData());
    }, []);

    // Handle form submit for Social Input
    const onSubmit = e => {
        e.preventDefault();
        // Show loader
        setLoading(true);

        // Add form data to FormData object
        text && formData.append("text", text);
        props.id && formData.append("id", props.id);
        props.to && formData.append("to", props.to);
        media && formData.append("media", media);
        storyMedia && formData.append("media", storyMedia);
        para1 && formData.append("para1", para1);
        para2 && formData.append("para2", para2);
        para3 && formData.append("para3", para3);
        para4 && formData.append("para4", para4);
        para5 && formData.append("para5", para5);
        props.editing && formData.append("_method", "PUT");

        // Get csrf cookie from Laravel inorder to send a POST request
        axios
            .post(`/api/${props.urlTo}`, formData)
            .then(res => {
                // Hide loader
                setLoading(false);
                // Messages
                props.setMessages([res.data.message]);
                // Clear Media
                setMedia("");
                // Update State
                props.stateToUpdate && props.stateToUpdate();
                // Clear text unless editing
                !props.editing && setText("");
                // Hide Pickers
                setShowMentionPicker(false);
                setShowEmojiPicker(false);
                setShowImagePicker(false);
                setShowStoryPicker(false);
                setShowPollPicker(false);
                // Redirect
                props.redirect && router.push(props.redirect);
            })
            .catch(err => {
                setLoading(false);
                props.getErrors(err);
            });
    };

    return (
        <form
            onSubmit={onSubmit}
            className="contact-form bg-white"
            autoComplete="off"
        >
            <center style={{ backgroundColor: "#232323" }}>
                <div
                    className="d-flex pt-2 border-bottom border-dark"
                    style={{ backgroundColor: "#232323" }}
                >
                    {/* Profile pic */}
                    <div className="p-2">
                        <Img
                            src={props.auth.avatar}
                            imgClass="rounded-circle"
                            width="25px"
                            height="25px"
                            alt="Avatar"
                        />
                    </div>
                    {/* Profile pic End */}
                    {/* Input */}
                    <div className="flex-grow-1">
                        <textarea
                            name="post-text"
                            className="form-control m-0 p-2"
                            style={{
                                border: "none",
                                outline: "none",
                                height: "50px",
                                resize: "none"
                            }}
                            placeholder={props.placeholder}
                            value={text}
                            row="1"
                            onChange={e => setText(e.target.value)}
                            required={props.required}
                        ></textarea>
                    </div>
                    {/* Input End */}
                    {/* Emoji icon */}
                    <div className="pt-2 px-1">
                        <div
                            className="text-light fs-5"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                if (!media && !para1) {
                                    setShowEmojiPicker(!showEmojiPicker);
                                    setShowImagePicker(true && false);
                                    setShowStoryPicker(true && false);
                                    setShowPollPicker(true && false);
                                }
                            }}
                        >
                            <EmojiSVG />
                        </div>
                    </div>
                    {/* Emoji icon End */}
                    {/* Image icon */}
                    {props.showImage && (
                        <div
                            className="pt-2 px-1 text-light"
                            onClick={() => {
                                if (!media && !para1) {
                                    setShowEmojiPicker(true && false);
                                    setShowImagePicker(!showImagePicker);
                                    setShowStoryPicker(true && false);
                                    setShowPollPicker(true && false);
                                }
                            }}
                        >
                            <div className="fs-5" style={{ cursor: "pointer" }}>
                                <ImageSVG />
                            </div>
                        </div>
                    )}
                    {/* Image icon End */}
                    {/* Story icon */}
                    {props.showStory && (
                        <div
                            className="pt-2 px-1 text-light"
                            onClick={() => {
                                if (!media && !para1) {
                                    setShowEmojiPicker(true && false);
                                    setShowImagePicker(true && false);
                                    setShowStoryPicker(!showStoryPicker);
                                    setShowPollPicker(true && false);
                                }
                            }}
                        >
                            <div className="fs-5" style={{ cursor: "pointer" }}>
                                <ImageSVG />
                            </div>
                        </div>
                    )}
                    {/* Story icon End  */}
                    {/* Poll icon */}
                    {props.showPoll && (
                        <div
                            className="pt-2 px-1 text-white"
                            onClick={() => {
                                if (!media && !para1) {
                                    setShowEmojiPicker(true && false);
                                    setShowPollPicker(!showPollPicker);
                                    setShowImagePicker(true && false);
                                    setShowStoryPicker(true && false);
                                }
                            }}
                        >
                            <div className="fs-5" style={{ cursor: "pointer" }}>
                                <PollSVG />
                            </div>
                        </div>
                    )}
                    {/* Poll icon End */}
                    {/* Button */}
                    <div className="p-1">
                        <Button
                            type="submit"
                            btnClass="mysonar-btn white-btn"
                            btnText={props.btnText}
                            loading={loading}
                        />
                    </div>
                    {/* Button End */}
                </div>

                {/* Show Emoji Picker */}
                {showEmojiPicker && (
                    <div>
                        <Picker
                            onEmojiClick={onEmojiClick}
                            preload="true"
                            pickerStyle={{
                                width: "95%",
                                borderRadius: "0px",
                                margin: "10px"
                            }}
                        />
                        <br />
                    </div>
                )}
                {/* Show Emoji Picker End */}

                {/* Show Image Filepond */}
                {showImagePicker && (
                    <div>
                        <FilePond
                            name="filepond-media"
                            className="m-2"
                            labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
                            acceptedFileTypes={["image/*"]}
                            allowRevert={true}
                            server={{
                                url: `${props.url}/api/filepond/`,
                                process: {
                                    url: props.urlTo,
                                    onload: res => setMedia(res)
                                },
                                revert: {
                                    url: props.urlTo + "/" + media.substr(11),
                                    onload: res => {
                                        props.setMessages([res]);
                                        setMedia("");
                                    }
                                }
                            }}
                        />
                        <br />
                    </div>
                )}
                {/* Show Image Filepond End */}

                {/* Show Story Filepond */}
                {showStoryPicker && (
                    <div className="">
                        <center>
                            <FilePond
                                name="filepond-media"
                                className="m-2 w-75"
                                labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
                                acceptedFileTypes={["image/*"]}
                                stylePanelAspectRatio="9:16"
                                allowRevert={true}
                                allowMultiple={false}
                                server={{
                                    url: `${props.url}/api/filepond/`,
                                    process: {
                                        url: props.urlTo,
                                        onload: res =>
                                            setStoryMedia([...storyMedia, res])
                                    },
                                    revert: {
                                        url: revertUrl,
                                        onload: res => {
                                            props.setMessages([res]);
                                            setStoryMedia([storyMedia.shift()]);
                                        }
                                    }
                                }}
                            />
                        </center>
                        <br />
                    </div>
                )}
                {/* Show Story Filepond End */}

                {/* Show Mention Picker */}
                {showMentionPicker && doNotShowMentionPicker ? (
                    <div>
                        <div
                            className="card rounded-0"
                            style={{ maxHeight: "200px", overflowY: "scroll" }}
                        >
                            {props.users
                                .filter(user => {
                                    var regex = new RegExp(
                                        text.split("@")[1],
                                        "gi"
                                    );

                                    return (
                                        user.username != props.auth.username &&
                                        user.username != "@blackmusic" &&
                                        user.accountType == "musician" &&
                                        user.username.match(regex)
                                    );
                                })
                                .map((user, key) => (
                                    <div
                                        key={key}
                                        className="d-flex"
                                        onClick={() =>
                                            addMention(user.username)
                                        }
                                    >
                                        <div className="p-2">
                                            <Img
                                                src={user.avatar}
                                                imgClass="rounded-circle"
                                                width="30px"
                                                height="30px"
                                            />
                                        </div>
                                        <div className="py-2 px-0">
                                            <h6
                                                className="m-0"
                                                style={{
                                                    width: "100%",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "clip"
                                                }}
                                            >
                                                <b>{user.name}</b>
                                                <small>{user.username}</small>
                                            </h6>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <br />
                    </div>
                ) : (
                    ""
                )}
                {/* Show Mention Picker End */}

                {/* Show Polls */}
                {showPollPicker && (
                    <center>
                        <h5 className="mt-2">Add Poll</h5>
                        {/* Poll inputs */}
                        <input
                            type="text"
                            className="form-control border-dark"
                            placeholder="Parameter 1"
                            onChange={e => {
                                setDisplay2("inline");
                                setPara1(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            style={{ display: display2 }}
                            className="form-control border-dark"
                            placeholder="Parameter 2"
                            onChange={e => {
                                setDisplay3("inline");
                                setPara2(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            style={{ display: display3 }}
                            className="form-control border-dark"
                            placeholder="Parameter 3"
                            onChange={e => {
                                setDisplay4("inline");
                                setPara3(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            style={{ display: display4 }}
                            className="form-control border-dark"
                            placeholder="Parameter 4"
                            onChange={e => {
                                setDisplay5("inline");
                                setPara4(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            style={{ display: display5 }}
                            className="form-control border-dark"
                            placeholder="Parameter 5"
                            onChange={e => setPara5(e.target.value)}
                        />
                    </center>
                )}
                {/* Show Polls End */}
            </center>
        </form>
    );
};

SocialMediaInput.defaultProps = {
    required: true,
    btnText: "send"
};

export default SocialMediaInput;
