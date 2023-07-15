import React, { useState, useEffect, useRef } from "react";

const onAudioPlayer = (getLocalStorage, get, setErrors, auth) => {
    const [audios, setAudios] = useState(getLocalStorage("audios"));
    const [boughtAudios, setBoughtAudios] = useState(
        getLocalStorage("boughtAudios")
    );

    const [show, setShow] = useState(getLocalStorage("show"));
    const [playBtn, setPlayBtn] = useState(true);
    const [shuffle, setShuffle] = useState(false);
    const [loop, setLoop] = useState(false);
    const [dur, setDur] = useState(0);
    const [volume, setVolume] = useState(0.3);
    const [currentTime, setCurrentTime] = useState(0);
    const [progressPercent, setProgressPercent] = useState();
    const [audioLoader, setAudioLoader] = useState(true);

    // Set Refs
    const audioEl = useRef(null);
    const audioProgress = useRef(null);
    const audioContainer = useRef();
    const volumeProgress = useRef();
    const volumeContainer = useRef();

    // Get audio to play
    var audio = audios.find(audio => audio.id == show.id);

    useEffect(() => {
        get("audios", setAudios, "audios");
        get("bought-audios", setBoughtAudios, "boughtAudios");
    }, []);

    // Listen for show change and autoplay song
    useEffect(() => {
        // Check if show is 0
        if (show.id != 0 && show.id != "") {
            var playPromise = audioEl.current.play();

            if (playPromise != undefined) {
                playPromise
                    .then(() => {
                        // Automatic playback started!
                        // Show playing UI.
                        setPlayBtn(true);
                        setAudioLoader(false);
                        audioEl.current.currentTime = show.time;
                        // Song ends
                        audioEl.current.addEventListener("ended", nextSong);
                        console.log("play");
                    })
                    .catch(e => {
                        // Auto-play was prevented
                        // Show paused UI.
                        setPlayBtn(false);
                        setAudioLoader(true);
                    });
            }
        }
    }, [show.id, audio]);

    // Song titles
    var songs = [];

    // Add bought song ids to songs array
    boughtAudios.map(boughtAudio => songs.push(boughtAudio.audioId));

    // Keep track of song
    // let songIndex = songs.indexOf(show.toString())
    let songIndex = songs.indexOf(show.id);

    const fmtMSS = s => {
        return (s - (s %= 60)) / 60 + (10 < s ? ":" : ":0") + ~~s;
    };

    // Play song
    const playSong = () => {
        setPlayBtn(true);
        audioEl.current.play();
    };

    // Pause song
    const pauseSong = () => {
        setPlayBtn(false);
        audioEl.current.pause();
    };

    // Previous song
    const prevSong = () => {
        songIndex--;

        if (loop) {
            if (songIndex < 0) {
                songIndex = songs.length - 1;
            }
        } else {
            if (songIndex < 0) {
                songIndex = 0;
            }
        }

        // Shuffle
        if (shuffle) {
            const max = songs.length - 1;
            const min = 0;
            songIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        setShow(songs[songIndex]);
    };

    // Next song
    const nextSong = () => {
        songIndex++;

        // Loop
        if (loop) {
            if (songIndex > songs.length - 1) {
                songIndex = 0;
            }
        } else {
            if (songIndex > songs.length - 1) {
                songIndex = songs.length - 1;
            }
        }

        // Shuffle
        if (shuffle) {
            const max = songs.length - 1;
            const min = 0;
            songIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        setShow(songs[songIndex]);
    };

    // Update audio progress bar
    function updateProgress() {
        const progress =
            (audioEl.current.currentTime / audioEl.current.duration) * 100;
        progress >= 0 && setProgressPercent(progress);
        // audioProgress.current.style.width = `${progressPercent}%`;

        {
            /* Pause at 10s if user has not bought the audio */
        }
        if (!audio.hasBoughtAudio && audio.username != auth.username) {
            if (audioEl.current.currentTime >= 10) {
                pauseSong();
                setErrors([`Buy song to continue!`]);
            }
        }
    }

    // Set audio progress bar
    function setProgress(e) {
        const width = audioContainer.current.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        var seekTo = (clickX / width) * audioEl.current.duration;
        audioEl.current.currentTime = seekTo;
    }

    // Set volume progress bar
    const onSetVolume = e => {
        const width = volumeContainer.current.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        audioEl.current.volume = clickX / width;
        setVolume(clickX / width);
    };

    /*
     *
     * Media Session Controls */
    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: audio?.name,
            artist: audio?.username,
            album: audio?.album,
            artwork: [
                {
                    src: `/storage/${audio?.thumbnail}`,
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

    return {
        audio,
        show,
        setShow,
        playBtn,
        setPlayBtn,
        shuffle,
        setShuffle,
        loop,
        setLoop,
        dur,
        setDur,
        volume,
        setVolume,
        currentTime,
        setCurrentTime,
        audioEl,
        audioProgress,
        audioContainer,
        volumeProgress,
        volumeContainer,
        songs,
        playSong,
        pauseSong,
        prevSong,
        nextSong,
        setProgress,
        progressPercent,
        onSetVolume,
        fmtMSS,
        audioLoader,
        updateProgress
    };
};

export default onAudioPlayer;
