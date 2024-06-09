import { useEffect, useState } from "react";
import Card from "../components/card";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch_pub_product } from "../store/product_slice";

export default function Public() {
	const dispatch = useDispatch();
	const [params, setParams] = useState({});

	const GetParams = (e) => {
		const { name, value } = e.target;
		setParams({ ...params, [name]: value });
	};

	useEffect(() => {
		params
			? dispatch(fetch_pub_product(params))
			: dispatch(fetch_pub_product(params));
	}, [params]);

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

	const { pub_products } = useSelector((state) => state.products);

	return (
		<>
			<div className="flex flex-wrap justify-center">
				<div className="min-h-screen container max-sm:px-4 lg:py-4 max-sm:pb-4">
					<div className="form-control lg:fixed lg:top-2 lg:-translate-x-1/2 lg:left-1/2 lg:z-20 max-sm:my-4">
						<input
							type="text"
							placeholder="Search"
							className="input input-bordered"
							name="q"
							onChange={GetParams}
						/>
					</div>
					<div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1">
						{pub_products.map((el) => (
							<Card el={el} Payment={Payment} key={el.id} />
						))}
					</div>
				</div>
				<div className="footer border flex justify-center py-5 bg-white">
					<p>Copyright by @Coffee shop 2024</p>
				</div>
			</div>
		</>
	);
}
