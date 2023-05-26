import { 
    Box, 
    Button, 
    Container, 
    IconButton, 
    TextField 
} from "@mui/material";
import * as React from "react";
import { 
    createNewArticleCarouselItem, 
    deleteCard, 
    deleteCarouselItem, 
    getAllImages, 
    getArticleCards, 
    getArticleCarouselItems, 
    getArticles, 
    getGalleries, 
    newArticleCard, 
    patchCarousel, 
    uploadPhoto 
} from "../axiosMain";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/carousel";
import ListaImagenes from "./edit/listaImagenes";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import { loadArticle, loadImg } from "../components/redux/editForm";
import NewArticleCardDto from "./edit/models/newArticleCardDto";
import Carta from "../components/card";
import ArticlePicker from "./edit/articlePicker";
import MaqromLogo from "../assets/MaqromLogoPlantilla.png" ;



export default function Article(  ){
    /*  */


    /* Redux */
        const mode = useSelector( ( state ) => state.adminMode.value ) ; 
        const dispatch = useDispatch( ) ;
    /** States */
        /* Lista Imagenes */
        const [ imageList , setImageList ] = React.useState( [] ) ;
        const [ galleries , setGalleries ] = React.useState( [] ) ;
        const [ gallery , setGallery ] = React.useState( '' ) ;
        const [ image , setImage ] = React.useState('') ; 
        
        /* Articulos */
        const [ articleName , setArticleName ] = React.useState('');
        const [ articleCards , setArticleCards ] = React.useState([]) ;
        const [ articlePapers, setArticlePapers ] = React.useState([]) ;
        const [ articles , setArticles ] = React.useState( [] ) ;
        const [ article , setArticle ] = React.useState( '' ) ;
        
        /* CarouselItems */
        const [ articleCarouselItems, setArticleCarouselItems ] = React.useState([]) ;
        const [ articleCarouselItem, setArticleCarouselItem ] = React.useState() ;
        
        const [ currentImage , setCurrentImage ] = React.useState('') ;
       
        const [ alt, setAlt ] = React.useState() ;
        const [ titulo, setTitulo ] = React.useState() ; 
        const [ contenido, setContenido ] = React.useState() ; 
    /* Constantes */
    
    const navigate = useNavigate() ;
    
    // Handlers
    const handleTitulo = ( e ) => setTitulo( e.target.value ) ; 
    const handleContenido = ( e ) => setContenido( e.target.value ) ; 

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
        getAllImages( setImageList , gallery === 'Todas las imagenes' ? '' : gallery );

    }; 

    const handleCreateNewCarouselItem =  ( e ) =>{
        e.preventDefault() ;
        
       if( !article ) {
            alert( 'Debe seleccionar un carousel primero' ) ;
       }
       else{
            const newCarouselItem = new NewArticleCardDto( article ) ;
            createNewArticleCarouselItem( newCarouselItem , article ) ;
            getArticleCarouselItems( setArticleCarouselItems , article ) ;
            
       }
    }


    const handleNewArticleCard =  (  ) =>{
        const card = new NewArticleCardDto( article ) ; 
        newArticleCard( card , article ) ;
       
    }

    const handleDeleteCarouselItem =  ( e ) =>{
        e.preventDefault() ;
        deleteCarouselItem( articleCarouselItem ) ;
        getArticleCarouselItems( setArticleCarouselItems , article );
    }
    
    const handleSubmit =  ( e ) =>{
        e.preventDefault() ;
         patchCarousel( 
            articleCarouselItem , 
            titulo, 
            contenido , 
            !image ? 
                articleCarouselItem.img 
                : 
                image 
        ) ; 
        getArticleCarouselItems( setArticleCarouselItems , article );
    }    

    const handleDelete =  ( idCard ) =>{
        deleteCard( idCard  , setArticleCards,  article ) ;
        
    }



    React.useEffect(() => {
        getArticles( setArticles ) ;
    }, []);

    React.useEffect(() => {
            getArticleCarouselItems( setArticleCarouselItems , article ) 
    }, [ articleCarouselItems , article ]);
    
    React.useEffect(() => {
        getArticleCards( setArticleCards , article ) ;
    }, [ articleCards , article ]);

    React.useEffect(() => {
        getAllImages( setImageList , gallery === 'Todas las imagenes' ? '' : gallery );
    }, [ imageList , gallery ]);

    React.useEffect( () => {
        getAllImages( setImageList , gallery === 'Todas las imagenes' ? '' : gallery  ) ;
        getGalleries( setGalleries ) ;
    }, [ gallery ] ) ; 
   
    return(
        <Box className= 'editCardForm' >
            {
                mode ?
                    <ArticlePicker 
                        setArticle = { setArticle }
                        articles = { articles }
                        article = { article }
                    />
                :
                <span />
            }
          

            <Carousel 
                    article = { article } 
                    updateCarouselItems = { setArticleCarouselItems } 
                    setCarouselItem = { setArticleCarouselItem } 
                    currentImage = { setCurrentImage }
                    carouselItems = { articleCarouselItems }
            />

            {
                mode ?
                <Box> {/* Box Principal */ }
                    <Box sx = { { display: 'flex' , flexDirection: 'column' } } > 

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
                         
                    </Box>
                    <Box sx = { { display: 'flex' , flexDirection: 'row' } } >  {/* Box de galerias */ }

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

                    </Box> {/* Box de galerias */ }
                    <Box component='form' className= 'editCardForm' onSubmit={ handleSubmit } >   {/* Box de Formulario */ }
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
                        <Button aria-label='Crear Nueva Carta' onClick={ handleNewArticleCard }> Crear Nueva Carta </ Button> : <span /> 

                    </Box> {/* Box de Formulario */ }

                {/* Box Principal */ }
                </ Box> 
                
                :
                <span />
            }
            

            
 
                
    
            
           
            <Container >
                    {
                        articleCards.map( ( item ) =>(
                            item.route != 'articulo' ? 
                            <span />
                            :
                            <Carta 
                                key = { item.idCard }
                                img = { item.img }
                                title = { item.title }
                                content = { item.content }
                                route = { item.route }
                                idCard = { item.idCard }
                                isLocked = { item.isLocked }
                                CardWidth = '100'
                                CardHeight = '300'
                                handleDelete = { handleDelete }
                            />
                        ) ) 
                    }
            </Container>
        </Box>    
            

    );

}