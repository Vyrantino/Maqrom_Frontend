import * as React from "react";
import { Box, ButtonGroup, Container, Divider, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { loadArticle, loadIdCard, loadImg } from "./redux/editForm";
import { Link } from "react-router-dom";

export default function Certificado(props) {

    const mode = useSelector( ( state ) => state.adminMode.value ) ;
    const dispatch = useDispatch() ;

    return(
        <Grid
            item
            xs = { 12 }
            sm = { 12 }
            md = { 12 }
            lg = { 12 }
            xl = { 12 }
        >
            <Card 
                sx={{ 
                    height: '15em' ,
                    ':hover': {
                        boxShadow: 20,
                        backgroundColor: 'rgb(256, 177, 77, 0.42)',
                    },
                    display: 'flex' ,
                }}
            >
                <CardMedia
                    component= "img"
                    alt="green iguana"
                    image = { props.img }  
                    sx={{ alignSelf: 'flex-start',height: '100%', objectFit: "contain" , flex: '.3' , padding: 2}} 
                />
                <CardContent
                    sx={{ flexGrow: 1 , flexDirection: { xs: 'column' , sm: 'column' , md: 'row' } }}
                >
                    <Typography component = 'span' gutterBottom variant="h5" color={'primary'} >
                        { props.title   } 
                    </Typography>

                    <Divider />

                    <Typography component = {'span'} variant="body2" color="text.secondary">
                        { props.content }
                    </Typography>
                </CardContent>
                <Box >
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
                {
                    mode  && props.buttons ?
                        <CardActions
                            
                        >
                                                            
                            <ButtonGroup
                                sx={{ display: 'flex', flexDirection: 'column' , flex: '.3'  }}
                            >
                                <Button 
                                    variant = 'contained'
                                    LinkComponent={ Link } 
                                    to = "/editCard/"  
                                    onClick = { () =>{
                                    
                                        dispatch( loadIdCard( props.idCard ) ), 
                                        dispatch( loadImg( props.img ) ),
                                        dispatch( loadArticle( props.article ) )    
                                
                                    } } 
                                > 
                                    <Typography component = {'span'} color={`#350404`}  > Editar </Typography> 
                                </Button>

                                <Button 
                                    onClick = {  () => { 
                                        
                                        props.handleDelete( props.idCard )
                                    } } 
                                    variant="contained"
                                > 
                                <Typography component = {'span'} color={`#350404`}  > Borrar </Typography> 
                                </Button>
                                
                            </ButtonGroup>

                         </CardActions>
                    : //else
                        <span />
                }
                </Box>
             </Card>
        </Grid>
    );
}

