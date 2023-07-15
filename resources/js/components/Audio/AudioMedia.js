import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "@/lib/axios";
import Img from "@/components/Core/Img";

import Btn from "@/components/Core/Btn";

import CartSVG from "@/svgs/CartSVG";

const AudioMedia = props => {
    const history = useHistory();

    const [inCart, setInCart] = useState(props.audio.inCart);

    useEffect(() => {
        // Set new cart with data with auth
        setInCart(props.audio.inCart);
    }, [props.audio]);

    // Buy function
    const onBuyAudios = () => {
        onCartAudios();
        setTimeout(() => history.push("/cart"), 500);
    };

    // Function for adding audio to cart
    const onCartAudios = () => {
        // Add Audio to Cart
        axios
            .post(`/api/cart-audios`, {
                audio: props.audio.id
            })
            .then(res => {
                props.setMessages([res.data.message]);
                // Check if Cart Videos should be fetched
                props.get("cart-audios", props.setCartAudios);
            })
            .catch(err => props.getErrors(err, true));
    };

    return (
        <div className="d-flex p-2">
            <div className="audio-thumbnail">
                <Link to={`/audio/${props.audio.id}`}
                        onClick={() => {
                            props.audioStates.setShow({
                                id: props.audio.id,
                                time: 0
                            });
                            props.setLocalStorage("show", {
                                id: props.audio.id,
                                time: 0
                            });
                        }}
                    >
                        <Img
                            src={props.audio.thumbnail}
                            width="50px"
                            height="50px"
                        />
                </Link>
            </div>
            <div className="p-2 me-auto">
                <span
                    onClick={() => {
                        props.audioStates.setShow({
                            id: props.audio.id,
                            time: 0
                        });
                        props.setLocalStorage("show", {
                            id: props.audio.id,
                            time: 0
                        });
                    }}
                >
                    <h6 className="mb-0 pb-0 audio-text">{props.audio.name}</h6>
                    <h6 className="mt-0 pt-0 audio-text">
                        <small>{props.audio.username}</small>
                        <small className="ms-1">{props.audio.ft}</small>
                    </h6>
                </span>
            </div>
            {props.audio.hasBoughtAudio || props.hasBoughtAudio ? (
                ""
            ) : inCart ? (
                <div>
                    <Btn
                        btnClass="mysonar-btn btn-2 fs-6"
                        btnStyle={{ minWidth: "40px" }}
                        onClick={() => {
                            setInCart(!inCart);
                            onCartAudios();
                        }}
                        btnText={<CartSVG />}
                    />
                </div>
            ) : (
                <>
                    <div>
                        <Btn
                            btnClass="mysonar-btn white-btn fs-6"
                            btnStyle={{ minWidth: "40px" }}
                            onClick={() => {
                                setInCart(!inCart);
                                onCartAudios();
                            }}
                            btnText={<CartSVG />}
                        />
                    </div>
                    <div className="ms-2">
                        <Btn
                            btnClass="mysonar-btn green-btn btn-2 float-right"
                            btnText="KES 10"
                            onClick={() => onBuyAudios()}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

AudioMedia.defaultProps = {
    hasBoughtAudio: false
};

export default AudioMedia;
