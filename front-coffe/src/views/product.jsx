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
		if (id) {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "No, cancel!",
			}).then((result) => {
				if (result.isConfirmed) {
					Delete();
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					navigate("/products");
				}
			});
		}
	}, [id]);

	return (
		<>
			<div className="overflow-x-auto mx-auto max-sm:m-0 max-sm: px-4 w-3/4 max-sm:w-full max-sm:pb-4">
				<Link
					to={"/form"}
					className="btn btn-primary my-4 btn-sm max-sm:w-full"
				>
					Add Product
				</Link>
				<table className="table">
					{/* head */}
					<thead className="max-sm:hidden">
						<tr>
							<th>No</th>
							<th>Title</th>
							<th className="max-sm:hidden">Description</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody className="max-sm:flex max-sm:flex-col max-sm:max-w-full max-sm:gap-2">
						{products.map((el, i) => (
							<tr className="hover" key={el.id}>
								<td className="max-sm:absolute max-sm:font-bold max-sm:-translate-x-1/2 max-sm:left-1/2">
									{i + 1}
								</td>
								<td className="max-sm:pt-10">
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
									<span className="text-sm max-sm:hidden">
										{el.description}
									</span>
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
										onClick={() => {
											Swal.fire({
												title: "Are you sure?",
												text: "You won't be able to revert this!",
												icon: "warning",
												showCancelButton: true,
												confirmButtonColor: "#3085d6",
												cancelButtonColor: "#d33",
												confirmButtonText: "Yes, delete it!",
											}).then((result) => {
												if (result.isConfirmed) {
													Swal.fire({
														title: "Deleted!",
														text: "Your file has been deleted.",
														icon: "success",
													});
												}
											});
										}}
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
