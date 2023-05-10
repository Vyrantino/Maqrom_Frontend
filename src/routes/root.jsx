import React , {
    useState
} from "react";
import { 
    Outlet,
 } from "react-router-dom" ;
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import ButtonAppBar from "../components/navigation/appbar";
import Footer from "../components/navigation/footer";
import { Box } from "@mui/material";

 export default function Root() {

    return(
       
            <Box className = "root"> 
                <h1> MAQROM Constructora </h1>   
                    <ButtonAppBar  /> 
                <Box className = "Outlet" >
                    <Outlet className = 'outlet' />   
                </Box>   
               
                <Footer />
                
                <FloatingWhatsApp 
                        phoneNumber="+526183613796"
                        accountName="Maqrom Construcciones"   
                /> 
            </Box >

    );

 }