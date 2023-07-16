import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "@/lib/axios";

import Img from "@/components/Core/Img";
import Btn from "@/components/Core/Btn";

import CartSVG from "@/svgs/CartSVG";
import { useEffect, useState } from "react";

const VideoMedia = props => {
    const router = useHistory();

    const [inCart, setInCart] = useState(props.video.inCart);

    useEffect(() => {
        // Set new cart with data with auth
        setInCart(props.video.inCart);
    }, [props.video]);

    // Buy function
    const onBuyVideos = () => {
        onCartVideos();
        setTimeout(() => router.push("/cart"), 500);
    };

    // Function for adding video to cart
    const onCartVideos = () => {
        // Add Video to Cart
        axios
            .post(`/api/cart-videos`, {
                video: props.video.id
            })
            .then(res => {
                props.setMessages([res.data.message]);
                // Check if Cart Videos should be fetched
                props.get("cart-videos", props.setCartVideos);
            })
            .catch(err => props.getErrors(err, true));
    };

    return (
        <span
            className="mx-2 pt-0 px-0 pb-2 my-card"
            style={{ display: "inline-block" }}
            onClick={() => {
                props.audioStates.pauseSong();
                props.audioStates.setShow({ id: 0, time: 0 });
            }}
        >
            <div className="video-media">
                <div className="video-thumbnail">
                    <Link to={`/video/${props.video.id}`}>
                            <Img
                                src={props.video.thumbnail}
                                width="320em"
                                height="180em"
                            />
                    </Link>
                </div>
                {props.video.hasBoughtVideo || props.hasBoughtVideo ? (
                    ""
                ) : (
                    <div className="d-flex justify-content-around video-media-overlay">
                        {inCart ? (
                            <div>
                                <Btn
                                    btnClass="mysonar-btn btn-2 fs-6"
                                    onClick={() => {
                                        setInCart(!inCart);
                                        onCartVideos();
                                    }}
                                    btnText={<CartSVG />}
                                />
                            </div>
                        ) : (
                            <>
                                <div>
                                    <Btn
                                        btnClass="mysonar-btn white-btn mb-1 fs-6"
                                        onClick={() => {
                                            setInCart(!inCart);
                                            onCartVideos();
                                        }}
                                        btnText={<CartSVG />}
                                    />
                                </div>
                                <div>
                                    <Btn
                                        btnClass="mysonar-btn green-btn btn-2"
                                        btnText="KES 20"
                                        onClick={() => onBuyVideos()}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            {/* User info */}
            <div className="d-flex" style={{ maxWidth: "220em" }}>
                <div className="py-2" style={{ minWidth: "40px" }}>
                    <Link to={`/profile/${props.video.username}`}>
                            <Img
                                src={props.video.avatar}
                                className="rounded-circle"
                                width="30px"
                                height="30px"
                                alt="user"
                                loading="lazy"
                            />
                    </Link>
                </div>
                <div className="px-2">
                    <h6
                        className="m-0 pt-2 px-1"
                        style={{
                            width: "15em",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "clip",
                            textAlign: "left"
                        }}
                    >
                        {props.video.name}
                    </h6>
                    <h6 className="float-start">
                        <small>
                            {props.video.username} {props.video.ft}
                        </small>
                    </h6>
                </div>
            </div>
            {/* User info End */}
        </span>
    );
};

VideoMedia.defaultProps = {
    hasBoughtVideo: false
};

export default VideoMedia;
