import React from "react";

import Img from "@/components/Core/Img";
import { Link } from "react-router-dom";

const StoryMedia = props => {
    return (
        <span className="mx-2 pt-0 px-0 pb-2 my-card">
            {/* Story Media */}
            {/* <div style={{ border: "8px solid #000" }}> */}
            <div
                className="story-thumbnail"
                style={{
                    display: "inline-block",
                    border: `2px solid ${
                        props.story.hasSeen ? "#232323" : "#FFD700"
                    }`
                }}
            >
                <Link to={`/story/${props.story.id}`} passHref>
                    <a>
                        <Img
                            src={`/storage/${props.story.media[0]["image"]}`}
                            width="180em"
                            height="320em"
                        />
                    </a>
                </Link>
            </div>
            {/* </div> */}
            {/* Story Media End */}
            {/* User info */}
            <div className="d-flex" style={{ maxWidth: "220em" }}>
                <div className="py-2" style={{ minWidth: "40px" }}>
                    <Link to={`/profile/${props.story.username}`}>
                        <a>
                            <Img
                                src={props.story.avatar}
                                className="rounded-circle"
                                width="40px"
                                height="40px"
                                alt="user"
                                loading="lazy"
                            />
                        </a>
                    </Link>
                </div>
                <div className="px-2">
                    <h6
                        className="m-0 pt-2 px-1"
                        style={{
                            width: "5em",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "clip",
                            textAlign: "left"
                        }}
                    >
                        {props.story.name}
                    </h6>
                    <h6 className="float-start">
                        <small>{props.story.username}</small>
                    </h6>
                </div>
            </div>
            {/* User info End */}
        </span>
    );
};

export default StoryMedia;
