// import * as React from 'react' ;
// import { 
//     CCarousel, 
//     CCarouselItem,
//     CImage,
//     CCarouselCaption,
// } from '@coreui/react' ; 
// import '@coreui/coreui/dist/css/coreui.min.css' ; 
// import { getAllCards, getAllCarouselItems } from '../axiosMain';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from '@mui/material';
// import { loadImg } from './redux/editForm';

// const List = ( props ) =>(

//     <div>
//         <CCarousel controls indicators interval = { props.mode ? false : 3000 }  
//             activeIndex={carouselItems.findIndex((item) => item.idCarouselItem === props.carouselItem)}  >
//             { props.list.map( ( item ) => (
                
//                 <CCarouselItem key = { item.idCarouselItem } className='carouselItem' >
//                     { 
//                         props.mode  ?
//                                 <CImage  
                                    
//                                     onClick={ () => props.handleClick( item )  }
//                                     height={ 800 } 
//                                     className="d-block w-100" 
//                                     src={  item.img  } 
//                                     alt="slide 1" 
//                                 />
//                         :
//                             <CImage  height={ 800 }  className="d-block w-100" src={  item.img  } alt="slide 1" />
//                     }
//                     <CCarouselCaption className="d-none d-md-block">
//                         <h5>   {  item.route } </h5>
//                         <span> {  item.content } </span>
//                     </CCarouselCaption>
//                 </CCarouselItem>
//             ) ) }
//         </CCarousel>
//     </div>
      
   
// );

// export default function Carousel( props ){
    

//     const dispatch = useDispatch() ;
//     const mode = useSelector( ( state ) => state.adminMode.value ) ;
//     const [ carouselItems, setCarouselItems ] = React.useState([]) ;
//     const route = props.route ;
//     React.useEffect( () => {
//          getAllCarouselItems(  setCarouselItems  , route ) ; 
        
//      }, [ route, props.updatedList ]);

//      const handleClick = ( item  ) =>{
//         const imageName = item.img ;
//         dispatch( loadImg( imageName ) ) ;
//         props.setImage( item.img ) ;
//         props.setCarouselItem( item.idCarouselItem ) ;
//         console.log( item.img , item.idCarouselItem ) ;
//      }

//      const handleSide = ( activeIndex ) =>{
//         const activeItem = carouselItems[ activeIndex ] ;
//         if( activeItem ){
//             const idCarouselItem = activeItem.idCarouselItem ;
//             props.setCarouselItem( idCarouselItem ) ;

//         }

//      }

//         return(
//             <div>
//                 <List 
//                     list = {  carouselItems  } 
//                     handleClick = { handleClick }
//                     mode = { mode }
//                     updateCarouselItems = { props.setCarouselItems }

//                 />
//             </div>   
//         ) ;
// }

import * as React from 'react' ;
import { 
    CCarousel, 
    CCarouselItem,
    CImage,
    CCarouselCaption,
} from '@coreui/react' ; 
import '@coreui/coreui/dist/css/coreui.min.css' ; 
import { getAllCards, getAllCarouselItems } from '../axiosMain';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { loadImg } from './redux/editForm';


export default function Carousel( props ){
    
    const [ clicked, setClicked ] = React.useState( false ) ;
    const dispatch = useDispatch() ;
    const mode = useSelector( ( state ) => state.adminMode.value ) ;
    const [ carouselItems, setCarouselItems ] = React.useState([]) ;
    const route = props.route ;
    React.useEffect( () => {
         getAllCarouselItems(  setCarouselItems  , route ) ; 
         setClicked( false ) ;
     }, [ route, props.updatedList ]);

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
