import * as React from 'react' ;
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";  
import { useSelector , useDispatch } from 'react-redux'
import { deleteCard, getCard, getIdCard, newCard } from "../axiosMain";
import { loadIdCard, loadImg } from "./redux/editForm";
import { Link } from "react-router-dom";


export default function Carta( props ){

    const mode = useSelector( ( state ) => state.adminMode.value ) ;
    const card = useSelector( ( state ) => state.editForm.idCard ) ;
    const dispatch = useDispatch() ;
    return(
        <Box>
            <Card 
                raised
            >
                <CardMedia
                    component= "img"
                    alt="green iguana"
                    height= { !props.CardHeight ? '200' : props.CardHeight  } 
                    
                    image = { props.img }  
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }} 
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { props.title   } 
                        <br />
                        { props.route }
                        <br />
                        { props.article }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { props.content }
                    </Typography>
                </CardContent>
                {
                    mode ?
                        <CardActions>
                            <Button 
                                variant = 'contained'
                                LinkComponent={ Link } 
                                to = "/editCard/"  
                                onClick = { () =>{
                                   
                                    dispatch( loadIdCard( props.idCard ) , 
                                    dispatch( loadImg( props.img ) ) )   
                              
                                } } 
                            > 
                                <span className = 'editCardButton'  > Editar </span> 
                            </Button>

                            <Button 
                                onClick = {  () => { 
                                    props.handleDelete( props.idCard )
                                } } 
                                variant="contained"
                            > 
                                Borrar 
                            </Button>
                            
                            <Button 
                                variant = 'contained'
                                LinkComponent={ Link } 
                                to = "/article/"  
                            > 
                                Conservar 
                            </Button>

                         </CardActions>
                    : //else
                        <span />
                }
             </Card>

        </Box>
    );
}