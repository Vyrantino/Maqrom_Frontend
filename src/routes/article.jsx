import { 
    Box, 
    Button, 
    ButtonGroup, 
    Container, 
    IconButton, 
    TextField 
} from "@mui/material";
import * as React from "react";
import { 
    createNewArticleCarouselItem, 
    deleteArticleCards, 
    deleteCarouselItem, 
    getAllImages, 
    getArticleCards, 
    getArticleCarouselItems, 
    getArticles, 
    getGalleries, 
    getPaginatedImages, 
    newArticleCard, 
    patchCarousel, 
    uploadPhoto 
} from "../axiosMain";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
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
import Sidebar from "./edit/sidebar";



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
        const [ page , setPage ] = React.useState(1) ;
        const [ pageCount , setPageCount ] = React.useState(1) ; 
        
        /* Articulos */
        const [ articleCards , setArticleCards ] = React.useState([]) ;
        const [ articles , setArticles ] = React.useState( [] ) ;
        const [ article , setArticle ] = React.useState( '' ) ;
        
        /* CarouselItems */
        const [ articleCarouselItems, setArticleCarouselItems ] = React.useState([]) ;
        const [ articleCarouselItem, setArticleCarouselItem ] = React.useState() ;
        const [ index, setIndex ] = React.useState( 0 ) ;
        const [ currentImage , setCurrentImage ] = React.useState('') ;
        const [ alt, setAlt ] = React.useState() ;
        const [ titulo, setTitulo ] = React.useState() ; 
        const [ contenido, setContenido ] = React.useState() ; 
        /* Sidebar */
        const [ sidebar, setSidebar ] = useOutletContext() ;
    /* Constantes */
    
    const navigate = useNavigate() ;
    
    // Handlers

    const handlePage = ( event , newPage ) =>{
        setPage( newPage ) ;
        getPaginatedImages( setImageList , gallery , page , setPageCount ) ;
    }
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
        getPaginatedImages ( setImageList , gallery , page , setPageCount ) ;

    }; 

    const handleCreateNewCarouselItem = async ( e ) =>{
        e.preventDefault() ;
        
       if( !article ) {
            alert( 'Debe seleccionar un carousel primero' ) ;
       }
       else{
            const newCarouselItem = new NewArticleCardDto( article ) ;
            await createNewArticleCarouselItem( newCarouselItem , article ) 
                .then( () => getArticleCarouselItems( setArticleCarouselItems , article )  ) ;
       }
    }

    const handleDeleteCarouselItem = async ( e ) =>{
        e.preventDefault() ;
        await deleteCarouselItem( articleCarouselItem ) 
            .then( () => {
                getArticleCarouselItems( setArticleCarouselItems , article ) ; 

            } ) ;
        
    }

    const handleSubmit = async ( e ) =>{
        e.preventDefault() ;
         await patchCarousel( 
            articleCarouselItem , 
            titulo, 
            contenido , 
            !image ? 
                articleCarouselItem.img 
                : 
                image 
         ) 
            .then(  () =>  getArticleCarouselItems( setArticleCarouselItems , article )  ) ;
       
    }    

    const handleDelete = async ( idCard ) =>{
        
        await deleteArticleCards( idCard )
            .then( () => getArticleCards( setArticleCards , article )  ) ; 
    }

    const handleNewArticleCard = async (  ) =>{
        const card = new NewArticleCardDto( article ) ; 
        await newArticleCard( card , article ) 
            .then( () => getArticleCards( setArticleCards , article )  ) ;

    }

    
    const handleDeleteImage = async ( e ) =>{
        e.preventDefault() ;
        const partirImage = image.split('/');
        const nombreImage = partirImage[partirImage.length - 1];
        await deleteImage( nombreImage  ) ;
        setAlt( '' ) ;
        setImage('');
        getPaginatedImages( setImageList , gallery , page , setPageCount ) ;
        
    }


    /* Para abrir la sidebar */
    const toogle = ( open ) =>  {
        setSidebar( open );
    };


    React.useEffect(() => {
        //getArticles( setArticles ) ;
        setSidebar( false ) ;
    }, []);


    React.useEffect(() => {
            getArticleCarouselItems( setArticleCarouselItems , article ) ;
            getArticles( setArticles ) ;
    }, [ article ]);

    React.useEffect(() => {
        getPaginatedImages( 
            setImageList , 
            gallery === 'Todas las imagenes' ? '' : gallery, 
            page , 
            setPageCount 
        ) ;  
    }, [ page , gallery ]);
    
    React.useEffect(() => {
        getArticleCards( setArticleCards , article ) ;
    }, [ article ]);

    React.useEffect( () => {
        getAllImages( setImageList , gallery === 'Todas las imagenes' ? '' : gallery );
        getGalleries( setGalleries ) ;
    }, [ gallery ] ) ; 
   
    return(
        <Box className= 'editCardForm' >
            <Sidebar 
                sidebar = { sidebar } 
                toogle = { toogle }
                handleNewCard = { handleNewArticleCard }
            />  
            {
                mode ?
                    <ArticlePicker 
                        className = 'ArticlePicker'
                        setArticle = { setArticle }
                        articles = { articles }
                        article = { article }
                    />
                :
                <span />
            }

            <Carousel 
                    article = { article } 
                    setCarouselItem = { setArticleCarouselItem } 
                    currentImage = { setCurrentImage }
                    carouselItems = { articleCarouselItems }
                    index = { index }
            />

            {
                mode ?
                <Box> {/* Box Principal */ }
                <ButtonGroup  >
                    <Button variant='contained' endIcon = { <AddAPhotoIcon  /> }  onClick = { handleCreateNewCarouselItem } >
                        Agregar una foto predeterminada al carousel
                    </Button>

                    <Button 
                                color='error'
                                variant='contained'
                                onClick={ handleDeleteCarouselItem }
                                endIcon = { <DeleteIcon /> }
                    >
                        Borrar el elemento seleccionado
                    </Button>

                    <Button 
                        variant = 'contained'
                        color='success'
                        onClick = { handleSubmit }
                        endIcon = { <PublishIcon /> }
                    >
                        Aplicar Cambios   
                    </Button>

                    <Button variant= 'contained' color="primary" aria-label="upload picture" component="label" endIcon={ <AddAPhotoIcon /> } >
                        <input hidden accept="image/*" type="file" onChange= { handleImagen }  />
                        
                        Subir una Imagen
                    </Button>
            </ButtonGroup>
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
                            pageCount = { pageCount }
                            page = { page }
                            handlePage = { handlePage }
                        />
                         <Box sx={{ display: 'flex' , flexDirection: 'column' }} >
                                <img width={ '500' }  height={ '450' } src={ !image ? MaqromLogo : image } />
                          
                                <Button 
                                    variant='contained'
                                    
                                    sx={ { 
                                        width: '100%' , 
                                        alignSelf: 'center'  
                                    } } 
                                    onClick={ handleDeleteImage }
                                >
                                    Borrar Esta Imagen  
                                    <DeleteIcon />
                                </Button>         
                         </Box>      

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
                            <span key = { item.idCard }/>
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