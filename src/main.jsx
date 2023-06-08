import * as React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import AboutUs from "./routes/about-us";
import Calidad from "./routes/calidad";
import Renta from "./routes/renta";
import Servicios from "./routes/servicios";
import Contacto from "./routes/contacto";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/homepage";
import ListaServicios from "./routes/servicios/lista-servicios";
import ListaProyectos from "./routes/servicios/lista-proyectos";
import ListaPlanos from "./routes/servicios/lista-planos";
import CalidadProductos from "./routes/calidad/calidad-productos";
import CalidadServicios from "./routes/calidad/calidad-servicios";
import Certificados from "./routes/calidad/certificados";
import { ThemeProvider, createTheme } from "@mui/material";
import ErrorPage from "./routes/error-page";
import Admin from "./admin";
import store from "./components/redux/store";
import { Provider as ProviderRedux } from "react-redux";
import EditCard from "./routes/edit/editCard";
import EditCarousel from "./routes/edit/editCarousel";
import Article from "./routes/article";
import EditPaper from "./routes/edit/editPaper";
import Sidebar from "./routes/edit/sidebar";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E66825",
    },
    secondary: {
      main: "#F3F3F3",
    },
    background: {
      default: "#f0dfc7",
      paper: "#F3F3F3",
    },
    error: {
      main: "#1F0318",
    },
    info: {
      main: "#F3F3F3",
    },
  },
  typography: {
    h3: {
      fontSize: '4.2rem',
      '@media (min-width:600px)': {
        fontSize: '4.5rem',
      },
      
    }


  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "about-us/",
        element: <AboutUs />,
      },
      {
        path: "calidad/",
        element: <Calidad />,
      },

      {
        path: "contacto/",
        element: <Contacto />,
      },
      {
        path: "renta/",
        element: <Renta />,
      },
      {
        path: "servicios/",
        element: <Servicios />,
      },
      {
        path: "servicios/lista-servicios/",
        element: <ListaServicios />,
      },
      {
        path: "servicios/lista-planos/",
        element: <ListaPlanos />,
      },
      {
        path: "servicios/lista-proyectos/",
        element: <ListaProyectos />,
      },
      {
        path: "calidad/certificados/",
        element: <Certificados />,
      },
      {
        path: "calidad/servicios/",
        element: <CalidadServicios />,
      },
      {
        path: "calidad/productos/",
        element: <CalidadProductos />,
      },
      {
        path: "admin/",
        element: <Admin />,
      },
      {
        path: "/editCard/",
        element: <EditCard />,
      },
      {
        path: "/editCarousel/",
        element: <EditCarousel />,
      },
      {
        path: "/article/",
        element: <Article />,
      },
      {
        path: "/editPaper/:idPaper",
        element: <EditPaper />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ProviderRedux store={store}>
        <RouterProvider router={router} />
      </ProviderRedux>
    </ThemeProvider>
  </React.StrictMode>
);
