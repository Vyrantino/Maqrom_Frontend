import { 
    Box,
    Button,
    Container, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField 
} from '@mui/material';
import * as React from 'react'; 
import { createGallery, deleteGallery, getGalleries, patchGallery } from '../../axiosMain';
import { useDispatch } from 'react-redux';
import { loadArticle } from '../../components/redux/editForm';


export default function GalleryPicker( props ) {

    //const [ gallery , setGallery ] = React.useState('') ;
    //const [ galleryName , setGalleryName ] = React.useState('') ;
    const [ galleries , setGalleries ] = React.useState([]) ;

    React.useEffect(() =>{
        getGalleries( setGalleries ) ;

    },[ galleries ]); 

    const handleCreateGallery =  () => {
      
        createGallery( props.galleryName ) ;
        getGalleries( setGalleries ) ;
    }

    const handleEditGallery =  () =>{
        
        patchGallery( props.gallery, props.galleryName ) ;
        props.resetGallery( props.galleryName ) ;
        getGalleries( setGalleries ) ;
    }

    const handleDeleteGallery =  () =>{
       
        deleteGallery( props.gallery ) ;
        //setGallery( '' ) ;
        props.resetGallery('') ;
        getGalleries( setGalleries ) ;
    }

    const handleGalleryName = ( e ) => setGalleryName( e.target.value ) ; 
    const handleChangeGallery = ( e ) => {
        e.preventDefault() ;
        //setGallery( e.target.value ) ;
    }
   
    return(
        <Container maxWidth = 'sm'   >
           
                <FormControl  variant="filled" sx={{ m: 1, minWidth: '60%' }} >
                    <InputLabel id="demo-simple-select-filled-label"> Galerias </InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={ props.gallery }
                        onChange={ props.handleChangeGallery  }
                        defaultValue=''
                    >   
                        <MenuItem key = { 0 } value = { 'Todas las imagenes' } > Todas las imagenes </MenuItem>
                        {
                            galleries.map( ( item ) => (
                                <MenuItem key = { item.idGallery }  value = { item.galleryName }  > { item.galleryName } </MenuItem> 
                             ) )
                        }
                    </Select>

                    <TextField
                        sx = { { margin: '2%' } }
                        label = 'Nombre de la nueva Galeria'
                        variant='filled'
                        onChange={ props.handleGalleryName }
                    >
                    </TextField>

                    <Box>
                        <Button variant='outlined' onClick={ handleCreateGallery } > Crear Galeria </Button>
                        <Button variant='outlined' onClick={ handleEditGallery } > Editar </Button>
                        <Button variant='outlined' onClick={ handleDeleteGallery } > Borrar </Button>
                    </Box>
                </FormControl>
           
        </Container>
        
    ) ;

}