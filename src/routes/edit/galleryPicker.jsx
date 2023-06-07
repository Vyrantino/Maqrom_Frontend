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
import Admin from '../../admin';
import { useSelector } from 'react-redux';

export default function GalleryPicker(props) {
  const [galleryName, setGalleryName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);


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
    const closeDialogEdit = () =>{
        setOpen( false ) ;
    }

    const mode = useSelector( ( state ) => state.adminMode.value ) ; 
    if( !mode ){
        return <Admin />

    }
    else
    return(
        <Box
          sx={{ alignSelf: 'center' }}
        >
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

          <ButtonGroup
            color="primary"
            aria-label="medium secondary button group"
          >
            <Button variant="contained" color='success' onClick={() => setOpen(true)}>
              {" "}
              Crear Galeria{" "}
            </Button>

            <Button variant="contained"  onClick={() => setOpenEdit(true)}>
              {" "}
              Editar{" "}
            </Button>
            <Button variant="contained" color='error' onClick={handleDeleteGallery}>
              {" "}
              Borrar{" "}
            </Button>
          </ButtonGroup>
       
      </FormControl>

      <Dialogo
        open={open}
        closeDialog={closeDialog}
        handleCreateArticle={handleCreateGallery}
        mensaje = 'Crear nueva Galeria'
      />
      <Dialogo
        open={openEdit}
        closeDialog={closeDialogEdit}
        handleCreateArticle={handleEditGallery}
        mensaje = 'Editar Galeria'
      />
    </Box>
  );
}
