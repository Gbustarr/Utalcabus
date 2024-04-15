import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListadoBuses from "./pages/ListadoBuses.tsx";
import RegistroBus from "./pages/RegistroBus.tsx";
import TemporalRouter from "./pages/TemporalRouter.tsx";
import AutenticacionAdmin from "./pages/AutenticacionAdministrador.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TemporalRouter />,
    children: [
      {
        path: "/Admin",
        element: <AutenticacionAdmin />,
      },
      {
        path: "/listadobuses",
        element: <ListadoBuses />,
      },
      {
        path: "/registrobus",
        element: <RegistroBus />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);