import * as React from 'react' ; 
import { useSelector, useDispatch } from 'react-redux' ; 
import { useState } from 'react';
import {  Box, Icon, IconButton, Input, TextField, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import { useEffect } from 'react';
import { getCard, uploadPhoto } from '../../axiosMain';
import { patchCard } from '../../axiosMain';
import { useNavigate } from 'react-router-dom';
import { loadImg } from '../../components/redux/editCardForm';


export default function EditCard(){
    
    const [ card , setCard ] = useState([]) ; 
    const loadedCard = useSelector( ( state ) => state.editCardForm.idCard ) ;
    const loadedImage = useSelector( ( state ) => state.editCardForm.img ) ;
    const dispatch = useDispatch() ;
    const [ titulo, setTitulo ] = useState() ; 
    const [ contenido, setContenido ] = useState() ; 
    const [ image , setImage ] = useState('') ; 
   
    const navigate = useNavigate() ;

    const handleTitulo = ( e ) => setTitulo( e.target.value ) ; 
    const handleContenido = ( e ) => setContenido( e.target.value ) ; 
    const handleImagen = async ( e ) => { 
        const file  = e.target.files[0] ;
        const ext = file.name.split('.').pop();
        const fileName = Date.now();
        const imageName = fileName+'.'+ext ; 
        const imageUrl = `http://localhost:3000/images/${fileName}.${ext}`;
        const fileTemp = {
            fileRaw: file, 
            fileName: imageName ,
        }

        const uploadImage = await uploadPhoto( fileTemp ) ;
        dispatch( ( loadImg( imageUrl ) ) ) ;
        setImage( imageUrl ) ;
       
    }; 

    const handleSubmit = async ( e ) =>{
        e.preventDefault() ;
        const func = patchCard ; 
        const result = await func( card.idCard , titulo, contenido , image ) ; 
        
    }
    // const cardState = useSelector( ( state ) => 
    //     state.editCardForm.img,
    //     state.editCardForm.title,
    //     state.editCardForm.content,
    // ) ;

    // const cardState = useSelector( ( state ) => state.editCardForm.title ) ; 
    // const dispatch = useDispatch() ;

    useEffect(() => {
        getCard( setCard , loadedCard ) ; 
    }, []);
   
    
    return(
       
            <Box component='form' className= 'editCardForm' onSubmit={ handleSubmit } >
                <Typography variant="h1" gutterBottom sx={ { alignSelf: 'center' } } > { card.idCard } </Typography>
                
                <TextField 
                    className='editCardFormTextField' 
                    id="filled-basic"
                    defaultValue = { card.title }
                    label = 'Titulo'
                    multiline
                    onChange={ handleTitulo }
                    InputLabelProps={{ shrink: true }} 
                />
                        
               

                <TextField 
                    id="filled-multiline-static"
                    label="Contenido"
                    multiline
                    rows={20}
                    variant="filled"
                    onChange={ handleContenido }
                    defaultValue = { card.content }
                    InputLabelProps={{ shrink: true }} 
                />  

                <img src={ loadedImage } />
                
               
                

               <IconButton color="primary" aria-label="upload picture" component="label">
                     <input hidden accept="image/*" type="file" onChange= { handleImagen }  />
                     <AddAPhotoIcon />
                </IconButton>
                <IconButton 
                    aria-label="Example" 
                    sx={ { 
                        width: '20%' , 
                        alignSelf: 'center'  
                        } } 
                    type='submit'
                    onClick = {() => {
                        navigate(-1) ; 
                     }}
                >
                    <PublishIcon />   
                </IconButton>

                <TextField 
                    className='editCardFormTextField' 
                    id="filled-basic"
                    label = 'Breve descripcion de la imagen'
                />  

            
                <IconButton 
                    aria-label="Example" 
                    sx={ { 
                        width: '20%' , 
                        alignSelf: 'center'  
                    } } 
                    onClick={ ()=> confirm("Esta seguro que desea eliminar la imagen?") }
                >
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </Box>
     

    );

}