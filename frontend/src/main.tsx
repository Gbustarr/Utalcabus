import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListadoBuses from "./pages/ListadoBuses.tsx";
import RegistroBus from "./pages/RegistroBus.tsx";
import TemporalRouter from "./pages/TemporalRouter.tsx";
import AutenticacionAdmin from "./pages/AutenticacionAdministrador.tsx";
import { UpdateBusPage } from "./pages/admin/UpdateBusPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TemporalRouter />,
  },
      {
        path: "/admin",
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
      {
        path: "/actualizarbus",
        element: <UpdateBusPage />,
      },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);