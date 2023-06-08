import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react' ; 
import Midiendo from '../../assets/midiendo.jpg';
export default function AfterCarousel( props ){
    return(
        <React.Fragment>
            <Grid
                container
                sx={ { 
                    backgroundImage: `url(${Midiendo})`, 
                    backgroundPositionY: '-400px',
                    backgroundColor: 'rgba( 255,106,0,0.83 )',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat' ,
                    backgroundAttachment: 'scroll',
                    backgroundClip: ''
                 } }
                 width={'100%'}
                 height={'100%'}
            >
                <Box
                    sx={ { 
                        backgroundColor: 'rgba( 255,106,0,0.33 )'
                     } }
                     width={'100%'}
                     height={'100%'}
                >
                   
                    <Grid
                        item
                        xs = { 12 }
                        sm = { 12 }
                        md = { 12 }
                        lg = { 12 }
                        xl = { 12 }
                        height={600}
                        maxHeight={600}
                    >
                        <Typography
                           
                            sx={{
                                fontSize: 'calc(1em + 1vw)',
                                lineHeight: '1em',
                                padding: '1em',
                                margin: '1em'
                            }}
                          
                        >
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae maiores consequatur quae molestiae sint architecto ipsa obcaecati necessitatibus repellat voluptate aliquam, asperiores nihil laboriosam inventore impedit ea nam assumenda molestias!
                        </Typography>
                    </Grid>
                </Box>
            </Grid>
        </React.Fragment>

    );

}