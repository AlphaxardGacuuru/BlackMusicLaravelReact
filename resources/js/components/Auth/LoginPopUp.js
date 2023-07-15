import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "@/lib/axios";
// import { useAuth } from "@/hooks/auth";

import Btn from "@/components/Core/Btn";

import CloseSVG from "@/svgs/CloseSVG";

import {
    GoogleLoginButton,
    FacebookLoginButton,
    TwitterLoginButton
} from "react-social-login-buttons";

const LoginPopUp = props => {

    const history = useHistory();

    // const [name, setName] = useState('Alphaxard Gacuuru')
    const [name, setName] = useState("Black Music");
    // const [username, setUsername] = useState('@alphaxardG')
    const [username, setUsername] = useState("@blackmusic");
    // const [email, setEmail] = useState('alphaxardgacuuru47@gmail.com')
    const [email, setEmail] = useState("al@black.co.ke");
    // const [phone, setPhone] = useState('0700364446')
    const [phone, setPhone] = useState("");
    // const [password, setPassword] = useState('0700364446')
    const [password, setPassword] = useState("0700000000");
    const [shouldRemember, setShouldRemember] = useState();
    const [status, setStatus] = useState();
    const [errors, setErrors] = useState([]);

    const onSocial = website => {
        // window.location.href = `${props.url}/api/login/${website}`
        // axios.get(`${props.url}/api/login/${website}`)
        // .then((res) => console.log(res.data.data))
        // register({ name, username, email, phone, password, password_confirmation: password, setErrors })
        // login({ username, phone, email, password, remember: shouldRemember, setErrors, setStatus })
    };

    // const [phone, setPhone] = useState('07')
    const [phoneLogin, setPhoneLogin] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post(`/login`, {
                    phone: phone,
                    password: phone,
                    device_name: "deviceName",
                    remember: "checked"
                })
                .then(res => {
                    props.setLogin(false);
                    props.setLocalStorage("sanctumToken", res.data);
                    // Update Logged in user
                    props.get(`auth`, props.setAuth, "auth", false);
                    props.setMessages(["Logged in"]);
                    // Reload page
                    setTimeout(() => window.location.reload(), 1000);
                })
                .catch(err => props.getErrors(err, true));

            setPhone("07");
        });
    };

    return (
        <>
            <div
                id="preloader"
                style={{ display: props.login ? "block" : "none" }}
            >
                <div className="preload-content">
                    {/* <div id="sonar-load"></div> */}
                </div>
            </div>
            <div
                className="menu-open"
                style={{ display: props.login ? "block" : "none" }}
            >
                <div className="bottomMenu">
                    <div className="d-flex align-items-center justify-content-between">
                        {/* <!-- Logo Area --> */}
                        <div className="logo-area p-2">
                            <a href="#">Login</a>
                        </div>
                        {/* <!-- Close Icon --> */}
                        <div
                            className="closeIcon float-end"
                            style={{ fontSize: "1em" }}
                            onClick={() => {
                                props.setLogin(false);
                                history.push("/");
                            }}
                        >
                            <CloseSVG />
                        </div>
                    </div>
                    <div className="p-2">
                        {phoneLogin ? (
                            <center>
                                <div className="contact-form">
                                    <form
                                        method="POST"
                                        action=""
                                        onSubmit={onSubmit}
                                    >
                                        <input
                                            id="phone"
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={phone}
                                            onChange={e =>
                                                setPhone(e.target.value)
                                            }
                                            required={true}
                                            autoComplete="phone"
                                            autoFocus
                                        />
                                        <br />

                                        <Btn
                                            type="submit"
                                            btnClass="mysonar-btn float-right"
                                            btnText="Login"
                                        />
                                    </form>
                                    <br />

                                    <Btn
                                        btnClass="mysonar-btn"
                                        btnText="back"
                                        onClick={() => setPhoneLogin(false)}
                                    />
                                </div>
                            </center>
                        ) : (
                            <>
                                <GoogleLoginButton
                                    className="mt-2 rounded-0"
                                    onClick={() => onSocial("google")}
                                />
                                <FacebookLoginButton
                                    className="mt-2 rounded-0"
                                    onClick={() => onSocial("facebook")}
                                />
                                <TwitterLoginButton
                                    className="mt-2 rounded-0"
                                    onClick={() => onSocial("twitter")}
                                />
                                <br />

                                <Btn
                                    btnClass="mysonar-btn"
                                    btnText="login with number"
                                    onClick={() => setPhoneLogin(true)}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPopUp;
