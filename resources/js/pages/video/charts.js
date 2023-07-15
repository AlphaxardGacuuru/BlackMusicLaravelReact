import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Carousel from "@/components/Core/Carousel";
import LoadingAvatarMedia from "@/components/User/LoadingAvatarMedia";
import LoadingVideoMedia from "@/components/Video/LoadingVideoMedia";
import VideoMedia from "@/components/Video/VideoMedia";
import AvatarMedia from "@/components/User/AvatarMedia";

const VideoCharts = props => {
    const location = useLocation();

    //Declare States
    const [chart, setChart] = useState("Newly Released");
    const [genre, setGenre] = useState("All");
    const [artistSlice, setArtistSlice] = useState(8);
    const [videoSlice, setVideoSlice] = useState(8);
    // Charts
    const [newlyReleased, setNewlyReleased] = useState(props.newlyReleased);
    const [trending, setTrending] = useState(props.trending);
    const [topDownloaded, setTopDownloaded] = useState(props.topDownloaded);
    const [topLiked, setTopLiked] = useState(props.topLiked);

    useEffect(() => {
        // Set state for chart list
        if (chart == "Newly Released") {
            // Fetch Newly Released Videos
            props.get("video-charts/newly-released", setNewlyReleased);
        } else if (chart == "Trending") {
            // Fetch Trending Videos
            props.get("video-charts/trending", setTrending);
        } else if (chart == "Top Downloaded") {
            // Fetch Top Downloaded Videos
            props.get("video-charts/top-downloaded", setTopDownloaded);
        } else {
            // Fetch Top Liked Videos
            props.get("video-charts/top-liked", setTopLiked);
        }
    }, [chart]);

    useEffect(() => {
        // Load more on page bottom
        window.onscroll = function(ev) {
            if (location.pathname.match(/video-charts/)) {
                const bottom =
                    window.innerHeight + window.scrollY >=
                    document.body.offsetHeight -
                        document.body.offsetHeight / 16;

                if (bottom) {
                    setVideoSlice(videoSlice + 8);
                }
            }
        };
    }, []);

    // Array for links
    const charts = [
        "Newly Released",
        "Trending",
        "Top Downloaded",
        "Top Liked"
    ];
    const genres = [
        "All",
        "Afro",
        "Benga",
        "Blues",
        "Boomba",
        "Country",
        "Cultural",
        "EDM",
        "Genge",
        "Gospel",
        "Hiphop",
        "Jazz",
        "Music of Kenya",
        "Pop",
        "R&B",
        "Rock",
        "Sesube",
        "Taarab"
    ];

    // Set state for chart list
    if (chart == "Newly Released") {
        var chartList = newlyReleased;
    } else if (chart == "Trending") {
        var chartList = trending;
    } else if (chart == "Top Downloaded") {
        var chartList = topDownloaded;
    } else {
        var chartList = topLiked;
    }

    // Function for loading more artists
    const handleScroll = e => {
        const bottom =
            e.target.scrollLeft >=
            e.target.scrollWidth - e.target.scrollWidth / 3;

        if (bottom) {
            setArtistSlice(artistSlice + 10);
        }
    };

    // Random array for dummy loading elements
    const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            <Carousel />
            <br />

            {/* <!-- Scroll menu - */}
            <div id="chartsMenu" className="hidden-scroll mt-2">
                <span>
                    <Link to="/karaoke/charts">
                        <a>
                            <h3>Karaoke</h3>
                        </a>
                    </Link>
                </span>
                <span>
                    <Link to="#">
                        <a>
                            <h3 className="active-scrollmenu">Videos</h3>
                        </a>
                    </Link>
                </span>
                <span>
                    <Link to="/audio/charts">
                        <a>
                            <h3>Audios</h3>
                        </a>
                    </Link>
                </span>
            </div>

            {/* List of Charts */}
            <div id="chartsMenu" className="hidden-scroll m-0">
                {charts.map((chartItem, key) => (
                    <span key={key}>
                        <a
                            href="#"
                            onClick={e => {
                                e.preventDefault();
                                setChart(chartItem);
                            }}
                        >
                            <h5
                                className={
                                    chart == chartItem
                                        ? "active-scrollmenu m-0"
                                        : "m-0"
                                }
                            >
                                {chartItem}
                            </h5>
                        </a>
                    </span>
                ))}
            </div>

            {/* List of Genres */}
            <div id="video-chartsMenu" className="hidden-scroll m-0">
                {genres.map((genreItem, key) => (
                    <span key={key}>
                        <a
                            href="#"
                            onClick={e => {
                                e.preventDefault();
                                setGenre(genreItem);
                            }}
                        >
                            <h6
                                className={
                                    genre == genreItem
                                        ? "active-scrollmenu m-0"
                                        : "m-0"
                                }
                            >
                                {genreItem}
                            </h6>
                        </a>
                    </span>
                ))}
            </div>
            {/* End of List Genres */}

            {/* <!-- Chart Area - */}
            <div className="row">
                <div className="col-sm-12">
                    {/* <!-- ****** Artists Area Start ****** - */}
                    <h2>Artists</h2>
                    <div className="hidden-scroll" onScroll={handleScroll}>
                        {/* Loading animation */}
                        {dummyArray
                            .filter(() => chartList.length < 1)
                            .map((item, key) => (
                                <LoadingAvatarMedia key={key} />
                            ))}

                        {/*  Echo Artists  */}
                        <span style={{ padding: "5px" }}>
                            {chartList.artists
                                ?.filter(
                                    artist => artist.username != "@blackmusic"
                                )
                                .slice(0, artistSlice)
                                .map((artist, key) => (
                                    <AvatarMedia key={key} user={artist} />
                                ))}
                        </span>
                        {/* Echo Artists End */}
                    </div>
                    {/* <!-- ****** Artists Area End ****** - */}

                    {/* <!-- ****** Songs Area ****** - */}
                    <h2>Songs</h2>
                    <br />
                    <div
                        className="d-flex flex-wrap justify-content-center"
                        onScroll={handleScroll}
                    >
                        {/* Loading Video items */}
                        {dummyArray
                            .filter(() => chartList.length < 1)
                            .map((item, key) => (
                                <center className="mx-1 mb-2">
                                    <LoadingVideoMedia key={key} />
                                </center>
                            ))}

                        {/* Real Video items */}
                        {chartList.videos
                            ?.filter(video => video.username != "@blackmusic")
                            .filter(video =>
                                genre == "All" ? true : video.genre == genre
                            )
                            .slice(0, videoSlice)
                            .map((video, key) => (
                                <span style={{ textAlign: "center" }}>
                                    <center
                                        key={video.id}
                                        className="mx-1 mb-2"
                                    >
                                        <VideoMedia {...props} video={video} />
                                    </center>
                                </span>
                            ))}
                    </div>
                    {/* <!-- ****** Songs Area End ****** - */}
                </div>
            </div>
        </>
    );
};

export default VideoCharts;
