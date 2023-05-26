import * as React from 'react' ;
import { getAllImages, getGalleries } from '../../axiosMain';
import { Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import GalleryPicker from './galleryPicker';

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

export default function ListaImagenes( props ){
    
    const apiUrl = 'http://localhost:3000/images/' ;


    return (
        <Container>
            <GalleryPicker 
              galleries = { props.galleries }
              setGallery = { props.setGallery }
              gallery = { props.gallery }
            />
            <ImageList
                  sx={{
                    width: props.width,
                    height: props.height,
                  }}
                  cols={4}
                  
                  gap={1}
            >
                {
                  props.imageList.map((item) => (
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
                  ))
                }
              </ImageList>

        </Container>
    );
}
