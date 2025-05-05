import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AllEquipment from "./pages/AllEquiment.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AddEquipment from "./pages/AddEquipment.jsx";
import MyList from "./pages/MyList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/allEquipment",
        element:<AllEquipment />,
        loader: ()=> fetch("http://localhost:5000/equipments"),
      },
      {
        path: "/addEquipment",
        element: <PrivateRoute><AddEquipment /></PrivateRoute>,
      },
      {
        path: "/myList/:email",
        element: <PrivateRoute><MyList /></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/equipments/email/${params.email}`),
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
