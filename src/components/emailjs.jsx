import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Box, Button, Container, TextField } from "@mui/material";
import { Form } from "react-router-dom";

export const ContactUs = () => {
  const [nombre, setNombre] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");

  const handleNombre = (e) => setNombre(e.target.value);
  const handleCorreo = (e) => setCorreo(e.target.value);
  const handleMensaje = (e) => setMensaje(e.target.value);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jguszif",
        "template_cgmturo",
        form.current,
        "uFIfOmrBCHC1NpOVN"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  var templateParams = {
    user_name: nombre,
    message: mensaje,
    user_email: correo,
  };

  const handleEnviar = async () => {
    await emailjs
      .send(
        "service_jguszif",
        "template_cgmturo",
        templateParams,
        "uFIfOmrBCHC1NpOVN"
      )
      .then((response) => console.log(response));
  };

  return (
    <Box className="TextFieldFooter">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          id="standard-basic"
          label="Nombre"
          variant="standard"
          name="user_name"
          onChange={handleNombre}
        />
        <TextField
          id="standard-basic"
          label="Correo"
          variant="standard"
          name="user_email"
          type="email"
          onChange={handleCorreo}
        />

        <TextField
          id="standard-multiline-static"
          label="Escriba su mensaje"
          multiline
          rows={7}
          variant="standard"
          name="message"
          onChange={handleMensaje}
        />
        <Button
          // type='submit'
          // value='Send'
          onClick={handleEnviar}
          sx={{color: 'black', fontWeight: 'bold'}}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
};
