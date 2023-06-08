import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, IconButton, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ContactUs } from "../emailjs";
import backgroundImage from "../../assets/footer.webp";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import fbLogo from "../../assets/fbLogo.png";
import MaqromLogo from "../../assets/Maqrom.svg";

export default function Footer() {
  const pages = [
    { page: "Inicio", linkTo: "/" },
    { page: "Nosotros", linkTo: "/about-us" },
    { page: "Servicios y Planos", linkTo: "/servicios" },
    { page: "Renta de Maquinaria", linkTo: "/renta" },
    { page: "Calidad", linkTo: "/calidad" },
    { page: "Contacto", linkTo: "/contacto" },
  ];
  return (
    <Box mt={4} sx={{ height: "100%" }}>
      <div className="footer-style">
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <IconButton
                component={Link}
                to="https://www.facebook.com/MaqromConstrucciones"
                target="_blank"
              >
                <img src={MaqromLogo} width={60} height={60} />
              </IconButton>
              <Typography sx={{ fontSize: { xs: '.5em', md: '.8em' , lg: '1em' } }} className="footer-text">
                Fundada por dos visionarios arquitectos, nació bajo una luna
                azul en una tierra mítica. Su pasión por construir un futuro
                brillante unió sus destinos en una firma que transformaría
                ciudades.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" sx={{ fontSize: { xs: '1em', md: '2em' } }} className="footer-social">Siguenos en nuestras redes</Typography>
              <IconButton
                component={Link}
                to="https://www.facebook.com/MaqromConstrucciones"
                target="_blank"
              >
                <img src={fbLogo} width={40} height={40} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <div className="footer-separator" />

        <div style={{display:'flex'}}>
          {pages.map((item) => {
            return (
              <MenuItem key={item.page} component={Link} to={item.linkTo}>
                <Typography textAlign="center">{item.page}</Typography>
              </MenuItem>
            );
          })}
        </div>
      </div>
    </Box>
  );
}
