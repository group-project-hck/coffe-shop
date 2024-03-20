import { Link } from "react-router-dom";
import Form_Login from "./login-modal";
import Avatar from "./avatar";
import Form_Register from "./register-modal";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, setCurrentTheme, currentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgcolor;
  const bgcomps = theme[currentTheme].bgcomps;
  const bgdetail = theme[currentTheme].bgdetail;
  const bgtext = theme[currentTheme].text;

  return (
    <div className={`navbar bg-base-100 border-b px-10 fixed top-0 left-0 right-0 z-10 ${bgColor} ${bgcomps} ${bgdetail} ${bgtext}`}>
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          Coffe shop
        </Link>
      </div>
      <div className="flex gap-2">
        {localStorage.access_token && (
          <p className="font-bold">Welcome, {localStorage.username}</p>
        )}
        {localStorage.access_token && <Avatar />}
        {localStorage.access_token && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-green-600 text-white">
                  8
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!localStorage.access_token && <Form_Register />}
        {!localStorage.access_token && <Form_Login />}
      </div>
    </div>
  );
}
