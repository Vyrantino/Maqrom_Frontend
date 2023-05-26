

import * as React from 'react' ;
import { 
    CCarousel, 
    CCarouselItem,
    CImage,
    CCarouselCaption,
} from '@coreui/react' ; 
import '@coreui/coreui/dist/css/coreui.min.css' ; 
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';




export default function Carousel( props ){
    
    const [ clicked, setClicked ] = React.useState( false ) ;

    const mode = useSelector( ( state ) => state.adminMode.value ) ;
    const route = props.route ;
    const article = props.article ; 
    React.useEffect( () => {
         setClicked( false ) ;
     }, [ route, props.carouselItems , article ]);

     const handleSlid = () =>{
        
        setClicked( false )
        
     }

     const handleClick = ( item  ) =>{
        props.setCarouselItem( item.idCarouselItem ) ;
        props.currentImage ( item.img ) ;
        setClicked( true ) ;
     }

        return(
        <CCarousel 
            controls 
            indicators 
            interval = { mode ? false : 3000 }  
            onSlid={ mode && handleSlid  }
        >
            { 
                props.carouselItems.map( ( item ) => (
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
                    <CCarouselCaption  component={'span'} className="d-none d-md-block">
                        <h5>   {  item.title } </h5>
                        <h6> {  item.content } </h6>
                    </CCarouselCaption>
                    
                </CCarouselItem>
                
            ) ) }
        </CCarousel>
        ) ;
}
