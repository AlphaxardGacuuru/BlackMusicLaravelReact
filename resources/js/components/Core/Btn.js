const Btn = ({ btnStyle, btnClass, btnText, onClick, loading }) => (
	<button
		style={btnStyle}
		className={btnClass}
		onClick={onClick}>
		{btnText}
		{loading &&
			<div className="spinner-border ms-2 my-auto"
				style={{
					borderTopWidth: "2px",
					borderBottomWidth: "2px",
					borderLeftWidth: "2px",
					width: "15px",
					height: "15px",
					color: "inherit"
				}}>
			</div>}
	</button>
)

Btn.defaultProps = {
	btnClass: 'sonar-btn',
	loading: false
}

export default Btn
