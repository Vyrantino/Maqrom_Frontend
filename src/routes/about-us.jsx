import * as React from 'react';
import { useState , useEffect } from 'react';
import Raccoon from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/raccoon.jpg" ;
import imagen from "C:/Users/Vyrant PC/Documents/VsCode Web Pages/vaquero backend/maqrom-constructora-backend/uploadedImages/1683620899188.jpg" ; 
import Carta from '../components/card';
import { getAllCards } from '../axiosMain';
import { Button } from '@mui/material';




const List = ( props ) =>(
    
    <ul >
        { props.list.map( ( item ) => (
            <Item key = { item.idCard } item = { item } />
           
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
                />
            </li>
        </div>
      
    
);


export default function AboutUs(  ) {

    const [ cards, setCards ] = useState([]); 
    const url = "Nosotros" ;
    useEffect(() => {
       const allCards =  getAllCards(  setCards  , url ) ; 
    }, []);

   
    return(

       
        <div className = "AboutUs">  
             
             <List  list = { cards } /> 
  
        </div>
        
    ) ;




} 
