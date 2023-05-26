import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import IconList from '../../components/navigation/iconList';




export default function Sidebar( props ) {

  const toogle = ( open ) => {
    props.toogle( open );
  }

  const lista = () => (
    <Box
      
      role="presentation"
    >
      <List>     
            <IconList 
                toogle = { toogle }
                handleNewCard = { props.handleNewCard }
                handleNewPaper = { props.handleNewPaper }
            />
      </List>
      <Divider />

    </Box>
  );

  return (
    <div>
      <Drawer 
        variant='persistent'
        anchor = 'left'
        open = { props.sidebar }
      >
        {lista()}
      </Drawer>
    </div>
  );
}
