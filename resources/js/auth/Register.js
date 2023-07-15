import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import Button from "@/components/Button";

const Register = props => {
    let { name, email, avatar } = useParams();

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("07");
    const [code, setCode] = useState();
    const [verifyPhone, setVerifyPhone] = useState();
    const [verify, setVerify] = useState(0);
    const [checkDelivery, setCheckDelivery] = useState();

    // Get referer
    const referer = sessionStorage.getItem("referer");
    const page = sessionStorage.getItem("page");

    const history = useHistory();

    // Remove all spaces from avatar
    avatar = avatar.replace(/\s/g, "/");

    // Show error on space in username
    useEffect(() => {
        username.indexOf(" ") > -1 &&
            props.setErrors(["Username cannot have spaces"]);
    }, [username]);

    const onUpdate = () => {
        // Get user id
        const id = props.users.find(user => user.username == username).id;

        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post(`${props.url}/api/login/update`, {
                    id: id,
                    name: name,
                    email: email,
                    avatar: avatar,
                    username: username,
                    phone: phone
                })
                .then(res => {
                    props.setMessages(["Account Updated"]);
                    // Update Auth
                    axios
                        .get(`${props.url}/api/home`)
                        .then(res => props.setAuth(res.data));
                    setTimeout(() => history.push("/"), 1000);
                })
                .catch(err => {
                    const resErrors = err.response.data.errors;

                    var resError;
                    var newError = [];
                    for (resError in resErrors) {
                        newError.push(resErrors[resError]);
                    }
                    // Get other errors
                    newError.push(err.response.data.message);
                    props.setErrors(newError);
                });
        });
    };

    const onRegister = () => {
        axios.get("/sanctum/csrf-cookie").then(() => {
            // Register User
            axios
                .post(`${props.url}/api/register`, {
                    name: name,
                    email: email,
                    avatar: avatar,
                    username: username,
                    phone: phone
                    // remember_token: 'true'
                })
                .then(res => {
                    // Add referer if there's one
                    referer &&
                        axios.post(`${props.url}/api/referrals`, {
                            referer: referer,
                            username: username
                        });

                    props.setMessages(["Account created"]);
                    // Update auth data
                    axios
                        .get(`${props.url}/api/home`)
                        .then(res => props.setAuth(res.data));
                    // Redirect user
                    setTimeout(() => history.push(page ? page : "/"), 1000);
                    // Clear sessionStorage
                    sessionStorage.clear("referer");
                    sessionStorage.clear("page");
                })
                .catch(err => {
                    console.log(err.response);
                    const resErrors = err.response.data.errors;
                    var resError;
                    var newError = [];
                    for (resError in resErrors) {
                        newError.push(resErrors[resError]);
                    }
                    // Get other errors
                    newError.push(err.response.data.message);
                    props.setErrors(newError);
                });
        });
    };

    const onSubmit = e => {
        e.preventDefault();

        // Check if phone exists
        if (props.users.some(user => user.phone == phone)) {
            // // Open PullUp
            // setTimeout(() => setVerifyPhone("menu-open"), 2000)

            // function getRandomNumberBetween(min, max) {
            // 	return Math.floor(Math.random() * (max - min + 1) + min);
            // }

            // const number = getRandomNumberBetween(1000, 9999)
            // setCode(number)

            // // Send SMS
            // axios.get('/sanctum/csrf-cookie').then(() => {
            // 	axios.post(`${props.url}/api/sms`, {
            // 		phone: phone,
            // 		message: number
            // 	}).then((res) => {
            // 		props.setMessages([res.data])
            // 	}).catch((err) => {
            // 		const resErrors = err.response.data.errors
            // 		// Get validation errors
            // 		var resError
            // 		var newError = []
            // 		for (resError in resErrors) {
            // 			newError.push(resErrors[resError])
            // 		}
            // 		// Get other errors
            // 		newError.push(err.response.data.message)
            // 		props.setErrors(newError)
            // 	})
            // })

            onUpdate();
        } else if (
            props.users.some(user => user.username == username && user.id < 235)
        ) {
            // If user in older than id 100 allow
            onUpdate();
        } else {
            onRegister();
        }
    };

    var confirmed;
    if (verify == code) {
        confirmed = true;
    }

    // // Check for delivery
    // if (checkDelivery) {
    // 	// Check if message has failed every two seconds and show error message
    // 	setTimeout(() => {
    // 		axios.get(`${props.url}/api/sms`)
    // 			.then((res) => props.setSMS(res.data))
    // 	}, 3000)

    // 	// Format phone
    // 	var betterPhone = phone.substr(1, 9)
    // 	betterPhone = "+254" + betterPhone

    // 	// Set error if user has blocked promotional messages
    // 	props.sms.find((sms) => {
    // 		console.log(sms.number == betterPhone)
    // 		sms.number == betterPhone &&
    // 			// sms.failure_reason == "UserInBlackList"
    // 			sms.status == "Success"
    // 	}) &&
    // 		props.setErrors(["SMS Failed because you've blocked promotional messages"])
    // }

    return (
        <div
            className="sonar-call-to-action-area section-padding-0-100"
            style={{ background: "rgba(0, 0, 0, 1)" }}
        >
            <div className="backEnd-content">
                <h2 style={{ color: "rgba(255, 255, 255, 0.1)" }}>
                    Black Music
                </h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div
                            className="call-to-action-content wow fadeInUp"
                            data-wow-delay="0.5s"
                        >
                            <h2 className="mt-2" style={{ color: "#FFD700" }}>
                                Register
                            </h2>

                            <div className="card-body contact-form">
                                <form
                                    method="POST"
                                    action=""
                                    onSubmit={onSubmit}
                                >
                                    <div className="form-group row">
                                        <label
                                            htmlFor="username"
                                            className="col-md-4 col-form-label text-md-right"
                                        >
                                            <p style={{ color: "#FFD700" }}>
                                                Create a unique username
                                            </p>
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="username"
                                                type="text"
                                                className="form-control"
                                                style={{
                                                    color: "#FFD700",
                                                    borderColor: "#FFD700"
                                                }}
                                                name="username"
                                                placeholder="@johndoe"
                                                onChange={e =>
                                                    setUsername(e.target.value)
                                                }
                                                required
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label
                                            htmlFor="phone"
                                            className="col-md-4 col-form-label text-md-right"
                                        >
                                            <p style={{ color: "#FFD700" }}>
                                                Enter your Safaricom number
                                            </p>
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="phone"
                                                type="text"
                                                className="form-control"
                                                style={{
                                                    color: "#FFD700",
                                                    borderColor: "#FFD700"
                                                }}
                                                name="phone"
                                                value={phone}
                                                onChange={e =>
                                                    setPhone(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <Button
                                                type="submit"
                                                btnClass="sonar-btn gold-btn float-right"
                                                btnText={"register"}
                                            />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={verifyPhone}>
                <div className="bottomMenu">
                    <div className="d-flex align-items-center justify-content-between">
                        {/* <!-- Logo Area --> */}
                        <div className="logo-area p-2">
                            <a href="#">Verify Phone</a>
                        </div>
                    </div>
                    <div className="p-2 contact-form">
                        <h5 className="text-danger">
                            Make sure that you've alowed promotional messages!
                        </h5>
                        {confirmed ? (
                            <Button
                                btnClass="mysonar-btn mb-2"
                                btnText={"register"}
                                onClick={() => {
                                    onUpdate();
                                    setVerifyPhone("");
                                }}
                            />
                        ) : (
                            <input
                                type="number"
                                name="verify"
                                placeholder="0000"
                                className="form-control"
                                onChange={e =>
                                    setVerify(Number(e.target.value))
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
