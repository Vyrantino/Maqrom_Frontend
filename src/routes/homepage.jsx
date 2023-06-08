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
    Grid,
    Paper,
    Typography
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import NewPaperDto from './edit/models/newPaperDto';
import Sidebar from './edit/sidebar';
import MaqromLogo from "../assets/Maqrom.svg" ;
import AfterCarousel from '../components/page components/afterCarousel';
import AfterCards from '../components/page components/afterCards';
import Midiendo from '../assets/midiendo.jpg';

export default function Homepage() {
  const [cards, setCards] = React.useState([]);
  const [papers, setPapers] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [carouselItems, setCarouselItems] = React.useState([]);
  const [sidebar, setSidebar] = useOutletContext();
  

  const route = "Homepage";

  React.useEffect(() => {
    getArticles(setArticles);
    getCarouselItems(setCarouselItems, route);
    getCards(setCards, route);
    getPapers(setPapers, route, "");
    setSidebar(false);
  }, []);

  const mode = useSelector((state) => state.adminMode.value);

  const handleNewCard = async () => {
    const card = new NewCardDto(route);
    await newCard(card, route).then(() => {
      getCards(setCards, route);
    });
  };

  const handleNewPaper = async () => {
    const paper = new NewPaperDto(route, "");
    await createNewPaper(paper, route, "").then(() => {
      getPapers(setPapers, route, "");
    });
  };

  const handleDelete = async (idCard) => {
    deleteCard(idCard, setCards, route).then(() => {
      getCards(setCards, route);
    });
  };

  const handleDeletePaper = async (idPaper) => {
    await deletePaper(idPaper).then(() => {
      getPapers(setPapers, route, "");
    });
  };

  const toogle = (open) => {
    setSidebar(open);
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
          <Box  sx={{ backgroundColor: '#F3F3F3' , padding: '1em' }} />
          <AfterCarousel 
              image={ Midiendo }
              texto={ textos.textoAfterCarousel }
          />
          <Box  sx={{ backgroundColor: '#F3F3F3' , padding: '1em' }} />
          <Box
            sx={{
              background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
          >
              <Grid
                      container
                      spacing ={0.5}
                      rowGap={5}
                      justifyContent={'space-around'}
                    
              >
                {cards.map( ( item ) =>(
            
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
                        buttons = { mode }
                    /> 
                ))} 
              </Grid>
          </Box>
          <Box  sx={{ backgroundColor: '#F3F3F3' , padding: '1em' }} /> 
          <AfterCards
             firstText={ textos.primerTexto }
             secondText={ textos.segundoTexto }
             thirdText={ textos.tercerTexto }
             title={ textos.titulo }
             route = {route}
          />  
          <Box  sx={{ backgroundColor: '#F3F3F3' , padding: '1em' }} />  
          <Box
              sx={{
                background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
          >
              <Grid
                   container
                   spacing ={1}
                   rowGap={1}
                   justifyContent={'space-between'}
              >
                {papers.map( ( paper ) => (
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
                      buttons = { mode }
                  />
                ))}                                    
              </Grid>
            </Box>
            <Box  sx={{ backgroundColor: '#F3F3F3' , padding: '1em' }} />
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
          
                      </Typography>
                  </Box>
              </Paper>
              <Box  sx={{ backgroundColor: '#E66825' , padding: '1em' }} />
              <Box  sx={{ backgroundColor: '#F57A2E' , padding: '1em' }} />
              <Box  sx={{ backgroundColor: '#1F0318' , padding: '1em' }} />

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


const textos = {
  primerTexto: "",
  segundoTexto:"",
  tercerTexto:"",
  titulo:"",
  textoAfterCarousel: "" ,
};