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
                backgroundColor:  props.bgColor ? props.bgColor : 'primary.main' ,
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
            
            <Box
                sx={{ display: { xs: 'none' , sm: 'flex' , md: 'flex' } , flexDirection: 'column' , flexGrow: 1 }}
            >
                <Typography 
                    textAlign={'start'} 
                    
                    color={'white'}
                    sx={{ 
                        p: 2,
                        zIndex: 2,
                        fontSize:{ sm: '1.3em' , md: '2.2em' },
                        fontWeight: 600,
                        wordSpacing: 2,
                    }}
                    
                > 
                   {props.firstText}
                </Typography>

                <Typography
                    color='info.main' 
                    sx={{ p: 2 }}
                > 
                    {props.secondText}
                </Typography>
                
            </Box> 
            <Box
                sx={{ display: { xs: 'none' , sm: 'none' , md: 'flex' } , flexDirection: 'column' , alignSelf: 'end' }}
            >

                <Typography
                    variant='h4'
                    color='info.main' 
                    sx={{ paddingRight: 1 }}
                > 
                    { props.title }
                </Typography>

                <Typography
                    color='info.main' 
                    sx={{paddingRight: 1  }}
                > 
                    { props.thirdText }
                </Typography>
            </Box>
        </Box>
    </Box>
    
    );

}