import * as React from 'react';
import { useState , useEffect } from 'react';
import Raccoon from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/raccoon.jpg" ;
import Carta from '../components/card';
import axios from 'axios';
import { getAllCards, getWithParam } from '../axiosMain';



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
    const url = 'http://localhost:3000/cards' ;

    // const getAllCards = () =>{
    //     axios.get( "http://localhost:3000/cards" ) 
    //         .then( ( response ) => {
    //             const allCards = response.data ; 
    //             getCards( allCards ) ;
                
    //         } )
    //         .catch( error => console.error( "Error: "+error+" " ) )
           
    // }
    
    useEffect(() => {
        // getAllCards(  { getCards }  );
        getWithParam( { getCards } , 'nosotros' ) ; 
    }, []);
    console.log( cards ) ; 
   
    return(

       
        <div className = "AboutUs">  

              
           
             <List  list = { cards } /> 
            
            {/* <Carta nameClass = "RightSectionAboutUs"  onImage = { Raccoon } onTitle = "hola" />     */}
                
                
        </div>
        
    ) ;




} 



// const entradasAboutUs = [
//     {
//         title: "Nosotros" ,
//         content: "contenido" , 
//     },
//     {
//         title: "Mision" ,
//         content: "contenido" , 
        
//     },
//     {
//         title: "Vision" ,
//         content: "contenido" , 
        
//     },
//     {
//         title: "Algo" ,
//         content: "contenido" , 
        
//     },
//     {
//         title: "Y mas" ,
//         content: "contenido" , 
        
//     },
// ];