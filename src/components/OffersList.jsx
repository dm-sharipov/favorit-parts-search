import { useState } from "react";
import { formatDate, formatPrice } from "../utils/format";

const PAGE_SIZE = 50;

export function OffersList({ items }) {
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

	const visibleItems = items.slice(0, visibleCount);
	const hiddenCount = items.length - visibleItems.length;

	return (
		<section className="offers">
			<h2 className="offers__title h5 mb-3">Аналоги и предложения</h2>

			<div className="table-responsive">
				<table className="offers-table table table-hover align-middle">
					<thead className="offers-table__head">
						<tr>
							<th className="offers-table__heading" scope="col">Производитель</th>

							<th className="offers-table__heading" scope="col">Название</th>

							<th className="offers-table__heading text-end text-nowrap" scope="col">
								Лучшая цена
							</th>

							<th className="offers-table__heading text-end" scope="col">
								Остаток
							</th>

							<th className="offers-table__heading" scope="col">Отгрузка</th>
						</tr>
					</thead>

					<tbody className="offers-table__body">
						{visibleItems.map((offer) => (
							<tr
								className={`offers-table__row${offer.isRequested ? " table-primary" : ""}`}
								key={offer.id}
							>
								<td className="offers-table__cell">
									<div className="offers-table__brand fw-semibold">
										{offer.brand}
									</div>

									<div className="offers-table__number small text-body-secondary">
										{offer.number}
									</div>
								</td>

								<td className="offers-table__cell">
									{offer.name}
									{offer.isRequested && (
										<span className="offers-table__badge badge text-bg-primary ms-2">
											Искомая
										</span>
									)}
								</td>

								<td
									className="offers-table__cell offers-table__cell--labeled text-end text-nowrap"
									data-label="Лучшая цена"
								>
									{offer.price === null
										? "—"
										: formatPrice(offer.price)}
								</td>

								<td
									className="offers-table__cell offers-table__cell--labeled text-end text-nowrap"
									data-label="Остаток"
								>
									{offer.stock > 0 ? (
										`${offer.stock} шт.`
									) : (
										<span className="offers-table__out-of-stock text-body-secondary">
											Нет в наличии
										</span>
									)}
								</td>

								<td
									className="offers-table__cell offers-table__cell--labeled text-nowrap"
									data-label="Отгрузка"
								>
									{offer.shipmentDate
										? formatDate(offer.shipmentDate)
										: "—"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{hiddenCount > 0 && (
				<div className="offers__more d-flex align-items-center gap-3">
					<button
						className="offers__more-button btn btn-outline-primary"
						type="button"
						onClick={() =>
							setVisibleCount(visibleCount + PAGE_SIZE)
						}
					>
						Показать ещё
					</button>

					<span className="offers__counter text-body-secondary">
						Показано {visibleItems.length} из {items.length}
					</span>
				</div>
			)}
		</section>
	);
}
