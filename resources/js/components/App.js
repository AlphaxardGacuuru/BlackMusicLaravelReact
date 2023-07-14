import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import axios from "../lib/axios";


import Messages from "../components/Core/Messages";
import TopNav from "../components/Layouts/TopNav";
import BottomNav from "../components/Layouts/BottomNav";
import AudioPlayer from "../components/Audio/AudioPlayer";
import ScrollToTop from "../components/Core/ScrollToTop";
import onAudioPlayer from "../functions/onAudioPlayer";

import LoginPopUp from "../components/Auth/LoginPopUp";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Referral from "../components/Auth/Referral";

import Index from "../pages/Index";
import Search from "../pages/Search";
import Cart from "../pages/Cart";
import Library from "../pages/Library";
import DownloadApp from "../pages/download-app";

import Profile from "../pages/Profile";
import ProfileEdit from "../pages/ProfileEdit";
import PostCreate from "../pages/PostCreate";
import PostShow from "../pages/PostShow";
import PostEdit from "../pages/PostEdit";

import KaraokeCharts from "../pages/KaraokeCharts";
import KaraokeShow from "../pages/KaraokeShow";
import KaraokeCreate from "../pages/KaraokeCreate";

import VideoCharts from "../pages/VideoCharts";
import VideoShow from "../pages/VideoShow";
import Videos from "../pages/Videos";
import VideoCreate from "../pages/VideoCreate";
import VideoEdit from "../pages/VideoEdit";
import VideoAlbumCreate from "../pages/VideoAlbumCreate";
import VideoAlbumEdit from "../pages/VideoAlbumEdit";

import AudioCharts from "../pages/AudioCharts";
import AudioShow from "../pages/AudioShow";
import Audios from "../pages/Audios";
import AudioCreate from "../pages/AudioCreate";
import AudioEdit from "../pages/AudioEdit";
import AudioAlbumCreate from "../pages/AudioAlbumCreate";
import AudioAlbumEdit from "../pages/AudioAlbumEdit";

import Admin from "../pages/admin";
import Settings from "../pages/Settings";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Chat from "../pages/Chat";
import ChatThread from "../pages/ChatThread";
import NewChat from "../pages/NewChat";

import NotFound from "../pages/NotFound";
import { random } from "lodash";

function App() {
    // Function for checking local storage
    const getLocalStorage = state => {
        if (typeof window !== "undefined" && localStorage.getItem(state)) {
            return JSON.parse(localStorage.getItem(state));
        } else {
            return [];
        }
    };

    // Function for checking local storage
    const getLocalStorageAuth = state => {
        if (typeof window !== "undefined" && localStorage.getItem(state)) {
            return JSON.parse(localStorage.getItem(state));
        } else {
            return {
                name: "Guest",
                username: "@guest",
                avatar: "/storage/avatars/male-avatar.png",
                accountType: "normal",
                decos: 0,
                posts: 0,
                fans: 0
            };
        }
    };

    // Function to set local storage
    const setLocalStorage = (state, data) => {
        localStorage.setItem(state, JSON.stringify(data));
    };

    const url = process.env.MIX_APP_URL;

    // Declare states
    const [messages, setMessages] = useState([]);
    const [errors, setErrors] = useState([]);
    const [login, setLogin] = useState();
    const [auth, setAuth] = useState(getLocalStorageAuth("auth"));

    const [audios, setAudios] = useState(getLocalStorage("audios"));
    const [audioAlbums, setAudioAlbums] = useState(
        getLocalStorage("audioAlbums")
    );
    const [audioLikes, setAudioLikes] = useState(getLocalStorage("audioLikes"));
    const [boughtAudios, setBoughtAudios] = useState(
        getLocalStorage("boughtAudios")
    );
    const [boughtVideos, setBoughtVideos] = useState(
        getLocalStorage("boughtVideos")
    );
    const [cartAudios, setCartAudios] = useState(getLocalStorage("cartAudios"));
    const [cartVideos, setCartVideos] = useState(getLocalStorage("cartVideos"));
    const [karaokes, setKaraokes] = useState([]);
    const [posts, setPosts] = useState(getLocalStorage("posts"));
    const [users, setUsers] = useState(getLocalStorage("users"));
    const [videos, setVideos] = useState(getLocalStorage("videos"));
    const [videoAlbums, setVideoAlbums] = useState(
        getLocalStorage("videoAlbums")
    );
    const [videoLikes, setVideoLikes] = useState(getLocalStorage("videoLikes"));

    // Search State
    const [search, setSearch] = useState("!@#$%^&");
    const searchInput = useRef(null);

    // Function for fetching data from API
    const get = (endpoint, setState, storage = null, errors = true) => {
        axios
            .get(`/api/${endpoint}`)
            .then(res => {
                var data = res.data ? res.data.data : [];
                setState(data);
                storage && setLocalStorage(storage, data);
            })
            .catch(() => errors && setErrors([`Failed to fetch ${endpoint}`]));
    };

    // Function for getting errors from responses
    const getErrors = (err, message = false) => {
        const resErrors = err.response.data.errors;
        var newError = [];
        for (var resError in resErrors) {
            newError.push(resErrors[resError]);
        }
        // Get other errors
        message && newError.push(err.response.data.message);
        setErrors(newError);
    };

    // Fetch data on page load
    useEffect(() => {
        // Import Js for Bootstrap
        import("bootstrap/dist/js/bootstrap");

        // Redirect if URL is not secure
        var unsecureUrl = window.location.href.match(
            /http:\/\/music.black.co.ke/
        );

        if (unsecureUrl) {
            window.location.href = "https://music.black.co.ke";
        }

        get("auth", setAuth, "auth", false);
        get("cart-videos", setCartVideos, "cartVideos");
        get("cart-audios", setCartAudios, "cartAudios");
    }, []);

    console.log("rendered");

    const audioStates = onAudioPlayer(getLocalStorage, get, setErrors, auth);

    // Function to focus on search input
    const onSearchIconClick = () => {
        window.location.href.match("/search") && searchInput.current.focus();
    };

    /*
     *
     * Media Session Controls */
    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: showAudio.name,
            artist: showArtist.username,
            album: showAudio.album,
            artwork: [
                {
                    src: `/storage/${showAudio.thumbnail}`,
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        });

        let skipTime = 10; // Time to skip in seconds

        navigator.mediaSession.setActionHandler("play", playSong);
        navigator.mediaSession.setActionHandler("pause", pauseSong);
        navigator.mediaSession.setActionHandler("seekbackward", function() {
            // User clicked "Seek Backward" media notification icon.
            audio.current.currentTime = Math.max(
                audio.current.currentTime - skipTime,
                0
            );
        });
        navigator.mediaSession.setActionHandler("seekforward", function() {
            // User clicked "Seek Forward" media notification icon.
            audio.current.currentTime = Math.min(
                audio.current.currentTime + skipTime,
                audio.current.duration
            );
        });
        navigator.mediaSession.setActionHandler("previoustrack", prevSong);
        navigator.mediaSession.setActionHandler("nexttrack", nextSong);
    }

    /*
     *
     * Register service worker */
    if (window.location.href.match(/https/)) {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/sw.js");
                // .then((reg) => console.log('Service worker registered', reg))
                // .catch((err) => console.log('Service worker not registered', err));
            });
        }
    }

    /*
     *
     * PWA Install button */
    let deferredPrompt;
    var btnAdd = useRef();
    const [downloadLink, setDownloadLink] = useState();
    const [downloadLinkText, setDownloadLinkText] = useState("");

    // Listen to the install prompt
    window.addEventListener("beforeinstallprompt", e => {
        deferredPrompt = e;

        // Show the button
        setDownloadLink(true);

        // Action when button is clicked
        btnAdd.current.addEventListener("click", e => {
            // Show install banner
            deferredPrompt.prompt();
            // Check if the user accepted
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === "accepted") {
                    setDownloadLinkText("User accepted");
                }
                deferredPrompt = null;
            });

            window.addEventListener("appinstalled", evt => {
                setDownloadLinkText("Installed");
            });
        });
    });

    // Show the notification
    function displayNotification() {
        if (Notification.permission == "granted") {
            navigator.serviceWorker.getRegistration().then(reg => {
                var options = {
                    body: "Here is a notification body",
                    actions: [
                        {
                            action: "explore",
                            title: "Go to the site",
                            icon: "storage/img/musical-note.png"
                        },
                        {
                            action: "close",
                            title: "No thank you",
                            icon: "storage/img/musical-note.png"
                        }
                    ],
                    icon: "storage/img/musical-note.png",
                    vibrate: [100, 50, 100],
                    // Allows us to identify notification
                    data: { primaryKey: 1 }
                };
                reg.showNotification("Hello world", options);
            });
        }
    }

    // Subscribe to push service
    function subscribeToPush() {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.pushManager
                .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: process.env.MIX_VAPID_PUBLIC_KEY
                })
                .then(sub => {
                    // send sub.toJSON() to server
                    const parsed = JSON.parse(JSON.stringify(sub));

                    axios.get("sanctum/csrf-cookie").then(() => {
                        axios
                            .post(`/api/push`, {
                                endpoint: parsed.endpoint,
                                auth: parsed.keys.auth,
                                p256dh: parsed.keys.p256dh
                            })
                            .then(res => {
                                setMessages([res.data]);
                            })
                            .catch(err => {
                                const resErrors = err.response.data.errors;
                                var resError;
                                var newError = [];
                                for (resError in resErrors) {
                                    newError.push(resErrors[resError]);
                                }
                                setErrors(newError);
                                console.log(err.response.data.message);
                            });
                    });
                });
        });
    }

    function sendPush() {
        axios
            .get("/api/push/create")
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data));
    }

    // All states
    const GLOBAL_STATE = {
        baseUrl,
        get,
        getErrors,
        getLocalStorage,
        setLocalStorage,
        login,
        setLogin,
        url,
        auth,
        setAuth,
        messages,
        setMessages,
        errors,
        setErrors,
        audios,
        setAudios,
        audioAlbums,
        setAudioAlbums,
        audioLikes,
        setAudioLikes,
        boughtAudios,
        setBoughtAudios,
        boughtVideos,
        setBoughtVideos,
        cartAudios,
        setCartAudios,
        cartVideos,
        setCartVideos,
        karaokes,
        setKaraokes,
        posts,
        setPosts,
        users,
        setUsers,
        videoAlbums,
        setVideoAlbums,
        videos,
        setVideos,
        search,
        setSearch,
        users,
        setUsers,
        videos,
        setVideos,
        videoAlbums,
        setVideoAlbums,
        videoLikes,
        setVideoLikes,
        karaokes,
        setKaraokes,
        onFollow,
        onCartVideos,
        onCartAudios,
        displayNotification,
        subscribeToPush,
        sendPush,
        // Search
        onSearchIconClick,
        searchInput,
        // Audio Player
        audioStates,
        // PWA
        btnAdd,
        downloadLink,
        setDownloadLink,
        downloadLinkText,
        setDownloadLinkText
    };

    const showLoginPopUp = auth.username == "@guest" && (
        <LoginPopUp {...GLOBAL_STATE} />
    );

    return (
        <>
            <Router>
                <ScrollToTop />
                {login && <LoginPopUp {...GLOBAL_STATE} />}

                <TopNav {...GLOBAL_STATE} />
                <Route
                    path="/download"
                    exact
                    render={props => <DownloadApp {...GLOBAL_STATE} />}
                />

                <Route
                    path="/login"
                    exact
                    render={props => <Login {...GLOBAL_STATE} />}
                />
                <Route
                    path="/register/:name/:email/:avatar"
                    exact
                    render={props => <Register {...GLOBAL_STATE} />}
                />
                <Route
                    path="/referral/:referer"
                    exact
                    render={props => <Referral {...GLOBAL_STATE} />}
                />
                <Route
                    path="/"
                    exact
                    render={props => <Index {...GLOBAL_STATE} />}
                />
                <Route
                    path="/search"
                    exact
                    render={props => (
                        <>
                            <Search {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/cart"
                    exact
                    render={props => (
                        <>
                            <Cart {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/library"
                    exact
                    render={props => (
                        <>
                            <Library {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/profile/:username"
                    exact
                    render={props => (
                        <>
                            <Profile {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/profile-edit"
                    exact
                    render={props => (
                        <>
                            <ProfileEdit {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/post-create"
                    exact
                    render={props => (
                        <>
                            <PostCreate {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/post-show/:id"
                    exact
                    render={props => (
                        <>
                            <PostShow {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/post-edit/:id"
                    exact
                    render={props => (
                        <>
                            <PostEdit {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />

                {/* Karaoke Routes */}
                <Route
                    path="/karaoke-charts"
                    exact
                    render={props => <KaraokeCharts {...GLOBAL_STATE} />}
                />
                <Route
                    path="/karaoke-create/:audio"
                    exact
                    render={props => <KaraokeCreate {...GLOBAL_STATE} />}
                />
                <Route
                    path="/karaoke-show/:id"
                    exact
                    render={props => <KaraokeShow {...GLOBAL_STATE} />}
                />

                {/* Video Routes */}
                <Route
                    path="/video-charts"
                    exact
                    render={props => <VideoCharts {...GLOBAL_STATE} />}
                />
                <Route
                    path="/video-show/:show/:referer?"
                    exact
                    render={props => <VideoShow {...GLOBAL_STATE} />}
                />
                <Route
                    path="/videos"
                    exact
                    render={props => (
                        <>
                            <Videos {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/video-create"
                    exact
                    render={props => (
                        <>
                            <VideoCreate {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/video-edit/:id"
                    exact
                    render={props => (
                        <>
                            <VideoEdit {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/video-album-create"
                    exact
                    render={props => (
                        <>
                            <VideoAlbumCreate {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/video-album-edit/:id"
                    exact
                    render={props => (
                        <>
                            <VideoAlbumEdit {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />

                {/* Audio Routes */}
                <Route
                    path="/audio-charts"
                    exact
                    render={props => <AudioCharts {...GLOBAL_STATE} />}
                />
                <Route
                    path="/audio-show/:show/:referer?"
                    exact
                    render={props => <AudioShow {...GLOBAL_STATE} />}
                />
                <Route
                    path="/audios"
                    exact
                    render={props => (
                        <>
                            <Audios {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/audio-create"
                    exact
                    render={props => (
                        <>
                            <AudioCreate {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/audio-edit/:id"
                    exact
                    render={props => (
                        <>
                            <AudioEdit {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/audio-album-create"
                    exact
                    render={props => (
                        <>
                            <AudioAlbumCreate {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/audio-album-edit/:id"
                    exact
                    render={props => (
                        <>
                            <AudioAlbumEdit {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/admin"
                    exact
                    render={props => (
                        <>
                            <Admin {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/settings"
                    exact
                    render={props => (
                        <>
                            <Settings {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/privacy-policy"
                    exact
                    render={() => <PrivacyPolicy />}
                />
                <Route
                    path="/chat"
                    exact
                    render={props => (
                        <>
                            <Chat {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/chat/:username"
                    exact
                    render={props => (
                        <>
                            <ChatThread {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />
                <Route
                    path="/new-chat"
                    exact
                    render={props => (
                        <>
                            <NewChat {...GLOBAL_STATE} />
                            {showLoginPopUp}
                        </>
                    )}
                />

                <Messages {...GLOBAL_STATE} />
                <BottomNav {...GLOBAL_STATE} />
            </Router>

            <AudioPlayer {...GLOBAL_STATE} />

            {/* Install button */}
            <button ref={btnAdd} style={{ display: "none" }}>
                test
            </button>
        </>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
