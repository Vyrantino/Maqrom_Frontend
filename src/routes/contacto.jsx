import { Button, Container, Dialog } from "@mui/material";
import React from "react";
import Dialogo from "../components/Dialogo";
import { ContactUs } from "../components/emailjs";

export default function Contacto() {
  const [open, setOpen] = React.useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Container>
      <ContactUs />
    </Container>
  );
}

/* DUMP CODE, DELETE LATER

  const callBackFunction = () =>{
      let responseLength = 84 ; 
      let residuo = responseLength % 8 ;
      let pageCount = Math.round( responseLength / 8 ) ; 
     
     if( true ){
      if( residuo === 0 )
        pageCount = pageCount ;
      else if( residuo < 5 ){
        pageCount = pageCount + 1;
      }
        
      else if( residuo >= 5 ) {
        pageCount = pageCount ;
      }
     }
      

    console.log( pageCount ) ;

  }
*/
