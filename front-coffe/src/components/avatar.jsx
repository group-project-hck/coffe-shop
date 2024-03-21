import { Link, useNavigate } from "react-router-dom";

export default function Avatar() {
  const navigate = useNavigate();
  const Logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    navigate("/");
  };

<<<<<<< HEAD
  return (
    <>
      <div className="dropdown dropdown-end text-black">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-2"
        >
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/chat"}>Chat</Link>
          </li>
          {localStorage.username === "admin" && (
            <li>
              <Link to={"/products"}>Products</Link>
            </li>
          )}
          <li>
            <button onClick={Logout}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
=======
	return (
		<>
			<div className="dropdown dropdown-end">
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle avatar"
				>
					<div className="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src={
								localStorage.picture
									? localStorage.picture
									: "https://cdn.pixabay.com/photo/2013/07/12/14/36/man-148582_1280.png"
							}
						/>
					</div>
				</div>
				<ul
					tabIndex={0}
					className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-2"
				>
					<li>
						<Link to={"/home"}>Home</Link>
					</li>
					<li>
						<Link to={"/chat"}>Chat</Link>
					</li>
					{localStorage.username === "admin" && (
						<li>
							<Link to={"/products"}>Products</Link>
						</li>
					)}
					<li>
						<button onClick={Logout}>Logout</button>
					</li>
				</ul>
			</div>
		</>
	);
>>>>>>> 6f9e3979570299d791690b74d89695ab563c70a2
}
