import * as React from 'react' ;
import { useState, useEffect } from 'react';

import { 
    Box, Container ,

} from "@mui/material";

import { deleteCard, getCards, newCard } from '../../axiosMain';
import { useSelector } from 'react-redux';
import NewCardDto from '../edit/models/newCardDto';
import { Button } from '@mui/material';
import Carta from '../../components/card';


export default function ListaProyectos(){
    const [ cards, setCards ] = React.useState([]);
    const [ effect, setEffect ] = React.useState(true);  
    const url = "Proyectos" ;
    React.useEffect(() => {
       const allCards =  getCards(  setCards  , url ) ; 
    }, [ effect ]);

    const mode = useSelector( ( state ) => state.adminMode.value ) ;
    const handleNewCard = async (  ) =>{
        const card = new NewCardDto( url) ; 
        await newCard( card , url ) ;
        getCards( setCards , url ) ; 
        setEffect( !effect ) ;
    }

    const handleDelete = async ( idCard ) =>{
       
        deleteCard( idCard  , setCards,  url ) ;
        setEffect( !effect ) ;
    }
    return(
        <Box className = "BoxListaProyectos" >
            <Container>
            { mode ? <Button aria-label='Crear Nueva Carta' onClick={ handleNewCard }> Crear Nueva Carta </ Button> : null }
                {
                    cards.map( ( item ) =>(
                        
                            <Carta 
                                key = { item.idCard }
                                img = { item.img }
                                title = { item.title }
                                content = { item.content }
                                route = { item.route }
                                idCard = { item.idCard }
                                isLocked = { item.isLocked }
                                CardWidth = '100'
                                CardHeight = '300'
                                handleDelete = { handleDelete }
                            />
                    
                    ))
                }
                        
            </Container>
        </Box>
    );

}