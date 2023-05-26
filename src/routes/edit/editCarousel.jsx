import * as React from 'react' ; 
import { useSelector, useDispatch } from 'react-redux' ; 
import { useState } from 'react';
import {  
    Box,
    Button, 
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
    getAllCarouselItems, 
    getAllImages, 
    getCarouselItems, 
    getGalleries, 
    uploadPhoto 
} from '../../axiosMain';
import { patchCarousel } from '../../axiosMain';
import { useNavigate } from 'react-router-dom';
import { loadImg } from '../../components/redux/editForm';
import Admin from '../../admin' ; 
import Carousel from '../../components/carousel';
import ListaImagenes from './listaImagenes';
import NewCarouselItemDto from './models/newCarouselItem';
import MaqromLogo from "../../assets/MaqromLogoPlantilla.png" ;

export default function EditCarousel(){
 /** States */
        /* Lista Imagenes */
        const [ imageList , setImageList ] = React.useState( [] ) ;
        const [ galleries , setGalleries ] = React.useState( [] ) ;
        const [ gallery , setGallery ] = React.useState( '' ) ;
        const [ image , setImage ] = React.useState('') ; 

    const [ route , setRoute ] = useState('') ;
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;
    const mode = useSelector( ( state ) => state.adminMode.value ) ; 
    const [ carouselItems , setCarouselItems ] = useState([]) ;
    const [ carouselItem , setCarouselItem ] = useState() ;
    const [ titulo, setTitulo ] = useState() ; 
    const [ contenido, setContenido ] = useState() ; 
    const [ alt , setAlt ] = useState() ;
    const [ currentImage , setCurrentImage ] = useState() ;

    // Handlers
    const handleTitulo = ( e ) => setTitulo( e.target.value ) ; 
    const handleContenido = ( e ) => setContenido( e.target.value ) ; 
    const handleAlt = ( e ) => setAlt( e.target.value ) ;
    
    const handleChangeRoute =  ( e ) => {
        e.preventDefault() ;
        setRoute( e.target.value ) 
        getAllCarouselItems( setCarouselItems , route ) ;
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
        getAllImages( setImageList );
    }; 

    const handleCreateNewCarouselItem = async ( e ) =>{
        e.preventDefault() ;
        
       if( !route ) {
            alert( 'Debe seleccionar un carousel primero' ) ;
       }
       else{
            const newCarouselItem = new NewCarouselItemDto( route ) ;
            await createNewCarouselItem( newCarouselItem , route ) ;
            const result = getCarouselItems( route ) ;
            setCarouselItems( result ) ;
       }
    }

    const handleDeleteCarouselItem = async ( e ) =>{
        e.preventDefault() ;
        deleteCarouselItem( carouselItem ) ;
        const result = getCarouselItems( route ) ;
        setCarouselItems( result ) ;
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
        const result = getCarouselItems( route ) ;
        setCarouselItems( result ) ;
    }    

    React.useEffect(() => {
        getAllImages( setImageList ) ;
        getGalleries( setGalleries ) ;
        
    }, []);
   
    React.useEffect( () =>{
        getAllCarouselItems( setCarouselItems , route );
    }, [ route ] )

    React.useEffect( () => {
        getAllImages( setImageList , gallery === 'Todas las imagenes' ? '' : gallery  ) ;
        getGalleries( setGalleries ) ;
    }, [ gallery ] ) ; 

    if( !mode ){
        return <Admin />
    }
    else
    return(
        <Box className= 'editCardForm' >
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
                    updateCarouselItems = { setCarouselItems } 
                    setCarouselItem = { setCarouselItem } 
                    currentImage = { setCurrentImage }
                    carouselItems = { carouselItems }
            />
            <Button variant='contained' endIcon = { <AddAPhotoIcon  /> }  onClick = { handleCreateNewCarouselItem } >
                Agregar una foto predeterminada al carousel
            </Button>

            <Button 
                        aria-label="Example" 
                        variant='outlined'
                        onClick={ handleDeleteCarouselItem }
                        endIcon = { <DeleteIcon /> }
            >
                Borrar el elemento seleccionado
            </Button>
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
                        />
                        <img width={ '500' }  height={ '450' } src={ !image ? MaqromLogo : image } />
                        <img width={ '500' }  height={ '450' } src={ !currentImage ? MaqromLogo : currentImage } />
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
                    onClick = { handleSubmit }
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
        </Box>    
            

    );

}