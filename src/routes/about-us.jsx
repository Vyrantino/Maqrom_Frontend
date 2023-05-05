import * as React from 'react';
import { useState , useEffect } from 'react';
import Raccoon from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/raccoon.jpg" ;
import Carta from '../components/card';
import { getAllCards } from '../axiosMain';




const List = ( props ) =>(
    <ul >
        { props.list.map( ( item ) => (
            <Item  key = { item.objectID }  item = { item } />
        ) ) }
    </ul>

);

const Item = ( props ) =>(
    
        <div>
            <li className = "card" > 
                <Carta 
                     img = { Raccoon } 
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

    const [ cards, getCards ] = useState([]); 
    const url = "Nosotros" ;
    useEffect(() => {
        getAllCards( { getCards } , url ) ; 
    }, []);

   
    return(

       
        <div className = "AboutUs">  
     
             <List  list = { cards } /> 
  
        </div>
        
    ) ;




} 
