import React from "react";

import Btn from "@/components/Core/Btn";

const Poll = props => {
    return (
        <>
            {/* Show poll */}
            {props.parameter ? (
                props.post.isWithin24Hrs ? (
                    <Btn
                        btnClass={`mysonar-btn poll-btn mb-1 ${
                            props.hasVoted ? "btn-2" : "white-btn"
                        }`}
                        btnText={props.parameter}
                        btnStyle={{ width: "100%" }}
                        onClick={() =>
                            props.onPoll(props.post.id, props.parameter)
                        }
                    />
                ) : (
                    <div
                        className="progress rounded-0 mb-1"
                        style={{ height: "33px" }}
                    >
                        <div
                            className="progress-bar"
                            style={{
                                width: props.width,
                                backgroundColor: props.hasVoted
                                    ? props.bgColor
                                    : props.bgColor2
                            }}
                        >
                            {props.text}
                        </div>
                    </div>
                )
            ) : (
                ""
            )}
        </>
    );
};

export default Poll;
