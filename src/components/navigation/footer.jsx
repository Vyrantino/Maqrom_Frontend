import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ContactUs } from "../emailjs";
const mapa =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.76041372466557!2d-104.66099552310578!3d24.025188861268408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bc976da55d5a3%3A0x8e14c234283f4dcc!2sMAQROM%20CONSTRUCCIONES!5e0!3m2!1ses!2smx!4v1681291692239!5m2!1ses!2smx";

export default function Footer() {
  return (
    <Box
      className="BoxFooter"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <ContactUs />

      <iframe
        className="Mapa"
        src={mapa}
        width="600"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="FooterLinks">
        <ul className="FooterLinks">
          <li>
            <Link to="/">
              {" "}
              <h3> Maqrom construcciones </h3>{" "}
            </Link>
          </li>
          <li>
            <Link to="/about-us">
              {" "}
              <h5> Nosotros </h5>{" "}
            </Link>
          </li>
          <li>
            <Link to="/servicios">
              {" "}
              <h5> Servicios </h5>{" "}
            </Link>
          </li>
          <li>
            <Link to="/renta">
              {" "}
              <h5> Renta de Maquinaria </h5>{" "}
            </Link>
          </li>
          <li>
            <Link to="/calidad">
              {" "}
              <h5> Calidad </h5>{" "}
            </Link>
          </li>
          <li>
            <Link to="/contacto">
              {" "}
              <h5> Contacto </h5>{" "}
            </Link>
          </li>
        </ul>
      </div>
    </Box>
  );
}
