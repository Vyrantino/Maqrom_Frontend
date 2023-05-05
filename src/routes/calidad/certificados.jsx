import * as React from 'react' ; 
import { useState, useEffect } from 'react';
import { 
    Box ,
    CardContent,
    Typography,
    CardMedia,
    CardActions,
    Button,
} from '@mui/material';
import Raccoon from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/raccoon.jpg" ;
import { getAllCards } from '../../axiosMain';


export default function Certificados() {

    const [ cards, getCards ] = useState([]); 
    const url = "Certificados" ;
    useEffect(() => {
        
        getAllCards( { getCards } , url ) ; 
    }, []);

    return(
        <Box className = "UnaBox" >
            <CardContent>
                <Typography gutterBottom variant="h5" component="span">
                Titulo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequatur amet, 
                    maiores pariatur minima, ducimus, distinctio dolore voluptatem velit dolores 
                    laudantium rerum sit animi nulla nobis porro quo commodi at?
                </Typography>
            </CardContent>
            <CardMedia
                component= "img"
                alt="green iguana"
                height="200"
                width="200"
                image= { Raccoon }
            />
            <CardActions>
                <Button> Editar </Button>
                <Button> Borrar </Button>
                <Button> Conservar </Button>
            </CardActions>
        </Box>

    );

}