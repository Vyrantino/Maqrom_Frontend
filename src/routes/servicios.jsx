import { Box, Button, ButtonGroup, Container } from "@mui/material";
import * as React from "react";
import ListaServicios from "./servicios/lista-servicios";
import ListaProyectos from "./servicios/lista-proyectos";
import ListaPlanos from "./servicios/lista-planos";

export default function Servicios() {
  const [servicios, setServicios] = React.useState(null);
  const [index0, setIndex0] = React.useState("primary");
  const [index1, setIndex1] = React.useState("primary");
  const [index2, setIndex2] = React.useState("primary");
  const listaServicios = [
    <ListaServicios />,
    <ListaProyectos />,
    <ListaPlanos />,
  ];

  React.useEffect(() => {
    setServicios(listaServicios[0]);
    setIndex0("error");
  }, []);

  const handleClick0 = () => {
    setIndex0("error");
    setIndex1("primary");
    setIndex2("primary");
    setServicios(listaServicios[0]);
  };

  const handleClick1 = () => {
    setIndex0("primary");
    setIndex1("error");
    setIndex2("primary");
    setServicios(listaServicios[1]);
  };

  const handleClick2 = () => {
    setIndex0("primary");
    setIndex1("primary");
    setIndex2("error");
    setServicios(listaServicios[2]);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup>
          <Button variant="contained" color={index0} onClick={handleClick0}>
            {" "}
            Servicios{" "}
          </Button>
          <Button variant="contained" color={index1} onClick={handleClick1}>
            {" "}
            Proyectos{" "}
          </Button>
          <Button variant="contained" color={index2} onClick={handleClick2}>
            {" "}
            Planos{" "}
          </Button>
        </ButtonGroup>
      </Box>
      {servicios}
    </Box>
  );
}
