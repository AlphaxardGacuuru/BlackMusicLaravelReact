import Axios from "axios"

const ssrAxios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
	withCredentials: true,
})

export default ssrAxios
