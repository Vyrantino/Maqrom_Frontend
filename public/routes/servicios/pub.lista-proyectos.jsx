import * as React from 'react' ;
import { 
    Box ,

} from "@mui/material";
import Carta from "../../components/card";
import CartaRenta from "../../components/card-renta";


export default function ListaProyectos(){
    return(
        <Box className = "BoxListaProyectos" >
           <Carta />
           <CartaRenta />
        </Box>
    );

}