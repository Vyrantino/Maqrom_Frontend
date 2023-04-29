import * as React from 'react' ;
import ReactDOM from 'react-dom/client' ;
import Root  from './routes/root' ;
import AboutUs  from './routes/about-us';
import Calidad from './routes/calidad';
import Renta from './routes/renta';
import Servicios from './routes/servicios';
import Contacto from './routes/contacto';
import './index.css' ; 
import { 
  createBrowserRouter,
  RouterProvider , 
 } from "react-router-dom" ;
import Homepage from './routes/homepage';
import  ListaServicios from './routes/servicios/lista-servicios';
import  ListaProyectos from './routes/servicios/lista-proyectos';
import  ListaPlanos from './routes/servicios/lista-planos';
import  CalidadProductos from './routes/calidad/calidad-productos';
import  CalidadServicios from './routes/calidad/calidad-servicios';
import  Certificados from './routes/calidad/certificados';
import { ThemeProvider, createTheme } from '@mui/material';
import ErrorPage from './routes/error-page';
import Admin from './admin';
const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#ffa726',
      },
      secondary: {
        main: '#000000',
      },
      background: {
        default: '#9e9e9e',
        paper: '#ffffff',
      },
      error: {
        main: '#afb42b',
      },
      info: {
        main: '#fbc02d',
      },
    },
  }
) ; 


 const router = createBrowserRouter([
    {
      path : "/" , 
      element : <Root /> ,
      errorElement : <ErrorPage />,
      
      children : 
      [ 
        {
          path : "/" , 
          element : <Homepage />,
        

        } , 
        {
          path : "about-us/" , 
          element : <AboutUs />,
          
        } , 
        {
          path : "calidad/" , 
          element : <Calidad />,
          
        } , 
      
        {
          path : "contacto/" , 
          element : <Contacto />,
          
        } ,   
        {
          path : "renta/" , 
          element : <Renta />,
    
        } , 
        {
          path : "servicios/" , 
          element : <Servicios />,
          
        } , 
        {
          path: "servicios/lista-servicios/" , 
          element : <ListaServicios />
        } ,       
        {
          path: "servicios/lista-planos/" , 
          element : <ListaPlanos />
        } ,
        {
          path: "servicios/lista-proyectos/" , 
          element : <ListaProyectos />
        } ,
        {
          path: "calidad/certificados/" , 
          element : <Certificados />
        } ,       
        {
          path: "calidad/servicios/" , 
          element : <CalidadServicios />
        } ,
        {
          path: "calidad/productos/" , 
          element : <CalidadProductos />
        } ,
        {
          path: "/admin/", 
          element: <Admin />

        }
      ]

    } , 

 ]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
       <RouterProvider router = { router } />
    </ThemeProvider>
       
    
  </React.StrictMode>,
)
