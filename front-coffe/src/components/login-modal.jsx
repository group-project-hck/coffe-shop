import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../constants";

export default function Form_Login() {
	// LOGIN BIASA
	const [input, setInput] = useState({
		email: "",
		password: "",
	});

	const GetInput = (e) => {
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
		try {
			const { data } = await axios({
				method: "post",
				url: BASE_URL + "/login",
				data: input,
			});

			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("username", data.username);
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
				title: "Signed in successfully",
			});
			navigate("/home");
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

	// LOGIN GOOGLE
	useEffect(() => {
		async function handleCredentialResponse({ credential }) {
			const google_token = credential;
			const { data } = await axios({
				method: "post",
				url: BASE_URL + "/google-login",
				data: { google_token },
			});

			localStorage.setItem("access_token", data.access_token);
			localStorage.setItem("username", data.username);
			localStorage.setItem("picture", data.picture);
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
				title: "Signed in successfully",
			});
			navigate("/home");
		}

		window.onload = function () {
			// karna ada interaksi dgn DOM, jadi harus taro di useEffect
			google.accounts.id.initialize({
				client_id:
					"84835869104-app1ea9lob7o3j5ns9pp8noudn7lic0o.apps.googleusercontent.com",
				callback: handleCredentialResponse,
			});
			google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
				theme: "auto",
				size: "large",
			});
			google.accounts.id.prompt();
		};
	}, []);

	return (
		<>
			{/* You can open the modal using document.getElementById('ID').showModal() method */}
			<button
				className="btn btn-success btn-sm text-white"
				onClick={() => document.getElementById("form_login").showModal()}
			>
				Login
			</button>
			<dialog id="form_login" className="modal">
				<div className="modal-box">
					<form method="dialog" className="flex flex-col gap-2">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
						{/* if there is a button in form, it will close the modal */}
						<h1 className="font-bold tracking-tigh text-xl mb-4">Log In</h1>
						<label className="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="w-4 h-4 opacity-70"
							>
								<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
								<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
							</svg>
							<input
								type="text"
								className="grow"
								placeholder="Email"
								name="email"
								onChange={GetInput}
							/>
						</label>
						<label className="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="w-4 h-4 opacity-70"
							>
								<path
									fillRule="evenodd"
									d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
									clipRule="evenodd"
								/>
							</svg>
							<input
								type="password"
								className="grow"
								placeholder="Password"
								name="password"
								onChange={GetInput}
							/>
						</label>
						<button
							onClick={Submit}
							type="Submit"
							className="btn btn-primary my-4 w-1/2 m-auto btn-circle"
						>
							Continue
						</button>
					</form>
					<div className="divider">OR</div>

					{/* LOGIN SOSMED */}
					<div
						id="buttonDiv"
						className="absolute -translate-x-1/2 left-1/2 max-sm:left-1/3 max-sm:right-1/2"
					/>
					{/* END SOSMED */}

					<p className="text-center text-slate-400 mt-24 max-sm:mt-20 max-sm:text-sm">
						By registering, you agree to our{" "}
						<Link to={"#"} className="text-blue-700">
							Terms & Conditions
						</Link>{" "}
						and that you have read our{" "}
						<Link to={"#"} className="text-blue-700">
							Privacy Notice
						</Link>
						.
					</p>
				</div>
			</dialog>
		</>
	);
}
