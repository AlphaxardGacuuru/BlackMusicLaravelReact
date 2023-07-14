import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../lib/axios";
import { useAuth } from "../hooks/auth";

import TopNavLinks from "./TopNavLinks";
import Img from "../components/Core/Img";

import CloseSVG from "../svgs/CloseSVG";
import LogoutSVG from "../svgs/LogoutSVG";
import DownloadSVG from "../svgs/DownloadSVG";
import PrivacySVG from "../svgs/PrivacySVG";
import SettingsSVG from "../svgs/SettingsSVG";
import StudioSVG from "../svgs/StudioSVG";
import MenuSVG from "../svgs/MenuSVG";
import PersonSVG from "../svgs/PersonSVG";
import DiscoverSVG from "../svgs/DiscoverSVG";
import HomeSVG from "../svgs/HomeSVG";
import EchoConfig from "../lib/echo";

const TopNav = props => {
    const router = useRouter();

    // const { logout } = useAuth({ setLogin: props.setLogin })
    const [menu, setMenu] = useState("");
    const [bottomMenu, setBottomMenu] = useState("");
    const [nMenu, setNMenu] = useState("");
    const [avatarVisibility, setAvatarVisibility] = useState("none");
    const [notifications, setNotifications] = useState([]);

    // Get number of items in video cart
    const vidCartItems = props.cartVideos.length;
    const audCartItems = props.cartAudios.length;
    const cartItems = vidCartItems + audCartItems;

    useEffect(() => {
        EchoConfig();

        // Listen to Notifications
        Echo.private(
            `App.Models.User.${props.auth.id}`
        ).notification(notification =>
            props.get("notifications", setNotifications)
        );

        // Fetch Notifications
        props.get("notifications", setNotifications);

        return () => {
            Echo.leaveChannel(`App.Models.User.${props.auth.id}`);
        };
    }, []);

    const logout = e => {
        e.preventDefault();

        axios.post(`/logout`).then(res => {
            // Remove phone from localStorage
            localStorage.clear();
            props.setMessages(["Logged out"]);
            // Reload
            location.reload();
        });
    };

    const onNotification = () => {
        axios.put(`/api/notifications/update`).then(res => {
            // Update notifications
            props.get("notifications", setNotifications);
        });
    };

    const onDeleteNotifications = id => {
        // Clear the notifications array
        setNotifications([]);

        axios.delete(`/api/notifications/${id}`).then(res => {
            // Update Notifications
            props.get("notifications", setNotifications);
        });
    };

    var display;

    // Hide TopNav from various pages
    router.pathname.match("/404") ||
    router.pathname == "/story/[id]" ||
    router.pathname.match("/story/create") ||
    router.pathname == "/karaoke/[id]" ||
    router.pathname.match("/karaoke/create") ||
    router.pathname.match("/privacy-policy") ||
    router.pathname.match("/download-app") ||
    router.pathname.match("/chat/") ||
    router.pathname.match("/post/edit") ||
    router.pathname.match("/post/create") ||
    router.pathname == "/post/[id]" ||
    router.pathname.match("/referral") ||
    router.pathname.match("/login") ||
    router.pathname.match("/register")
        ? (display = "none")
        : (display = "");

    return (
        <>
            <div id="MyElement" style={{ display: display }} className={menu}>
                {/* <!-- ***** Header Area Start ***** --> */}
                <header
                    style={{
                        backgroundColor: "#232323",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1)"
                    }}
                    className="header-area"
                >
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col-12" style={{ padding: "0" }}>
                                <div className="menu-area d-flex justify-content-between">
                                    {/* <!-- Logo Area  --> */}
                                    <div className="logo-area">
                                        <Link href="/">Black Music</Link>
                                    </div>
                                    {/* <-- Search Form --> */}
                                    <div className="contact-form hidden">
                                        <input
                                            name="search"
                                            className="form-control"
                                            placeholder="Search songs and artists"
                                            style={{
                                                textColor: "white",
                                                color: "white",
                                                width: "400px"
                                            }}
                                            onChange={e => {
                                                var regex = new RegExp(
                                                    e.target.value,
                                                    "gi"
                                                );
                                                props.setSearch(regex);
                                                router.push("/search");
                                            }}
                                        />
                                    </div>
                                    {/* Search Form End */}
                                    <div className="menu-content-area d-flex align-items-center">
                                        {/* <!-- Header Social Area --> */}
                                        <div className="header-social-area d-flex align-items-center">
                                            {props.auth?.username ==
                                            "@guest" ? (
                                                <Link href="#">
                                                    <a
                                                        className="display-4"
                                                        onClick={() =>
                                                            props.setLogin(true)
                                                        }
                                                    >
                                                        Login
                                                    </a>
                                                </Link>
                                            ) : (
                                                <TopNavLinks
                                                    {...props}
                                                    bottomMenu={bottomMenu}
                                                    setBottomMenu={
                                                        setBottomMenu
                                                    }
                                                    setNMenu={setNMenu}
                                                    avatarVisibility={
                                                        avatarVisibility
                                                    }
                                                    setAvatarVisibility={
                                                        setAvatarVisibility
                                                    }
                                                    notifications={
                                                        notifications
                                                    }
                                                    setNotifications={
                                                        setNotifications
                                                    }
                                                    vidCartItems={vidCartItems}
                                                    audCartItems={audCartItems}
                                                    cartItems={cartItems}
                                                    logout={logout}
                                                    onNotification={
                                                        onNotification
                                                    }
                                                    onDeleteNotifications={
                                                        onDeleteNotifications
                                                    }
                                                />
                                            )}
                                        </div>
                                        {/* <!-- Menu Icon --> */}
                                        <a
                                            href="#"
                                            id="menuIcon"
                                            className="hidden"
                                            onClick={e => {
                                                e.preventDefault();
                                                setMenu("menu-open");
                                            }}
                                        >
                                            <MenuSVG />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <br />
                <br />
                {/* Remove for profile page for better background image */}
                {router.pathname.match(/profile/) ||
                router.pathname.match(/charts/) ||
                router.pathname.match(/video-charts/) ||
                router.pathname.match(/audio-charts/) ? (
                    <br className="hidden" />
                ) : (
                    <span>
                        <br />
                        <br className="hidden" />
                    </span>
                )}

                {/* <!-- ***** Side Menu Area Start ***** --> */}
                <div className="mainMenu d-flex align-items-center justify-content-between">
                    {/* <!-- Close Icon --> */}
                    <div className="closeIcon" onClick={() => setMenu("")}>
                        <CloseSVG />
                    </div>
                    {/* <!-- Logo Area --> */}
                    <div className="logo-area">
                        <Link href="/">Black Music</Link>
                    </div>
                    {/* <!-- Nav --> */}
                    <div className="sonarNav wow fadeInUp" data-wow-delay="1s">
                        <nav>
                            <ul>
                                <li className="nav-item active">
                                    <Link href="/">
                                        <a
                                            style={{
                                                color:
                                                    router.pathname == "/"
                                                        ? "gold"
                                                        : "white"
                                            }}
                                            className="nav-link"
                                            onClick={() => setMenu("")}
                                        >
                                            <span
                                                style={{
                                                    float: "left",
                                                    paddingRight: "20px",
                                                    color:
                                                        router.pathname == "/"
                                                            ? "gold"
                                                            : "white"
                                                }}
                                            >
                                                <HomeSVG />
                                            </span>
                                            Home
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link href="/karaoke/charts">
                                        <a
                                            style={{
                                                color:
                                                    router.pathname ==
                                                        "/karaoke/charts" ||
                                                    router.pathname ==
                                                        "/video/charts" ||
                                                    router.pathname ==
                                                        "/audio/charts"
                                                        ? "gold"
                                                        : "white"
                                            }}
                                            className="nav-link"
                                            onClick={() => setMenu("")}
                                        >
                                            <span
                                                style={{
                                                    float: "left",
                                                    paddingRight: "20px",
                                                    color:
                                                        router.pathname ==
                                                            "/karaoke/charts" ||
                                                        router.pathname ==
                                                            "/video/charts" ||
                                                        router.pathname ==
                                                            "/audio/charts"
                                                            ? "gold"
                                                            : "white"
                                                }}
                                            >
                                                <DiscoverSVG />
                                            </span>
                                            Discover
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link href="/library">
                                        <a
                                            style={{
                                                color:
                                                    router.pathname ==
                                                    "/library"
                                                        ? "gold"
                                                        : "white"
                                            }}
                                            className="nav-link"
                                            onClick={() => setMenu("")}
                                        >
                                            <span
                                                style={{
                                                    float: "left",
                                                    paddingRight: "20px",
                                                    color:
                                                        router.pathname ==
                                                        "/library"
                                                            ? "gold"
                                                            : "white"
                                                }}
                                            >
                                                <PersonSVG />
                                            </span>
                                            Library
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <br />
                </div>
                {/* <!-- ***** Side Menu Area End ***** --> */}
            </div>

            {/* Sliding Bottom Nav */}
            <div className={bottomMenu}>
                <div className="bottomMenu">
                    <div className="d-flex align-items-center justify-content-between border-bottom border-dark">
                        <div></div>
                        {/* <!-- Close Icon --> */}
                        <div
                            className="closeIcon float-end mr-3"
                            style={{ fontSize: "0.8em" }}
                            onClick={() => setBottomMenu("")}
                        >
                            <CloseSVG />
                        </div>
                    </div>
                    <br />

                    {/* Avatar Bottom */}
                    <div
                        className="m-0 p-0"
                        style={{ display: avatarVisibility }}
                    >
                        <Link href={`/profile/${props.auth?.username}`}>
                            <a
                                style={{ padding: "0px", margin: "0px" }}
                                className="border-bottom text-start"
                                onClick={() => setBottomMenu("")}
                            >
                                <div className="d-flex">
                                    <div className="ms-3 me-3">
                                        <Img
                                            src={props.auth?.avatar}
                                            imgClass="rounded-circle"
                                            width="25px"
                                            height="25px"
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div>
                                        <h5>
                                            {props.auth?.name}{" "}
                                            <small>
                                                {props.auth?.username}
                                            </small>
                                        </h5>
                                    </div>
                                </div>
                            </a>
                        </Link>
                        <Link href="/download-app">
                            <a
                                className="p-3 text-start"
                                style={{
                                    display: props.downloadLink
                                        ? "inline"
                                        : "none",
                                    textAlign: "left"
                                }}
                                onClick={() => setBottomMenu("")}
                            >
                                <h6>
                                    <span className="ms-3 me-4">
                                        <DownloadSVG />
                                    </span>
                                    Get App
                                </h6>
                            </a>
                        </Link>
                        <Link href="/video">
                            <a
                                className="p-3 text-start"
                                onClick={() => setBottomMenu("")}
                            >
                                <h6>
                                    <span className="ms-3 me-4">
                                        <StudioSVG />
                                    </span>
                                    Studio
                                </h6>
                            </a>
                        </Link>
                        <Link href="/settings">
                            <a
                                className="p-3 text-start"
                                onClick={() => setBottomMenu("")}
                            >
                                <h6>
                                    <span className="ms-3 me-4">
                                        <SettingsSVG />
                                    </span>
                                    Settings
                                </h6>
                            </a>
                        </Link>
                        <Link href="/privacy-policy">
                            <a
                                className="p-3 text-start"
                                onClick={() => setBottomMenu("")}
                                title="Privacy Policy"
                            >
                                <h6>
                                    <span className="ms-3 me-4">
                                        <PrivacySVG />
                                    </span>
                                    Privacy Policy
                                </h6>
                            </a>
                        </Link>
                        <Link href="#">
                            <a
                                className="p-3 text-start"
                                onClick={e => {
                                    setBottomMenu("");
                                    logout(e);
                                }}
                            >
                                <h6>
                                    <span className="ms-3 me-4">
                                        <LogoutSVG />
                                    </span>
                                    Logout
                                </h6>
                            </a>
                        </Link>
                    </div>
                    {/* Avatar Bottom End */}
                </div>
            </div>
            {/* Sliding Bottom Nav End */}

            {/* Sliding Notifications Nav */}
            <div className={nMenu}>
                <div className="commentMenu">
                    <div className="d-flex align-items-center justify-content-between border-bottom border-dark">
                        <div
                            className="text-white ms-2 fw-lighter"
                            onClick={() => {
                                setNMenu("");
                                onDeleteNotifications(0);
                            }}
                        >
                            Clear
                        </div>
                        <div className="dropdown-header text-white pt-2">
                            <h5>Notifications</h5>
                        </div>
                        {/* <!-- Close Icon --> */}
                        <div
                            className="closeIcon float-end me-2"
                            style={{ fontSize: "0.8em" }}
                            onClick={() => setNMenu("")}
                        >
                            <CloseSVG />
                        </div>
                    </div>

                    {/* Notifications Bottom */}
                    <div className="m-0 p-0">
                        <div
                            style={{ maxHeight: "500px", overflowY: "scroll" }}
                        >
                            {/* Get Notifications */}
                            {notifications.map((notification, key) => (
                                <Link key={key} href={notification.url}>
                                    <a
                                        className="p-2"
                                        style={{
                                            display: "block",
                                            textAlign: "left"
                                        }}
                                        onClick={() => {
                                            setNMenu("");
                                            onDeleteNotifications(
                                                notification.id
                                            );
                                        }}
                                    >
                                        <small>{notification.message}</small>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Notifications Bottom End */}
                </div>
            </div>
            {/* Sliding Notifications Nav End */}
        </>
    );
};

export default TopNav;
