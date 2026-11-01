import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError, searchBrands, searchOffers } from "../api/favorit";

const UNKNOWN_ERROR = "Что-то пошло не так, попробуйте ещё раз";

function getErrorMessage(error) {
	return error instanceof ApiError ? error.message : UNKNOWN_ERROR;
}

export const fetchBrands = createAsyncThunk(
	"search/fetchBrands",
	async (number, { rejectWithValue }) => {
		try {
			return await searchBrands(number);
		} catch (error) {
			return rejectWithValue(getErrorMessage(error));
		}
	},
);

export const fetchOffers = createAsyncThunk(
	"search/fetchOffers",
	async ({ number, brand }, { rejectWithValue }) => {
		try {
			return await searchOffers(number, brand);
		} catch (error) {
			return rejectWithValue(getErrorMessage(error));
		}
	},
);

const emptyRequest = {
	items: [],
	status: "idle",
	error: null,
	requestId: null,
};

const initialState = {
	number: "",
	selectedBrand: null,
	brands: emptyRequest,
	offers: emptyRequest,
};

function startRequest(request, action) {
	Object.assign(request, {
		items: [],
		status: "loading",
		error: null,
		requestId: action.meta.requestId,
	});
}

function finishRequest(request, action) {
	if (request.requestId === action.meta.requestId) {
		request.items = action.payload;
		request.status = "succeeded";
	}
}

function failRequest(request, action) {
	if (request.requestId === action.meta.requestId) {
		request.error = action.payload ?? UNKNOWN_ERROR;
		request.status = "failed";
	}
}

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		searchCleared: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBrands.pending, (state, action) => {
				state.number = action.meta.arg;
				state.selectedBrand = null;
				state.offers = emptyRequest;

				startRequest(state.brands, action);
			})
			.addCase(fetchBrands.fulfilled, (state, action) =>
				finishRequest(state.brands, action),
			)
			.addCase(fetchBrands.rejected, (state, action) =>
				failRequest(state.brands, action),
			)
			.addCase(fetchOffers.pending, (state, action) => {
				state.selectedBrand = action.meta.arg.brand;

				startRequest(state.offers, action);
			})
			.addCase(fetchOffers.fulfilled, (state, action) =>
				finishRequest(state.offers, action),
			)
			.addCase(fetchOffers.rejected, (state, action) =>
				failRequest(state.offers, action),
			);
	},
});

export const { searchCleared } = searchSlice.actions;
export default searchSlice.reducer;
