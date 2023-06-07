import { 
    Box,
    Button,
    ButtonGroup,
    Container, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
} from '@mui/material';
import * as React from 'react'; 
import { createArticle, deleteArticle, patchArticle } from '../../axiosMain';
import Dialogo from '../../components/Dialogo';
import Admin from '../../admin';
import { useSelector } from 'react-redux';

export default function ArticlePicker(props) {
  const [articleName, setArticleName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleCreateArticle = async (entry) => {
    await createArticle(entry).then(() => {
      props.setArticle(entry);
      setArticleName(entry);
      closeDialog();
    });
  };

  const handleEditArticle = async ( entry ) => {
    await patchArticle(props.article, entry).then(() => {
      setArticleName(entry);
      props.setArticle(entry);
      closeDialogEdit() ;
    });
  };

  const handleDeleteArticle = async () => {
    await deleteArticle(props.article).then(() => {
      props.setArticle("");
      setArticleName("");
    });
  };

  const handleChangeArticle = (e) => {
    e.preventDefault();
    const selectedArticle = e.target.value;
    props.setArticle(selectedArticle);
  };

    const closeDialog = () =>{
        setOpen( false ) ;
    }
    const closeDialogEdit = () =>{
        setOpenEdit( false ) ;
    }
    const mode = useSelector( ( state ) => state.adminMode.value ) ; 
    if( !mode ){
        return <Admin />

    }
    else
    return(
        <Box sx={{ alignSelf: 'center' }} >
          <FormControl  variant="filled" sx={{ m: 1, minWidth: '60%' }} >
              <InputLabel id="demo-simple-select-filled-label"> Articulos dados de alta </InputLabel>
              <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={ props.article }
                  onChange={ handleChangeArticle  }
                  defaultValue=''
              >   
                  
                  {
                      props.articles.map( ( item ) => (
                          <MenuItem key = { item.idArticle }  value = { item.articleName }  > { item.articleName } </MenuItem> 
                        ) )
                  }
            </Select>

            <ButtonGroup>
              <Button variant="contained" color='success' onClick={() => setOpen(true)}>
                {" "}
                Crear Articulo{" "}
              </Button>
              <Button variant="contained"  onClick={() => setOpenEdit( true )}>
                {" "}
                Editar{" "}
              </Button>
              <Button variant="contained" color='error' onClick={handleDeleteArticle}>
                {" "}
                Borrar{" "}
              </Button>
            </ButtonGroup>
          </FormControl>
          <Dialogo
            open={open}
            closeDialog={closeDialog}
            handleCreateArticle={handleCreateArticle}
            mensaje = 'Escoja el nombre del nuevo articulo'
          />
          <Dialogo
            open={openEdit}
            closeDialog={closeDialogEdit}
            handleCreateArticle={handleEditArticle}
            mensaje = 'Edite el nombre del articulo'
          />
    </Box>
  );
}
