import * as React from 'react';
import Raccoon from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/raccoon.jpg" ;
import Carta from '../components/card';
import { getCards } from '../main';

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
                <Carta  onImage = { Raccoon } onTitle = { props.item.title } />
            </li>
        </div>
      
    
);
const Lista = ( props ) =>(
    <ul >
        { props.list.map( ( item ) => (
            <Item  key = { item.objectID }  item = { item } />
        ) ) }
    </ul>

);

const Items = ( props ) =>(
    
        <div>
            <li className = "card" > 
                <Carta  onImage = { Raccoon } onTitle = { props.item.title } />
            </li>
        </div>
      
    
);


export default function AboutUs() {

    const entradasAboutUs = [
        {
            title: "Nosotros" ,
            content: "contenido" , 
        },
        {
            title: "Mision" ,
            content: "contenido" , 
            
        },
        {
            title: "Vision" ,
            content: "contenido" , 
            
        },
        {
            title: "Algo" ,
            content: "contenido" , 
            
        },
        {
            title: "Y mas" ,
            content: "contenido" , 
            
        },
    ];

    
    return(
        
        <div className = "AboutUs">  
               
            <List  list = { entradasAboutUs } /> 
            
            <Carta nameClass = "RightSectionAboutUs"  onImage = { Raccoon } onTitle = "hola" />    
                
                
        </div>
        
    ) ;




} 
