import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { fetch_product_id } from "../store/product_slice";

export default function Form_Data() {
	const { id } = useParams();
	const [file, setFile] = useState(null);
	const getImage = (e) => {
		const image = e.target.files[0];
		setFile(image);
	};
	const [input, setInput] = useState({
		title: "",
		description: "",
		price: "",
		CategoryId: "",
	});

	const getInput = (e) => {
		const { name, value } = e.target;
		const newInput = {
			...input,
			[name]: value,
		};
		setInput(newInput);
	};

	const navigate = useNavigate();
	const Submit = async (e) => {
		e.preventDefault();
		let form_input = new FormData();
		form_input.append("image", file || input.image);
		form_input.append("title", input.title);
		form_input.append("description", input.description);
		form_input.append("price", input.price);
		form_input.append("CategoryId", input.CategoryId);
		const option = {
			method: "post",
			url: BASE_URL + "/products",
			data: form_input,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		};
		if (id) {
			option.method = "put";
			option.url = BASE_URL + "/products/" + id;
		}

		try {
			const { data } = await axios(option);
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

	const dispatch = useDispatch();
	useEffect(() => {
		if (id) {
			dispatch(fetch_product_id(id, setInput));
		}
	}, [id]);

	return (
		<>
			<div className="h-screen w-full flex justify-center items-center border-t border-red-500 absolute top-0 max-sm:px-4">
				<form
					action=""
					className="flex flex-wrap flex-col gap-2 lg:bg-slate-200 p-10 max-sm:p-0 max-sm:w-full"
					onSubmit={Submit}
				>
					<Link to={"/products"} className="btn btn-circle btn-ghost">
						✕
					</Link>
					<h1 className="font-bold mb-4 tracking-tigh text-xl text-center p-3 w-1/2 m-auto">
						{id ? "Update Products" : "Input New Products"}
					</h1>
					<label className="input input-bordered flex items-center gap-2 max-sm:w-full">
						Title
						<input
							type="text"
							className="grow"
							placeholder="- title"
							name="title"
							onChange={getInput}
							value={input.title}
						/>
					</label>
					<label className="input input-bordered flex items-center gap-2 max-sm:w-full">
						Description
						<input
							type="text"
							className="grow"
							placeholder="- description"
							name="description"
							onChange={getInput}
							value={input.description}
						/>
					</label>
					<label className="input input-bordered flex items-center gap-2 max-sm:w-full">
						Image
						<input
							type="file"
							className="grow"
							placeholder="- image URL"
							name="image"
							onChange={getImage}
						/>
					</label>
					<div className="flex justify-between gap-2 max-sm:flex-col">
						<label className="input input-bordered flex items-center gap-2 w-full">
							Price
							<input
								type="number"
								className="grow"
								placeholder="- price"
								name="price"
								onChange={getInput}
								value={input.price}
							/>
						</label>
						<select
							className="select select-bordered w-full lg:max-w-xs max-sm:w-full"
							name="CategoryId"
							onChange={getInput}
							value={input.CategoryId}
						>
							<option value={""}>Category</option>
							<option value={"1"}>Iced</option>
							<option value={"2"}>Hot</option>
						</select>
					</div>
					<button type="Submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</>
	);
}
