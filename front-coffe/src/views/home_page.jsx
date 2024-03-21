import { useContext, useEffect, useState } from "react";
import Card from "../components/card";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetch_product } from "../store/product_slice";
import { ThemeContext } from "../../context/ThemeContext";

export default function Home_Page() {
  const [params, setParams] = useState({});
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { theme, setCurrentTheme, currentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgcolor;
  const bgcomps = theme[currentTheme].bgcomps;
  const bgdetail = theme[currentTheme].bgdetail;
  const bgtext = theme[currentTheme].text;

  // console.log(setCurrentTheme)
  useEffect(() => {
    dispatch(fetch_product(params));
  }, [params]);

  const GetParams = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  // ---------------- MIDTRANS ----------------
  const { id } = useParams();
  const Payment = async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: BASE_URL + `/products/payment/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      window.snap.pay(data.token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
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
            title: "Payment success",
          });
        },
      });
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

  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      Payment();
      navigate("/home");
    }
  }, [id]);

  return (
    <div className={`${bgColor}`}>
      <div className="container flex flex-col justify-center items=center pt-5">
        <div
          className={`flex flex-row form-control z-10 sm:mx-10 lg:mx-24 xl:mx-48 ${bgColor} ${bgcomps} ${bgdetail}`}
        >
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
            name="q"
            onChange={GetParams}
          />
          <div className={`mt-3 ${bgtext}`}>
            <button
              className={`mb-5 ml-11`}
              onClick={() => {
                setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
              }}
            >
              Toggle Theme: {currentTheme}
            </button>
          </div>
        </div>

      <div
        className={`grid gap-4 lg:mt-10 justify-center sm:grid-cols-2 sm:mx-10 lg:grid-cols-3 lg:mx-24 xl:grid-cols-4 xl:mx-48`}
      >
        {products.map((el) => (
          <Card el={el} key={el.id} />
        ))}
      </div>
      </div>
      <div className={`footer border mt-4 flex justify-center p-5 ${bgtext} ${bgColor}`}>
        <p>Copyright by @Coffee shop 2024</p>
      </div>
    </div>
  );
}
