import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";  
import { adminMode } from './redux/adminToken';
import { useSelector } from 'react-redux'



export default function Carta( props ){

    const mode = useSelector( ( state ) => state.adminMode.value ) ;
    if( mode  )
    return(
        <Box>
            <Card sx={{  }}>
                <CardMedia
                    component= "img"
                    alt="green iguana"
                    height="200"
                    width="200"
                    image= { props.img }
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { props.title }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { props.content }
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
            <Card sx={{  }}>
                <CardMedia
                    component= "img"
                    alt="green iguana"
                    height="200"
                    width="200"
                    image= { props.onImage }
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { props.title }
                    </Typography>
                    <Typography>
                        { props.route } 
                        { props.idCard  }
                    
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { props.content }
                    </Typography>
                </CardContent>
             </Card>
        </Box>

    )
        
    ;

}