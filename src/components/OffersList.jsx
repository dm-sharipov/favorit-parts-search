import { useState } from "react";
import { formatDate, formatPrice } from "../utils/format";

const PAGE_SIZE = 50;

export function OffersList({ items }) {
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

	const visibleItems = items.slice(0, visibleCount);
	const hiddenCount = items.length - visibleItems.length;

	return (
		<section>
			<h2 className="h5 mb-3">Аналоги и предложения</h2>

			<div className="table-responsive">
				<table className="table table-hover align-middle">
					<thead>
						<tr>
							<th scope="col">Производитель</th>

							<th scope="col">Название</th>

							<th className="text-end text-nowrap" scope="col">
								Лучшая цена
							</th>

							<th className="text-end" scope="col">
								Остаток
							</th>

							<th scope="col">Отгрузка</th>
						</tr>
					</thead>

					<tbody>
						{visibleItems.map((offer) => (
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
				<div className="d-flex align-items-center gap-3">
					<button
						className="btn btn-outline-primary"
						type="button"
						onClick={() =>
							setVisibleCount(visibleCount + PAGE_SIZE)
						}
					>
						Показать ещё
					</button>

					<span className="text-body-secondary">
						Показано {visibleItems.length} из {items.length}
					</span>
				</div>
			)}
		</section>
	);
}
