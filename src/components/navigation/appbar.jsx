import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import fbLogo from "../../assets/fbLogo.png";
import MaqromLogo from "../../assets/Maqrom.svg";
import MenuIcon from "@mui/icons-material/Menu";
import ConstructionIcon from '@mui/icons-material/Construction';

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Menu, MenuItem, Typography } from "@mui/material";


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
  // {
  //   page: "Facebook",
  //   linkTo: "https://www.facebook.com/oscar.valleshdez",
  //   isIconButton: true,
  //   img: fbLogo,
  //   target: "_blank",
  //   alt: "facebookLogo",
  // },
];


const HamburgerMenu = () =>{
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return(
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    <IconButton
      size="large"
      aria-controls="menu-appbar"
      onClick={handleOpenNavMenu}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none' },
      }}
    >
      {pages.filter( page => page.isIconButton != true  ).map((item) => (
          <MenuItem  
            key={ item.page } 
            component={Link} 
            to={item.linkTo}
          >
            <Typography color='primary' textAlign="center">{item.page}</Typography>
          </MenuItem>
      ))}
    </Menu>
  </Box>

  ) ;

}

export default function ButtonAppBar(props) {
  const isAdmin = useSelector((state) => state.adminMode.value);
 
  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ alignItems: "center" , maxWidth: '1x' }}>
        <Toolbar disableGutters >
          <HamburgerMenu />
          {isAdmin && (
            <IconButton onClick={() => props.toogle(true)}>
              {" "}
              <ConstructionIcon  sx={{ color: "white" }} />{" "}
            </IconButton>
          )}
          <Typography sx={{ display: { xs: 'none' , sm: 'flex' , md: 'none' }}} > Maqrom </Typography>
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
              <MenuItem  
                key={ item.page } 
                component={Link} 
                to={item.linkTo}
                sx={{ display: { xs: 'none' , md: 'flex' }, mr: 1 }}
              >
                <Typography textAlign="center">{item.page}</Typography>
              </MenuItem>
            );
          })}
          
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
