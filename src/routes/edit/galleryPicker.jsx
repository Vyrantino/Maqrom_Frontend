import { 
    Box,
    Button,
    ButtonGroup,
    Container, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField 
} from '@mui/material';
import * as React from 'react'; 
import { createGallery, deleteGallery, patchGallery } from '../../axiosMain';
import Dialogo from '../../components/Dialogo';


export default function GalleryPicker( props ) {
    const [ galleryName , setGalleryName ] = React.useState('') ;
    const [ open , setOpen ] = React.useState( false ) ;


    const handleCreateGallery = async ( entry ) => {

        await createGallery( entry ) 
        .then( () =>{
            props.setGallery( entry ) ;
            setGalleryName( entry ) ;
            closeDialog() ;
        } )
        
    }

    const handleEditGallery = async () =>{

        await patchGallery( props.gallery, galleryName )
            .then( () => props.setGallery( galleryName ) ) ; 
    }

    const handleDeleteGallery = async () =>{
    
        await deleteGallery( props.gallery )
            .then( () => props.setGallery( '' ) ) ;
    }

    const handleChangeGallery = ( e ) => {
        const selectedGallery = e.target.value;
        props.setGallery( selectedGallery ) ; 
        
    }

    const closeDialog = () =>{
        setOpen( false ) ;
    }
   
    return(
        <Container maxWidth = 'sm'   >
           
                <FormControl  variant="filled" sx={{ m: 1, minWidth: '60%' }} >
                    <InputLabel id="demo-simple-select-filled-label"> Galerias </InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={ props.gallery }
                        onChange={ handleChangeGallery  }
                        defaultValue=''
                    >   
                        <MenuItem key = { 0 } value = { 'Todas las imagenes' } > Todas las imagenes </MenuItem>
                        {
                            props.galleries.map( ( item ) => (
                                <MenuItem key = { item.idGallery }  value = { item.galleryName }  > { item.galleryName } </MenuItem> 
                             ) )
                        }
                    </Select>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                            m: 1,
                            },
                        }}
                    >
                            <ButtonGroup color="secondary" aria-label="medium secondary button group">
                                <Button variant='outlined' onClick={ () => setOpen( true ) } > Crear Galeria </Button>
                                
                                <Button variant='outlined' onClick={ handleEditGallery } > Editar </Button>
                                <Button variant='outlined' onClick={ handleDeleteGallery } > Borrar </Button>
                            </ButtonGroup>
                    </Box>
                </FormControl>

                <Dialogo
                    open = { open }
                    closeDialog = { closeDialog }
                    handleCreateArticle = { handleCreateGallery }
                />          
        </Container>
        
    ) ;

}