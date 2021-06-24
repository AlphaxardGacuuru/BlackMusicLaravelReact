import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

import Messages from './Messages'
import TopNav from './TopNav'
import BottomNav from './BottomNav'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Index from '../pages/Index'
import Profile from '../pages/Profile'
import ProfileEdit from '../pages/ProfileEdit'
import PostCreate from '../pages/PostCreate'
import PostShow from '../pages/PostShow'
import VideoCharts from '../pages/VideoCharts'
import Cart from '../pages/Cart'
import Library from '../pages/Library'

function App() {

	// Declare states
	const [url, setUrl] = useState('http://localhost:3000')
	const [auth, setAuth] = useState({
		"name": "Guest",
		"username": "@guest",
		"pp": "profile-pics/male_avatar.png",
		"account_type": "normal"
	})
	const [message, setMessage] = useState('')
	const [errors, setErrors] = useState([])
	const [users, setUsers] = useState([])
	const [posts, setPosts] = useState([])
	const [postLikes, setPostLikes] = useState([])
	const [postComments, setPostComments] = useState([])
	const [postCommentLikes, setPostCommentLikes] = useState([])
	const [polls, setPolls] = useState([])
	const [videos, setVideos] = useState([])
	const [boughtVideos, setBoughtVideos] = useState([])
	const [cartVideos, setCartVideos] = useState([])
	const [decos, setDecos] = useState([])
	const [follows, setFollows] = useState([])

	// Reset Messages and Errors to null after 3 seconds
	if (errors.length > 0 || message.length > 0) {
		setTimeout(() => setErrors([]), 3000);
		setTimeout(() => setMessage(''), 3000);
	}

	// Fetch data on page load
	useEffect(() => {
		// For Auth
		const getAuth = async () => {
			const authFromServer = await fetchAuth()
			setAuth(authFromServer)
		}
		getAuth()

		// For Users
		const getUsers = async () => {
			const usersFromServer = await fetchUsers()
			setUsers(usersFromServer)
		}
		getUsers()

		// For Videos
		const getVideos = async () => {
			const videosFromServer = await fetchVideos()
			setVideos(videosFromServer)
		}
		getVideos()

		// For Posts
		const getPosts = async () => {
			const postsFromServer = await fetchPosts()
			setPosts(postsFromServer)
		}

		getPosts()

		fetchPostLikes()

		fetchPostComments()

		fetchDecos()

		fetchFollows()

		fetchBoughtVideos()

		fetchCartVideos()

		fetchPolls()

		fetchPostCommentLikes()

	}, [])

	//Fetch Auth
	const fetchAuth = async () => {
		const res = await fetch(`${url}/api/home`)
		const data = res.json()

		return data
	}

	//Fetch Users
	const fetchUsers = async () => {
		const res = await fetch(`${url}/api/users`)
		const data = res.json()

		return data
	}

	//Fetch Videos
	const fetchVideos = async () => {
		const res = await fetch(`${url}/api/videos`)
		const data = res.json()

		return data
	}

	//Fetch Posts
	const fetchPosts = async () => {
		const res = await fetch(`${url}/api/posts`)
		const data = res.json()

		return data
	}

	// Fetch Post Likes
	const fetchPostLikes = () => {
		axios.get(`${url}/api/post-likes`)
			.then((res) => setPostLikes(res.data))
			.catch(() => setErrors(['Failed to fetch post likes']))
	}

	// Fetch Post Comments
	const fetchPostComments = () => {
		axios.get(`${url}/api/post-comments`)
			.then((res) => setPostComments(res.data))
			.catch(() => setErrors(['Failed to fetch post comments']))
	}

	// Fetch Post Comment likes
	const fetchPostCommentLikes = () => {
		axios.get(`${url}/api/post-comment-likes`)
			.then((res) => setPostCommentLikes(res.data))
			.catch(() => setErrors(['failed to fetch post comment likes']))
	}

	// Fetch Polls
	const fetchPolls = () => {
		axios.get(`${url}/api/polls`)
			.then((res) => setPolls(res.data))
			.catch(() => setErrors(['Failed to fetch polls']))
	}

	// Fetch Decos
	const fetchDecos = () => {
		axios.get(`${url}/api/decos`)
			.then((res) => setDecos(res.data))
			.catch(() => setErrors(['Failed to fetch decos']))
	}

	// Fetch Follows
	const fetchFollows = () => {
		axios.get(`${url}/api/follows`)
			.then((res) => setFollows(res.data))
			.catch(() => setErrors(['Failed to fetch follows']))
	}

	// Fetch Bought Videos
	const fetchBoughtVideos = () => {
		axios.get(`${url}/api/bought-videos`)
			.then((res) => setBoughtVideos(res.data))
			.catch(() => setErrors(['Failed to fetch bought videos']))
	}

	// Fetch Cart Videos
	const fetchCartVideos = () => {
		axios.get(`${url}/api/cart-videos`)
			.then((res) => setCartVideos(res.data))
			.catch(() => setErrors(['Failed to fetch cart videos']))
	}

	return (
		<Router>
			<>
				<TopNav {...{ url, auth, setMessage, setErrors, setAuth, cartVideos }} />
				<Route path="/login" exact render={(props) => (<Login {...{ setMessage, setErrors, setAuth, url }} />)} />
				<Route path="/register" exact render={(props) => (<Register {...{ setMessage, setErrors, setAuth, url }} />)} />
				<Route path="/" exact render={(props) => (
					<Index {...{ url, auth, setMessage, setErrors, users, videos, boughtVideos, cartVideos, setCartVideos, posts, setPosts, postLikes, setPostLikes, postComments, polls, setPolls, decos, follows, setFollows }} />
				)} />

				<Route path="/profile/:username" exact render={(props) => (
					<Profile {...{ setMessage, setErrors, auth, setAuth, url, users, videos, boughtVideos, cartVideos, setCartVideos, posts, setPosts, postLikes, setPostLikes, postComments, polls, setPolls, decos, follows, setFollows }} />
				)} />

				<Route path="/profile-edit" exact render={(props) => (
					<ProfileEdit {...{ setMessage, setErrors, auth, setAuth, url, users, decos }} />
				)} />

				<Route path="/post-create" exact render={(props) => (
					<PostCreate {...{ url, auth, setMessage, setErrors, setPosts }} />
				)} />

				<Route path="/post-show/:id" exact render={(props) => (
					<PostShow {...{ url, auth, setMessage, setErrors, users, postComments, setPostComments, postCommentLikes, setPostCommentLikes, decos }} />
				)} />

				<Route path="/cart" exact render={(props) => (
					<Cart {...{ url, auth, setMessage, setErrors, cartVideos, setCartVideos, videos }} />
				)} />

				<Route path="/video-charts" exact render={(props) => (
					<VideoCharts {...{ url, auth, setMessage, setErrors, users, videos, boughtVideos, cartVideos, setCartVideos, follows, setFollows }} />
				)} />

				<Route path="/library" exact render={(props) => (
					<Library {...{ auth, videos, boughtVideos }} />
				)} />

				<Messages {...{ message, errors }} />
				<BottomNav {...{ url, auth, setMessage, setErrors, setAuth, cartVideos }} />
			</>
		</Router>
	);
}

export default App;

if (document.getElementById('app')) {
	ReactDOM.render(
		<App />,
		document.getElementById('app')
	);
}
