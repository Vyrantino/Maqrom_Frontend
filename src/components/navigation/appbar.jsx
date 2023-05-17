import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import fbLogo from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/fbLogo.png" ;
import MaqromLogo from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/Maqrom.svg" ;

import {
    Link,
} from 'react-router-dom' ; 




export default function ButtonAppBar() {
  return (

    <Box sx={{ flexGrow: 1  }}>
    <AppBar position="fixed" sx={{ alignItems: 'center' }} >
      <Toolbar>
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
  </Box>
    // <Box  >
    //   <AppBar position="fixed">
    //     <Toolbar>
    
                            
                            

    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}
