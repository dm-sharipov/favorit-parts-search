const EMPTY_GOODS_ID = "00000000-0000-0000-0000-000000000000";

const API_ERRORS = {
	"Empty key!": "Не указан ключ покупателя",
	"Invalid key client!": "Неверный ключ покупателя",
	"Empty number goods!": "Не указан номер детали",
	"Request quota exceeded!": "Превышен лимит запросов, попробуйте позже",
};

export function isFound(item) {
	return (
		Boolean(item) && Boolean(item.brand) && item.goodsID !== EMPTY_GOODS_ID
	);
}

export function getBrands(goods) {
	const brands = new Map();

	for (const item of goods.filter(isFound)) {
		if (!brands.has(item.brand)) {
			brands.set(item.brand, {
				brand: item.brand,
				number: item.number,
				name: item.name,
			});
		}
	}

	return [...brands.values()];
}

function toOffers(item, isRequested) {
	const base = {
		brand: item.brand,
		number: item.number,
		name: item.name,
		isRequested,
	};

	const warehouses = (item.warehouses ?? []).filter(
		(warehouse) => warehouse.stock > 0,
	);

	if (warehouses.length === 0) {
		return [
			{
				...base,
				id: item.goodsID,
				price: null,
				stock: 0,
				warehouse: null,
				shipmentDate: null,
			},
		];
	}

	return warehouses.map((warehouse) => ({
		...base,
		id: `${item.goodsID}-${warehouse.id}`,
		price: warehouse.price,
		stock: warehouse.stock,
		warehouse: warehouse.code || null,
		shipmentDate: warehouse.shipmentDate || null,
	}));
}

function compareOffers(a, b) {
	if (a.isRequested !== b.isRequested) {
		return a.isRequested ? -1 : 1;
	}

	if (a.price === null && b.price !== null) {
		return 1;
	}

	if (a.price !== null && b.price === null) {
		return -1;
	}

	return (a.price ?? 0) - (b.price ?? 0);
}

export function getOffers(goods) {
	return goods
		.filter(isFound)
		.flatMap((item) => [
			...toOffers(item, true),
			...(item.analogues ?? [])
				.filter(isFound)
				.flatMap((analogue) => toOffers(analogue, false)),
		])
		.sort(compareOffers);
}

export function translateApiError(error) {
	return API_ERRORS[error] ?? error;
}
