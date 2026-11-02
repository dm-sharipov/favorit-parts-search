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
		<section className="brand-list">
			<h2 className="brand-list__title">Производители</h2>

			<ul className="brand-list__items" role="list">
				{brands.items.map((item) => (
					<li className="brand-list__item" key={item.brand}>
						<button
							className={`brand-list__button btn btn-outline-primary${item.brand === selectedBrand ? " active" : ""}`}
							type="button"
							aria-pressed={item.brand === selectedBrand}
							onClick={() =>
								dispatch(
									fetchOffers({ number, brand: item.brand }),
								)
							}
						>
							<span className="brand-list__brand">
								{item.brand}
							</span>

							<span className="brand-list__name">
								{item.name}
							</span>
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}
