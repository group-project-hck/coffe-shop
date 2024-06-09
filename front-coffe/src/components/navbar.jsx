import { Link } from "react-router-dom";
import Form_Login from "./login-modal";
import Avatar from "./avatar";
import Form_Register from "./register-modal";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Navbar() {
	const { theme, currentTheme } = useContext(ThemeContext);
	const bgColor = theme[currentTheme].bgcolor;
	const bgtext = theme[currentTheme].text;

	return (
		<div
			className={`navbar border-b px-10 sticky top-0 left-0 right-0 z-10 max-sm:px-4 ${bgColor} ${bgtext}`}
		>
			<div className="flex-1">
				<Link to={"/"} className="btn btn-ghost text-xl max-sm:p-0">
					Coffee shop
				</Link>
			</div>
			<div className={`flex gap-2  ${bgColor} ${bgtext}`}>
				{localStorage.access_token && (
					<p className="font-bold max-sm:hidden">
						Welcome, {localStorage.username}
					</p>
				)}
				{localStorage.access_token && <Avatar />}
				{localStorage.access_token && (
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
						></div>
					</div>
				)}
				{!localStorage.access_token && <Form_Register />}
				{!localStorage.access_token && <Form_Login />}
			</div>
		</div>
	);
}
