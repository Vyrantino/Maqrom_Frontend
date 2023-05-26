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
    Container
} from '@mui/material';
import { Link , useOutletContext } from 'react-router-dom';
import NewPaperDto from './edit/models/newPaperDto';
import Sidebar from './edit/sidebar';


export default function AboutUs (  ){
    const [ cards, setCards ] = React.useState([]); 
    const [ papers, setPapers ] = React.useState([]); 
    const [ articles, setArticles ] = React.useState([]) ;
    const [ carouselItems, setCarouselItems ] = React.useState([]) ;
    const [ sidebar, setSidebar ] = useOutletContext() ;
    
    const route = "Nosotros" ;

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
                      
                        <Container  className='HomepageCardContainer'>

                              
                        </Container>
                        
                      
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