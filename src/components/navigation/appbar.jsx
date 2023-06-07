import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import fbLogo from "../../assets/fbLogo.png";
import MaqromLogo from "../../assets/Maqrom.svg";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MenuItem, Typography } from "@mui/material";

const pages = [
  {
    page: "Homepage",
    linkTo: "/",
    isIconButton: true,
    img: MaqromLogo,
    alt: "MaqromLogo",
  },
  { page: "Nosotros", linkTo: "/about-us" },
  { page: "Servicios y Planos", linkTo: "/servicios" },
  { page: "Renta de Maquinaria", linkTo: "/renta" },
  { page: "Calidad", linkTo: "/calidad" },
  { page: "Contacto", linkTo: "/contacto" },
  {
    page: "Facebook",
    linkTo: "https://www.facebook.com/oscar.valleshdez",
    isIconButton: true,
    img: fbLogo,
    target: "_blank",
    alt: "facebookLogo",
  },
];

export default function ButtonAppBar(props) {
  const isAdmin = useSelector((state) => state.adminMode.value);

  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ alignItems: "center" }}>
        <Toolbar>
          {isAdmin && (
            <IconButton onClick={() => props.toogle(true)}>
              {" "}
              <MenuIcon sx={{ color: "white" }} />{" "}
            </IconButton>
          )}
          {pages.map((item) => {
            return item.isIconButton ? (
              <IconButton
                key={item.page}
                component={Link}
                to={item.linkTo}
                target={item.target}
              >
                <img src={item.img} width={40} height={40} alt={item.alt} />
              </IconButton>
            ) : (
              <MenuItem  key={ item.page } component={Link} to={item.linkTo}>
                <Typography textAlign="center">{item.page}</Typography>
              </MenuItem>
            );
          })}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
