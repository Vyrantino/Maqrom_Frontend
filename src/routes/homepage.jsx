import * as React from 'react';
import '@coreui/coreui/dist/css/coreui.min.css' ; 
import Carousel from '../components/carousel';
import Papers from '../components/papers';
import Grid from '@mui/material/Unstable_Grid2';
import Carta from '../components/card';
import { getAllCards, newCard } from '../axiosMain';
import { useSelector } from 'react-redux';
import NewCardDto from './edit/models/newCardDto';
import { Button, Container, Typography } from '@mui/material';



const List = ( props ) =>(
    <ul>
        { props.list.map( ( item ) => (
            <Item 
                key = { item.idCard } 
                item = { item }  
                setCards= { props.setCards } 
                param = { props.param }
            />
        ) ) }
    </ul>
);

const Item = ( props ) =>(
            <li className = "HomepageCards" > 
                <Carta 
                     img = { props.item.img }
                     title = { props.item.title }
                     content = { props.item.content }
                     route = { props.item.route }
                     idCard = { props.item.idCard }
                     isLocked = { props.isLocked }
                     setCards = { props.setCards }
                     param = { props.param }
                />
            </li>
);

export default function Homepage (  ){
    const [ cards, setCards ] = React.useState([]); 
    const url = "Homepage" ;
    React.useEffect(() => {
       const allCards =  getAllCards(  setCards  , url ) ; 
    }, []);

    const mode = useSelector( ( state ) => state.adminMode.value ) ;

    const handleNewCard = async (  ) =>{
        const card = new NewCardDto( url ) ; 
        await newCard( card , url ) ;
        await getAllCards( setCards , url ) ; 
    }

    return(
           
                <div
                    className = "Carousel"
                >
                        <Carousel route = { url } />
                        <Container  >
                            { mode ? <Button aria-label='Crear Nueva Carta' onClick={ handleNewCard }> Crear Nueva Carta </ Button> : null }
                             <List  list = { cards } setCards = { setCards } param = { url } /> 
                        </ Container>
                        <hr />

                        <Typography itemType='h1' > aaa  </Typography>
                      
                       <Container>
                            <Grid  spacing = { 3 } >
                                    <Grid container spacing = { 3 } >
                                {
                                        cards.map( ( item ) =>(
                                            <Carta 
                                                img = { item.img }
                                                title = { item.title }
                                                content = { item.content }
                                                route = { item.route }
                                                idCard = { item.idCard }
                                                isLocked = { item.isLocked }
                                                setCards = { item.setCards }
                                                param = { item.param }
                                            />
                                        ))
                                    }
                                    </Grid>
                                </Grid>
                       </Container>
                        
                        <Grid container spacing = { 3 } >
                            
                            <Papers />

                        </Grid>
                       
                </div>
                      
                    
           
                    
           
      

    );

}