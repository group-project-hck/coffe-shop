import { configureStore } from "@reduxjs/toolkit";
import products from "./product_slice";

const store = configureStore({
	reducer: {
		products,
	},
});

export default store;
