const priceFormat = new Intl.NumberFormat("ru-RU", {
	style: "currency",
	currency: "RUB",
});
const dateFormat = new Intl.DateTimeFormat("ru-RU", {
	day: "numeric",
	month: "long",
});

export function formatPrice(price) {
	return priceFormat.format(price);
}

export function formatDate(value) {
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? "" : dateFormat.format(date);
}
