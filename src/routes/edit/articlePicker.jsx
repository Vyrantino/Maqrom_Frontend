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
import { createArticle, deleteArticle, getArticles, patchArticle } from '../../axiosMain';
import { loadArticle } from '../../components/redux/editForm';


export default function ArticlePicker( props ) {
    const [ articleName , setArticleName ] = React.useState('') ;



    const handleCreateArticle = async () => {
      
        createArticle( articleName ) ;
    }

    const handleEditArticle = async () =>{
        
        patchArticle( props.article, articleName ) ;
        props.setArticle( articleName ) ;
        setArticleName( articleName ) ;
    }

    const handleDeleteArticle = () =>{
       
        deleteArticle( props.article ) ;
        dispatch( loadArticle('') ) ;
    }

    const handleArticleName = ( e ) => setArticleName( e.target.value ) ; 
    const handleChangeArticle = ( e ) => {
        e.preventDefault() ;
        const selectedArticle = e.target.value ;
        props.setArticle( selectedArticle ) ;
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

                    <TextField
                        sx = { { margin: '2%' } }
                        label = 'Nombre del nuevo Articulo'
                        variant='filled'
                        onChange={ handleArticleName }
                    >
                    </TextField>

                    <Box>
                        <Button variant='outlined' onClick={ handleCreateArticle } > Crear Articulo </Button>
                        <Button variant='outlined' onClick={ handleEditArticle } > Editar </Button>
                        <Button variant='outlined' onClick={ handleDeleteArticle } > Borrar </Button>
                    </Box>
                </FormControl>
           
        </Container>
        
    ) ;

}