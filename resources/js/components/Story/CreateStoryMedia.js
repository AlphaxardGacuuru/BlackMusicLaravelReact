import Img from "next/image";
import Link from "next/link";

import PlusSVG from "../svgs/PlusSVG";

const CreateStoryMedia = props => {
    return (
        <span className="mx-2 pt-0 px-0 pb-2 my-card">
            {/* Story Media */}
            <div
                className="story-thumbnail"
                style={{
                    display: "inline-block",
                    border: "2px solid #232323"
                }}
            >
                <Link href="/story/create" passHref>
                    <a>
                        <span style={{ fontSize: "8em" }}>
                            <PlusSVG />
                        </span>
                        {/* <Img src={props.auth.avatar} width="180em" height="180em" /> */}
                    </a>
                </Link>
            </div>
            {/* Story Media End */}
            {/* User info */}
            <div className="d-flex" style={{ maxWidth: "220em" }}>
                <div className="py-2" style={{ minWidth: "40px" }}>
                    <Link href={`/profile/${props.auth?.username}`}>
                        <a>
                            <Img
                                src={props.auth?.avatar}
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
                        {props.auth?.name}
                    </h6>
                    <h6 className="float-start">
                        <small>{props.auth?.username}</small>
                    </h6>
                </div>
            </div>
            {/* User info End */}
        </span>
    );
};

export default CreateStoryMedia;
