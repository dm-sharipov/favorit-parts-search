import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchOffers } from "../store/searchSlice";
import { EmptyMessage } from "./EmptyMessage";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";

export function BrandList() {
	const dispatch = useDispatch();
	const { number, brands, selectedBrand } = useSelector(
		(state) => state.search,
	);

	if (brands.status === "idle") {
		return null;
	}

	if (brands.status === "loading") {
		return <Loader text="Ищем производителей…" />;
	}

	if (brands.status === "failed") {
		return (
			<ErrorMessage
				message={brands.error}
				onRetry={() => dispatch(fetchBrands(number))}
			/>
		);
	}

	if (brands.items.length === 0) {
		return (
			<EmptyMessage>
				По артикулу «{number}» ничего не найдено
			</EmptyMessage>
		);
	}

	return (
		<section className="mb-5">
			<h2 className="h5 mb-3">Производители</h2>

			<div className="d-flex flex-wrap gap-2">
				{brands.items.map((item) => (
					<button
						className={`btn btn-outline-primary text-start${item.brand === selectedBrand ? " active" : ""}`}
						key={item.brand}
						type="button"
						aria-pressed={item.brand === selectedBrand}
						onClick={() =>
							dispatch(fetchOffers({ number, brand: item.brand }))
						}
					>
						<div className="fw-semibold">{item.brand}</div>

						<div className="small">{item.name}</div>
					</button>
				))}
			</div>
		</section>
	);
}
