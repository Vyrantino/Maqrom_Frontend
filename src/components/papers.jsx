import * as React from 'react';
import { Box,  Typography,  ButtonGroup, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadArticle } from './redux/editForm';

export default function Papers( props ) {
  const mode = useSelector( ( state ) => state.adminMode.value ) ;
  const dispatch = useDispatch() ;
  return (
    <Box
        className = "BoxPaper"
        sx={{
          height: 150,
          width: '100%'
        }}
    >
      <Box sx={{ display: 'flex' }} >
                
    </Box>
         <img  src= { props.img } width={ 50 } height={50} />
         <Typography> { props.title } </Typography>
         <Typography> { props.content } </Typography>
        
         <Link to = { props.link } >  </Link>
         <Link to = { props.article } >  </Link>

         {
              mode ?
              <ButtonGroup>
                  <Button 
                      variant = 'contained'
                      LinkComponent={ Link } 
                      to = { `editPaper/${props.idPaper}` }  
                      onClick = { () =>{
                        
                      } } 
                  > 
                      <Typography color={`#350404`}  > Editar </Typography> 
                  </Button>

                  <Button 
                      onClick = {  () => { 
                         
                          props.handleDelete( props.idPaper )
                      } } 
                      variant="contained"
                  > 
                      <Typography color={`#350404`}  > Borrar </Typography> 
                  </Button>
              </ButtonGroup>
              : //else
              <span />
          }
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
    </Box>
  );
}