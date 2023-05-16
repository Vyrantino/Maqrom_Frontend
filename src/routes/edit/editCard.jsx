import * as React from 'react' ; 
import { useSelector, useDispatch } from 'react-redux' ; 
import { useState } from 'react';
import {  Box, Icon, IconButton, Input, TextField, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import { useEffect } from 'react';
import { deleteImage, getAllImages, getCard, uploadPhoto } from '../../axiosMain';
import { patchCard } from '../../axiosMain';
import { useNavigate } from 'react-router-dom';
import { loadImg } from '../../components/redux/editForm';
import Admin from '../../admin' ; 
import ListaImagenes from './listaImagenes';
import Carousel from '../../components/carousel';

export default function EditCard(){
    const mode = useSelector( ( state ) => state.adminMode.value ) ; 
    const dispatch = useDispatch() ;
    const [ card , setCard ] = useState([]) ; 
    const [ image, setImage ] = useState('');
    const loadedCard = useSelector( ( state ) => state.editForm.idCard ) ;
    const loadedImage = useSelector( ( state ) => state.editForm.img ) ;
    const [ titulo, setTitulo ] = useState() ; 
    const [ contenido, setContenido ] = useState() ; 
    const [ imageList, setImageList ] = useState([]) ; 
    const [ alt , setAlt ] = useState() ;
    
   
    const navigate = useNavigate() ;

    const handleTitulo = ( e ) => setTitulo( e.target.value ) ; 
    const handleContenido = ( e ) => setContenido( e.target.value ) ; 
    const handleAlt = ( e ) => setAlt( e.target.value ) ; 
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

        const uploadImage = await uploadPhoto( fileTemp , alt ) ;
        dispatch( ( loadImg( imageUrl ) ) ) ;
        getAllImages( setImageList ) ;
       

    }; 

    const handleSubmit = async ( e ) =>{
       
        e.preventDefault() ;
        patchCard( card.idCard , titulo, contenido , !image ? card.img : image ) ; 
        
    }

    const handleDeleteImage = async ( e ) =>{
        e.preventDefault() ;
        const partirImage = image.split('/');
        const nombreImage = partirImage[partirImage.length - 1];
        await deleteImage( nombreImage  ) ;
        setAlt( '' ) ;
        setImage('');
        getAllImages( setImageList ) ;
        
    }
    
    useEffect(() => {
        getCard( setCard , loadedCard ) ; 
        getAllImages( setImageList ) ;
    }, []);
   
    if( !mode ){
        return <Admin />

    }
    else
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
                    inputProps={ { maxLength: 255 } }
                    rows={20}
                    variant="filled"
                    onChange={ handleContenido }
                    defaultValue = { card.content }
                    InputLabelProps={{ shrink: true }} 
                />  
                <Box sx = { { display: 'flex' , flexDirection: 'row' } } > 
                    <ListaImagenes imageList = { imageList } setImage = { setImage } height= { 450 } width = { 500 } />
                    <img width={ '500' }  height={ '450' } src={ image } />
                </Box>

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
                    onChange={ handleAlt }
                />  

            
                <IconButton 
                    aria-label="Example" 
                    sx={ { 
                        width: '20%' , 
                        alignSelf: 'center'  
                    } } 
                    onClick={ handleDeleteImage }
                >
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </Box>
     

    );

}