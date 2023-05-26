import React , {
    useState
} from "react";
import { 
    Outlet,
 } from "react-router-dom" ;
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import ButtonAppBar from "../components/navigation/appbar";
import Footer from "../components/navigation/footer";
import { Box, Typography } from "@mui/material";
import MaqromLogo from '../assets/Maqrom.svg' ;
import Sidebar from "./edit/sidebar";
import { useSelector } from "react-redux";


 export default function Root() {
    const mode = useSelector( ( state ) => state.adminMode.value ) ;

    const [ sidebar, setSidebar ] = React.useState( false ) ;

    const toogle = ( open ) =>  {
        setSidebar( open );
    };

    return(
       
            <Box className = "root"> 
               
                <ButtonAppBar toogle = { toogle } />     
                  
                <Box className = "ButtonAppBar" >
                <Box className='MaqromHeader' >
                    <Typography  position = 'relative' variant='h1' > Maqrom Constructora </Typography> 
                    
                </Box>
                    <Outlet context={ [ sidebar , setSidebar ] } />   
                </Box>   
               
                <Footer />
                
                <FloatingWhatsApp 
                        notificationSound
                        allowEsc
                        allowClickAway
                        avatar= { MaqromLogo }
                        chatMessage="Bienvenido a nuestra pagina! Escribanos un mensaje aqui para contactarnos por whatsapp"
                        statusMessage="Recibirá una respuesta a lo largo de 72hrs!"
                        phoneNumber="+526183613796"
                        accountName="Maqrom Construcciones"   
                />
            </Box >

    );

 }