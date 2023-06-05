import * as React from 'react' ; 
import { useSelector } from 'react-redux' ; 
import { useState } from 'react';
import {  
    Box, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField, 
    IconButton, 
    Button
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import { 
    deleteImage, 
    getAllImages, 
    getArticles, 
    getCard, 
    getGalleries, 
    getPaginatedImages, 
    uploadPhoto 
} from '../../axiosMain';
import { patchCard } from '../../axiosMain';
import { useNavigate , useOutletContext } from 'react-router-dom';
import Admin from '../../admin' ; 
import ListaImagenes from './listaImagenes';
import MaqromLogo from "../../assets/MaqromLogoPlantilla.png" ;
import Carta from '../../components/card';
import Sidebar from './sidebar';

export default function EditCard(){
    /* States */
        /* Lista Imagenes */
            const [ imageList , setImageList ] = React.useState( [] ) ;
            const [ galleries , setGalleries ] = React.useState( [] ) ;
            const [ gallery , setGallery ] = React.useState( '' ) ;
            const [ image , setImage ] = React.useState( '' ) ; 
            const [ page , setPage ] = React.useState(1) ;
            const [ pageCount , setPageCount ] = React.useState( 1 ) ; 
        /* Sidebar */
            const [ sidebar, setSidebar ] = useOutletContext() ;
        

    const mode = useSelector( ( state ) => state.adminMode.value ) ; 
    const [ card , setCard ] = useState([]) ; 
    const loadedCard = useSelector( ( state ) => state.editForm.idCard ) ;
    const [ titulo, setTitulo ] = useState() ; 
    const [ contenido, setContenido ] = useState() ; 
    const [ alt , setAlt ] = useState() ;
    const [ article , setArticle ] = useState('') ;
    const [ articles , setArticles ] = useState([]) ;
       
   
    const navigate = useNavigate() ;
    
    /* Handlers */

    const handlePage = ( event , newPage ) =>{
        setPage( newPage ) ;
        getPaginatedImages( setImageList , gallery , page , setPageCount ) ;
    }

    const handleTitulo = ( e ) => setTitulo( e.target.value ) ; 
    const handleContenido = ( e ) => setContenido( e.target.value ) ; 
    const handleAlt = ( e ) => setAlt( e.target.value ) ; 
    const handleImagen = async ( e ) => { 
        
        const file  = e.target.files[0] ;
        const ext = file.name.split('.').pop();
        const fileName = Date.now();
        const imageName = fileName+'.'+ext ; 
        const imageUrl = `http://147.182.177.178:80/images/${fileName}.${ext}`;
        const fileTemp = {
            fileRaw: file, 
            fileName: imageName ,
        }

        uploadPhoto( fileTemp , alt , gallery ) ;
        setImage( imageUrl ) ;
        getPaginatedImages( setImageList , gallery , page , setPageCount ) ;
       

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
        getPaginatedImages( setImageList , gallery , page , setPageCount ) ;
        //getAllImages( setImageList , gallery === 'Todas las imagenes' ? '' : gallery ) ;
        
    }

    const handleChangeArticle = ( e ) =>{
        const articleValue = e.target.value ; 
        e.preventDefault() ;
        setArticle( articleValue === 'Sin Articulo' ? '' : articleValue ) ;
        
    }

     /* Para abrir la sidebar */
     const toogle = ( open ) =>  {
        setSidebar( open );
    };

    
    React.useEffect(() => {
        getCard( setCard , loadedCard ) ; 
        getAllImages( setImageList ) ;
        getArticles( setArticles ) ;
        setSidebar( false ) ;
    }, []);

    React.useEffect(() => {
        getPaginatedImages( 
            setImageList , 
            gallery === 'Todas las imagenes' ? '' : gallery, 
            page , 
            setPageCount 
        ) ;  
    }, [ page , gallery ]);

    React.useEffect( () => {
        getGalleries( setGalleries ) ;
        getAllImages( setImageList , gallery === 'Todas las imagenes' ? '' : gallery );
    }, [ gallery ] ) ; 
   
    if( !mode ){
        return <Admin />

    }
    else
    return(

            <Box component='form' className= 'editCardForm' onSubmit={ handleSubmit } >
                <Sidebar 
                    sidebar = { sidebar } 
                    toogle = { toogle }
                    // handleNewCard = { handleNewArticleCard }
                    //handleNewPaper = { handleNewAr }
                />  
                <Carta 
                    key = { card.idCard }
                    img = { card.img }
                    title = { card.title }
                    content = { card.content }
                    route = { card.route }
                    idCard = { card.idCard }
                    //isLocked = { card.isLocked }
                    CardWidth = '100'
                    CardHeight = '300'
                />
        
                <FormControl  variant="filled" sx={{ m: 1, minWidth: '60%' }} >
                    <InputLabel id="demo-simple-select-filled-label"> Articulos dados de alta </InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={ article }
                        onChange={ handleChangeArticle  }
                        defaultValue=''
                    >   
                        <MenuItem key = 'blank' value = { 'Sin Articulo' } > Sin Articulo </MenuItem>
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
                    
                    variant="filled"
                    onChange={ handleContenido }
                    defaultValue = { card.content }
                    InputLabelProps={{ shrink: true }} 
                />  

                <Box sx = { { display: 'flex' , flexDirection: 'row' } } > 
                    <ListaImagenes 
                            setImageList = { setImageList }
                            setGallery = { setGallery }
                            setImage = { setImage } 
                            height= { 450 } 
                            width = { 500 } 
                            gallery = { gallery } 
                            galleries = { galleries }
                            imageList = { imageList }
                            pageCount = { pageCount }
                            page = { page }
                            handlePage = { handlePage }
                    />

                    <Box sx={{ display: 'flex' , flexDirection: 'column' , alignItems: 'center' , justifyContent: 'center' }} >
                        <img width={ '500' }  height={ '450' } src={ !image ? MaqromLogo : image } />
                            <Button 
                                variant='contained'
                                
                                sx={ { 
                                    width: '100%' , 
                                    alignSelf: 'center'  
                                } } 
                                onClick={ handleDeleteImage }
                            >
                              Borrar Esta Imagen  
                              <DeleteIcon />
                            </Button>         
                    </Box>

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

            </Box>
     

    );

}