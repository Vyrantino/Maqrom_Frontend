import * as React from 'react';
import mario from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/mario.jpg" ;
import moto from "/Users/Vyrant PC/Documents/VsCode Web Pages/MAQROM/maqrom-constructora/src/assets/moto.jpg" ;
import '@coreui/coreui/dist/css/coreui.min.css' ; 
import StandardImageList from '../components/image-list';
import Carta from '../components/card';
import Carousel from '../components/carousel';
import BasicCard from '../components/basic-cards';
import Grid from '@mui/material/Unstable_Grid2';


export default function PubHomepage (  ){
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
                        <hr />    
                       <div >
                            <Grid container spacing = { 4 } >
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                                <Grid xs = { 4 }>
                                    <BasicCard />
                                </Grid>
                            </Grid>
                       </div>
                </div>
                      
                    
           
                    
           
      

    );

}