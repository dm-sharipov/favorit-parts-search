export function ErrorMessage({ message, onRetry }) {
	return (
		<div
			className="alert alert-danger d-flex align-items-center justify-content-between gap-3"
			role="alert"
		>
			<span>{message}</span>

			<button
				className="btn btn-sm btn-outline-danger"
				type="button"
				onClick={onRetry}
			>
				Повторить
			</button>
		</div>
	);
}
