import React from "react";

const LoadingAvatar = () => {
    return (
        <span style={{ padding: "5px" }}>
            <span className="m-0 p-0">
                <center>
                    <div
                        className="avatar-thumbnail"
                        style={{ borderRadius: "50%" }}
                    >
                        <div
                            className="bg-dark text-light gradient"
                            style={{ width: "150px", height: "150px" }}
                        ></div>
                    </div>
                    <h6
                        className="loading-text gradient w-75"
                        style={{ width: "150px", color: "#232323" }}
                    >
                        name
                    </h6>
                    <h6
                        className="loading-text gradient w-50"
                        style={{ color: "#232323" }}
                    >
                        username
                    </h6>
                </center>
            </span>
        </span>
    );
};

export default LoadingAvatar;
