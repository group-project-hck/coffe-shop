import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetch_product } from "../store/product_slice";

export default function Product() {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(fetch_product());
	}, []);

	// ---------------- DELETE ----------------
	const { id } = useParams();
	const navigate = useNavigate();
	const Delete = async () => {
		try {
			const { data } = await axios({
				method: "delete",
				url: BASE_URL + "/products/" + id,
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
				},
			});
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
				icon: "success",
				title: data.msg,
			});

			dispatch(fetch_product());
			navigate("/products");
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
	useEffect(() => {
		if (id) Delete();
	}, [id]);

	return (
		<>
			<div className="overflow-x-auto mt-16 w-3/4 m-auto">
				<Link to={"/form"} className="btn btn-primary my-4 btn-sm">
					Add Product
				</Link>
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>No</th>
							<th>Title</th>
							<th>Description</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((el, i) => (
							<tr className="hover" key={el.id}>
								<td>{i + 1}</td>
								<td>
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle w-16 h-16">
												<img src={el.image} alt="menu-image" />
											</div>
										</div>
										<div>
											<div className="font-bold">{el.title}</div>
											<div className="text-sm opacity-50">
												{el.Category.name}
											</div>
										</div>
									</div>
								</td>
								<td>
									<span className="text-sm">{el.description}</span>
								</td>
								<td>
									{" "}
									{new Intl.NumberFormat("id-ID", {
										style: "currency",
										currency: "IDR",
									}).format(el.price)}
								</td>
								<th className="flex flex-col gap-2">
									<Link
										to={`/products/${el.id}`}
										className="btn btn-error btn-xs text-white"
									>
										Delete
									</Link>
									<Link
										to={`/form/${el.id}`}
										className="btn btn-warning btn-xs"
									>
										{" "}
										Update{" "}
									</Link>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
