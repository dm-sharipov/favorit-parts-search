import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBrands, searchCleared } from "../store/searchSlice";

const SEARCH_DELAY = 400;

export function SearchForm() {
	const dispatch = useDispatch();
	const [value, setValue] = useState("");
	const timerRef = useRef(null);

	const search = (number) => {
		if (number) {
			dispatch(fetchBrands(number));
		} else {
			dispatch(searchCleared());
		}
	};

	useEffect(() => () => clearTimeout(timerRef.current), []);

	const handleChange = (event) => {
		const nextValue = event.target.value;
		setValue(nextValue);

		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(
			() => search(nextValue.trim()),
			SEARCH_DELAY,
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		clearTimeout(timerRef.current);
		search(value.trim());
	};

	return (
		<form className="search-form" onSubmit={handleSubmit} role="search">
			<label
				className="search-form__label form-label"
				htmlFor="part-number"
			>
				Артикул детали
			</label>

			<input
				className="search-form__input form-control form-control-lg"
				id="part-number"
				type="search"
				value={value}
				onChange={handleChange}
				placeholder="Например, 7160500039S"
				autoComplete="off"
				autoFocus
			/>
		</form>
	);
}
