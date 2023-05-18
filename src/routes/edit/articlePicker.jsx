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
import { useDispatch } from 'react-redux';
import { loadArticle } from '../../components/redux/editForm';


export default function ArticlePicker( props ) {
    const dispatch = useDispatch() ;

    const [ article , setArticle ] = React.useState('') ;
    const [ articleName , setArticleName ] = React.useState('') ;
    const [ articles , setArticles ] = React.useState([]) ;

    React.useEffect(() =>{
        getArticles( setArticles ) ;

    },[ articles ]); 

    const handleCreateArticle = async () => {
      
        createArticle( props.articleName ) ;
        dispatch( loadArticle( props.articleName ) ) ;
        getArticles( setArticles ) ;
    }

    const handleEditArticle = async () =>{
        
        patchArticle( props.article, props.articleName ) ;
        setArticle( props.articleName ) ;
        setArticleName( props.articleName ) ;
        dispatch( loadArticle( props.articleName ) ) ;
        getArticles( setArticles ) ;
    }

    const handleDeleteArticle = () =>{
       
        deleteArticle( props.article ) ;
        dispatch( loadArticle('') ) ;
        getArticles( setArticles ) ;
    }

    const handleArticleName = ( e ) => setArticleName( e.target.value ) ; 
    const handleChangeArticle = ( e ) => {
        e.preventDefault() ;
        setArticle( e.target.value ) ;
    }
   
    return(
        <Container maxWidth = 'sm'   >
           
                <FormControl  variant="filled" sx={{ m: 1, minWidth: '60%' }} >
                    <InputLabel id="demo-simple-select-filled-label"> Articulos dados de alta </InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={ props.article }
                        onChange={ props.handleChangeArticle  }
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
                        onChange={ props.handleArticleName }
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