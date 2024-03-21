import "./App.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Home_Page from "./views/home_page";
import { Provider } from "react-redux";
import store from "./store";
import MainLayout from "./components/mainLayout";
import Product from "./views/product";
import Form_Data from "./views/form_data";
import Public from "./views/public";
import Chat_Page from "./views/chat_page";
import ThemeProvider from "../context/ThemeContext";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (localStorage.access_token) {
        return null;
      }
      return redirect("/");
    },
    children: [
      {
        path: "/home",
        element: <Home_Page />,
      },
      {
        path: "/home/:id",
        element: <Home_Page />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/form",
        element: <Form_Data />,
      },
      {
        path: "/form/:id",
        element: <Form_Data />,
      },
      {
        path: "/chat",
        element: <Chat_Page />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Public />,
        loader: () => {
          if (localStorage.access_token) {
            return redirect("/home");
          }
          return null;
        },
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
