import Link from 'next/link'
import Img from 'next/image'

const KaraokeMedia = (props) => {
	return (
		<div className="m-1 karaoke-media"
			onClick={() => {
				props.audioStates.pauseSong()
				props.audioStates.setShow({ id: 0, time: 0 })
			}}>
			<div>
				<Link href={`/karaoke/${props.karaoke.id}`}>
					<a>
						<video
							src={props.karaoke.karaoke}
							width="100%"
							preload="none"
							autoPlay
							muted
							loop
							playsInline>
						</video>
					</a>
				</Link>
			</div>
			<div className="d-flex">
				<div>
					<Link href={`/profile/${props.karaoke.username}`}>
						<a>
							<Img
								src={props.karaoke.avatar}
								className="rounded-circle"
								width="40em"
								height="40em"
								alt="user"
								loading="lazy" />
						</a>
					</Link>
				</div>
				<div className="px-2"
					style={{
						textAlign: "left",
						width: "10em",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "clip",
					}}>
					<h6 className="m-0 px-1">
						{props.karaoke.name}
					</h6>
					<h6 className="mt-0 mx-1 mb-2 px-1 py-0">
						{props.karaoke.username}
					</h6>
				</div>
			</div>
		</div>
	)
}

export default KaraokeMedia