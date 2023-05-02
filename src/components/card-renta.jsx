import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";  
import { adminMode } from './redux/adminToken';
import { useSelector, useDispatch } from 'react-redux'




export default function CartaRenta( props ){
    
    const mode = useSelector( ( state ) => state.adminMode.value ) ;
    console.log( mode , ' carta Renta' ) ;
    if( mode )
     return(
        <Box>
            <Card sx={{   }}>
                <CardMedia
                    component= "img"
                    alt="green iguana"
                    height="500"
                    width="250"
                    image= { props.onImage }
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                         { props.onTitle }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequatur amet, 
                        maiores pariatur minima, ducimus, distinctio dolore voluptatem velit dolores 
                        laudantium rerum sit animi nulla nobis porro quo commodi at?
                    </Typography>
                </CardContent>
           
                <CardActions>
                    <Button> Editar </Button>
                    <Button> Borrar </Button>
                    <Button> Conservar </Button>
                </CardActions>
            
             </Card>

        </Box>

    )
        
    ;

    else    
    return(
        <Box>
            <Card sx={{   }}>
                <CardMedia
                    component= "img"
                    alt="green iguana"
                    height="500"
                    width="250"
                    image= { props.onImage }
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                         { props.onTitle }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequatur amet, 
                        maiores pariatur minima, ducimus, distinctio dolore voluptatem velit dolores 
                        laudantium rerum sit animi nulla nobis porro quo commodi at?
                    </Typography>
                </CardContent>
             </Card>

        </Box>

    )
        
    ;

}