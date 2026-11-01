import { getBrands, getOffers, translateApiError } from "./parse";

const API_URL = "http://api.favorit-parts.ru/hs/hsprice/";
const API_KEY = "00000000-0000-0000-0000-000000000001";

export class ApiError extends Error {}

async function fetchGoods(params) {
	let response;

	try {
		response = await fetch(
			`${API_URL}?${new URLSearchParams({ key: API_KEY, ...params })}`,
		);
	} catch {
		throw new ApiError(
			"Нет связи с сервером. Проверьте интернет и попробуйте ещё раз",
		);
	}

	const data = await response.json().catch(() => null);

	if (data?.error) {
		throw new ApiError(translateApiError(data.error));
	}

	if (!response.ok) {
		throw new ApiError(`Сервер ответил ошибкой ${response.status}`);
	}

	if (!data) {
		throw new ApiError("Сервер вернул некорректный ответ");
	}

	return Array.isArray(data.goods) ? data.goods : [];
}

export async function searchBrands(number) {
	return getBrands(await fetchGoods({ number }));
}

export async function searchOffers(number, brand) {
	return getOffers(await fetchGoods({ number, brand, analogues: "on" }));
}
