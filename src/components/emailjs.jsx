import React, { useRef } from 'react';
import emailjs from '@emailjs/browser'
import { Box, Button, Container, TextField } from '@mui/material';
import { Form } from 'react-router-dom';

export const ContactUs = () => {
  const [ nombre, setNombre ] = React.useState('') ;
  const [ correo, setCorreo ] = React.useState('') ;
  const [ mensaje, setMensaje ] = React.useState('') ;

  const handleNombre = ( e ) =>setNombre(  e.target.value  ) ;
  const handleCorreo = ( e ) =>setCorreo(  e.target.value  ) ;
  const handleMensaje = ( e ) =>setMensaje(  e.target.value  ) ;
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_jguszif', 'template_cgmturo', form.current, 'uFIfOmrBCHC1NpOVN')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  var templateParams = {
    user_name: nombre,
    message: mensaje,
    user_email: correo,
};

  const handleEnviar = async () =>{
     await emailjs.send("service_jguszif","template_cgmturo", templateParams ,'uFIfOmrBCHC1NpOVN',)
            .then( ( response ) => console.log( response ) );
  }
  
  return (
        
        <Box 
            className = "TextFieldFooter" 
        >
            <TextField 
                id="filled-basic"
                label="Nombre" 
                variant="filled" 
                name='user_name' 
                onChange={ handleNombre }
            />
            <TextField 
                id="filled-basic"
                label="Correo" 
                variant="filled" 
                name='user_email' 
                type='email' 
                onChange={ handleCorreo }
            />

            <TextField
                    id="filled-multiline-static"
                    label="Escriba su mensaje"
                    multiline
                    rows={7}
                    variant="filled"
                    name='message'
                    onChange={ handleMensaje }
                />
            <Button
                // type='submit'
                // value='Send'
                onClick={ handleEnviar }
            > 
                Enviar

            </Button>
            
        </Box>

        
  );
};