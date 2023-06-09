import { Box, Button, ButtonGroup, Container } from "@mui/material";
import * as React from "react";
import CalidadProductos from "./calidad/calidad-productos";
import CalidadServicios from "./calidad/calidad-servicios";
import Certificados from "./calidad/certificados";

export default function Calidad() {
  const [calidad, setCalidad] = React.useState(null);
  const [index0, setIndex0] = React.useState("primary");
  const [index1, setIndex1] = React.useState("primary");
  const [index2, setIndex2] = React.useState("primary");
  const listaCalidad = [
    <CalidadProductos />,
    <CalidadServicios />,
    <Certificados />,
  ];

  React.useEffect(() => {
    setCalidad(listaCalidad[0]);
    setIndex0("error");
  }, []);

  const handleClick0 = () => {
    setIndex0("error");
    setIndex1("primary");
    setIndex2("primary");
    setCalidad(listaCalidad[0]);
  };

  const handleClick1 = () => {
    setIndex0("primary");
    setIndex1("error");
    setIndex2("primary");
    setCalidad(listaCalidad[1]);
  };

  const handleClick2 = () => {
    setIndex0("primary");
    setIndex1("primary");
    setIndex2("error");
    setCalidad(listaCalidad[2]);
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
            Calidad de Productos{" "}
          </Button>
          <Button variant="contained" color={index1} onClick={handleClick1}>
            {" "}
            Calidad de Servicios{" "}
          </Button>
          {/* <Button variant="contained" color={index2} onClick={handleClick2}>
            {" "}
            Certificados{" "}
          </Button> */}
        </ButtonGroup>
      </Box>
      {calidad}
    </Box>
  );
}
