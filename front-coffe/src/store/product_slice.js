import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../constants";

// ---------------- CREATE REDUSER ----------------
const slicer = createSlice({
	name: "products",
	initialState: {
		pub_products: [],
		products: [],
		products_id: {},
	},
	reducers: {
		public_products: (state, action) => {
			state.pub_products = action.payload;
		},
		products: (state, action) => {
			state.products = action.payload;
		},
		products_id: (state, action) => {
			state.products_id = action.payload;
		},
	},
});
const { public_products, products, products_id } = slicer.actions;

// ---------------- ASYNC THUNK ----------------
export function fetch_pub_product(params) {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "get",
				url: BASE_URL + "/pub-product",
				params: params,
			});
			dispatch(public_products(data));
		} catch (error) {
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				},
			});
			Toast.fire({
				icon: "error",
				title: error.response.data.msg,
			});
		}
	};
}

export function fetch_product(params) {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "get",
				url: BASE_URL + "/products",
				params: params,
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
				},
			});
			dispatch(products(data));
		} catch (error) {
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				},
			});
			Toast.fire({
				icon: "error",
				title: error.response.data.msg,
			});
		}
	};
}

export function fetch_product_id(id, setInput) {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "get",
				url: BASE_URL + `/products/${id}`,
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
				},
			});
			dispatch(products_id(data));
			setInput(data);
		} catch (error) {
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				},
			});
			Toast.fire({
				icon: "error",
				title: error.response.data.msg,
			});
		}
	};
}

export default slicer.reducer;
