export function Loader({ text }) {
	return (
		<div className="loader" role="status">
			<div
				className="loader__spinner spinner-border spinner-border-sm"
				aria-hidden="true"
			/>

			<span className="loader__text">{text}</span>
		</div>
	);
}
