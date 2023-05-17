import * as React from 'react';
import { useState , useEffect } from 'react';
import Carta from '../components/card';
import { getCards, newCard } from '../axiosMain';
import { useSelector } from 'react-redux';
import { Button, Container } from '@mui/material';
import NewCardDto from './edit/models/newCardDto';


export default function AboutUs(  ) {
   
    const [ cards, setCards ] = useState([]); 
    const [ effect, setEffect ] = React.useState(true); 
    const url = "Nosotros" ;
    useEffect(() => {
        getCards(  setCards  , url ) ; 
    }, [ effect ]);

    const mode = useSelector( ( state ) => state.adminMode.value ) ;

    const handleNewCard = async (  ) =>{
        const card = new NewCardDto( url) ; 
        newCard( card , url ) ;
        getCards( setCards , url ) ; 
        setEffect( !effect ) ;
    }

    const handleDelete = async ( idCard ) =>{
       
        deleteCard( idCard  , setCards,  url ) ;
        setEffect( !effect ) ;
    }

    return(

       
        <div className = "AboutUs">  
            
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
  
        </div>
        
    ) ;




} 
