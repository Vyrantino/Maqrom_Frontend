import * as React from 'react';
import '@coreui/coreui/dist/css/coreui.min.css' ; 
import Carousel from '../components/carousel';
import Papers from '../components/papers';
import Grid from '@mui/material/Unstable_Grid2';
import Carta from '../components/card';
import { deleteCard, getCards, newCard } from '../axiosMain';
import { useSelector } from 'react-redux';
import NewCardDto from './edit/models/newCardDto';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


export default function Homepage (  ){
    const [ cards, setCards ] = React.useState([]); 
    const [ effect, setEffect ] = React.useState(true); 
    const [ card, setCard ] = React.useState(); 
    const [ image, setImage ] = React.useState(); 
    const url = "Homepage" ;
    React.useEffect(() => { 
       getCards(  setCards  , url ) ; 
    }, [ effect ]);

    const mode = useSelector( ( state ) => state.adminMode.value ) ;

    const handleNewCard = async (  ) =>{
        const card = new NewCardDto( url ) ; 
        newCard( card , url ) ;
        setEffect( !effect ) ;
    }
    const handleDelete = async ( idCard ) =>{
       
        deleteCard( idCard  , setCards,  url ) ;
        setEffect( !effect ) ;
    }

    return(
           
            <div>
                        <Carousel route = { url } />
                        { mode ? <Button variant='contained' LinkComponent={ Link } to = { '/editCarousel' } > Editar </Button> : null }
                        <hr />  
                      
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
                        
                        <Grid container spacing = { 3 } >
                            
                            <Papers />

                        </Grid>
                       
            </div>
                      
                    
           
                    
           
      

    );

}