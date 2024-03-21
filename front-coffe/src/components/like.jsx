import { useEffect, useState } from "react";
import socket from "../socket";
import Swal from "sweetalert2";

function Likes({ id }) {
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(0);

  const handleLikeAdd = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setLiked(true);
      socket.emit("like:add", { id });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to log in first!",
      });
    }
  };

  const handleLikeDec = () => {
    setLiked(false);
    //socket
    socket.emit("like:subtract", { id });
  };

  useEffect(() => {
    socket.on("like:update:" + id, (newLikeCount) => {
      setLike(newLikeCount);
    });

    // Membersihkan event listener pada saat komponen dibongkar
    return () => {
      socket.off("like:update:" + id);
    };
  }, [id]);

  const iconClassName = like ? "w-5 h-5 mr-2 text-red-400" : "w-5 h-5 mr-2";
  return (
    <div>
      <div
        onClick={liked ? handleLikeDec : handleLikeAdd}
        className="flex-1 flex items-center text-white text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className={iconClassName}>
          <g>
            <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
          </g>
        </svg>
        <span className="text-white text-xs">{like}</span>
      </div>
    </div>
  );
}

export default Likes;
