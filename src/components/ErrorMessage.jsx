export function ErrorMessage({ message, onRetry }) {
	return (
		<div className="error-message alert alert-danger" role="alert">
			<span className="error-message__text">{message}</span>

			<button
				className="error-message__retry btn btn-sm btn-outline-danger"
				type="button"
				onClick={onRetry}
			>
				Повторить
			</button>
		</div>
	);
}
