import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import fbLogo from "../../assets/fbLogo.png" ;
import MaqromLogo from "../../assets/Maqrom.svg" ;

import {
    Link,
} from 'react-router-dom' ; 
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';



export default function ButtonAppBar( props ) {
    const mode = useSelector( ( state ) => state.adminMode.value ) ;

  return (

    <React.Fragment >
    
    <AppBar position="fixed" sx={{ alignItems: 'center' }} >
      <Toolbar>
            { mode ? <IconButton  onClick={ () => props.toogle( true ) } >  <MenuIcon sx={{ color: 'white' }} /> </IconButton> : <span />} 
            <IconButton 
                    component = { Link } to = "/" 
            > 
                    <img 
                        src={ MaqromLogo } 
                        width={ 60 } 
                        height={ 60 } 
                        alt = "facebookLogo" 

                    /> 
            </IconButton>

            <Button
                component = { Link } to = "/about-us" 
                size="large"
                sx = {{
                    color: 'whitesmoke'

                }}
                
            > 
                Nosotros
            </Button> 

            <Button
                component = { Link } to = "/servicios" 
                size="large"
            > 
                Servicios y Planos
            </Button> 
            <Button
                component = { Link } to = "/renta" 
                size="large"
            > 
                Renta de Maquinaria
            </Button> 
            <Button
                component = { Link } to = "/calidad" 
                size="large"

            > 
                Calidad
            </Button> 

            <Button
                component = { Link } to = "/contacto" 
                size="large"
                
            > 
                Contacto
            </Button> 

            <IconButton 
                
                component = { Link } to = "https://www.facebook.com/oscar.valleshdez" 
                target="_blank"
                

            > 
                <img 
                    src={ fbLogo } 
                    width={30} 
                    height={30} 
                    alt = "facebookLogo" 
                /> 
            </IconButton>
      </Toolbar>
    </AppBar>
  </ React.Fragment>
  );
}
