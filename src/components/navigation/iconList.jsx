import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import ArticleIcon from "@mui/icons-material/Article";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function IconList(props) {
  return (
    <React.Fragment>
      <ListItem disablePadding>
        <ListItemButton onClick={() => props.toogle(false)}>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary={"Regresar"} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton LinkComponent={Link} to="/article">
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary={"Editar Articulos"} sx={{ color: "black" }} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton LinkComponent={Link} to="/editCarousel">
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary={"Editar Carruseles"} sx={{ color: "black" }} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={props.handleNewCard}>
          <ListItemIcon>
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary={"Nueva Seccion"} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={props.handleNewPaper}>
          <ListItemIcon>
            <CallToActionIcon />
          </ListItemIcon>
          <ListItemText primary={"Nuevo Texto"} />
        </ListItemButton>
      </ListItem>
    </React.Fragment>
  );
}
