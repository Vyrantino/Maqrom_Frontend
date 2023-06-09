import { Box, Button, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Form, useNavigate, Link } from "react-router-dom";
import { login, register } from "./axiosMain";
import { adminMode } from "./components/redux/adminToken";

export default function Admin() {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.adminMode.value);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => setEmail(e.target.value.toLowerCase());
  const handleUsernameChange = (e) => setUsername(e.target.value.toLowerCase());
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
     await login(username, password)
      .then( ( result )=>{
          if (!result) {
            alert("Contraseña no reconocida");
          } else {
            alert("Se han activado los derechos de Administrador");
            dispatch(adminMode(mode));
            navigate("/");
          }
      } )
  };

  // const handleRegister = () => {
  //   register(email, username, password);
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Form className="FormLogin" onSubmit={handleSubmit}>
        <Typography variant="h2" > Ingrese sus credenciales </Typography>
        <TextField
          key={`txtFieldUsername`}
          id="filled-basic"
          label="Usuario"
          variant="filled"
          type="text"
          onChange={handleUsernameChange}
        />
        <TextField
          key={`txtPassword`}
          id="filled-basic"
          label="contraseña"
          variant="filled"
          type="password"
          onChange={handlePasswordChange}
        />
        <Button type="submit" variant="contained">
          Entrar como Administrador
        </Button>
        {/* <Button onClick={handleRegister} variant="contained">
          Registrar un usuario
        </Button> */}
      </Form>
    </Box>
  );
}
