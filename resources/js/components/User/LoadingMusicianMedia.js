import React from "react";

const LoadingMusiciansMedia = () => {
    return (
        <div className="d-flex">
            <div className="p-2">
                <div
                    className="gradient rounded-circle"
                    style={{
                        width: "2.5em",
                        height: "2.5em"
                    }}
                ></div>
            </div>
            <div className="flex-grow-1 p-2">
                <h6
                    className="loading-text gradient w-100 mt-2"
                    style={{ color: "#232323" }}
                >
                    video
                </h6>
            </div>
            <div className="p-2">
                <button
                    className="gradient btn rounded-0 float-start mt-1"
                    style={{
                        minWidth: "90px",
                        height: "33px",
                        backgroundColor: "#232323"
                    }}
                ></button>
            </div>
        </div>
    );
};

export default LoadingMusiciansMedia;
