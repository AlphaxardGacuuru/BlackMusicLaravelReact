import React from "react";

const Messages = ({ messages, setMessages, errors, setErrors }) => {
    // Reset Messages and Errors to null after 3 seconds
    if (errors.length > 0 || messages.length > 0) {
        setTimeout(() => setErrors([]), 2900);
        setTimeout(() => setMessages([]), 2900);
    }

    return (
        <center>
            <h6
                id="snackbar"
                className={
                    errors.length > 0 || messages.length > 0 ? "show" : ""
                }
            >
                {/* Message Toast */}
                {messages.map((message, key) => (
                    <div
                        key={key}
                        className="bg-success p-2 mt-2"
                        style={{ transition: "0.3s" }}
                    >
                        {message}
                    </div>
                ))}
                {/* Error Toast */}
                {errors.map((error, key) => (
                    <div
                        key={key}
                        className="p-2 mt-2"
                        style={{
                            backgroundColor: "#232323",
                            transition: "0.3s"
                        }}
                    >
                        {error}
                    </div>
                ))}
            </h6>
        </center>
    );
};

export default Messages;
