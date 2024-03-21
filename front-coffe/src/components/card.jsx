import { Link } from "react-router-dom";
import Likes from "./like";

export default function Card({ el, Payment }) {
	return (
		<div
			className="card max-sm:h-[350px] max-sm:w-[350px] sm:h-[350px] bg-base-100 shadow-xl"
			data-aos="fade-right"
		>
			<figure>
				<img
					className="mt-[-100px] bg-contain bg-center"
					src={el.image}
					alt="image"
				/>
			</figure>
			<div className="card-body">
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
				<div className="card-actions justify-between">
					<Likes />
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
