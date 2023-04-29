import * as React from 'react';
import mario from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/mario.jpg" ;
import '@coreui/coreui/dist/css/coreui.min.css' ; 
import StandardImageList from '../components/image-list';
import Carta from '../components/card';
import Carousel from '../components/carousel';
import Papers from '../components/papers';
import Grid from '@mui/material/Unstable_Grid2';


export default function Homepage (  ){
    return(
           
                <div
                    className = "Carousel"
                >
                        <Carousel  img1 = { mario } img2 = { mario } img3 = { mario } />
                        <div className = "DivHomepage" >
                             <Carta />
                             <StandardImageList className = "ImageListHomepage"/>
                             
                        </div>
                        <hr />
                        <h1> Conozca Nuestros Servicios! </h1>
                        <hr />Papers    
                       <div >
                            <Grid container spacing = { 4 } >
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <Papers />
                                </Grid>
                            </Grid>
                       </div>
                </div>
                      
                    
           
                    
           
      

    );

}