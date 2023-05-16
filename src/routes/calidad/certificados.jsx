import * as React from 'react' ; 
import { 
    Box ,
    Button,
} from '@mui/material';

import { getAllCards, newCard } from '../../axiosMain';
import { useSelector } from 'react-redux';
import NewCardDto from '../edit/models/newCardDto';
import Carta from '../../components/card';

const List = ( props ) =>(
    <ul >
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
        <div>
            <li  className = "card" > 
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
        </div>
);



export default function Certificados() {
    const [ cards, setCards ] = React.useState([]); 
    const url = "Certificados" ;
    React.useEffect(() => {
       const allCards =  getAllCards(  setCards  , url ) ; 
    }, []);

    const mode = useSelector( ( state ) => state.adminMode.value ) ;

    const handleNewCard = async (  ) =>{
        const card = new NewCardDto( url) ; 
        await newCard( card , url ) ;
        const updatedCards = await getAllCards( setCards , url ) ; 
    }


    return(
        <Box className = "UnaBox" >
            { mode ? <Button aria-label='Crear Nueva Carta' onClick = { handleNewCard }> Crear Nueva Carta </ Button> : null }
            <List  list = { cards } setCards = { setCards } param = { url } /> 
        </Box>

    );

}