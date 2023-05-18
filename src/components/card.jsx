import * as React from 'react' ;
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";  
import { useSelector , useDispatch } from 'react-redux'
import { deleteCard, getArticles, getCard, getIdCard, newCard } from "../axiosMain";
import { loadArticle, loadIdCard, loadImg } from "./redux/editForm";
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
                    <CardActions>
                        {
                            props.hasArticle ? 
                                <Button 
                                variant = 'text'
                                LinkComponent={ Link } 
                                to = "/article/"  
                                onClick = {  () => { 
                                    dispatch( loadArticle( props.article ) )
                                } } 
                                sx={{
                                    color: 'red', // Cambia el color del texto aquí
                                }}
                                > 
                                    <Typography color={`primary`}  > Ver Articulo </Typography> 
                                </Button>
                                :
                                <span />
                        }                            
                        
                    </CardActions>
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
                                <Typography color={`#350404`}  > Editar </Typography> 
                            </Button>

                            <Button 
                                onClick = {  () => { 
                                    props.handleDelete( props.idCard )
                                } } 
                                variant="contained"
                            > 
                               <Typography color={`#350404`}  > Borrar </Typography> 
                            </Button>

                         </CardActions>
                    : //else
                        <span />
                }
             </Card>

        </Box>
    );
}