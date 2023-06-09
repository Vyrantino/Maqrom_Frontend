import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';
import MaqromLogo from '../../assets/MaqromLogo.png'
export default function AfterPapers(props){
return(
    <Paper     
        sx={{
            position: 'relative',
            backgroundImage: `url(${MaqromLogo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '500px', 
        }}
    >    
            <Box
                sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#ffffff', 
                padding: '1rem', 
                }}
            >
                <Typography variant="h5" align="center">
                    { props.afterPapersText }
                </Typography>
            </Box>
    </Paper>
) ;

}