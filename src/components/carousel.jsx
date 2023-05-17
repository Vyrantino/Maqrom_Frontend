

import * as React from 'react' ;
import { 
    CCarousel, 
    CCarouselItem,
    CImage,
    CCarouselCaption,
} from '@coreui/react' ; 
import '@coreui/coreui/dist/css/coreui.min.css' ; 
import { getAllCarouselItems, getArticleCarouselItems } from '../axiosMain';
import { useDispatch, useSelector } from 'react-redux';
import { loadImg } from './redux/editForm';



export default function Carousel( props ){
    
    const [ clicked, setClicked ] = React.useState( false ) ;
    const dispatch = useDispatch() ;
    const mode = useSelector( ( state ) => state.adminMode.value ) ;
    const [ carouselItems, setCarouselItems ] = React.useState([]) ;
    const route = props.route ;
    const article = props.article ; 
    React.useEffect( () => {
         route ? getAllCarouselItems(  setCarouselItems  ,  route ) : getArticleCarouselItems( setCarouselItems, article ) ;
         setClicked( false ) ;
     }, [ route, props.updatedList , article ]);

     const handleSlid = () =>{
        
        setClicked( false )
        
     }

     const handleClick = ( item  ) =>{
        const imageName = item.img ;
        dispatch( loadImg( imageName ) ) ;
        props.setCarouselItem( item.idCarouselItem ) ;
        console.log( item.img , item.idCarouselItem ) ;
        props.currentImage ( item.img ) ;
        setClicked( true ) ;
     }

        return(
        <CCarousel 
            controls 
            indicators 
            interval = { mode ? false : 3000 }  
            onSlid={ mode ? handleSlid : false }
        >
            { carouselItems.map( ( item ) => (
                
                <CCarouselItem key = { item.idCarouselItem }>
                    { 
                        mode  ?
                                <CImage  
                                    onClick={ () => handleClick( item )  }
                                    height={ 800 } 
                                    className={ clicked ? 'CarouselItemSelected' : "d-block w-100" }
                                    src={  item.img  } 
                                    alt="slide 1" 
                                />
                        :
                            <CImage  height={ 800 }  className="d-block w-100" src={  item.img  } alt="slide 1" />
                    }
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>   {  item.title } </h5>
                        <span> {  item.content } </span>
                    </CCarouselCaption>
                    
                </CCarouselItem>
                
            ) ) }
        </CCarousel>
        ) ;
}
