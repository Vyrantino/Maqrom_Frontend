import * as React from 'react' ; 
import { useSelector, useDispatch } from 'react-redux' ; 
import { useState } from 'react';
import {  Box, FormControl, Icon, IconButton, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import { useEffect } from 'react';
import { deleteImage, getAllImages, getArticles, getCard, uploadPhoto } from '../../axiosMain';
import { patchCard } from '../../axiosMain';
import { useNavigate } from 'react-router-dom';
import { loadArticle, loadImg } from '../../components/redux/editForm';
import Admin from '../../admin' ; 
import ListaImagenes from './listaImagenes';
import Carousel from '../../components/carousel';

export default function EditCard(){
    const [ gallery , setGallery ] = React.useState( '' ) ;
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
    const [ article , setArticle ] = useState('') ;
    const [ articleName , setArticleName ] = useState() ;
    const [ articles , setArticles ] = useState([]) ;
    
   
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

        uploadPhoto( fileTemp , alt , gallery ) ;
        dispatch( ( loadImg( imageUrl ) ) ) ;
        getAllImages( setImageList ) ;
       

    }; 

    const handleSubmit = async ( e ) =>{
       console.log( article ) ;
        e.preventDefault() ;
        patchCard( 
            card.idCard , 
            titulo, contenido , 
            !image ? card.img : image ,
            article ? article :  'pagina'
        ) ; 
        
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

    const handleChangeArticle = ( e ) =>{
        e.preventDefault() ;
        setArticle( e.target.value ) ;
        //dispatch( loadArticle( e.target.value ) ) ;
    }
    
    useEffect(() => {
        getCard( setCard , loadedCard ) ; 
        getAllImages( setImageList ) ;
        getArticles( setArticles ) ;
       
    }, []);
   
    if( !mode ){
        return <Admin />

    }
    else
    return(

            <Box component='form' className= 'editCardForm' onSubmit={ handleSubmit } >
                
                <Typography variant="h1" gutterBottom sx={ { alignSelf: 'center' } } >
                     { `Esta carta actualmente redirige a ${card.article} ${ card.route }` } 
                </Typography>
                <Typography variant="h1" gutterBottom sx={ { alignSelf: 'center' } } > { card.idCard } </Typography>
                <FormControl  variant="filled" sx={{ m: 1, minWidth: '60%' }} >
                    <InputLabel id="demo-simple-select-filled-label"> Articulos dados de alta </InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={ article }
                        onChange={ handleChangeArticle  }
                        defaultValue=''
                    >   
                       
                        {
                            articles.map( ( item ) => (
                                <MenuItem key = { item.idArticle }  value = { item.articleName }  > { item.articleName } </MenuItem> 
                             ) )
                        }
                    </Select>
                </FormControl>
                <TextField 
                    autoFocus
                    className='editCardFormTextField' 
                    id="filled-basic"
                    defaultValue = { card.title }
                    label = 'Titulo'
                    multiline
                     inputProps={ { maxLength: 50 } }
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
                    <ListaImagenes imageList = { imageList } setImage = { setImage } height= { 450 } width = { 500 } passGallery = { setGallery } />
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