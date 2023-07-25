import React from "react"
import { HashRouter, Switch } from "react-router-dom"

import R from "@/components/Core/R"

import ScrollToTop from "@/components/Core/ScrollToTop"
import LoginPopUp from "@/components/Auth/LoginPopUp"
import AppLayout from "../Layouts/AppLayout"

import Admin from "@/pages/admin"

import AudioCharts from "@/pages/audio/charts"
import AudioShow from "@/pages/audio/[id]"
import AudioCreate from "@/pages/audio/create"
import Audio from "@/pages/audio/index"
import AudioEdit from "@/pages/audio/edit/[id]"
import AudioAlbumCreate from "@/pages/audio/album/create"
import AudioAlbumEdit from "@/pages/audio/album/edit/[id]"

import Chat from "@/pages/chat/index"
import ChatThread from "@/pages/chat/[username]"
import NewChat from "@/pages/chat/new"

import KaraokeCharts from "@/pages/karaoke/charts"
import KaraokeShow from "@/pages/karaoke/[id]"
import KaraokeCreate from "@/pages/karaoke/create"

import PostCreate from "@/pages/post/create"
import PostShow from "@/pages/post/[id]"
import PostEdit from "@/pages/post/edit/[id]"

import ProfileShow from "@/pages/profile/[username]"
import ProfileEdit from "@/pages/profile/edit"

import StoryShow from "@/pages/story/[id]"
import StoryCreate from "@/pages/story/create"

import VideoCharts from "@/pages/video/charts"
import VideoShow from "@/pages/video/[id]"
import Video from "@/pages/video/index"
import VideoCreate from "@/pages/video/create"
import VideoEdit from "@/pages/video/edit/[id]"
import VideoAlbumCreate from "@/pages/video/album/create"
import VideoAlbumEdit from "@/pages/video/album/edit/[id]"

import NotFound from "@/pages/404"
import ServerError from "@/pages/500"
import Cart from "@/pages/cart"
import Download from "@/pages/download"
import Index from "@/pages/index"
import Library from "@/pages/library"
import Login from "@/pages/login"
import Privacy from "@/pages/privacy"
import Register from "@/pages/register"
import Search from "@/pages/search"
import Settings from "@/pages/settings"

const RouteList = ({ GLOBAL_STATE }) => {
	return (
		<HashRouter>
			<ScrollToTop />

			<AppLayout GLOBAL_STATE={GLOBAL_STATE}>
				<R
					p="/login"
					c={<Login {...GLOBAL_STATE} />}
				/>
				<R
					p="/register/:name/:email/:avatar"
					c={<Register {...GLOBAL_STATE} />}
				/>
				<R
					p="/"
					c={<Index {...GLOBAL_STATE} />}
				/>
				<R
					p="/search"
					c={<Search {...GLOBAL_STATE} />}
				/>
				<R
					p="/cart"
					c={<Cart {...GLOBAL_STATE} />}
				/>
				<R
					p="/library"
					c={<Library {...GLOBAL_STATE} />}
				/>

				<R
					p="/admin"
					c={<Admin {...GLOBAL_STATE} />}
				/>
				<R
					p="/download"
					c={<Download {...GLOBAL_STATE} />}
				/>
				<R
					p="/settings"
					c={<Settings {...GLOBAL_STATE} />}
				/>
				<R
					p="/privacy"
					c={<Privacy />}
				/>

				{/* Audio Routes */}
				<R
					p="/audio/charts"
					c={<AudioCharts {...GLOBAL_STATE} />}
				/>
				<R
					p="/audio/show/:id/:referrer?"
					c={<AudioShow {...GLOBAL_STATE} />}
				/>
				<R
					p="/audio"
					c={<Audio {...GLOBAL_STATE} />}
				/>
				<R
					p="/audio/create"
					c={<AudioCreate {...GLOBAL_STATE} />}
				/>
				<R
					p="/audio/edit/:id"
					c={<AudioEdit {...GLOBAL_STATE} />}
				/>
				<R
					p="/audio/album/create"
					c={<AudioAlbumCreate {...GLOBAL_STATE} />}
				/>
				<R
					p="/audio/album/edit/:id"
					c={<AudioAlbumEdit {...GLOBAL_STATE} />}
				/>
				{/* Audio Routes End */}

				{/* Chat Routes */}
				<R
					p="/chat"
					c={<Chat {...GLOBAL_STATE} />}
				/>
				<R
					p="/chat/show/:username"
					c={<ChatThread {...GLOBAL_STATE} />}
				/>
				<R
					p="/chat/new"
					c={<NewChat {...GLOBAL_STATE} />}
				/>
				{/* Chat Routes End */}

				{/* Karaoke Routes */}
				<R
					p="/karaoke/charts"
					c={<KaraokeCharts {...GLOBAL_STATE} />}
				/>
				<R
					p="/karaoke/create/:audio"
					c={<KaraokeCreate {...GLOBAL_STATE} />}
				/>
				<R
					p="/karaoke/show/:id"
					c={<KaraokeShow {...GLOBAL_STATE} />}
				/>
				{/* Karaoke Routes End */}

				{/* Post Routes */}
				<R
					p="/post/create"
					c={<PostCreate {...GLOBAL_STATE} />}
				/>
				<R
					p="/post/show/:id"
					c={<PostShow {...GLOBAL_STATE} />}
				/>
				<R
					p="/post/edit/:id"
					c={<PostEdit {...GLOBAL_STATE} />}
				/>
				{/* Post Routes End */}

				{/* Profile Routes */}
				<R
					p="/profile/show/:username"
					c={<ProfileShow {...GLOBAL_STATE} />}
				/>
				<R
					p="/profile/show/edit"
					c={<ProfileEdit {...GLOBAL_STATE} />}
				/>
				{/* Profile Routes End */}

				{/* Story Routes */}
				<R
					p="/story/:id"
					c={<StoryShow {...GLOBAL_STATE} />}
				/>
				<R
					p="/story/create"
					c={<StoryCreate {...GLOBAL_STATE} />}
				/>
				{/* Story Routes End */}

				{/* Video Routes */}
				<R
					p="/video/charts"
					c={<VideoCharts {...GLOBAL_STATE} />}
				/>
				<R
					p="/video/show/:id/:referrer?"
					c={<VideoShow {...GLOBAL_STATE} />}
				/>
				<R
					p="/video"
					c={<Video {...GLOBAL_STATE} />}
				/>
				<R
					p="/video/create"
					c={<VideoCreate {...GLOBAL_STATE} />}
				/>
				<R
					p="/video/edit/:id"
					c={<VideoEdit {...GLOBAL_STATE} />}
				/>
				<R
					p="/video/album/create"
					c={<VideoAlbumCreate {...GLOBAL_STATE} />}
				/>
				<R
					p="/video/album/edit/:id"
					c={<VideoAlbumEdit {...GLOBAL_STATE} />}
				/>
				{/* Video Routes End */}

				{/* <R p="*" c={<NotFound />} /> */}
			</AppLayout>

			<LoginPopUp {...GLOBAL_STATE} />
		</HashRouter>
	)
}

export default RouteList
