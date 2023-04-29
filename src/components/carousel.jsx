import * as React from 'react' ;
import { 
    CCarousel, 
    CCarouselItem,
    CImage,
    CCarouselCaption,

} from '@coreui/react' ; 
import '@coreui/coreui/dist/css/coreui.min.css' ; 


export default function Carousel( props ){
    return(
         <div>
            <CCarousel controls indicators>
                <CCarouselItem>
                    <CImage  height={800}  className="d-block w-100" src={ props.img1 } alt="slide 1" />
                    <CCarouselCaption className="d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <CImage height={800}  className="d-block w-100" src={ props.img2 } alt="slide 2" />
                    <CCarouselCaption className="d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <CImage  height={800}  className="d-block w-100" src={ props.img3 } alt="slide 3" />
                    <CCarouselCaption className="d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
            </CCarousel> 
         </div>   

    ) ;

}
