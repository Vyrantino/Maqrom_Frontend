import * as React from 'react' ;
import { Box, Container, ImageList, ImageListItem, ImageListItemBar, Pagination, Stack } from '@mui/material';
import GalleryPicker from './galleryPicker';
import imageCompression from 'browser-image-compression';
import Admin from '../../admin';
import { useSelector } from 'react-redux';

export default function ListaImagenes( props ){
    const [ page, setPage ] = React.useState(1) ;

    const apiUrl = 'http://147.182.177.178:80/images/' ;
    //const apiUrl = 'http://localhost:3000/images/' ;
    const handlePage = ( event , newPage ) =>{
      props.handlePage( event, newPage ) ;
      setPage( newPage ) ;
    }
    const mode = useSelector( ( state ) => state.adminMode.value ) ; 
    if( !mode ){
        return <Admin />

    }
    else
    return (
   
        <Box
          sx = {{
            display: 'flex',
            flexDirection: 'column',
            
          }}
        >
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
          <Stack spacing={2} sx={{ alignSelf: 'center' }} >
                <Pagination 
                    count={ props.pageCount } 
                    color="primary" 
                    page={ page }
                    onChange = { handlePage }
                />
          </Stack>
        </Box>
     
        
  );
}
