import * as React from 'react' ;
import { useState, useEffect } from 'react';
import { 
    Box ,

} from "@mui/material";
import Carta from "../../components/card";
import CartaRenta from "../../components/card-renta";
import { getAllCards } from '../../axiosMain';


export default function ListaPlanos(){

    const [ cards, getCards ] = useState([]); 
    const url = "Planos" ;
    useEffect(() => {
        
        getAllCards( { getCards } , url ) ; 
    }, []);

    return(
        <Box className = "BoxListaProyectos" >
            <Carta />
            <CartaRenta />
        </Box>
    );

}