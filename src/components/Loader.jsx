export function Loader({ text }) {
	return (
		<div
			className="loader d-flex align-items-center gap-2 text-body-secondary py-3"
			role="status"
		>
			<div
				className="loader__spinner spinner-border spinner-border-sm"
				aria-hidden="true"
			/>

			<span className="loader__text">{text}</span>
		</div>
	);
}
