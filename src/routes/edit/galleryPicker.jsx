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
import { createGallery, deleteGallery, getGalleries, patchGallery } from '../../axiosMain';



export default function GalleryPicker( props ) {
    const [ galleryName , setGalleryName ] = React.useState('') ;


    const handleCreateGallery = async () => {

        await createGallery( galleryName )
            .then( () => props.setGallery( galleryName ) ) ;  
    }

    const handleEditGallery = async () =>{

        await patchGallery( props.gallery, galleryName )
            .then( () => props.setGallery( galleryName ) ) ; 
    }

    const handleDeleteGallery = async () =>{
    
        await deleteGallery( props.gallery )
            .then( () => props.setGallery( '' ) ) ;
    }

    const handleGalleryName = ( e ) => setGalleryName( e.target.value ) ; 
    const handleChangeGallery = ( e ) => {
        const selectedGallery = e.target.value;
        props.setGallery( selectedGallery ) ; 
        
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

                    <TextField
                        sx = { { margin: '2%' } }
                        label = 'Nombre de la nueva Galeria'
                        variant='filled'
                        onChange={ handleGalleryName }
                    >
                    </TextField>

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
                                <Button variant='outlined' onClick={ handleCreateGallery } > Crear Galeria </Button>
                                <Button variant='outlined' onClick={ handleEditGallery } > Editar </Button>
                                <Button variant='outlined' onClick={ handleDeleteGallery } > Borrar </Button>
                            </ButtonGroup>
                    </Box>
                </FormControl>
           
        </Container>
        
    ) ;

}