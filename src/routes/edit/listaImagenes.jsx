import * as React from 'react' ;
import { getAllImages, getImageList } from '../../axiosMain';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadImg } from '../../components/redux/editForm';

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

export default function ListaImagenes( props ){
    

    const [ imageList, setAllImages ] = React.useState([]) ;
    const apiUrl = 'http://localhost:3000/images/' ;
    React.useEffect(() => {
        getAllImages( setAllImages ) ; 

     }, [ props.imageList ]);

    return (
        <ImageList
          sx={{
            width: props.width,
            height: props.height,
            
          }}
          cols={4}
          
          gap={1}
        >
          {
            imageList.map((item) => {
            return (
              <ImageListItem key={item.idImage}  >
                <img
                  src={ apiUrl+item.name+`?w=64&h=64&fit=crop&auto=format` }
                  srcSet={ apiUrl+item.name+`?w=64&h=64&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.alt}
                  loading="lazy"
                  onClick={  () =>{ 
                    props.setImage( apiUrl+item.name ) ;
                  } }
                  
                />
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  title={item.alt}
                  position="top"
                  actionPosition="left"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      );
}

            

    // return(
    //     <ImageList sx={{ width: props.width, height: props.height }} cols={3} rowHeight={164}>
    //         {
    //             !props.updatedAllImages ? allImages : props.updatedAllImages.map( (item) => (
    //             <ImageListItem  key={item.idImage}>
    //             <img
                    // src={`${apiUrl}/${item.name}`}
                    // srcSet={`${apiUrl}/${item.name}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
    //                 alt={item.alt}
    //                 loading="lazy"
    //                 onClick={  () =>{ 
    //                     dispatch( loadImg( `${apiUrl}/${item.name}` ) ) ;
    //                     props.setImage( `${apiUrl}/${item.name}` ) ;
    //                 } }
    //             />
               
    //             </ImageListItem>
    //         ))}
    //     </ImageList>
    // );   
    // 