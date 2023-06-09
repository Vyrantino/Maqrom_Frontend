import * as React from 'react';
import { Box,  Typography,  ButtonGroup, Button, Grid, Paper, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadArticle } from './redux/editForm';

export default function Papers(props) {
  const mode = useSelector((state) => state.adminMode.value);
  const dispatch = useDispatch();
  return (
    <Grid
        item
        xs = { 12 }
        sm = { 7 }
        md = { 5 }
        lg = { 3.3 }
        xl = { 3.3 }
      
    >
    
        <Paper
            sx={{
                bgcolor: 'background.default',
                height: '100%',
                ':hover': {
                  boxShadow: 20,
                },
            }}
        >   
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}  > 
                <img src={ props.img } width={'50%'} height={'50%'} />
            </Box>
            <Typography sx={ { fontSize: { xs: '1em' , sm: '1em' , md: '2em'  } } } align='center' > { props.title } </Typography>
            <Typography align='center' > { props.content } </Typography>
            { mode && props.buttons ?
              <ButtonGroup
                sx={{ display:'flex' , justifyContent:'center' }}
              >
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
                  onClick={() => {
                    props.handleDelete(props.idPaper);
                  }}
                  variant="contained"
                >
                  <Typography color={`#350404`}> Borrar </Typography>
                </Button>
              </ButtonGroup>
            : 
              //else
              <span />
            }
        </Paper>

         
      {props.hasArticle ? (
        <Button
          variant="text"
          LinkComponent={Link}
          to="/article/"
          onClick={() => {
            dispatch(loadArticle(props.article));
          }}
          sx={{
            color: "red", // Cambia el color del texto aquí
          }}
        >
          <Typography color={`primary`}> Ver Articulo </Typography>
        </Button>
      ) : (
        <span />
      )}
    </Grid>
  );
}
