import * as React from "react";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { useSelector } from "react-redux";

export default function Carousel(props) {
  const [clicked, setClicked] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const mode = useSelector((state) => state.adminMode.value);
  React.useEffect(() => {
    setClicked(false);
  }, [props.route, props.carouselItems, props.article]);

  const handleSlid = (newIndex) => {
    if( mode ){
      if (!props.carouselItems.length === 0) {
        if (props.article) {
          setClicked(false);
          props.setCarouselItem(props.carouselItems[newIndex].idCarouselItem);
        }
        console.log(props.carouselItems);
        if (props.route) {
          setClicked(false);
          props.setCarouselItem(props.carouselItems[newIndex].idCarouselItem);
        }
      }
    }
    
  };

  const handleClick = (item) => {
    props.setCarouselItem(item.idCarouselItem);
    props.currentImage(item.img);
    setClicked(true);
    console.log(item.idCarouselItem);
  };

  return (
    <CCarousel
      controls
      indicators
      interval={mode && 3000}
      onSlid={ handleSlid }
      activeIndex={index}
    >
      {props.carouselItems.map((item) => (
        <CCarouselItem key={item.idCarouselItem}>
          {mode ? (
            <CImage
              key={`CImage ${item.idCarouselItem}`}
              onClick={() => handleClick(item)}
              
              className={clicked ? "CarouselItemSelected" : "d-block w-100"}
              src={item.img}
              alt="slide 1"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <CImage
              key={`CImage ${item.idCarouselItem}`}
              className={clicked ? "CarouselItemSelected" : "d-block w-100"}
              src={item.img}
              alt="slide 1"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
          <CCarouselCaption
            key={`CCarouselCaption ${item.idCarouselItem}`}
            component={"span"}
            className="d-none d-md-block"
          >
            <h5 key={`h5 ${item.idCarouselItem}`}> {item.title} </h5>
            <h6 key={`h6 ${item.idCarouselItem}`}> {item.content} </h6>
          </CCarouselCaption>
        </CCarouselItem>
      ))}
    </CCarousel>
  );
}
