import React from "react";
import { Box, Grid } from "@mui/material";
import { ContactUs } from "../components/emailjs";
import { useDispatch, useSelector } from "react-redux";
import { loadRoute } from "../components/redux/editForm";

const mapa =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.76041372466557!2d-104.66099552310578!3d24.025188861268408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bc976da55d5a3%3A0x8e14c234283f4dcc!2sMAQROM%20CONSTRUCCIONES!5e0!3m2!1ses!2smx!4v1681291692239!5m2!1ses!2smx";

export default function Contacto() {
  return (
    <Box>
      <Grid container spacing={2}
        sx={{
          flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' }
        }}
      >
        <Grid item className="footer-left-grid" xs={12} sm={ 12 } md={12} lg={6} >
          <iframe
            className="Mapa"
            src={mapa}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Grid>
        <Grid item xs={12} sm={ 12 } md={12} lg={6} >
          <ContactUs />
        </Grid>
      </Grid>
    </Box>
  );
}
