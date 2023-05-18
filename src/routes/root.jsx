import React , {
    useState
} from "react";
import { 
    Outlet,
 } from "react-router-dom" ;
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import ButtonAppBar from "../components/navigation/appbar";
import Footer from "../components/navigation/footer";
import { Box, SwipeableDrawer, Button } from "@mui/material";
import MaqromLogo from '../assets/Maqrom.svg' ;

 export default function Root() {

    return(
       
            <Box className = "root"> 
                <h1> MAQROM Constructora </h1>   
                    <ButtonAppBar  /> 
                <Box className = "ButtonAppBar" >
                    <Outlet  />   
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