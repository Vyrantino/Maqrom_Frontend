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
import { createArticle, deleteArticle, patchArticle } from '../../axiosMain';
import Dialogo from '../../components/Dialogo';


export default function ArticlePicker( props ) {
    const [ articleName , setArticleName ] = React.useState('') ;
    const [ open , setOpen ] = React.useState( false ) ;
   
    const handleCreateArticle = async ( entry ) => {
      
        await createArticle( entry ) 
            .then( () =>{
                props.setArticle( entry ) ;
                setArticleName( entry ) ;
                closeDialog() ;
            } )

       
    }

    const handleEditArticle = async () =>{
        
        await patchArticle( props.article, articleName ) 
            .then( () =>{
                props.setArticle( articleName ) ;
                setArticleName( articleName ) ;
            } )
        
         ;
    }

    const handleDeleteArticle = async () =>{
       
        await deleteArticle( props.article ) 
            .then( () =>{
                props.setArticle( '' ) ;
                setArticleName( '' ) ;
            } ) ;
    }

    const handleChangeArticle = ( e ) => {
        e.preventDefault() ;
        const selectedArticle = e.target.value ;
        props.setArticle( selectedArticle ) ;
    }

    
    const closeDialog = () =>{
        setOpen( false ) ;
    }
   
    return(
        <Container maxWidth = 'sm'   >
           
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
                        <Button variant='outlined' onClick={ () => setOpen( true ) } > Crear Articulo </Button>
                        <Button variant='outlined' onClick={ handleEditArticle } > Editar </Button>
                        <Button variant='outlined' onClick={ handleDeleteArticle } > Borrar </Button>
                       
                    </ButtonGroup>
                </FormControl>
                <Dialogo
                    open = { open }
                    closeDialog = { closeDialog }
                    handleCreateArticle = { handleCreateArticle }
                />
        </Container>
        
    ) ;

}