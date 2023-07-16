import React from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "./axios";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

const EchoConfig = () => {
    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        wsPort: 6001,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: false,
        disableStats: true,
        // authEndpoint: "localhost:8000/broadcasting/auth",
        authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    axios
                        .post("/api/broadcasting/auth", {
                            socket_id: socketId,
                            channel_name: channel.name
                        })
                        .then(response => callback(null, response.data))
                        .catch(error => callback(error));
                }
            };
        }
    });
};

export default EchoConfig;
