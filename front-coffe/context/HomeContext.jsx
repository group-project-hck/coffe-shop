import axios from "axios";
import { createContext, useState } from "react";

export const HomeContext = createContext({
  loading: false,
  error: "",
  todos: [],
  fetchHome: () => {},
});

export default function HomeProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHome = async () => {
    setLoading(true);

    axios
      .get("http://localhost/pub-product")

      .then((res) => {
        setData(res.data);
      })

      .catch((err) => {
        setError("Opps, something wrong!");
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <HomeContext.Provider
      value={{
        error,
        fetchHome,
        loading,
        todos: data,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
