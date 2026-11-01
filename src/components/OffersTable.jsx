import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatPrice } from "../utils/format";
import { fetchOffers } from "../store/searchSlice";
import { EmptyMessage } from "./EmptyMessage";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";

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

	return (
		<section>
			<h2 className="h5 mb-3">Аналоги и предложения</h2>

			<div className="table-responsive">
				<table className="table table-hover align-middle">
					<thead>
						<tr>
							<th scope="col">Производитель</th>

							<th scope="col">Название</th>

							<th className="text-end" scope="col">
								Цена
							</th>

							<th className="text-end" scope="col">
								Остаток
							</th>

							<th scope="col">Склад</th>
						</tr>
					</thead>

					<tbody>
						{offers.items.map((offer) => (
							<tr
								className={
									offer.isRequested
										? "table-primary"
										: undefined
								}
								key={offer.id}
							>
								<td>
									<div className="fw-semibold">
										{offer.brand}
									</div>

									<div className="small text-body-secondary">
										{offer.number}
									</div>
								</td>

								<td>
									{offer.name}
									{offer.isRequested && (
										<span className="badge text-bg-primary ms-2">
											Искомая
										</span>
									)}
								</td>

								<td className="text-end text-nowrap">
									{offer.price === null
										? "—"
										: formatPrice(offer.price)}
								</td>

								<td className="text-end text-nowrap">
									{offer.stock > 0 ? (
										`${offer.stock} шт.`
									) : (
										<span className="text-body-secondary">
											Нет в наличии
										</span>
									)}
								</td>

								<td className="text-nowrap">
									{offer.warehouse}
									{offer.shipmentDate && (
										<div className="small text-body-secondary">
											Отгрузка{" "}
											{formatDate(offer.shipmentDate)}
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
