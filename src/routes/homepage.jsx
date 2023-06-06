import * as React from 'react';
import '@coreui/coreui/dist/css/coreui.min.css' ; 
import Carousel from '../components/carousel';
import Papers from '../components/papers';
import Carta from '../components/card';
import { 
    createNewPaper, 
    deleteCard, 
    deletePaper, 
    getArticles, 
    getCards, 
    getCarouselItems, 
    getPapers, 
    newCard 
} from '../axiosMain';
import { useSelector } from 'react-redux';
import NewCardDto from './edit/models/newCardDto';
import { 
    Box, 
    Button, 
    Container,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import { Link , useOutletContext } from 'react-router-dom';
import NewPaperDto from './edit/models/newPaperDto';
import Sidebar from './edit/sidebar';
import MaqromLogo from "../assets/Maqrom.svg" ;

export default function Homepage (  ){
    const [ cards, setCards ] = React.useState([]); 
    const [ papers, setPapers ] = React.useState([]); 
    const [ articles, setArticles ] = React.useState([]) ;
    const [ carouselItems, setCarouselItems ] = React.useState([]) ;
    const [ sidebar, setSidebar ] = useOutletContext() ;
    
    const route = "Homepage" ;

    React.useEffect( () =>{
        getArticles( setArticles ) ;
        getCarouselItems( setCarouselItems , route ) ;
        getCards(  setCards  , route ) ; 
        getPapers( setPapers, route , '' ) ;
        setSidebar( false ) ;
    },[] );


    const mode = useSelector( ( state ) => state.adminMode.value ) ;

    const handleNewCard =  async (  ) =>{
        const card = new NewCardDto( route ) ; 
        await newCard( card , route ) 
            .then( () =>{
                getCards( setCards , route ) ;
            } )
    }

    const handleNewPaper = async (  ) =>{
        const paper = new NewPaperDto( route , '' ) ; 
      await createNewPaper( paper , route , '' ) 
            .then( () =>{
                getPapers( setPapers, route , '' ) ;
            } )
    }

    const handleDelete = async ( idCard ) =>{
        deleteCard( idCard  , setCards,  route ) 
            .then( () =>{
                getCards( setCards , route ) ;
            } )
       
    }

    const handleDeletePaper = async ( idPaper ) =>{
        
        await deletePaper( idPaper ) 
            .then( () =>{
                getPapers( setPapers, route , '' ) ;
            } )
    }

    const toogle = ( open ) =>  {
        setSidebar( open );
    };

    const isArticle = ( article ) =>{
        const articleList = articles.map( ( item ) => item.articleName ) ;
        return articleList.includes( article ) ;
    }

    return(
          
                    <Box > 
                        <Carousel 
                            route = { route } 
                            carouselItems = { carouselItems }
                        />
                        <hr />  
                        <Container>

                            <Grid
                                    container
                                    spacing ={0.5}
                                    sx={{
                                    
                                    }}
                                    justifyContent={'space-around'}
                                >
                                
                                        {
                                            cards.map( ( item ) =>(
                                    
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
                                                article = { item.article }
                                                hasArticle = { isArticle( item.article ) }
                                            /> 
                                    
                                        ))}
                                    
                                </Grid>
                        </Container>
                            

                            <Box
                                 sx={{
                                    width: '100hw',
                                    height: 200,
                                    backgroundColor: 'primary.main',
                                    display:'flex',

                                  }}
                                color={'secondary'}
                            >
                       
                                    <Typography 
                                        textAlign={'start'} 
                                        variant='h6'
                                        color={'white'}
                                        sx={{ 
                                            p: 2,
                                            zIndex: 2,
                                            gridArea: route ,
                                            fontSize: 12,
                                            fontWeight: 600,
                                            textAlign: 'right',
                                            wordSpacing: 2,
                                            writingMode: 'vertical-rl',
                                            transform: 'scale(-1)',

                                        }}
                                        
                                    > 
                                           Maqrom Constructora
                                    </Typography>
                  
                                    <img 
                                        src={ MaqromLogo } 
                                        width={ 200 } 
                                        height={ 200 } 
                                    />  
                                    
                                   <Box>
                                        <Typography 
                                            textAlign={'start'} 
                                            variant='h6'
                                            color={'white'}
                                            sx={{ 
                                                p: 2,
                                                zIndex: 2,
                                                fontSize: 32,
                                                fontWeight: 600,
                                            
                                                wordSpacing: 2,
                                            
                                                

                                            }}
                                            
                                        > 
                                            Conozca   <br /> Nuestros Servicios
                                        </Typography>

                                        <Typography
                                            color='info.main' 
                                            sx={{m: 3 , }}
                                        > 
                                            Estamos a sus ordenes! 
                                        </Typography>
                                       
                                   </Box> 
                                   <Box>
 
                                        <Typography
                                            variant='h4'
                                            color='info.main' 
                                            sx={{m: 3 , }}
                                        > 
                                            Nuestro trabajo
                                        </Typography>

                                        <Typography
                                            color='info.main' 
                                            sx={{ m: 10 , }}
                                        > 
                                            Es profesional y de Maqrom calidad 
                                        </Typography>

                                   </Box>
                            </Box>
                            <Container>
                                <Grid
                                    container
                                    spacing={1}
                                >
                                    {
                                        papers.map( ( paper ) => (
                                            <Papers 
                                                key = { paper.idPaper }
                                                img = { paper.img }
                                                idPaper = {  paper.idPaper }
                                                title = { paper.title }
                                                content = { paper.content }
                                                route = { paper.route }
                                                handleDelete = { handleDeletePaper }
                                                article = { paper.article }
                                                hasArticle = { isArticle( paper.article ) }
                                            />
                                        ))
                                    }                                    
                                </Grid>
                            
                            </Container>
                           

                        { mode && 
                            <Sidebar 
                                sidebar = { sidebar } 
                                toogle = { toogle }
                                handleNewCard = { handleNewCard }
                                handleNewPaper = { handleNewPaper }
                            />  
                        }
                    </ Box>
           
    );
}