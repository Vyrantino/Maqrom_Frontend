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


export default function CreateArticle() {
    const [ article , setArticle ] = React.useState('') ;
    const [ articleName , setArticleName ] = React.useState('') ;
    const [ articles , setArticles ] = React.useState([]) ;
    const handleArticleName = ( e ) => setArticleName( e.target.value ) ; 
    const handleChangeArticle = ( e ) => {
        e.preventDefault() ;
        setArticle( e.target.value ) ;
    }
    React.useEffect(() =>{
        getArticles( setArticles ) ;

    },[ articles ]); 

    const handleCreateArticle = async () => {
      
        createArticle( articleName ) ;
        getArticles( setArticles ) ;
    }

    const handleEditArticle = async () =>{
        
        patchArticle( article, articleName ) ;
        setArticle( articleName ) ;
        getArticles( setArticles ) ;
    }

    const handleDeleteArticle = () =>{
       
        deleteArticle( article ) ;
        setArticle( '' ) ;
        getArticles( setArticles ) ;
    }

   
    return(
        <Container maxWidth = 'sm'   >
           
                <FormControl  variant="filled" sx={{ m: 1, minWidth: '60%' }} >
                    <InputLabel id="demo-simple-select-filled-label"> Articulos dados de alta </InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={ article }
                        onChange={ handleChangeArticle  }
                        defaultValue=''
                    >   
                       
                        {
                            articles.map( ( item ) => (
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