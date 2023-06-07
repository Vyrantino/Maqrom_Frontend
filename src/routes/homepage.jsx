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
    Divider,
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
                                    rowGap={5}
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
                            
                        <Divider sx={{ padding: '1em' }} />
                        
                           
                        <Divider sx={{ padding: '1em' }} />

                            <Container
                                
                            >
                                    <Grid
                                        container
                                        spacing={1}
                                        justifyContent={'space-between'}
                                        justifySelf={'center'}
                                        rowGap={1}
                                            
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
                            <Divider sx={{ padding: '1em' }} />
                            <Paper
                                
                                sx={{
                                    position: 'relative',
                                    backgroundImage: `url(${MaqromLogo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    minHeight: '500px', 
                                }}
                            >
                               
                                <Box
                                    sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    color: '#ffffff', 
                                    padding: '1rem', 
                                    }}
                                >
                                    <Typography variant="h5" align="center">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis ipsam voluptatem veritatis. Consequatur eligendi excepturi sed nesciunt, expedita officia saepe vel quae libero ad sunt tempora quia voluptatibus quas natus!
                        
                                    </Typography>
                                </Box>
                            </Paper>
                            <Divider sx={{ padding: '1em' }} />

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