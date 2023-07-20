import React, { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom";
// import { useAuth } from "@/hooks/auth";
import Btn from "@/components/Core/Btn";

const Login = () => {
    const router = useLocation();

    const { login } = useAuth({
        middleware: "guest",
        redirectIfAuthenticated: "/"
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset));
        } else {
            setStatus(null);
        }
    });

    const submitForm = async event => {
        event.preventDefault();

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus
        });
    };

    return (
        <form onSubmit={submitForm}>
            {/* Email Address */}
            <div>
                <label htmlFor="email">Email</label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    className="block mt-1 w-full"
                    onChange={event => setEmail(event.target.value)}
                    required
                    autoFocus
                />
            </div>

            {/* Password */}
            <div className="mt-4">
                <label htmlFor="password">Password</label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    className="block mt-1 w-full"
                    onChange={event => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                />
            </div>

            {/* Remember Me */}
            <div className="block mt-4">
                <label
                    htmlFor="remember_me"
                    className="inline-flex items-center"
                >
                    <input
                        id="remember_me"
                        type="checkbox"
                        name="remember"
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={event =>
                            setShouldRemember(event.target.checked)
                        }
                    />

                    <span className="ml-2 text-sm text-gray-600">
                        Remember me
                    </span>
                </label>
            </div>

            <div className="flex items-center justify-end mt-4">
                <Link to="/forgot-password"
				 className="underline text-sm text-gray-600 hover:text-gray-900">
                        Forgot your password?
                </Link>

                <Btn className="ml-3">Login</Btn>
            </div>
        </form>
    );
};

export default Login;
