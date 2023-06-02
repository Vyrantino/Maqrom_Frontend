import * as React from 'react' ; 
import { useSelector, useDispatch } from 'react-redux' ; 
import { useState } from 'react';
import {  
    Box,
    Button, 
    ButtonGroup, 
    Container, 
    FormControl, 
    IconButton, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField, 
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import { 
    createNewCarouselItem,
    deleteCarouselItem, 
    deleteImage, 
    getCarouselItems, 
    getGalleries, 
    getPaginatedImages, 
    uploadPhoto 
} from '../../axiosMain';
import { patchCarousel } from '../../axiosMain';
import { useNavigate , useOutletContext } from 'react-router-dom';
import { loadImg } from '../../components/redux/editForm';
import Admin from '../../admin' ; 
import Carousel from '../../components/carousel';
import ListaImagenes from './listaImagenes';
import NewCarouselItemDto from './models/newCarouselItem';
import MaqromLogo from "../../assets/MaqromLogoPlantilla.png" ;
import Sidebar from './sidebar';

export default function EditCarousel(){
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;
    const mode = useSelector( ( state ) => state.adminMode.value ) ; 
 /** States */
        /* Lista Imagenes */
        const [ imageList , setImageList ] = React.useState( [] ) ;
        const [ galleries , setGalleries ] = React.useState( [] ) ;
        const [ gallery , setGallery ] = React.useState( '' ) ;
        const [ image , setImage ] = React.useState('') ; 
        const [ page , setPage ] = React.useState(1) ;
        const [ pageCount , setPageCount ] = React.useState(1) ; 
        /* Carousel */
        const [ route , setRoute ] = useState('') ;
        const [ carouselItems , setCarouselItems ] = useState([]) ;
        const [ carouselItem , setCarouselItem ] = useState() ;
        const [ titulo, setTitulo ] = useState() ; 
        const [ contenido, setContenido ] = useState() ; 
        const [ alt , setAlt ] = useState() ;
        const [ currentImage , setCurrentImage ] = useState() ;
        const [ index, setIndex ] = React.useState( 0 ) ;
        /* Sidebar */
        const [ sidebar, setSidebar ] = useOutletContext() ;
    // Handlers
    const handlePage = ( event , newPage ) =>{
        setPage( newPage ) ;
        getPaginatedImages( setImageList , gallery , page , setPageCount ) ;
    }

    const handleTitulo = ( e ) => setTitulo( e.target.value ) ; 
    const handleContenido = ( e ) => setContenido( e.target.value ) ; 
    const handleAlt = ( e ) => setAlt( e.target.value ) ;
    
    const handleChangeRoute =  ( e ) => {
        e.preventDefault() ;
        setRoute( e.target.value ) ;
        getCarouselItems( setCarouselItems , route ) ;
    } 

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
        setImage( imageUrl ) ;
        getPaginatedImages( setImageList , gallery , page , setPageCount ) ;
    }; 

    const handleCreateNewCarouselItem = async ( e ) =>{
        e.preventDefault() ;
        
       if( !route ) {
            alert( 'Debe seleccionar un carousel primero' ) ;
       }
       else{
            const newCarouselItem = new NewCarouselItemDto( route ) ;
            await createNewCarouselItem( newCarouselItem , route ) ;
            await getCarouselItems( setCarouselItems,  route ) ;
       }
    }

    const handleDeleteCarouselItem = async ( e ) =>{
        e.preventDefault() ;
        deleteCarouselItem( carouselItem ) ;
        getCarouselItems( setCarouselItems, route ) ;
                
    }
    
    const handleSubmit = async ( e ) =>{
        e.preventDefault() ;
        await patchCarousel( 
            carouselItem , 
            titulo, 
            contenido , 
            !image ? 
                carouselItem.img 
                : 
                image 
        ) ; 
        getCarouselItems( setCarouselItems , route ) ;
        
    }    

    const handleDeleteImage = async ( e ) =>{
        e.preventDefault() ;
        const partirImage = image.split('/');
        const nombreImage = partirImage[partirImage.length - 1];
        await deleteImage( nombreImage  ) ;
        setAlt( '' ) ;
        setImage( '' );
        getPaginatedImages( setImageList , gallery , page , setPageCount ) ;
        
    }

    /* Para abrir la sidebar */
    const toogle = ( open ) =>  {
        setSidebar( open );
    };


    /* Effects */
    React.useEffect(() => {
       
        getGalleries( setGalleries ) ;
        setSidebar( false ) ;
    }, [  ]);
    
    React.useEffect(() => {
        getPaginatedImages( 
            setImageList , 
            gallery === 'Todas las imagenes' ? '' : gallery, 
            page , 
            setPageCount 
        ) ;  
    }, [ page , gallery ]);
   
    React.useEffect( () =>{
        getCarouselItems( setCarouselItems , route );
    }, [ route ] )

    React.useEffect( () => {
        getGalleries( setGalleries ) ;
    }, [ gallery ] ) ; 

    if( !mode ){
        return <Admin />
    }
    else
    return(
        <Container className= 'editCardForm' >
             <Sidebar 
                sidebar = { sidebar } 
                toogle = { toogle }
            />  
            <FormControl variant="filled" sx={{ m: 1, minWidth: '100%' }}>
                <InputLabel id="demo-simple-select-filled-label">Elija el Carrusel</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={ route }
                    onChange={ handleChangeRoute  }
                >
                    <MenuItem value={ `Homepage` } >Homepage</MenuItem>
                    <MenuItem value={ 'Renta' }   >Renta</MenuItem>
                    <MenuItem value={ 'Planos' } >Planos</MenuItem>
                    <MenuItem value={ 'Proyectos' }>Proyectos</MenuItem>
                    <MenuItem value={ 'Servicios' }>Servicios</MenuItem>
                    <MenuItem value={ 'CalidadProductos' }>CalidadProductos</MenuItem>
                    <MenuItem value={ 'CalidadServicios' }>CalidadServicios</MenuItem>
                    <MenuItem value={ 'Certificados' }>Certificados</MenuItem>
                    <MenuItem value={ 'Contacto' }>Contacto</MenuItem>
                    <MenuItem value={ 'Nosotros' }>Nosotros</MenuItem>
                </Select>
            </FormControl>
            

            <Carousel 
                    route = { route } 
                    index = { index }
                    setCarouselItem = { setCarouselItem } 
                    currentImage = { setCurrentImage }
                    carouselItems = { carouselItems }
            />
            <ButtonGroup  >
                <Button variant='contained' endIcon = { <AddAPhotoIcon  /> }  onClick = { handleCreateNewCarouselItem } >
                    Agregar una foto predeterminada al carousel
                </Button>

                <Button 
                            color='error'
                            variant='contained'
                            onClick={ handleDeleteCarouselItem }
                            endIcon = { <DeleteIcon /> }
                >
                    Borrar el elemento seleccionado
                </Button>

                <Button 
                    variant = 'contained'
                    color='success'
                    onClick = { handleSubmit }
                    endIcon = { <PublishIcon /> }
                >
                    Cambiar foto    
                </Button>

                <Button variant= 'contained' color="primary" aria-label="upload picture" component="label" endIcon={ <AddAPhotoIcon /> } >
                     <input hidden accept="image/*" type="file" onChange= { handleImagen }  />
                     
                     Subir una Imagen
                </Button>
            </ButtonGroup>
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
                         <Box sx={{ display: 'flex' , flexDirection: 'column' }} >
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
    

            <Box component='form' className= 'editCardForm' onSubmit={ handleSubmit } >  
                <TextField 
                    className='editCardFormTextField' 
                    id="filled-basic"
                    label = 'Titulo'
                    multiline
                    onChange={ handleTitulo }
                    InputLabelProps={{ shrink: true }} 
                />
                        
                <TextField 
                    id="filled-multiline-static"
                    label="Contenido"
                    multiline
                    rows={2}
                    variant="filled"
                    onChange={ handleContenido }
                    InputLabelProps={{ shrink: true }} 
                />  
                <Box sx = { { display: 'flex' , flexDirection: 'row' } } > 
                   
                </Box>

              

                <TextField 
                    className='editCardFormTextField' 
                    id="filled-basic"
                    label = 'Breve descripcion de la imagen'
                    onChange={ handleAlt }
                />  
            </Box>
        </Container>    
            

    );

}