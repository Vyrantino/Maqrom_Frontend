import { Box, Typography } from '@mui/material';
import * as React from 'react' ; 
export default function AfterCarousel( props ){
    return(
            <Box
                sx={ { 
                    backgroundImage: `url(${props.image})`, 
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%' ,
                    height: { xs: '30vh', sm: '50vh', md: '60vh', lg: '600px'},
                    position: 'relative' ,
                    backgroundPositionY: props.backgroundPositionY ,
                 } }
                 width={'100%'}
                
            >
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        backgroundColor: 'rgba( 255,106,0,0.40 )',
                        position: 'absolute', 
                        bottom: '0', 
                        right: '0', 
                        padding: '1em',
                    }}
                >
                    <Typography
                           align='right'
                           alignSelf={'end'}
                           
                           sx={{
                               fontSize: { xs:'calc(.6em + .6vw)' , sm: 'calc(1em + 1vw)' , md: 'calc(1em + 1vw)' , lg: 'calc(1em + 1vw)' },
                               margin: '1em',
                               color: 'white' ,
                           }}
                       >
                        { props.texto }
                    </Typography>
                </Box>
            </Box>
    );

}