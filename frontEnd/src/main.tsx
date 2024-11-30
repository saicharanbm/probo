import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddUser from "./components/AddUser";
import HomePage from "./components/HomePage";
import Events from "./components/Events.tsx";
import StockPage from "./components/StockPage.tsx";
import AddMoney from "./components/AddMoney";
import AddEvent from "./components/AddEvent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add-money",
        element: <AddMoney />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/add-event",
        element: <AddEvent />,
      },
      {
        path: "/event/:stockSymbol",
        element: <StockPage />,
      },
    ],
    errorElement: <div>Page Not Found</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
