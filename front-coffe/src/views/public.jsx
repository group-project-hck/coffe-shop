import { useEffect, useState } from "react";
import Card from "../components/card";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch_pub_product } from "../store/product_slice";

export default function Public() {
	const [params, setParams] = useState({});
	const dispatch = useDispatch();
	const { pub_products } = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(fetch_pub_product(params));
	}, [params]);

	const GetParams = (e) => {
		const { name, value } = e.target;
		setParams({ ...params, [name]: value });
	};

	// ---------------- MIDTRANS ----------------
	const { id } = useParams();
	const Payment = async () => {
		try {
			const { data } = await axios({
				method: "post",
				url: BASE_URL + `/products/payment/${id}`,
			});
			window.snap.pay(data.token, {
				onSuccess: function (result) {
					alert("payment success!");
					console.log(result);
				},
			});
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

	const navigate = useNavigate();
	useEffect(() => {
		if (id) {
			Payment();
			navigate("/home");
		}
	}, [id]);

	return (
		<>
			<div className="form-control mt-20 mb-5 max-sm:mx-8 sm:mx-10 lg:mx-24 lg:fixed lg:mx-48 lg:mt-[-72px] z-10">
				<input
					type="text"
					placeholder="Search"
					className="input input-bordered"
					name="q"
					onChange={GetParams}
				/>
			</div>
			<div className="grid gap-4 lg:mt-20 justify-center sm:grid-cols-2 sm:mx-10 lg:grid-cols-3 lg:mx-24 xl:grid-cols-4 xl:mx-48">
				{pub_products.map((el) => (
					<Card el={el} Payment={Payment} key={el.id} />
				))}
			</div>
			<div className="footer border mt-4 flex justify-center p-5">
				<p>Copyright by @Coffee shop 2024</p>
			</div>
		</>
	);
}
