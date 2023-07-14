import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "../lib/axios";
import Ticker from "react-ticker";

import Img from "../components/Core/Img";
import KaraokeCommentSection from "./KaraokeCommentSection";

import CloseSVG from "../svgs/CloseSVG";
import CommentSVG from "../svgs/CommentSVG";
import DecoSVG from "../svgs/DecoSVG";
import HeartFilledSVG from "../svgs/HeartFilledSVG";
import HeartSVG from "../svgs/HeartSVG";
import BookmarkSVG from "../svgs/BookmarkSVG";
import BookmarkFilledSVG from "../svgs/BookmarkFilledSVG";
import ShareSVG from "../svgs/ShareSVG";
import MusicNoteSVG from "../svgs/MusicNoteSVG";
import PlayFilledSVG from "../svgs/PlayFilledSVG";

const Karaoke = props => {
    const [play, setPlay] = useState();
    const [hasLiked, setHasLiked] = useState(props.karaoke.hasLiked);
    const [hasSaved, setHasSaved] = useState(props.karaoke.hasSaved);
    const [showComments, setShowComments] = useState("");

    useEffect(() => {
        // Set new cart with data with auth
        setHasLiked(props.karaoke.hasLiked);
        setHasSaved(props.karaoke.hasSaved);
    }, [props.karaoke]);

    // ID for video
    const video = useRef();

    // ID for Video Description
    const karaokeDescription = useRef();

    // ID for Video Description text
    const showDescription = useRef();

    // Id for rotating record
    const spiningRecord = useRef();

    const onKaraokeLike = () => {
        setHasLiked(!hasLiked);

        // Add like to database
        axios
            .post(`/api/karaoke-likes`, {
                karaoke: props.karaoke.id
            })
            .then(res => {
                props.setMessages([res.data.message]);
                // Update karaoke
                props.get("karaokes", props.setKaraokes);
            })
            .catch(err => props.getErrors(err));
    };

    const onKaraokeSave = () => {
        // Change icon
        setHasSaved(!hasSaved);

        // Save Karaoke
        axios
            .post("api/saved-karaokes", { id: props.karaoke.id })
            .then(res => props.setMessages([res.data.message]))
            .catch(err => props.getErrors(err));
    };

    // Web Share API for share button
    // Share must be triggered by "user activation"
    const onShare = () => {
        // Define share data
        const shareData = {
            title: props.karaoke.audio,
            text: `Check out this karaoke on Black Music\n`,
            url: `https://music.black.co.ke/#/karaoke-show/${props.karaoke.id}`
        };
        // Check if data is shareble
        navigator.canShare(shareData) && navigator.share(shareData);
    };

    // Pause or Play Video
    const onPause = () => {
        video.current.pause();
        // Stop Spining Record
        spiningRecord.current.style.animationPlayState = "paused";
        setPlay(true);
    };

    const onPlay = () => {
        video.current.play();
        // Start Spining Record
        spiningRecord.current.style.animationPlayState = "running";
        setPlay(false);
    };

    // Show More
    const showMore = () => {
        var d = karaokeDescription.current.style.display;
        karaokeDescription.current.style.display =
            d == "none" ? "block" : "none";

        var t = showDescription.current.innerHTML;
        showDescription.current.innerHTML =
            t == "show more" ? "show less" : "show more";
    };

    return (
        <div id={props.karaoke.id} className="single-karaoke">
            <video
                ref={video}
                src={props.karaoke.karaoke}
                className="karaoke-player"
                width="100%"
                loading="lazy"
                preload="none"
                muted
                autoPlay
                loop
                playsInline
                onClick={play ? onPlay : onPause}
            ></video>
            {/* Floating Video Info Top */}
            <div style={{ position: "absolute", top: 0 }}>
                <div className="d-flex">
                    {/* Close Icon */}
                    <div className="">
                        <Link href="/karaoke/charts">
                            <a style={{ fontSize: "1.5em" }}>
                                <CloseSVG />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Floating Video Info Top End */}
            {/* Floating Video Info Bottom */}
            <div className="karaoke-overlay w-100">
                {/* Floating Video Info Middle */}
                <div
                    className="d-flex justify-content-center"
                    onClick={play ? onPlay : onPause}
                >
                    {/* Pause Icon */}
                    <div
                        className="p-2"
                        style={{
                            fontSize: "4em",
                            color: "rgba(220, 220, 220, 1)"
                        }}
                    >
                        {play && <PlayFilledSVG />}
                    </div>
                </div>
                {/* Floating Video Info Middle End */}
                {/* Horizontal Content */}
                <div className="d-flex pe-2">
                    <div className="p-1 flex-grow-1 align-self-end">
                        <div
                            className="m-1"
                            style={{
                                width: "100%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "clip"
                            }}
                        >
                            <b>{props.karaoke.name}</b>
                            <small>{props.karaoke.username}</small>
                            <span className="ms-1" style={{ color: "gold" }}>
                                <DecoSVG />
                                <small
                                    className="ms-1"
                                    style={{ color: "inherit" }}
                                >
                                    {props.karaoke.decos}
                                </small>
                            </span>
                            <small>
                                <b>
                                    <i className="text-secondary d-block">
                                        {props.karaoke.created_at}
                                    </i>
                                </b>
                            </small>
                        </div>
                        {/* Description */}
                        <p
                            ref={karaokeDescription}
                            className="m-0 mx-1 p-0"
                            style={{ display: "none" }}
                        >
                            {props.karaoke.description}
                        </p>
                        {/* Show More */}
                        <small>
                            <b>
                                <i
                                    ref={showDescription}
                                    className="text-secondary ms-1"
                                    onClick={showMore}
                                >
                                    show more
                                </i>
                            </b>
                        </small>
                        {/* Audio Name */}
                        <div className="d-flex py-2">
                            <div
                                className="me-2"
                                style={{ fontSize: "1.5em", color: "#FFD700" }}
                            >
                                <MusicNoteSVG />
                            </div>
                            <div className="flex-grow-1 align-self-center">
                                <Ticker mode="smooth">
                                    {({ index }) => (
                                        <span style={{ color: "#FFD700" }}>
                                            {props.karaoke.audioName}
                                        </span>
                                    )}
                                </Ticker>
                            </div>
                        </div>
                    </div>
                    <div className="align-self-end">
                        {/* Vertical Content */}
                        <div className="d-flex flex-column mb-2">
                            {/* Avatar */}
                            <div
                                className="avatar-thumbnail-xs mb-3"
                                style={{ borderRadius: "50%" }}
                            >
                                <center>
                                    <Link
                                        href={`/profile/${props.karaoke.username}`}
                                    >
                                        <a>
                                            <Img
                                                src={props.karaoke.avatar}
                                                width="50px"
                                                height="50px"
                                                alt="avatar"
                                            />
                                        </a>
                                    </Link>
                                </center>
                            </div>
                            {/* Karaoke Likes  */}
                            <div style={{ cursor: "pointer" }}>
                                <center>
                                    <span
                                        className="p-0"
                                        style={{ fontSize: "2em" }}
                                        onClick={onKaraokeLike}
                                    >
                                        {hasLiked ? (
                                            <span style={{ color: "#fb3958" }}>
                                                <HeartFilledSVG />
                                                <h6
                                                    className="mb-2"
                                                    style={{ color: "inherit" }}
                                                >
                                                    {props.karaoke.likes}
                                                </h6>
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color:
                                                        "rgba(220, 220, 220, 1)"
                                                }}
                                            >
                                                <HeartSVG />
                                                <h6
                                                    className="mb-2"
                                                    style={{ color: "inherit" }}
                                                >
                                                    {props.karaoke.likes}
                                                </h6>
                                            </span>
                                        )}
                                    </span>
                                </center>
                            </div>
                            {/* Karaoke Comments */}
                            <div
                                style={{
                                    color: "rgba(220, 220, 220, 1)",
                                    cursor: "pointer"
                                }}
                            >
                                <center>
                                    <span
                                        className="p-0"
                                        style={{ fontSize: "2em" }}
                                        onClick={() =>
                                            setShowComments("menu-open-comment")
                                        }
                                    >
                                        <CommentSVG />
                                    </span>
                                    <h6
                                        className="mb-2"
                                        style={{ color: "inherit" }}
                                    >
                                        {props.karaoke.comments}
                                    </h6>
                                </center>
                            </div>
                            {/* Save Karaoke */}
                            <div style={{ cursor: "pointer" }}>
                                <center>
                                    <span
                                        className="mb-2 p-0"
                                        style={{ fontSize: "2em" }}
                                        onClick={onKaraokeSave}
                                    >
                                        {hasSaved ? (
                                            <span style={{ color: "#FFD700" }}>
                                                <BookmarkFilledSVG />
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color:
                                                        "rgba(220, 220, 220, 1)"
                                                }}
                                            >
                                                <BookmarkSVG />
                                            </span>
                                        )}
                                    </span>
                                </center>
                            </div>
                            {/* Share Karaoke */}
                            <div className="mb-3" style={{ cursor: "pointer" }}>
                                <center>
                                    <span
                                        className="p-0"
                                        style={{
                                            fontSize: "2em",
                                            color: "rgba(220, 220, 220, 1)"
                                        }}
                                        onClick={() => onShare()}
                                    >
                                        <ShareSVG />
                                    </span>
                                </center>
                            </div>
                            {/* Current Audio */}
                            <div>
                                <center>
                                    <div
                                        ref={spiningRecord}
                                        className="rotate-record"
                                    >
                                        <Link
                                            href={`/audio-show/${props.karaoke.audio_id}`}
                                        >
                                            <a
                                                onClick={() => {
                                                    props.setShow(
                                                        props.karaoke.audio_id
                                                    );
                                                    props.setLocalStorage(
                                                        "show",
                                                        {
                                                            id:
                                                                props.karaoke
                                                                    .audio_id,
                                                            time: 0
                                                        }
                                                    );
                                                }}
                                            >
                                                <Img
                                                    src={
                                                        props.karaoke
                                                            .audioThumbnail
                                                    }
                                                    imgClass="rounded-circle"
                                                    width="50px"
                                                    height="50px"
                                                    alt="current audio"
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                </center>
                            </div>
                        </div>
                        {/* Vertical Content End */}
                    </div>
                </div>
                {/* Horizontal Content End */}
            </div>
            {/* Floating Video Info Bottom End */}

            <KaraokeCommentSection
                {...props}
                showComments={showComments}
                setShowComments={setShowComments}
            />
        </div>
    );
};

export default Karaoke;
