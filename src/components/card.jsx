import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";  
import { useSelector , useDispatch } from 'react-redux'
import { deleteCard, getCard, getIdCard, newCard } from "../axiosMain";
import { loadIdCard, loadImg } from "./redux/editCardForm";
import { Link } from "react-router-dom";



const card = {
    title: "titulo",
    img: "img",
    content: "Carta creada desde front",
    isLocked: true 
} ; 

export default function Carta( props ){



    const mode = useSelector( ( state ) => state.adminMode.value ) ;
    const card = useSelector( ( state ) => state.editCardForm.idCard ) ;
    const loadedImage = useSelector( ( state ) => state.editCardForm.img ) ;
    const dispatch = useDispatch() ;
    if( mode  )
    return(
        <Box>
            <Card sx={{  }}>
                <CardMedia
                    component= "img"
                    alt="green iguana"
                    height="200"
                    width="200"
                    image = { props.img }
                    
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
                    <Button LinkComponent={ Link } to = "/editCard/"  onClick = { () =>{  dispatch( loadIdCard( props.idCard ) , dispatch( loadImg( props.img ) ) )   } } > Editar </Button>
                    <Button onClick = {  () => { deleteCard( props.idCard ) } } > Borrar </Button>
                    <Button onClick = { () => { newCard( card , props.route ) } } > Conservar </Button>
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