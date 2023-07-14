import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Karaoke from "@/components/Karaoke/Karaoke"
import ssrAxios from "@/lib/ssrAxios"

const KaraokeShow = (props) => {
	const router = useRouter()

	const { id } = router.query

	const [karaokes, setKaraokes] = useState(props.karaokes)

	useEffect(() => {
		// Scroll Karaoke to current one
		var karaokeEl = document.getElementById(id)

		karaokeEl && karaokeEl.scrollIntoView()
	}, [])

	return (
		<div className="row p-0">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="karaokes">
					{karaokes.map((karaoke, key) => (
						<Karaoke
							{...props}
							id={karaoke.id}
							key={key}
							karaoke={karaoke}
							karaokes={karaokes}
							setKaraokes={setKaraokes}
						/>
					))}
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

// This gets called on every request
export async function getServerSideProps(context) {
	var data = {
		karaokes: [],
	}

	// Fetch Newly Released
	await ssrAxios.get(`/api/karaokes`).then((res) => (data.karaokes = res.data.data))

	return { props: data }
}

export default KaraokeShow
