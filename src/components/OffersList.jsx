import { useState } from "react";
import { formatDate, formatPrice } from "../utils/format";

const PAGE_SIZE = 50;

export function OffersList({ items }) {
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

	const visibleItems = items.slice(0, visibleCount);
	const hiddenCount = items.length - visibleItems.length;

	return (
		<section className="offers">
			<h2 className="offers__title">Аналоги и предложения</h2>

			<div className="table-responsive">
				<table className="offers-table table table-hover">
					<thead className="offers-table__head">
						<tr>
							<th className="offers-table__heading" scope="col">
								Производитель
							</th>

							<th className="offers-table__heading" scope="col">
								Название
							</th>

							<th
								className="offers-table__heading offers-table__heading--numeric"
								scope="col"
							>
								Лучшая цена
							</th>

							<th
								className="offers-table__heading offers-table__heading--numeric"
								scope="col"
							>
								Остаток
							</th>

							<th className="offers-table__heading" scope="col">
								Отгрузка
							</th>
						</tr>
					</thead>

					<tbody className="offers-table__body">
						{visibleItems.map((offer) => (
							<tr
								className={`offers-table__row${offer.isRequested ? " table-primary" : ""}`}
								key={offer.id}
							>
								<td className="offers-table__cell">
									<div className="offers-table__brand">
										{offer.brand}
									</div>

									<div className="offers-table__number">
										{offer.number}
									</div>
								</td>

								<td className="offers-table__cell">
									{offer.name}
									{offer.isRequested && (
										<span className="offers-table__badge badge">
											Искомая
										</span>
									)}
								</td>

								<td
									className="offers-table__cell offers-table__cell--labeled offers-table__cell--numeric"
									data-label="Лучшая цена"
								>
									{offer.price === null
										? "—"
										: formatPrice(offer.price)}
								</td>

								<td
									className="offers-table__cell offers-table__cell--labeled offers-table__cell--numeric"
									data-label="Остаток"
								>
									{offer.stock > 0 ? (
										`${offer.stock} шт.`
									) : (
										<span className="offers-table__out-of-stock">
											Нет в наличии
										</span>
									)}
								</td>

								<td
									className="offers-table__cell offers-table__cell--labeled offers-table__cell--date"
									data-label="Отгрузка"
								>
									{offer.shipmentDate ? (
										<time dateTime={offer.shipmentDate}>
											{formatDate(offer.shipmentDate)}
										</time>
									) : (
										"—"
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{hiddenCount > 0 && (
				<div className="offers__more">
					<button
						className="offers__more-button btn btn-outline-primary"
						type="button"
						onClick={() =>
							setVisibleCount(visibleCount + PAGE_SIZE)
						}
					>
						Показать ещё
					</button>

					<span className="offers__counter">
						Показано {visibleItems.length} из {items.length}
					</span>
				</div>
			)}
		</section>
	);
}
