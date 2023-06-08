import { Box, Typography } from '@mui/material';
import * as React from 'react' ;
import MaqromLogo from '../../assets/MaqromLogo.png';
export default function AfterCards( props ){
    return(

    <Box
        sx={{
            width: '100hw',
            height: 200,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',  
        }}
    >
        <Box
                sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'primary.main',
                display:'flex',
            }}
                color={'secondary'}
        >
            <Typography 
                textAlign={'start'} 
                variant='h6'
                color={'white'}
                sx={{ 
                    p: 2,
                    zIndex: 2,
                    gridArea: props.route ,
                    fontSize: '1.2em',
                    fontWeight: 600,
                    textAlign: 'right',
                    wordSpacing: 2,
                    writingMode: 'vertical-rl',
                    transform: 'scale(-1)',

                }}
                
            > 
                    Maqrom Constructora
            </Typography>

            <img 
                src={ MaqromLogo } 
                width={ 200 } 
                height={ 200 } 
            />  
            
            <Box>
                <Typography 
                    textAlign={'start'} 
                    variant='h6'
                    color={'white'}
                    sx={{ 
                        p: 2,
                        zIndex: 2,
                        fontSize: 32,
                        fontWeight: 600,
                        wordSpacing: 2,
                    }}
                    
                > 
                   {props.firstText}
                </Typography>

                <Typography
                    color='info.main' 
                    sx={{m: 3 , }}
                > 
                    {props.secondText}
                </Typography>
                
            </Box> 
            <Box>

                <Typography
                    variant='h4'
                    color='info.main' 
                    sx={{m: 3 , }}
                > 
                    { props.title }
                </Typography>

                <Typography
                    color='info.main' 
                    sx={{ m: 10 , }}
                > 
                    { props.thirdText }
                </Typography>
            </Box>
        </Box>
    </Box>
    
    );

}