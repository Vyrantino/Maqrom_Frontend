import { Button, ButtonGroup, Dialog, DialogTitle, TextField } from '@mui/material';
import * as React from 'react' ;


export default function Dialogo ( props ){
    const [ entry , setEntry ] = React.useState( '' ); 
    const handleEntry = ( e ) => setEntry( e.target.value ) ; 


    return(

        <React.Fragment>
            <Dialog  onClose={ props.closeDialog } open = { props.open } >
                <DialogTitle> Introduzca el nombre del nuevo Elemento: { props.cosa } </DialogTitle>
                <TextField
                    onChange={ handleEntry }
                    label = { `Nombre del nuevo elemento ${props.cosa}` }
                />   
                <ButtonGroup sx = {{ display: 'flex' , flexDirection: 'column' }} >
                       <Button  onClick={ () => props.handleCreateArticle( entry )  } color = 'success' variant='contained' > Aceptar </Button> 
                       <Button  onClick={ props.closeDialog } color = 'error' variant='contained' > Cancelar </Button> 
                </ButtonGroup>

            </Dialog>
        </React.Fragment>

    ) ;

}

