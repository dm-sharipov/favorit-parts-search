import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../store/searchSlice";
import { EmptyMessage } from "./EmptyMessage";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { OffersList } from "./OffersList";

export function OffersTable() {
	const dispatch = useDispatch();
	const { number, selectedBrand, offers } = useSelector(
		(state) => state.search,
	);

	if (offers.status === "idle") {
		return null;
	}

	if (offers.status === "loading") {
		return <Loader text="Загружаем аналоги и предложения…" />;
	}

	if (offers.status === "failed") {
		return (
			<ErrorMessage
				message={offers.error}
				onRetry={() =>
					dispatch(fetchOffers({ number, brand: selectedBrand }))
				}
			/>
		);
	}

	if (offers.items.length === 0) {
		return <EmptyMessage>Аналогов и предложений не найдено</EmptyMessage>;
	}

	return <OffersList key={offers.requestId} items={offers.items} />;
}
