import * as React from 'react';
import { Box,  Typography,  ButtonGroup, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadArticle } from './redux/editForm';

export default function Papers( props ) {
  const mode = useSelector( ( state ) => state.adminMode.value ) ;
  const dispatch = useDispatch() ;
  return (
    <Grid
        item
        justifyContent={'space-evenly'}
        
        xs = { 12 }
        sm = { 12 }
        md = { 6 }
        lg = { 4 }
        xl = { 3 }
    >
        <Paper
          
           sx={{
            backgroundColor: 'black'
           }}
        > 


        </Paper>
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
    </Grid>
  );
}