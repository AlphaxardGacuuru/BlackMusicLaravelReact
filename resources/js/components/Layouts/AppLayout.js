import React from "react"

import TopNav from "@/components/Layouts/TopNav"
import BottomNav from "@/components/Layouts/BottomNav"
import Messages from "@/components/Core/Messages"

const AppLayout = ({ GLOBAL_STATE, children }) => {
	return (
		<>
			<TopNav {...GLOBAL_STATE} />

			{/* Page Content */}
			<main>{children}</main>

			<Messages {...GLOBAL_STATE} />
			<BottomNav {...GLOBAL_STATE} />
		</>
	)
}

export default AppLayout
