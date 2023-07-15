import React from "react";

const LoadingKaraokeMedia = () => {
    return (
        <div
            className="m-1 karaoke-media"
            style={{
                borderRadius: "0px",
                textAlign: "center",
                color: "#232323"
            }}
        >
            <div
                className="karaoke-thumbnail gradient"
                style={{ width: "100%", minHeight: "25.6em" }}
            >
                <div
                    className="gradient"
                    style={{ width: "1080px", height: "1920px" }}
                ></div>
            </div>
            <div className="d-flex">
                <div className="p-1">
                    <div
                        className="gradient rounded-circle"
                        style={{
                            width: "3em",
                            height: "3em"
                        }}
                    ></div>
                </div>
                <div className="p-1 flex-grow-1">
                    <h6
                        className="loading-text gradient w-75"
                        style={{ width: "150px", color: "#232323" }}
                    >
                        video
                    </h6>
                    <h6
                        className="loading-text gradient w-50"
                        style={{ color: "#232323" }}
                    >
                        username
                    </h6>
                </div>
            </div>
        </div>
    );
};

export default LoadingKaraokeMedia;
