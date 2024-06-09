import { Link } from "react-router-dom";
import Likes from "./like";

export default function Card({ el, Payment }) {
	return (
		<div
			className="card bg-base-100 shadow-xl dark:border border-white"
			data-aos="fade-right"
		>
			<figure className="h-52">
				<img
					className="bg-cover object-cover hover:scale-125 hover:-rotate-6 transition ease-in-out duration-300"
					src={el.image}
					alt="image"
				/>
			</figure>
			<div className="card-body border-t-4 border-green-500 max-sm:p-2 bg-slate-100 rounded-none">
				<h2 className="card-title">
					{el.title}
					<div
						className={
							el.Category.name === "iced"
								? "badge badge-primary"
								: "badge badge-error text-white"
						}
					>
						{el.Category.name}
					</div>
				</h2>
				<p>
					{new Intl.NumberFormat("id-ID", {
						style: "currency",
						currency: "IDR",
					}).format(el.price)}
				</p>
				<div className="card-actions justify-between items-center">
					<Likes id={el.id} />
					<div className="card-actions justify-end">
						{!localStorage.access_token ? (
							<div
								onClick={Payment}
								className="btn btn-outline btn-success btn-sm btn-circle px-8"
							>
								buy
							</div>
						) : (
							<Link
								to={`/home/${el.id}`}
								className="btn btn-outline btn-success btn-sm btn-circle px-8"
							>
								buy
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
